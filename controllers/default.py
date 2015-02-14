# -*- coding: utf-8 -*-
# this file is released under public domain and you can use without limitations

#########################################################################
## This is a sample controller
## - index is the default action of any application
## - user is required for authentication and authorization
## - download is for downloading files uploaded in the db (does streaming)
## - call exposes all registered services (none by default)
#########################################################################


from PIL import Image
import MySQLdb
import MySQLdb.cursors
import os
import json
import pdb
import tempfile
import urllib2
import datetime
from datetime import date, timedelta

def index():

    def parseForm(submitted, form):       
        image_time = int(form.vars.image_time) - 1     

        if image_time == 0:
            start_date = datetime.datetime.now() - timedelta(hours=24)
            start_date = start_date.strftime('%Y-%m-%d %H:%M:%S')
        else:
            start_date = date.today()-timedelta(days=image_time)
            start_date = start_date.strftime("%Y-%m-%d")        
        
        hashed = avhash(submitted)
        matches = checkImages(hashed, start_date, CREDENTIALS)


        exact_matches = matches['exact_matches']
        neighbors = matches['neighbors']

        if len(exact_matches) > 0:
            exact_found = True  
        else:
            exact_found = False

        session.images = images
        session.matches = exact_matches
        session.neighbors = neighbors           
        session.start_date = start_date
        session.exact_found = exact_found

    # MySQL credentials
    credentials_path = open(os.path.join(
        request.folder, 
        'private', 
        'mysql_credentials.json'
    ))    
    CREDENTIALS = json.load(credentials_path)

    # Possible forms?
    image_form = FORM(
        INPUT(_name='image_file',_type='file', requires=IS_IMAGE()),
        SELECT(_name='image_time', requires=IS_NOT_EMPTY())
    )   
    web_form = FORM(
        INPUT(_name='image_url',_type='text', requires=IS_URL()),
        SELECT(_name='image_time', requires=IS_NOT_EMPTY())        
    )

    # Process form
    matches = []
    images = []    
    if image_form.accepts(request.vars,formname='image_form'):   
        submitted = image_form.vars.image_file.file    
        parseForm(submitted, image_form)
        redirect(URL('results'))
    elif web_form.accepts(request.vars,formname='web_form'):         
        submitted = downloadImage(web_form.vars.image_url)
        try:
            Image.open(submitted)
        except IOError:
            response.flash = 'Web form has errors'
            return dict()            
        parseForm(submitted, web_form)    
        os.remove(submitted)
        redirect(URL('results'))
    elif image_form.errors:
        response.flash = 'Upload form has errors'
        return dict()        
    elif web_form.errors:
        response.flash = 'Web form has errors'
        return dict()                
    return dict()


def downloadImage(image_url):
    imagefile = urllib2.urlopen(image_url)
    outfile = tempfile.NamedTemporaryFile().name
    output = open(outfile, 'wb')
    output.write(imagefile.read())
    return outfile


def results():
    return dict(
        images=session.images, 
        matches=session.matches, 
        start_date=session.start_date,
        neighbors=session.neighbors,
        exact_found=session.exact_found
    )


def user():
    """
    exposes:
    http://..../[app]/default/user/login
    http://..../[app]/default/user/logout
    http://..../[app]/default/user/register
    http://..../[app]/default/user/profile
    http://..../[app]/default/user/retrieve_password
    http://..../[app]/default/user/change_password
    http://..../[app]/default/user/manage_users (requires membership in
    use @auth.requires_login()
        @auth.requires_membership('group name')
        @auth.requires_permission('read','table name',record_id)
    to decorate functions that need access control
    """
    return dict(form=auth())


@cache.action()
def download():
    """
    allows downloading of uploaded files
    http://..../[app]/default/download/[filename]
    """
    return response.download(request, db)


def call():
    """
    exposes services. for example:
    http://..../[app]/default/call/jsonrpc
    decorate with @services.jsonrpc the functions to expose
    supports xml, json, xmlrpc, jsonrpc, amfrpc, rss, csv
    """
    return service()


@auth.requires_signature()
def data():
    """
    http://..../[app]/default/data/tables
    http://..../[app]/default/data/create/[table]
    http://..../[app]/default/data/read/[table]/[id]
    http://..../[app]/default/data/update/[table]/[id]
    http://..../[app]/default/data/delete/[table]/[id]
    http://..../[app]/default/data/select/[table]
    http://..../[app]/default/data/search/[table]
    but URLs must be signed, i.e. linked with
      A('table',_href=URL('data/tables',user_signature=True))
    or with the signed load operator
      LOAD('default','data.load',args='tables',ajax=True,user_signature=True)
    """
    return dict(form=crud())


def link(): 
    return response.download(request,db,attachment=False)


def avhash(im):
    """
    From this nice guy's post
        http://hzqtc.github.io/2013/04/image-duplication-detection.html
    """
    if not isinstance(im, Image.Image):
        im = Image.open(im)
    im = im.resize((8, 8), Image.ANTIALIAS).convert('L')
    avg = reduce(lambda x, y: x + y, im.getdata()) / 64.
    return reduce(lambda x, (y, z): x | (z << y),
                  enumerate(map(lambda i: 0 if i < avg else 1, im.getdata())),
                  0)


def hamming(h1, h2):
    """
    From this nice guy's post
        http://hzqtc.github.io/2013/04/image-duplication-detection.html
    """    
    h, d = 0, h1 ^ h2
    while d:
        h += 1
        d &= d - 1
    return h


# def create_temporary_copy(path):
#     temp_dir = tempfile.gettempdir()
#     temp_path = os.path.join(temp_dir, 'temp_file_name')
#     shutil.copy2(path, temp_path)
#     return temp_path        


def checkImagesExactMatchOnly(hashed, min_date, credentials):
    # Query
    db = MySQLdb.connect(
        host=credentials['host'],
        user=credentials['user'],
        passwd=credentials['password'],
        db=credentials['db'],
        cursorclass=MySQLdb.cursors.DictCursor            
    )    
    cur = db.cursor()     
    query = "SELECT * FROM popular WHERE hashed = " + str(hashed) + " AND timeAdded > '" + min_date + "' ORDER BY timeAdded DESC;"
    cur.execute(query)
    rows = cur.fetchall()
    db.commit()
    db.close()
    exact_matches = []
    # If hash match, similarity = 100
    for row in rows:
        row['similarity'] = 100
        exact_matches.append(row)
    return dict(exact_matches=exact_matches, neighbors=[])


def checkImages(hashed, min_date, credentials):    
    # Query
    db = MySQLdb.connect(
        host=credentials['host'],
        user=credentials['user'],
        passwd=credentials['password'],
        db=credentials['db'],
        cursorclass=MySQLdb.cursors.DictCursor            
    )    
    cur = db.cursor()     
    query = "SELECT * FROM popular WHERE timeAdded > '" + min_date + "' ORDER BY timeAdded DESC;"
    cur.execute(query)
    rows = cur.fetchall()
    db.commit()
    db.close()
    # Collect
    exact_matches = []
    neighbors = []
    for row in rows:
        if row['hashed'] is None:
            continue
        # Calc similarity
        dist = hamming(long(row['hashed']), hashed)        
        similarity = (64 - dist) * 100 / 64
        row['similarity'] = similarity
        # If applicable, store as either exact match or neighbor
        if long(row['hashed']) == hashed:
            exact_matches.append(row)
        elif similarity > 90:
            neighbors.append(row)
    return dict(exact_matches=exact_matches, neighbors=neighbors)
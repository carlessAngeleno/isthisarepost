# -*- coding: utf-8 -*-
# this file is released under public domain and you can use without limitations

#########################################################################
## Customize your APP title, subtitle and menus here
#########################################################################

response.logo = A(XML("&nbsp"), 'Is This a Repost',
                  _class="brand",_href=URL('../..'))
response.title = 'Is This a Repost'
response.subtitle = ''

## read more at http://dev.w3.org/html5/markup/meta.name.html
response.meta.author = 'carlessAngeleno <daydream.han@gmail.com>'
response.meta.description = 'Check for potential imgur reposts'
response.meta.keywords = 'web2py, python, framework, imgur'
response.meta.generator = 'Web2py Web Framework'

## your http://google.com/analytics id
response.google_analytics_id = None

#########################################################################
## this is the main application menu add/remove items as required
#########################################################################

response.menu = [
    # (T('Home'), False, URL('default', 'index'), [])
]

DEVELOPMENT_MENU = False

#########################################################################
## provide shortcuts for development. remove in production
#########################################################################


if "auth" in locals(): auth.wikimenu() 

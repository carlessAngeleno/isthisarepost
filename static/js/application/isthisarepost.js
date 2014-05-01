/******************************************************************************/

  /** HELPERS **/

// http://stackoverflow.com/a/1909508
var delay = (function(){
  var timer = 0;
  return function(callback, ms){
    clearTimeout (timer);
    timer = setTimeout(callback, ms);
  };
})();

/******************************************************************************/

  /** UPLOAD IMAGE FROM COMPUTER **/

$('#file_uploader').change(function() {
  handleFiles(this.files, '#upload_canvas');
});

function handleFiles(files, canvas_sel) {
  // Modified from 
  // https://developer.mozilla.org/en-US/docs/Using_files_from_web_applications
  $(canvas_sel).empty();
  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    var imageType = /image.*/;
    
    if (!file.type.match(imageType)) {
      $(canvas_sel).html('<h4>Not a valid image file</h4>');
      continue;
    }
    
    var img = document.createElement("img");
    img.classList.add("obj");
    img.file = file;
    $(canvas_sel).append(img);
    
    var reader = new FileReader();
    reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
    reader.readAsDataURL(file);
  }
}

/******************************************************************************/

  /** LINK IMAGE ON THE WEB**/

$('#link_input').on('paste keyup change', function() {
    var input = this;
    delay(function(){
      updateLinkCanvas($(input).val(), "#link_canvas");
    }, 500 );
});

function updateLinkCanvas(url, canvas_sel) {
  $(canvas_sel).empty();
 
  // Validate url before deciding what to do
  var img = new Image();  
  img.onerror = function() { renderLinkCanvas(url, canvas_sel, false); }
  img.onload =  function() { renderLinkCanvas(url, canvas_sel, true); }  
  img.src = url
}

function renderLinkCanvas(url, canvas_sel, valid) {
  if (valid) {
    var img = document.createElement("img");
    img.src = url;
    $(canvas_sel).append(img);
  } else {
    $(canvas_sel).html('<h4>Not a valid image URL</h4>'); 
  }
}

// Populate input with sample link on page
$('a.sample_link').click(function() {
  $('#link_input').val(this.text).change();
})


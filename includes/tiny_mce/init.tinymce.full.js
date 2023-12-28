$().ready(function() {
  $('textarea.tinymce').tinymce({
    script_url : publicUrl + '/includes/tiny_mce/tiny_mce.js',
    remove_script_host : false,
    convert_urls : true,
    theme : "advanced",
    file_browser_callback : "tinyBrowser",
    plugins : "paste,inlinepopups,contextmenu,fullscreen,advimage,media,table,jbimages",
    theme_advanced_buttons1 : "" +
    "pastetext,pasteword,|,image,jbimages,|,bold,italic,underline,fontsizeselect,forecolor,|," +
    "bullist,numlist,table,|," +
    "link,unlink,|,charmap,code,|,fullscreen",
    theme_advanced_buttons2 : "",
    theme_advanced_buttons3 : "",
    theme_advanced_font_sizes : "8px=8px,10px=10px,12px=12px,14px (default)=14px,16px=16px,18px=18px,24px=24px,32px=32px",
    theme_advanced_toolbar_location : "top",
    theme_advanced_toolbar_align : "left",
    theme_advanced_statusbar_location : "none",
  });

  $('textarea.tinymce-blank').tinymce({
    script_url : publicUrl + '/includes/tiny_mce/tiny_mce.js',
    theme : "advanced",
    plugins : "",
    theme_advanced_buttons1 : "",
    theme_advanced_buttons2 : "",
    theme_advanced_buttons3 : "",
    theme_advanced_toolbar_location : "none",
    theme_advanced_toolbar_align : "left",
    theme_advanced_statusbar_location : "none"
  });

  $('textarea.tinymce-simple').tinymce({
    resize: true,
    script_url : publicUrl + '/includes/tiny_mce/tiny_mce.js',
    theme : "advanced",
    file_browser_callback : "tinyBrowser",
    plugins : ",paste,inlinepopups,contextmenu,fullscreen,advimage,media,table",
    theme_advanced_buttons1 : "image,|, " +
    "bold,italic,underline,|," +
    "bullist,numlist,table,|," +
    "link,unlink,|,fontsizeselect",
    theme_advanced_buttons2 : "",
    theme_advanced_buttons3 : "",
    theme_advanced_font_sizes : "8px=8px,10px=10px,12px=12px,14px (default)=14px,16px=16px,18px=18px,24px=24px,32px=32px",
    theme_advanced_toolbar_location : "top",
    theme_advanced_toolbar_align : "left",
    theme_advanced_statusbar_location : "none"
  });

  $('textarea.tinymce-addclass').tinymce({
    script_url : publicUrl + '/includes/tiny_mce/tiny_mce.js',
    remove_script_host : false,
    convert_urls : true,
    resize: true,
    theme : "advanced",
    file_browser_callback : "tinyBrowser",
    plugins : "paste,inlinepopups,contextmenu,fullscreen,advimage,media,table,style",
    theme_advanced_buttons1 : "" +
    "copy,pastetext,pasteword,|,image,media,|,bold,italic,underline,forecolor,|," +
    "bullist,numlist,table,hr,|,styleselect,|," +
    "link,unlink,|,charmap,code,|,fullscreen",
    theme_advanced_buttons2 : "",
    theme_advanced_buttons3 : "",
    theme_advanced_toolbar_location : "top",
    theme_advanced_toolbar_align : "left",
    theme_advanced_statusbar_location : "none",
    content_css : publicUrl + "/includes/css/uses.css"
  });
});
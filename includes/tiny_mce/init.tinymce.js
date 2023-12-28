$().ready(function() {
  $('textarea.tinymce').tinymce({
    script_url : '/includes/tiny_mce/tiny_mce.js',
    theme : "advanced",
    plugins : "",
    theme_advanced_buttons1 : "bold,italic,underline,|,link,unlink,|,bullist,numlist",
    theme_advanced_buttons2 : "",
    theme_advanced_buttons3 : "",
    theme_advanced_buttons4 : "",
    theme_advanced_toolbar_location : "top",
    theme_advanced_toolbar_align : "left",
    theme_advanced_statusbar_location : false,
    theme_advanced_resizing : false
  });
});
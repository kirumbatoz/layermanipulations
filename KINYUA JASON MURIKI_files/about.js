(function ($) {
  $.fn.extend({
    popUp: function (options) {
      var defaults = {
        top: 100,
        window: 0.7,
        closeButton: null
      };
      var window = $('<div id=\'window_float\'></div>');
	
      $('body').append(window);
      options = $.extend(defaults, options);
      return this.each(function () {
        var windowObject = options;
        $(this).click(function (e) {
          var modal_id = $(this).attr('href');
          $('#window_float').click(function () {
            close_modal(modal_id)
          });
          $(windowObject.closeButton).click(function () {
            close_modal(modal_id)
          });
          var modal_height = $(modal_id).outerHeight();
          var modal_width = $(modal_id).outerWidth();
          $('#window_float').css({
            'display': 'block',
            opacity: 0
          });
          $('#window_float').fadeTo(200, windowObject.window);
          $(modal_id).css({
            'display': 'block',
            'position': 'fixed',
            'opacity': 0,
            'z-index': 11000,
            'left': 50 + '%',
            'margin-left': - (modal_width / 2) + 'px',
            'top': windowObject.top + 'px'
          });
          $(modal_id).fadeTo(200, 1);
          e.preventDefault()
        })
      });
      function close_modal(modal_id) {
        $('#window_float').fadeOut(200);
        $(modal_id).css({
          'display': 'none'
        })
      }
    }
  })
}) (jQuery);


$("#modal_about").popUp({top : 100, window : 0.4, closeButton: ".about_close" });


$(document).ready(function(){
  $("form").submit(function(e) {
    e.preventDefault();
  });
  
  var contact = $("#content-contact");
  var about = $("#content-about");
  var showContact = $('#getContact');
  var showAbout = $('#getAbout');

  showAbout.on("click", function(e){
    e.preventDefault();
    var newheight = about.height();
    $(about).css("display", "block");
	contact.hide();
    about.show();
    $(contact).stop().animate({
      "left": "-880px"
    }, 800, function(){ /* callback */ });
    
    $(about).stop().animate({
      "left": "0px"
    }, 800, function(){ $(contact).css("display", "none"); });
    
    $("#page").stop().animate({
      "height": newheight+"px"
    }, 550, function(){ /* callback */ });
  });
  

  showContact.on("click", function(e){
    e.preventDefault();
    var newheight = contact.height();
    $(contact).css("display", "block");
    about.hide();
	contact.show();
    $(contact).stop().animate({
      "left": "0px"
    }, 800, function() { /* callback */ });
    $(about).stop().animate({
      "left": "880px"
    }, 800, function() { $(about).css("display", "none"); });
    
    $("#page").stop().animate({
      "height": newheight+"px"
    }, 550, function(){ /* callback */ });
  });
});
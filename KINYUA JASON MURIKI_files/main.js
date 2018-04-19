//$('[data-toggle="dropdown"]').bootstrapDropdownHover();
      $.fn.bootstrapDropdownHover();
      //$('#dropdownMenu1').bootstrapDropdownHover();
      //$('.navbar [data-toggle="dropdown"]').bootstrapDropdownHover();

jQuery(document).ready(function($){
	var formModal = $('.cd-user-modal'),
		formLogin = formModal.find('#cd-login'),
		formSignup = formModal.find('#cd-signup'),
		formForgotPassword = formModal.find('#cd-reset-password'),
		formModalTab = $('.cd-switcher'),
		tabLogin = formModalTab.children('li').eq(0).children('a'),
		tabSignup = formModalTab.children('li').eq(1).children('a'),
		forgotPasswordLink = formLogin.find('.cd-form-bottom-message a'),
		backToLoginLink = formForgotPassword.find('.cd-form-bottom-message a'),
		mainNav = $('.navbar-collapse');

	mainNav.on('click', function(event){
		event.preventDefault();
		$(event.target).is(mainNav) && mainNav.children('ul').toggleClass('is-visible');
	});

	mainNav.on('click', '.cd-signup', signup_selected);
	mainNav.on('click', '.cd-signin', login_selected);

	formModal.on('click', function(event){
		
		if( $(event.target).is(formModal) || $(event.target).is('.cd-close-form') ) {
			formModal.removeClass('is-visible');
		}	
	});
	$(document).keyup(function(event){
    	if(event.which=='27'){
    		formModal.removeClass('is-visible');
	    }
    });

	formModalTab.on('click', function(event) {
		event.preventDefault();
		( $(event.target).is( tabLogin ) ) ? login_selected() : signup_selected();
	});

	$('.show-password').on('click', function(e){
		e.preventDefault();
		var togglePass= $(this),
			passwordField = togglePass.prev('input');
		
		
		( 'password' == passwordField.attr('type') ) ? passwordField.attr('type', 'text') : passwordField.attr('type', 'password');
		( 'Hide' == togglePass.text() ) ? togglePass.text('Show') : togglePass.text('Hide');
		passwordField.putCursorAtEnd();
	});
	forgotPasswordLink.on('click', function(event){
		event.preventDefault();
		forgot_password_selected();
	});

	backToLoginLink.on('click', function(event){
		event.preventDefault();
		login_selected();
	});

	function login_selected(){
		mainNav.children('ul').removeClass('is-visible');
		formModal.addClass('is-visible');
		formLogin.addClass('is-selected');
		formSignup.removeClass('is-selected');
		formForgotPassword.removeClass('is-selected');
		tabLogin.addClass('selected');
		tabSignup.removeClass('selected');
	}

	function signup_selected(){
		mainNav.children('ul').removeClass('is-visible');
		formModal.addClass('is-visible');
		formLogin.removeClass('is-selected');
		formSignup.addClass('is-selected');
		formForgotPassword.removeClass('is-selected');
		tabLogin.removeClass('selected');
		tabSignup.addClass('selected');
	}

	function forgot_password_selected(){
		formLogin.removeClass('is-selected');
		formSignup.removeClass('is-selected');
		formForgotPassword.addClass('is-selected');
	}
	formLogin.find('input[type="submit"]').on('click', function(event){
		event.preventDefault();
		formLogin.find('input[type="email"]').toggleClass('has-error').next('span').toggleClass('is-visible');
	});
	formSignup.find('input[type="submit"]').on('click', function(event){
		event.preventDefault();
		formSignup.find('input[type="email"]').toggleClass('has-error').next('span').toggleClass('is-visible');
	});


	if(!Modernizr.input.placeholder){
		$('[placeholder]').focus(function() {
			var input = $(this);
			if (input.val() == input.attr('placeholder')) {
				input.val('');
		  	}
		}).blur(function() {
		 	var input = $(this);
		  	if (input.val() == '' || input.val() == input.attr('placeholder')) {
				input.val(input.attr('placeholder'));
		  	}
		}).blur();
		$('[placeholder]').parents('form').submit(function() {
		  	$(this).find('[placeholder]').each(function() {
				var input = $(this);
				if (input.val() == input.attr('placeholder')) {
			 		input.val('');
				}
		  	})
		});
	}

});

jQuery.fn.putCursorAtEnd = function() {
	return this.each(function() {
    
    	if (this.setSelectionRange) {
      		var len = $(this).val().length * 2;
      		this.focus();
      		this.setSelectionRange(len, len);
    	} else {
      		$(this).val($(this).val());
    	}
	});
};

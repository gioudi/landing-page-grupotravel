// When the menu button is click then open the nav menu
$('#menu-button').click(function() {
     $(this).toggleClass('change');
     $(this).attr('aria-expanded', $(this).attr('aria-expanded') === 'true' ? 'false' : 'true');
     $('.nav-links').toggleClass('nav-open');
});

// Close menu with Escape key
$(document).keydown(function(e) {
     if (e.key === 'Escape' || e.keyCode === 27) {
          if ($('#menu-button').hasClass('change')) {
               $('#menu-button').removeClass('change').attr('aria-expanded', 'false');
               $('.nav-links').removeClass('nav-open');
          }
     }
});

/* If the window is resized and the class change has already been
applied, then toggle it to avoid an issue with the menu button disappearing */
$(window).resize(function() {
     if ($(window).width() > 768) {
          if ($('.nav-links').hasClass('nav-open')) {
               $('#menu-button').toggleClass('change').attr('aria-expanded', 'false');
               $('.nav-links').toggleClass('nav-open');
          }
     }
});

// Contact form handler
$('#contact-form').on('submit', function(e) {
     e.preventDefault();
     var form = $(this);
     var formData = form.serialize();

     // Show success message
     form.addClass('form-sent');
     form.find('.form-success').addClass('visible');

     // Reset form after 3 seconds
     setTimeout(function() {
          form[0].reset();
          form.removeClass('form-sent');
          form.find('.form-success').removeClass('visible');
     }, 3000);
});

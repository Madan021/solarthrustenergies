(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        loop: true,
        nav: false,
        dots: true,
        items: 1,
        dotsData: true,
    });
    
    $('#contact-form').on('submit', function(event) {
        event.preventDefault();

        const btn = $('#submit');
        const originalText = btn.text();
        
        // 1. Set the current time for the {{time}} variable
        const now = new Date();
        const formattedTime = now.toLocaleString('en-US', { 
            dateStyle: 'medium', 
            timeStyle: 'short' 
        });
        $('#time').val(formattedTime);

        // 2. Change button UI
        btn.text('Sending...');
        btn.prop('disabled', true);

        const serviceID = 'default_service';
        const templateID = 'template_pbhzdks';

        // 'this' refers to the form element
        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                btn.text(originalText);
                btn.prop('disabled', false);
                alert('Sent!');
                $('#contact-form')[0].reset();
            }, (err) => {
                btn.text(originalText);
                btn.prop('disabled', false);
                alert('Send failed: ' + JSON.stringify(err));
            });
    });

    $('#quote-form').on('submit', function(event) {
        event.preventDefault();

        const btn = $('#app-btn');
        const originalText = btn.text();

        // 1. Capture individual values
        const mobile = $('#mobile').val();
        const service = $('#service').find(":selected").text();
        const note = $('#note').val();

        // 2. Combine them into the single {{message}} variable
        const fullMessage = `Service: ${service}\nMobile: ${mobile}\n\nNote: ${note}`;
        $('#combined_message').val(fullMessage);

        // 3. Set the {{time}} variable
        const now = new Date();
        $('#appointment_time').val(now.toLocaleString());

        // 4. UI Feedback
        btn.text('Sending...');
        btn.prop('disabled', true);

        // 5. Send using EmailJS
        emailjs.sendForm('default_service', 'template_pbhzdks', this)
            .then(() => {
                btn.text(originalText);
                btn.prop('disabled', false);
                alert('Quote Request Sent!');
                $('#quote-form')[0].reset();
            }, (error) => {
                btn.text(originalText);
                btn.prop('disabled', false);
                alert('Error: ' + JSON.stringify(error));
            });
    });
})(jQuery);


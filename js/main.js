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

        const btn = $('#contact-btn');
        const originalText = btn.text();
        
        // 1. Prepare the data
        const subject = $('#subject').val();
        const body = $('#message_body').val();
        
        // 2. Combine Subject and Body into the {{message}} tag
        const fullMessage = `Subject: ${subject}\n\n${body}`;
        
        $('#contact_message').val(fullMessage);
        $('#contact_time').val(new Date().toLocaleString());

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

        const btn = $('#button');
        btn.value = 'Sending...';

        // 1. Get values from the extra fields
        const mobile = document.getElementById('mobile').value;
        const service = document.getElementById('service').value;
        const note = document.getElementById('note').value;

        // 2. Format them into one string for the {{message}} variable
        const formattedMessage = `Service: ${service}\nMobile: ${mobile}\nNote: ${note}`;

        // 3. Inject that string and the current time into the hidden inputs
        document.getElementById('combined_message').value = formattedMessage;
        document.getElementById('appointment_time').value = new Date().toLocaleString();

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


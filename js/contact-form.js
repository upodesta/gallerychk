/**
 * Contact Form Handler
 * Handles form validation and submission
 */

(function($) {
    "use strict";

    // Form validation and submission
    $("#contactForm").on("submit", function(e) {
        e.preventDefault();
        
        var form = $(this);
        var submitButton = form.find('button[type="submit"]');
        var successDiv = $("#success");
        
        // Clear previous messages
        successDiv.html("");
        form.find('.help-block').html("");
        
        // Get form data
        var formData = {
            name: $("#name").val().trim(),
            email: $("#email").val().trim(),
            phone: $("#phone").val().trim(),
            subject: $("#subject").val().trim(),
            message: $("#message").val().trim()
        };
        
        // Basic validation
        var isValid = true;
        var errorMessages = [];
        
        if (!formData.name) {
            isValid = false;
            $("#name").closest('.form-group').find('.help-block').html("Please enter your name.");
            errorMessages.push("Name is required");
        }
        
        if (!formData.email) {
            isValid = false;
            $("#email").closest('.form-group').find('.help-block').html("Please enter your email.");
            errorMessages.push("Email is required");
        } else if (!isValidEmail(formData.email)) {
            isValid = false;
            $("#email").closest('.form-group').find('.help-block').html("Please enter a valid email address.");
            errorMessages.push("Valid email is required");
        }
        
        if (!formData.subject) {
            isValid = false;
            $("#subject").closest('.form-group').find('.help-block').html("Please enter a subject.");
            errorMessages.push("Subject is required");
        }
        
        if (!formData.message) {
            isValid = false;
            $("#message").closest('.form-group').find('.help-block').html("Please enter a message.");
            errorMessages.push("Message is required");
        }
        
        if (!isValid) {
            successDiv.html('<div class="alert alert-danger"><strong>Error!</strong> Please fill in all required fields correctly.</div>');
            return false;
        }
        
        // Disable submit button and show loading state
        submitButton.prop('disabled', true).html('Sending...');
        form.addClass('form-loading');
        
        // Simulate form submission (replace with actual backend endpoint)
        // For demonstration, we'll use a mailto link as fallback
        setTimeout(function() {
            // Create mailto link with form data
            var mailtoLink = 'mailto:info@hassan.com.bd' +
                '?subject=' + encodeURIComponent(formData.subject) +
                '&body=' + encodeURIComponent(
                    'Name: ' + formData.name + '\n' +
                    'Email: ' + formData.email + '\n' +
                    'Phone: ' + formData.phone + '\n\n' +
                    'Message:\n' + formData.message
                );
            
            // Open mailto link
            window.location.href = mailtoLink;
            
            // Show success message
            successDiv.html('<div class="alert alert-success"><strong>Success!</strong> Your message has been prepared. Your email client should open shortly.</div>');
            
            // Reset form
            form[0].reset();
            
            // Re-enable submit button
            submitButton.prop('disabled', false).html('Send Message');
            form.removeClass('form-loading');
            
            // Scroll to success message
            $('html, body').animate({
                scrollTop: successDiv.offset().top - 100
            }, 500);
            
        }, 1000);
        
        return false;
    });
    
    // Email validation helper
    function isValidEmail(email) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    }
    
    // Clear error message on input focus
    $("#contactForm input, #contactForm textarea").on("focus", function() {
        $(this).closest('.form-group').find('.help-block').html("");
    });
    
    // Optional: Add character counter for message textarea
    $("#message").on("input", function() {
        var maxLength = 1000;
        var currentLength = $(this).val().length;
        var remaining = maxLength - currentLength;
        
        if (remaining < 0) {
            $(this).val($(this).val().substring(0, maxLength));
            remaining = 0;
        }
    });
    
})(jQuery);

/**
 * Alternative: FormSubmit.co Integration
 * Uncomment this section if you want to use FormSubmit.co service
 * Replace 'YOUR_EMAIL' with your actual email address
 */

/*
(function($) {
    "use strict";
    
    $("#contactForm").attr("action", "https://formsubmit.co/info@hassan.com.bd");
    $("#contactForm").attr("method", "POST");
    
    // Add hidden fields for FormSubmit.co configuration
    $("#contactForm").append('<input type="hidden" name="_subject" value="New Contact Form Submission">');
    $("#contactForm").append('<input type="hidden" name="_captcha" value="false">');
    $("#contactForm").append('<input type="hidden" name="_template" value="table">');
    $("#contactForm").append('<input type="text" name="_honey" style="display:none">');
    
    // Optional: Add success page redirect
    // $("#contactForm").append('<input type="hidden" name="_next" value="https://hassan.com.bd/thank-you.html">');
    
})(jQuery);
*/

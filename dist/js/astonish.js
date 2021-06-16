

$(function () {
    'use strict';
    var $window = $(window); 

    
    function astonish() {
        /* If the window width is less than 748 than it is most likely a mobile device and
        animations are turned off for better mobile performance */
        if ($window.width() > 748) {
            var window_top = $window.scrollTop(), // Top of the screen
                window_bottom = $window.height() * 0.8 + window_top; /* Bottom of screen with a little of padding from the window's height the 0.8 controls the
                                                                        amount of padding and can be re-adjusted to trigger animations at a higher or lower
                                                                        window scroll position. */

            /* Reveal animation will look for all elements that do not have the
            animated class and cycle through each one as if it were a for loop */
            $(".astonish:not(.animated)").each(function () {
                var $this = $(this), // In this instance $this refers to any object with a class of astonish
                    object_top = $this.offset().top, // The top part of any object
                    object_bottom = $this.outerHeight() + object_top, // Bottom part of any object
                    animation = $this.data("animation"); /* Gets the data-animation taget attribute from html regarding the type of animation
                                                            that is going to be played. This variable is later inserted alongside the 'animated'
                                                            class in order for the animation to play.

                /* If the window bottom is greater than the top of the object and the window top is greater than the object's bottom, than apply the following */
                if ((window_bottom > object_top) && (window_top < object_bottom)) {
                    // Declaring variables
                    var delay,
                        animationDuration;
                    // Get the data-delay attribute, if not present a default will be given
                    if (typeof $this.data("delay") !== 'undefined') {
                        delay = $this.data("delay");
                    } else {
                        delay = 0; // Default delay
                    }
                    // Get the data-duration attribute, if not present a default will be given
                    if (typeof $this.data("duration") !== 'undefined') {
                        animationDuration = $this.data("duration");
                    } else {
                        animationDuration = 1; // Default duration
                    }
                    // If one or both have been set, display animation according to those user defined values
                    if (delay > 0 || animationDuration > 0) {
                        window.setTimeout(function () {
                            $this.css({
                                "moz-animation-duration": animationDuration + 's',
                                "webkit-animation-duration": animationDuration + 's',
                                "animation-duration": animationDuration + 's'
                            });
                            /* In order for the animate.css to work an element must have the 'animated' class and the name of the animation class i.e, "fadeInUP", "fadeInDown", etc. The animation attribute is being passed in from the html code allowing this to function dynamically without explicitly stating it in this code */
                            $this.addClass('animated ' + animation);
                        }, delay * 1000);
                    } else {
                        // If not defined, the default animate.css will take over with default delay and duration
                        $this.addClass('animated ' + animation);
                    }
                }
            });
        }
    }
    /* The window on scroll event fires multiple times and can be
    very taxing on the browser, therefore a timeout is used in order
    to lessen the impact of firing the same event multiple times.
    Either method can be used to lessen the effect, however it will interfere
    with the speed in which the function will fire and it is not recommended to
    make it too slow or it will not match the user's scroll speed */
    /*$window.on('scroll', function () {
        setTimeout(function () {
            astonish();
        }, 1000);
    });*/
    var timeOut;

    $window.scroll(function () {
        if (timeOut) {
            // Clear timeOut if there already is one
            clearTimeout(timeOut);
            timeOut = null;
        }
        timeOut = setTimeout(astonish, 10);
        //console.log("The time it takes for astonish to fire");
    });
});

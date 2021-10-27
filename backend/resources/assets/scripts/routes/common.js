import easydropdown from "easydropdown";

export default {
    init() {
        // JavaScript to be fired on all pages
        
        /**
         * A basic function to scroll to a specific element
         * @param elm
         * @param duration The duration for the scroll animation to execute
         */
        const scrollTo = (elm, duration) => {
            elm.preventDefault();
            const scrollToElm = elm.currentTarget.getAttribute("href");
            
            if (scrollToElm.length && document.querySelector(scrollToElm) !== null) {
                $("html, body").animate({scrollTop: $(scrollToElm).offset().top}, parseInt(duration));
            }
        };
        
        // Scroll To
        (function() {
            $(".scrollto").on("click", elm => scrollTo(elm, 1000));
        })();
        
        easydropdown.all();
    },
    finalize() {
        // JavaScript to be fired on all pages, after page specific JS is fired
    },
};

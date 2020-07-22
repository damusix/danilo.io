import css from 'bianco.css';
import anime from 'animejs';

import { state } from './index.js';

const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                const elem = entry.target;
                const { animeConfig } = elem;

                if (animeConfig.ran) {
                    return;
                }

                anime({
                    targets: elem,
                    opacity: [0, 1],
                    easing: 'linear',
                    duration: 1000,
                    delay: 0,
                    ...animeConfig
                });

                animeConfig.ran = true;
            }
        });
    },
    {
        // root: null,
        rootMargin: '0px',
        threshold: 0.5
    }
)

const observedElements = new Set();

export const observeElement = (el, animeConfig) => {

    if (state.print) {
        return;
    }

    if (!observedElements.has(el)) {

        el.animeConfig = animeConfig || {};
        observedElements.add(el);
        observer.observe(el);
        css.set(el, { opacity: 0 });
    }
};



export const debounce = function(func, wait, immediate) {
    var timeout;
    return function() {

        var context = this, args = arguments;

        var later = function() {

            timeout = null;
            if (!immediate) func.apply(context, args);
        };

        var callNow = immediate && !timeout;

        clearTimeout(timeout);

        timeout = setTimeout(later, wait);

        if (callNow) func.apply(context, args);

        // Returns option to cancel
        return {
            cancel: function() {

                clearTimeout(timeout);
            }
        }
    };
};

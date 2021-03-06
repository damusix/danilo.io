import { $ } from 'bianco';
import events from 'bianco.events';
import attr from 'bianco.attr';
import anime from 'animejs';

const store = {

    offset: () => $('[is="app-nav"]')[0].clientHeight || 50,
    duration: 600,
    root: [document.body, document.documentElement],
    easing: 'easeOutCubic',
    query: 'a[scroll]',

    bind() {

        const elements = $(store.query);

        events.add(elements, 'click', store.onClick);

        attr.remove(elements, 'scroll');

        events.add(window, 'wheel', store.pauseScrollAnimation);
        events.add(window, 'touchstart', store.pauseScrollAnimation);
    },

    onClick(e) {

        const link = e.currentTarget;

        const scrollTo = attr.get(link, 'to');
        const href = attr.get(link, 'href') || '';

        const scrollOffset = attr.get(link, 'offset') || 0;

        const canScroll = href[0] === '#' || scrollTo;

        if (!canScroll) return

        e.preventDefault()

        if (!scrollTo) {

            if (href === '#') {
                store.scrollTo(0)
            }
            else {
                store.scrollTo(href, scrollOffset)
            }

            window.history.replaceState(null, null, href);
        }
        else {
            store.scrollTo(scrollTo, scrollOffset)
        }

    },

    pauseScrollAnimation() {
        store.scrollAnimation && store.scrollAnimation.pause()
    },

    scrollTo(selectorOrNumber, scrollOffset) {
        const { root, offset, duration, easing } = store
        let scrollTop = 0

        if (typeof selectorOrNumber === 'number') {

            scrollTop = selectorOrNumber
        }
        else {
            const element = $(selectorOrNumber)[0];
            scrollTop = window.pageYOffset + element.getBoundingClientRect().top
        }

        scrollTop = scrollTop - (scrollOffset * 1) - offset()

        if (scrollTop < 0) {
            scrollTop = 0
        }

        // scrollTop = scrollTop - offset >= offset ? scrollTop - offset : 0
        store.scrollAnimation = anime({
            targets: root,
            scrollTop,
            duration,
            easing,
        })
    }
};

export default store

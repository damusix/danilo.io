import * as riot from 'riot';
import erre from 'erre';

import Actions from './actions';
import App from './app.riot';
import Navigation from './components/nav.riot';
import Footer from './components/footer.riot';

let state = {
    repos: [],
    gists: [],
    heading: 'Danilo Alonso'
};

const stream = erre(function (update) {

    state = {
        ...state,
        ...update
    };

    return state;
});

const actions = Actions(stream);


riot.register('app-nav', Navigation);
riot.register('app-footer', Footer);

const mountApp = riot.component(App);


const app = mountApp(document.getElementById('root'), {
    stream,
    actions,
    state
})

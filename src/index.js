import * as riot from 'riot';
import erre from 'erre';

import Actions from './actions';
import App from './app.riot';
import './components';

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

riot.install(function (component) {

    component.state = state;
    component.actions = actions;

    // console.log(component)
    stream.on.value((updated) => component.update(updated));
});

const mountApp = riot.component(App);

const app = mountApp(document.getElementById('root'), {
    stream,
    actions,
    state
});

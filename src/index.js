import * as riot from 'riot';
import erre from 'erre';
import events from 'bianco.events';

import './app.sass';

import { debounce } from './utils';

import Actions from './actions';
import App from './app.riot';
import './components';

import Data from './data.json'

let state = {
    repos: [],
    gists: [],
    packages: [],
    heading: 'Danilo Alonso',
    isMobile: null,
    data: Data
};

const stream = erre(function (update) {

    state = {
        ...state,
        ...update
    };

    return state;
});

const actions = Actions(stream);

actions.screenChecks();

events.add(global, 'resize', debounce(actions.screenChecks, 250));

riot.install(function (component) {

    component.state = state;
    component.actions = actions;

    // console.log(component)
    stream.on.value((updated) => component.update(updated));
});

const mountApp = riot.component(App);

mountApp(document.getElementById('root'), {
    stream,
    actions,
    state
});

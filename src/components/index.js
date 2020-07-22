import * as riot from 'riot';

import Navigation from './nav/component.riot';
import Header from './header/component.riot';
import Footer from './footer/component.riot';
import About from './about/component.riot';
import Experience from './experience/component.riot';
import Skills from './skills/component.riot';
import Gists from './work/gists.riot';
import Repos from './work/repos.riot';
import Packages from './work/packages.riot';
import Work from './work/container.riot';

import Ratings from './ratings/container.riot';
import Stars from './ratings/stars.riot';

riot.register('app-nav', Navigation);
riot.register('site-header', Header);
riot.register('app-footer', Footer);
riot.register('about', About);
riot.register('header', Header);
riot.register('gists', Gists);
riot.register('repos', Repos);
riot.register('packages', Packages);
riot.register('experience', Experience);
riot.register('skills', Skills);
riot.register('work', Work);
riot.register('rating', Ratings);
riot.register('stars', Stars);


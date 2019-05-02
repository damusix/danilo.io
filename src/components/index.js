import * as riot from 'riot';

import Navigation from './nav.riot';
import Footer from './footer.riot';
import Gists from './gists.riot';
import Repos from './repos.riot';

riot.register('app-nav', Navigation);
riot.register('app-footer', Footer);
riot.register('gists', Gists);
riot.register('repos', Repos);


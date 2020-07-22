import ComponentActions from './components/actions';
import Api from './api';
import viewport from 'bianco.viewport';

import PackagesFallback from './data/packages.json';
import ReposFallback from './data/repos.json';
import GistsFallback from './data/gists.json';

export default (stream) => {

    const tryCatchFallback = async (fn, fallback) => {

        try {
            const { data } = await fn();

            if (!data) {

                return fallback;
            }

            return data
        }
        catch (e) {

            console.warn('Could not fetch from 3rd party resource. Using fallback instead.');
            console.warn(e);
            return fallback;
        }
    }

    return {

        getRepos: async () => {

            const data = await tryCatchFallback(
                Api.getRepos,
                {
                    repos: ReposFallback,
                    rateLimited: { repos: true }
                }
            );

            if (data.rateLimited)  {
                stream.push(data);
            }
            else {
                stream.push({ repos: data });
            }
        },
        getGists: async () => {

            const data = await tryCatchFallback(
                Api.getGists,
                {
                    gists: GistsFallback,
                    rateLimited: { gists: true }
                }
            );

            if (data.rateLimited)  {
                stream.push(data);
            }
            else {
                stream.push({ gists: data });
            }
        },
        getPackages: async () => {

            const data = await tryCatchFallback(
                Api.getPackages,
                {
                    packages: GistsFallback.results,
                    rateLimited: { packages: true }
                }
            );

            if (data.rateLimited)  {
                stream.push(data);
            }
            else {
                stream.push({ packages: data.results });
            }
        },
        screenChecks: () => {

            stream.push({
                isMobile: viewport.documentWidth() < 16 * 40
            });
        },
        ...ComponentActions(stream)
    };
};

import ComponentActions from './components/actions';
import Api from './api';
import viewport from 'bianco.viewport';

const width = viewport.documentWidth();

export default (stream) => ({

    getRepos: async () => {

        const { data } = await Api.getRepos();
        stream.push({ repos: data });
    },
    getGists: async () => {

        const { data } = await Api.getGists();
        stream.push({ gists: data });
    },
    getPackages: async () => {

        const { data } = await Api.getPackages();
        stream.push({ packages: data.results });
    },
    screenChecks: () => {

        stream.push({
            isMobile: viewport.documentWidth() < 16 * 40
        });
    },
    ...ComponentActions(stream)
})
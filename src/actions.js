import Api from './api';

export default (stream) => ({

    getRepos: async () => {

        const { data } = await Api.getRepos();
        stream.push({ repos: data });
    },
    getGists: async () => {

        const { data } = await Api.getGists();
        stream.push({ gists: data });
    }
})
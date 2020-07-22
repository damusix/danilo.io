import axios from 'axios';

const api = axios.create({

    baseURL: 'https://api.github.com',
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/vnd.github.inertia-preview+json'
    }
});

const username = 'damusix';

const urls = {

    gists: `/users/${username}/gists`,
    repos: `/users/${username}/repos`,
};


export default {

    getGists: () => api.get(urls.gists),
    getRepos: () => api.get(urls.repos),
    getPackages: () => axios.get('https://npmsearch.com/query?q=author:damusix')
}
const username = 'damusix';
const baseUrl = 'https://api.github.com';

const urls = {

    gists: `/users/${username}/gists`,
    projects: `/users/${username}/projects`,
};

const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/vnd.github.inertia-preview+json'
};


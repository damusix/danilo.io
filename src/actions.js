
export default (stream) => ({

    getRepos: () => {

        const repos = [{ name: 'myrepo' }]
        stream.push({ repos });
    },
    getGists: () => {

        const gists = [{ name: 'mygist' }]
        stream.push({ gists });
    }
})
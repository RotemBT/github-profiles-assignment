const axios = require('axios');
const options = {
    headers: {
        Accept: 'application/vnd.github+json',
        "X-GitHub-Api-Version": "2022-11-28",
        Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
    }
};
const GITHUB_SERVICE_URL = "https://api.github.com";
const getGithubProfiles = async (req, res) => {
    const { q, page } = req.query;
    try {
        const response = await axios.get(`${GITHUB_SERVICE_URL}/search/users?q=${q}${page ? `&page=${page}` : ''}`, options);
        if (!response?.data?.items) {
            return res.status(404).json({ message: 'No user found.' });
        }
        const data = await Promise.all(response?.data?.items.map(user => axios.get(`${GITHUB_SERVICE_URL}/users/${user.login}`, options)));

        const usersData = data?.map(user => {
            const userData = user.data;
            if (!userData) return;
            return {name: userData.login, img:userData.avatar_url, publicRepos: userData.public_repos}
        });
        res.json(usersData.filter(Boolean));
    } catch (err) {
        res.status(err.statusCode).json({ message: err.message });
    }
};

module.exports = {
    getGithubProfiles,
}
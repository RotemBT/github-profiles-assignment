const axios = require('axios');

const GITHUB_SERVICE_URL = "https://api.github.com";
const options = {
    headers: {
        Accept: 'application/vnd.github+json',
        "X-GitHub-Api-Version": "2022-11-28",
        Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
    }
};

const getGithubUsers = async (req, res) => {
    try {
        const urlSearchParams = new URLSearchParams(req.query);
        const params = urlSearchParams.toString();
        const response = await axios.get(
            `${GITHUB_SERVICE_URL}/search/users?${params}`,
            options
        );
        const data = await Promise.all(
            response?.data?.items.map(user => axios.get(
                `${GITHUB_SERVICE_URL}/users/${user.login}`,
                options
            )));

        const usersData = data?.map(user => {
            const userData = user.data;
            if (!userData) return;
            return {
                name: userData.login,
                img:userData.avatar_url,
                publicRepos: userData.public_repos
            };
        }).filter(Boolean);
        res.json(usersData);
    } catch (err) {
        res.status(err.status).json({ message: err.message });
    }
};

module.exports = {
    getGithubUsers,
}
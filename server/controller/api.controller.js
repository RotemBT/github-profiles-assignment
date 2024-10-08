const axios = require('axios');
const options = {
    headers: {
        Accept: 'application/vnd.github+json',
        "X-GitHub-Api-Version": "2022-11-28",
        Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
    }
};

const getGithubProfiles = async (req, res) => {
    const { search ="sharon" } = req.query;
    try {
        const response = await axios.get(`https://api.github.com/search/users?q=${search}`, options);
        const linkHeader = response.headers.link;
        const hasNext = linkHeader && linkHeader.includes(`rel=\"next\"`);
        const data = response?.data?.items.map(item => ({ name: item.login, img: item.avatar_url }))
        res.json({
            hasNext,
            totalCount: response.data.total_count,
            data,
        });
    } catch (err) {
        res.status(err.statusCode).json({ message: err.message });
    }
};

module.exports = {
    getGithubProfiles,
}
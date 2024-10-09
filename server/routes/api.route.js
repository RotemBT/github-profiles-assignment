const cors = require("cors");
const { getGithubProfiles } = require("../controller/api.controller");

module.exports = (app) => {
    app.use(cors());
    app.get('/api/search-users', getGithubProfiles);
};

const cors = require("cors");
const { getGithubUsers } = require("../controller/api.controller");

module.exports = (app) => {
    app.use(cors());
    app.get('/api/search-users', getGithubUsers);
};

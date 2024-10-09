const express = require('express');

require('dotenv').config();

const app = express();
const port = 3010;

require('./routes/api.route')(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

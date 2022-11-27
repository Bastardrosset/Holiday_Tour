require('dotenv').config();
const mongoose = require('./service/data_base');

const dotenv = require('dotenv');
const app = require('./app');


dotenv.config({
    path: './service/config.env'
});


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`App running on port ${port}...`);
})
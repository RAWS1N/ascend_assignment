// config.js

import {Sequelize} from 'sequelize'

const sequelize = new Sequelize({
    database: 'ascend',
    username: 'postgres',
    password: 'password',
    host: 'localhost',
    port: 5432, // Default PostgreSQL port
    dialect: 'postgres',
    logging: false, // Disable logging
});


export default sequelize



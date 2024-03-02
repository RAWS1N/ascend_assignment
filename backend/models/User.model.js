

import { DataTypes } from 'sequelize'
import sequelize from '../config/config.js'
import List from './List.model.js';

const User = sequelize.define('User', {
    // Define attributes (columns)
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password : {
        type : DataTypes.STRING,
        allowNull : false,
    }
});

// User.hasMany(List, {
//     onDelete: 'CASCADE', // Delete tasks associated with a user when the user is deleted
//     foreignKey: {
//         allowNull: false,
//         name: 'userId', // This is the foreign key column name in the Task table
//     },
// });

export default User

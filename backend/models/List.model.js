import { DataTypes } from 'sequelize'
import sequelize from '../config/config.js'
import User from './User.model.js'



const List = sequelize.define("List",{
    title : {
        type : DataTypes.STRING,
        allowNull : false
    }
})


// List.hasMany(Task, {
//     onDelete: 'CASCADE', 
//     foreignKey: {
//         allowNull: false,
//         name: 'listId', 
//     },
// });
List.belongsTo(User, { foreignKey: 'userId' });


export default List
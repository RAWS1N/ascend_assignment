import { DataTypes } from 'sequelize'
import sequelize from '../config/config.js'
import List from './List.model.js'


const Task = sequelize.define("Task", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    completed : {
        type : DataTypes.BOOLEAN,
        defaultValue : false
    }
})


List.hasMany(Task, {
    onDelete: 'CASCADE', 
    foreignKey: {
        allowNull: false,
        name: 'listId', 
    },
});
Task.belongsTo(List, { foreignKey: 'listId' });


export default Task
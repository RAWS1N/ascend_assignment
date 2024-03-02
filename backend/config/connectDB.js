import sequelize from "./config.js";
import { app } from "../app.js";


async function connectDB() {
    try {
        // Connect to the database
        await sequelize.authenticate();
        console.log('Connected to the database.');

        // Sync models with database
        // await sequelize.sync({force:true});
        await sequelize.sync();
        console.log('Models synced with database.');

        // Start the server
        app.listen(process.env.PORT, () => {
            console.log('Server running on port:'+process.env.PORT);
        });
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
}


export default connectDB
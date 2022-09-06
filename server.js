const app = require("./app");
const config = require("./app/config");
const MongoDB = require("./app/utils/mongodb.util");
const contactService = require("./app/services/contact.service");

async function startServer(){
    try {
        await MongoDB.connect(config.db.uri);
        console.log("Connected to the database!!");

        const PORT = config.app.port;
        app.listen(PORT, ()=>{
        console.log(`Server is running on Port ${PORT}.`);
      });
    } catch (error) {
        console.log("Can't connect to the database!", error);
        process.exit();
    }
}

startServer();
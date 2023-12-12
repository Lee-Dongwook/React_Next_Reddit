import { AppDataSource } from "./data-source"

AppDataSource.initialize().then(async () => {
    console.log("database initialized")
}).catch(error => console.log(error))

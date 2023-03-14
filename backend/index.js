const app = require("./app");
const connectDatabase = require("./config/database");


connectDatabase();

app.listen(8080, () => {
    console.log(`Server Running on PORT http://localhost:8080`);
})
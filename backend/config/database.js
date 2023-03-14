const mongoose = require("mongoose");

const connectDatabase = async () => {
    await mongoose.connect(
        "mongodb+srv://Rajarajan:E6luWiRaguszbjo4@cluster0.qejhtzv.mongodb.net/CRUD?retryWrites=true&w=majority",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    ).then((data) => {
        console.log(`MongoDb connected with server: ${data.connection.host}`);
    })
}

module.exports = connectDatabase;
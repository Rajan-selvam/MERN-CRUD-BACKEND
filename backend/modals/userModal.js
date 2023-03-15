const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name:{
        type: String,
    },
    userName:{
        type: String,
    },
    mobileNumber:{
        type: Number,
    },
    password:{
        type: String,
    },
    email:{
        type: String,
    },
    dateOfBirth:{
        type: String,
    },
});

userSchema.methods.getJWTToken = function () {
    return jwt.sign({id: this._id}, "RajanMERNTask", {
        expiresIn: "2d"
    })
}

userSchema.methods.comparePassword = async function (enteredPassword) {
    return enteredPassword === this.password;
}

module.exports = mongoose.model("User", userSchema);
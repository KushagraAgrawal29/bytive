const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    gravatar: {
        type: String,
    },
    techStack: [String],
    location: {
        type: String,
    },
    fieldOfInterest: {
        type: String,
        enum: ["Remote","Internship","Contract","Full Time","Unavailiable"],
        required: true,
    },
    seeking: {
        type: String,
        enum: ["Remote","Internship","Contract","Full Time"],
        required: true,
    },
    bio: {
        type: String,
        required: true,
    },
    githubUrl: {
        type: String,
    },
    twiterUrl: {
        type: String,
    },
    websiteUrl: {
        type: String,
    },
    linkedUrl: {
        type: String,
    }
})

const User = mongoose.model("User",userSchema);
module.exports = User;
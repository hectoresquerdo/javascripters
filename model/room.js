const mongoose = require("mongoose")

const roomSchema = new mongoose.Schema({
    room: {
        type: String,
        required: true,
    },
    users: {
        type: Number,
        required: true,
    },
})

const room = mongoose.model("room", roomSchema)

module.exports = room

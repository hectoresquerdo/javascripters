const path = require("path")
const Score = require("../model/score")
const Room = require("../model/room")
const User = require("../model/user")

module.exports = {
    getRooms: async (req, res) => {
        const rooms = await Room.find()
        const data = rooms.map((room) => room.toObject())
        res.json(data)
    },
    getScores: async (req, res) => {
        const scores = await Score.find().sort({ wins: -1 })
        const data = scores.map((score) => score.toObject())
        res.json(data)
    },
    getUsers: async (req, res) => {
        const users = await User.find()
        const data = users.map((user) => "User: " + user.userName)
        res.json(data)
    },
}

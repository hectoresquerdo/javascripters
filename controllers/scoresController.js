const path = require("path")
const Score = require("../model/score")

module.exports = {
    get: async (req, res) => {
        const scores = await Score.find().sort({ wins: -1 })
        const data = scores.map((score) => score.toObject())
        res.json(data)
    },
}

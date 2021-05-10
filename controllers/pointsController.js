const path = require("path")
const Score = require("../model/score")

module.exports = {
    get: (req, res) => {
        res.sendFile(path.join(__dirname, "../views", "scores.html"))
    },
}

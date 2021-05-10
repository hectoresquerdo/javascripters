const path = require("path")
const Score = require("../model/score")
const Room = require("../model/room")

module.exports = {
    post: (req, res) => {
        const username = req.body.champion
        const points = req.body.wins
        const roomFor = req.body.roomFor

        if (username) {
            Score.findOne({ userName: username }, function (err, score) {
                if (err) {
                    console.log(err)
                    return res.status(500).end()
                }
                if (score) {
                    Score.findOneAndUpdate(
                        { userName: username },
                        {
                            $inc: {
                                wins: 1,
                            },
                        },
                        function (err, score) {
                            if (err) {
                                console.log(err)
                                return res.status(500).end()
                            }
                            if (score) {
                                res.status(200)
                                res.json({ Champion: username, Score: score })
                                res.end()
                            }
                        }
                    )
                }
                if (!score) {
                    Score.create(
                        { userName: username, wins: points },
                        function (err, score) {
                            if (err) {
                                console.log(err)
                                return res.status(500).end()
                            }
                            if (score) {
                                res.status(200)
                                res.json({ Champion: username, Score: score })
                                res.end()
                            }
                        }
                    )
                }
            })
        }
        console.log(username)

        Room.findOneAndUpdate(
            { room: roomFor },
            { users: 0 },
            function (err, room) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(room.room + "room restarted!")
                    res.json("Room empty, ready to be played!")
                }
            }
        )
        res.status(200)
        res.end()
    },
}

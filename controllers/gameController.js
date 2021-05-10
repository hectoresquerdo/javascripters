const path = require("path")
const Room = require("../model/room")

module.exports = {
    get: (req, res) => {
        res.sendFile(path.join(__dirname, "../views", "game.html"))
    },
    post: (req, res) => {
        let roomFrom = req.body.roomFrom
        let roomFor = req.body.roomFor

        Room.findOne({ room: roomFrom }, function (err, room) {
            if (err) {
                console.log(err)
                return res.status(500).end()
            }
            if (room.users > 0) {
                Room.findOneAndUpdate(
                    { room: roomFrom },
                    {
                        $inc: {
                            users: -1,
                        },
                    },
                    function (err, room) {
                        if (err) {
                            console.log(err)
                            return res.status(500).end()
                        }
                        if (room) {
                            res.status(202)
                            res.end()
                        }
                    }
                )
            }
        })
        Room.findOneAndUpdate(
            { room: roomFor },
            { $inc: { users: 1 } },
            function (err, room) {
                if (err) {
                    console.log(err)
                } else {
                    if (room.users == 0) {
                        let player = {
                            player: room.users + 1,
                        }
                        res.status(202)
                        res.json(player)
                    }
                    if (room.users == 1) {
                        let player = {
                            player: room.users + 1,
                        }
                        res.status(202)
                        res.json(player)
                    }
                    if (room.users == 2) {
                        res.status(401)
                        res.end()
                    }
                }
            }
        )
    },
}

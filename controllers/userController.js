const path = require("path")
const User = require("../model/user")

module.exports = {
    get: (req, res) => {
        res.sendFile(path.join(__dirname, "../views", "login.html"))
    },
    post: (req, res) => {
        reqUsername = req.body.user
        reqPassword = req.body.password

        User.findOne(
            { userName: reqUsername, password: reqPassword },
            function (err, user) {
                if (err) {
                    console.log(err)
                    return res.status(500).end()
                }
                if (!user) {
                    return res
                        .status(401)
                        .send({
                            Server: "Invalid credentials, try again!",
                        })
                        .end()
                }
                if (user) {
                    res.status(202)
                    res.sendFile(path.join(__dirname, "../views", "game.html"))
                    res.json("Login correct!")
                }
            }
        )
    },
}

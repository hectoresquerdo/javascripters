const path = require("path")
const User = require("../model/user")

module.exports = {
    get: (req, res) => {
        res.sendFile(path.join(__dirname, "../views", "register.html"))
    },
    post: (req, res) => {
        const user = new User()
        ;(reqUsername = req.body.user), (reqPassword = req.body.password)

        User.create(
            { userName: reqUsername, password: reqPassword },
            function (err, user) {
                if (err) {
                    console.log(err)
                    return res.status(500).end()
                }
                if (user) {
                    res.status(202)
                    res.sendFile(path.join(__dirname, "../views", "login.html"))
                    res.json("User registered correctly!")
                }
            }
        )
    },
}

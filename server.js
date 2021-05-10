const express = require("express")
const app = express()
const path = require("path")
const server = require("http").createServer(app)
const io = require("socket.io")(server, { cors: { origin: "*" } })
require("./mongo")
const User = require("./model/user") // importa el esquema

// Controllers
const userController = require("./controllers/userController")
const gameController = require("./controllers/gameController")
const endGameController = require("./controllers/endGameController")
const registerController = require("./controllers/registerController")
const pointsController = require("./controllers/pointsController")
const scoresController = require("./controllers/scoresController")
const apiController = require("./controllers/apiController")

// Express utilities
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Static files
app.use(express.static("public"))
app.use("/css", express.static(__dirname + "/public/css"))
app.use("/js", express.static(__dirname + "/public/js"))

//Register
app.get("/register", registerController.get)
app.post("/register", registerController.post)
app.get("/", registerController.get)

// Login
app.get("/login", userController.get)
app.post("/login", userController.post)

// Game
app.get("/game", gameController.get)
app.post("/game", gameController.post)

// End games
app.post("/endgame", endGameController.post)

// Scores
app.get("/points", pointsController.get)
app.get("/scores", scoresController.get)

// REST API
app.get("/rooms", apiController.getRooms)
app.get("/users", apiController.getUsers)
app.get("/ranking", apiController.getScores)

// Socket io server
server.listen(3002, () => {
    console.log("Socket server running on 3002")
})
io.on("connection", (socket) => {
    console.log("User connected: " + socket.id)

    socket.on("game", (data) => {
        const { player } = data

        if (player === 1) {
            socket.broadcast.emit("game", data)
        }
        if (player === 2) {
            socket.broadcast.emit("game", data)
        }
        io.emit("game", data)
    })
})

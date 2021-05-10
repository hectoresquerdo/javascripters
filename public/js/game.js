// Get info from the localStorage
const username = localStorage.getItem("user")
document.getElementById("username").innerHTML = username

const avatar = localStorage.getItem("avatar")
document.getElementById("avatarImage").src = avatar

const gameRoom = localStorage.getItem("gameRoom")
document.getElementById("gameRoom").innerHTML = gameRoom

document.getElementById("invalid").style.display = "none"
document.getElementById("playerNmbr").style.display = "none"

let roomFrom
let roomFor
let player1
let player2
let champion

// Display Winner Div alert
document.getElementById("winnerDiv").style.display = "none"

// Drag and Drop
function allowDrop(ev) {
    ev.preventDefault()
}

function drag(ev) {
    roomFrom = ev.path[1].id
    ev.dataTransfer.setData("text", ev.target.id)
}
let playerNmbr

async function drop(ev) {
    ev.preventDefault()
    roomFor = ev.path[0].id
    var data = ev.dataTransfer.getData("text")

    fetch("http://localhost:3002/game", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "same-origin",
        body: JSON.stringify({
            roomFrom: roomFrom,
            roomFor: roomFor,
        }),
    }).then(
        await function (res) {
            console.log(res.status)

            res.json().then((data) => {
                playerNmbr = data.player

                if (playerNmbr === 1) {
                    player1 = username
                    let playerMessage = `You are the player: ${playerNmbr}, start the game!`
                    document.getElementById("playerNmbr").style.display =
                        "inherit"
                    document.getElementById(
                        "playerNmbr"
                    ).innerHTML = playerMessage
                } else {
                    player2 = username
                    let playerMessage = `You are the player: ${playerNmbr}, wait the player 1 movement!`
                    document.getElementById("playerNmbr").style.display =
                        "inherit"
                    document.getElementById(
                        "playerNmbr"
                    ).innerHTML = playerMessage
                }
            })

            if (res.status === 202) {
                ev.target.appendChild(document.getElementById(data))
                document.getElementById("playBtn").disabled = false
            }
            if (res.status === 401) {
                document.getElementById("invalid").style.display = "inherit"

                setTimeout(function () {
                    document.getElementById("invalid").style.display = "none"
                }, 2500)
            }
            if (res.status === 205) {
                ev.target.appendChild(document.getElementById(data))
                document.getElementById("playBtn").disabled = true
            }
        }
    )
}
// Logout function
function logout() {
    localStorage.clear()
    window.location.replace("http://localhost:3002/login")
}
// Activate gameZone
document.getElementById("tresContainer").style.display = "none"
function activateGame() {
    document.getElementById("tresContainer").style.display = "inherit"
    document.getElementById("waitingRoom").style.display = "none"
}
// socket io + Game usability
let pitch = []

const socket = io("http://localhost:3002")
socket.on("connection")

socket.on("game", (data) => {
    const { player, position } = data
    if (player === 2) {
        document.getElementById("playerNmbr").style.display = "none"
        const canvas = document.querySelectorAll(".gameButton > canvas")[
            position
        ]
        const ctx = canvas.getContext("2d")
        var grd = ctx.createRadialGradient(75, 50, 5, 90, 60, 100)
        grd.addColorStop(0, "green")
        grd.addColorStop(1, "white")
        ctx.fillStyle = grd
        ctx.fillRect(10, 10, 100, 100)

        ctx.font = "bold 50px Arial"
        ctx.strokeText("O", 40, 75)

        document.querySelectorAll(".gameButton")[position].disabled = true
        pitch[position] = player
    }
    if (player === 1) {
        document.getElementById("playerNmbr").style.display = "none"
        const canvas = document.querySelectorAll(".gameButton > canvas")[
            position
        ]
        const ctx = canvas.getContext("2d")
        var grd = ctx.createRadialGradient(75, 50, 5, 90, 60, 100)
        grd.addColorStop(0, "red")
        grd.addColorStop(1, "white")
        ctx.fillStyle = grd
        ctx.fillRect(10, 10, 100, 100)

        ctx.font = "bold 50px Arial"
        ctx.strokeText("X", 40, 75)
        document.querySelectorAll(".gameButton")[position].disabled = true
        pitch[position] = player
    }
    if (winner()) {
        champion = pitch[position]
        if (champion === 1) {
            champion = player1
        } else {
            champion = player2
        }
        fetch("/endgame", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "same-origin",
            body: JSON.stringify({
                champion: champion,
                wins: 1,
                roomFor: roomFor,
            }),
        }).then(function (res) {
            if (res.status === 200) {
                document.getElementById("winnerDiv").style.display = "inherit"
                document
                    .querySelectorAll(".gameButton")
                    .forEach((button) => (button.disabled = true))
                document.getElementById(
                    "winner"
                ).innerHTML = `Player: ${player} wins!`
                setTimeout(function () {
                    window.location.replace("/points")
                }, 1750)
            }
        })
    }
})

// Game usability

function winner() {
    if (pitch[0] == pitch[1] && pitch[1] == pitch[2] && pitch[0]) {
        return true
    } else if (pitch[3] === pitch[4] && pitch[3] === pitch[5] && pitch[3]) {
        champion = pitch[3]
        return true
    } else if (pitch[6] === pitch[7] && pitch[6] === pitch[8] && pitch[6]) {
        champion = pitch[6]
        return true
    } else if (pitch[0] === pitch[3] && pitch[0] === pitch[6] && pitch[0]) {
        champion = pitch[0]
        return true
    } else if (pitch[1] === pitch[4] && pitch[1] === pitch[7] && pitch[1]) {
        champion = pitch[1]
        return true
    } else if (pitch[2] === pitch[5] && pitch[2] === pitch[8] && pitch[2]) {
        champion = pitch[2]
        return true
    } else if (pitch[0] === pitch[4] && pitch[0] === pitch[8] && pitch[0]) {
        champion = pitch[0]
        return true
    } else if (pitch[2] === pitch[4] && pitch[2] === pitch[6] && pitch[2]) {
        champion = pitch[2]
        return true
    }

    return false
}
document.querySelectorAll(".gameButton").forEach((button, i) =>
    button.addEventListener("click", () => {
        let game = {
            player: playerNmbr,
            position: i,
        }
        socket.emit("game", game)
    })
)

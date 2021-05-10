let username = document.querySelector("#username")
let password = document.querySelector("#password")
let submit = document.querySelector("#submit")

const gameRoom = document.getElementById("gameRoom")
gameRoom.addEventListener("change", function () {
    localStorage.setItem("gameRoom", this.value)
})

let avatar1 = document.getElementById("avatar1")
avatar1.addEventListener("click", function () {
    localStorage.setItem("avatar", avatar1.children[0].currentSrc)
    avatarSelected = avatar1.children[0].currentSrc
})
let avatar2 = document.getElementById("avatar2")
avatar2.addEventListener("click", function () {
    localStorage.setItem("avatar", avatar2.children[0].currentSrc)
    avatarSelected = avatar2.children[0].currentSrc
})
let avatar3 = document.getElementById("avatar3")
avatar3.addEventListener("click", function () {
    localStorage.setItem("avatar", avatar3.children[0].currentSrc)
    avatarSelected = avatar3.children[0].currentSrc
})
let avatar4 = document.getElementById("avatar4")
avatar4.addEventListener("click", function (event) {
    localStorage.setItem("avatar", avatar4.children[0].currentSrc)
    avatarSelected = avatar4.children[0].currentSrc
})

document.getElementById("invalid").style.display = "none"

username.addEventListener("change", (event) => {
    localStorage.setItem("user", event.target.value)
})

submit.addEventListener("click", async (event) => {
    event.preventDefault()
    var registered = false
    if (username.value !== null && password.value !== null) {
        fetch("http://localhost:3002/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "same-origin",
            body: JSON.stringify({
                user: username.value,
                password: password.value,
            }),
        }).then(
            await function (res) {
                if (res.status === 202) {
                    console.log("Login")
                    registered = true
                    if (registered) {
                        window.location.replace("http://localhost:3002/game")
                    }
                } else {
                    document.getElementById("invalid").style.display = "inherit"
                    document.getElementById("invalid").style.color = "red"
                }
            }
        )
    }
})

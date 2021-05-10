async function refresh(root) {
    const table = root.querySelector("table")
    const response = await fetch(root.dataset.url)
    const data = await response.json()

    // Clear table
    table.querySelector("tbody").innerHTML = ""

    // Populate rows
    data.forEach((element) => {
        table.querySelector("tbody").insertAdjacentHTML(
            "beforeend",
            `
                <tr>
                    <td>${element.userName}</td>
                    <td>${element.wins}</td>
                </tr>
            `
        )
    })
}

for (const root of document.querySelectorAll(".table-refresh[data-url]")) {
    const table = document.createElement("table")

    table.classList.add("table")

    table.innerHTML = `
    <thead>
        <tr>
            <th scope="col">User</th>
            <th scope="col">Wins</th>
        </tr>
    </thead>
        <tbody>
            <tr>
                <td>Loading</td>
            </tr>
        </tbody>

    `
    root.append(table)

    const button = document
        .querySelector(".refresh")
        .addEventListener("click", () => {
            refresh(root)
        })

    refresh(root)
}
// Logout function
function logout() {
    localStorage.clear()
    window.location.replace("http://localhost:3002/login")
}
// Return to game
function game() {
    window.location.replace("http://localhost:3002/game")
}

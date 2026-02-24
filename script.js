import express from 'express'
import path from 'path'

const app = express();

let absPath = path.resolve("pages")
app.use(express.static("styles"))

app.get("/", (req, res) => {
    res.sendFile(absPath + "/index.html")
})

app.get("/about", (req, res) => {
    res.send("<h1>about page</h1>");
})
app.get("/login", (req, res) => {
    res.send("<h1>login page</h1>");
})
app.get("/signup", (req, res) => {
    res.send("<h1>signup page</h1>");
})
app.get("/todo", (req, res) => {
    res.send("<h1>todo page</h1>");
})

app.use((req, res) => {
    res.status(404).sendFile(absPath + "/error.html")
})
app.listen(4500);
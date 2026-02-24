import express from 'express'
import path from 'path'

const app = express();

let absPath = path.resolve("index.html")

app.use(express.static("style.css"))

app.get("/", (req, res) => {
    res.sendFile(absPath)
})

app.get("/about", (req, res) => {
    res.send("<h1>about page</h1>");
})
app.get("/completed", (req, res) => {
    res.send("<h1>completed page</h1>");
})
app.get("/todo", (req, res) => {
    res.send("<h1>todo page</h1>");
})

app.listen(4500);
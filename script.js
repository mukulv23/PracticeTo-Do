import express from 'express'
import fs from 'fs'

const app = express();

let loginToken = false;
function route(req, res, next) {
    if (!loginToken) {
        res.send("<h1>Your are not allowed! Please login First</h1>");
    }
    else {
        next();
    }
}

app.set("view engine", "ejs");

// Static CSS //
app.use(express.static("styles"));

// Get Form data in Simple Way //
app.use(express.urlencoded({ extended: false }))

// Home Page //
app.get("/", (req, res) => {
    res.render("index")
})

// About Page //
app.get("/about", (req, res) => {
    res.render("about");
})

// Sign up Page //
app.get("/signup", (req, res) => {
    res.render("signup");
})

// Sign up Logic
app.post("/signup", (req, res) => {
    const data = req.body;

    fs.readFile("database/users.json", "utf-8", (err, userData) => {
        let users = [];
        if (!err && userData) {
            users = JSON.parse(userData);
        }
        users.push(data);
        fs.writeFile("database/users.json", JSON.stringify(users, null, 2), (err) => {
            if (err) {
                console.log("Error occured", err)
            }
            res.redirect("/login")
        })
    })
})

// Login Page //
app.get("/login", (req, res) => {
    res.render("login")
})

// Login Logic //
app.post("/login", (req, res) => {
    const data = req.body;

    fs.readFile("database/users.json", "utf-8", (err, userData) => {
        if (err) {
            console.log("Error occured", err);
        }
        let users = []
        users = JSON.parse(userData);
        const user = users.find(u => u.email === data.email);

        if (!user) {
            console.log("User not found");
            res.send("<h1>User not found</h1>")
        }
        else {
            if (user.password === data.password) {
                loginToken = true;
                res.redirect("/")
            }
            else {
                res.redirect('/login')
                console.log("Wrong password");
            }
        }
    })
})

// todo Page //
app.get("/todo", route, (req, res) => {
    res.render("todo");
})

// todo Logic //
app.post("/addTask", (req, res) => {
    const data = req.body;

    fs.readFile("database/tasks.json", "utf-8", (err, taskData) => {
        let tasks = []
        if (!err && taskData)
            tasks = JSON.parse(taskData)
        tasks.push(data);
        fs.writeFile("database/tasks.json", JSON.stringify(tasks, null, 2), (err) => {
            if (err) return res.send("<h1>Error Occured</h1>")
            else
                res.send(data.todo);
        })
    })
})


// Error Page //
app.use((req, res) => {
    res.status(404).render("error");
})
app.listen(4500);
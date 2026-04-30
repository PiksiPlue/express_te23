const express = require("express");
const sqlite3 = require("sqlite3")
const app = express();
const PORT = 3000;
app.use(express.json());

const db = new sqlite3.Database("./tasks.db")
const userDb = new sqlite3.Database("./users.db")

db.run(`
  CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMERY KEY,
  title TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE
  )
`);

userDb.run(`
  
  CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  isAdmin BOOLEAN NOT NULL DEFAULT FALSE,
  active BOOLEAN NOT NULL DEFAULT TRUE
  )
  
  `);

app.get("/users", (req,res) => {
  userDb.all("SELECT * FROM users",(err, rows) => {
    if (rows.length === 0) {
      res.status(200).json({message:"No users found"});
      return;
    }
    res.json(rows);
  });
});

app.post("/users", (req,res) => {
  const name = req.body.name;
  const email = req.body.email;
  console.log(name,email);

  // if(!name){
  //   res.status(400).json({ error: "Name is required" });
  //   return;
  // }
  // if(!email){
  //   res.status(400).json({ error: "Email is required" });
  //   return;
  // } 

  userDb.run("INSERT INTO users (name,email) VALUES (?,?)", [name, email])
  res.send({name, email});
});

app.get("/tasks", (req,res) => {
  const tasks = db.all("SELECT * FROM tasks", (err,rows) => {
    res.json({ rows });
  })
});

app.post("/tasks", (req,res) => {
  const title = req.body.title;
  const completed = req.body.completed;
  db.run("INSERT INTO tasks (title, completed) VALUES (?,?)", [title, completed])

res.status(201).json({ message: "Task created"})
})

app.get("/", (req, res) => {
  res.send("Shalom, this is the start page wazaaap!!!!!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
const express = require("express");
const app = express();

const PORT = 3000;

let tasks = [
  { id:1, namn: "Pavle", År: 18 },
  { id:2, namn: "Elliot", År: 19 },
  { id:3, namn: "Ingela", År: 41 },
  { id:4, namn: "Antonio", År: 41 },
  { id:5, namn: "MAtt", År: 41 }
];



app.get("/", (req, res) => {
  res.send("Hello from my express app! You guys are amazing!!! ❤️");
});

app.get("/about", (req, res) => {
  console.log("HejHej");

  res.send("This is the about page for a really aawesome teacher!!!");
});

app.delete("/tasks/:id", (req, res) => {
  const id = req.params.id;
 
  const taskIndex = tasks.findIndex(
    t => t.id == id
  );
 
  if (taskIndex === -1){
    return res.status(404).send("Task not found")
  }


  tasks.splice(taskIndex, 1);
  res.status(200).send("Task succesfully deleted")
})



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); //req.body

// ROUTES //

//create a todo

app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo(description) VALUES($1) RETURNING *",
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});
//get all todos

app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * from todo");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a todo
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * from todo WHERE todo_id = $1", [
      id,
    ]);

    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update a todo

app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description, completed } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1, completed = $2 WHERE todo_id = $3",
      [description, completed, id]
    );
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);

    res.json(todo);
  } catch (err) {
    console.error(err);
  }
});

//delete a todo

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json("Todo was deleted");
  } catch (error) {
    console.error(error);
  }
});

// Save Firebase user to Postgres
app.post("/save-user", async (req, res) => {
  try {
    const { uid, email, name, photoURL } = req.body;

    if (!uid || !email || !name || !photoURL) {
      return res.status(400).send("Missing required fields");
    }

    await pool.query(
      `INSERT INTO userInfo (uid, email, username, photo_url)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (uid) DO NOTHING`,
      [uid, email, name, photoURL]
    );

    res.status(200).send("User saved");
  } catch (err) {
    console.error("Error saving user:", err.message);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(5000, () => {
  console.log("server has started on port 5000");
});

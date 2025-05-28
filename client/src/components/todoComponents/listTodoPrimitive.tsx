import { Button, Table } from "@chakra-ui/react";
import React, { useEffect, useState, Fragment } from "react";

// todos is a list on the front end that mirrors the data base
const listTodoPrimitive = () => {
  const [todos, setTodos] = useState<
    { description: string; completed: boolean; todo_id: bigint }[]
  >([]);

  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      const jsonData = await response.json();

      setTodos(
        jsonData.sort(
          (a: { todo_id: bigint }, b: { todo_id: bigint }) =>
            Number(a.todo_id) - Number(b.todo_id)
        )
      );
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getTodos();
  }, []);

  const deleteTodo = async (todo_id: bigint) => {
    try {
      const response = await fetch(`http://localhost:5000/todos/${todo_id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setTodos(todos.filter((todo) => todo.todo_id !== todo_id));
      }
      console.log(todos);
    } catch (error) {
      console.error(error);
    }
  };

  const updateCompletion = async (todo_id: bigint) => {
    const index = todos.findIndex((todo) => todo.todo_id === todo_id);

    try {
      todos[index].completed = !todos[index].completed;
      const response = await fetch(`http://localhost:5000/todos/${todo_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(todos[index]),
      });

      if (response.ok) {
        if (index !== -1) {
          const updatedTodos = [...todos];
          updatedTodos[index].completed = !updatedTodos[index].completed;
          setTodos(updatedTodos);
        }
        await getTodos(); // Refresh the table by fetching the updated todos
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [description, setDescription] = useState("Enter Todo Task");

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      const body = { description };
      const response = await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      getTodos();
    } catch (err) {
      console.error({ err });
    }
  };
  console.log(todos);
  return (
    <>
      <br></br>
      <br></br>
      <h1>List Todos</h1>
      <Table.Root size="sm">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Description</Table.ColumnHeader>
            <Table.ColumnHeader>Edit</Table.ColumnHeader>
            <Table.ColumnHeader>Completed?</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="right">
              <span style={{ marginRight: "12px" }}>Delete</span>
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {todos.map((item) => (
            <Table.Row key={item.todo_id}>
              <Table.Cell>{item.description}</Table.Cell>
              <Table.Cell textAlign="left">
                <Button
                  style={{
                    background: "#fff",
                    borderRadius: "1.5em",
                  }}
                >
                  ✎
                </Button>
              </Table.Cell>
              <Table.Cell>
                <Button
                  style={{
                    background: "#fff",
                    borderRadius: ".5em",
                  }}
                  onClick={() => updateCompletion(item.todo_id)}
                >
                  {item.completed ? "✅" : "❌"}
                </Button>
              </Table.Cell>

              <Table.Cell textAlign="end">
                {" "}
                <Button
                  style={{
                    background: "#6e0101",
                    borderRadius: "1.5em",
                  }}
                  onClick={() => deleteTodo(item.todo_id)}
                >
                  🗑️
                </Button>{" "}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Fragment>
        {" "}
        <form className="d-flex mt-5" onSubmit={onSubmitForm}>
          <input
            type="text"
            className="form-control"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              console.log("completed: true");
            }}
          />
          <button className="btn btn-success"> Add</button>
        </form>
      </Fragment>
    </>
  );
};

export default listTodoPrimitive;

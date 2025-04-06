import { useEffect, useState } from "react";
import { db, auth } from "../config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

interface TodoItem {
  title: string;
  subTask: string;
  subSubTask: string;
  completed: boolean;
  id: string;
  // Add other fields from your Firestore documents if necessary
}

export const Todo = () => {
  const [todoList, setTodoList] = useState<TodoItem[]>([]); // Explicitly type the state
  const todoCollectionRef = collection(db, "Todo");

  //New Todo

  const [newTitle, setNewTitle] = useState("");
  const [newSubTask, setNewSubTask] = useState("");
  const [newSubSubTask, setNewSubSubTask] = useState("");
  const [newcompleted, setNewcompleted] = useState(false);
  // Update Todo
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateSubTask, setUpdateSubTask] = useState("");
  const [updateSubSubTask, setUpdateSubSubTask] = useState("");
  const [updatecompleted, setUpdatecompleted] = useState(false);

  const getTodoList = async () => {
    // READ DATA
    //SET MOVIE LIST = DATA
    console.log("t");
    try {
      const data = await getDocs(todoCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as TodoItem[];
      console.log(filteredData);
      setTodoList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const taskDoc = doc(db, "Todo", id);
      await deleteDoc(taskDoc);
      getTodoList();
    } catch (err) {
      console.error(err);
    }
  };

  const updateTaskTitle = async (id: string) => {
    try {
      const taskDoc = doc(db, "Todo", id);
      await updateDoc(taskDoc, { title: updateTitle });
      getTodoList();
    } catch (err) {
      console.error(err);
    }
  };

  const updateTaskSub = async (id: string) => {
    try {
      const taskDoc = doc(db, "Todo", id);
      await updateDoc(taskDoc, { subTask: updateSubTask });
      getTodoList();
    } catch (err) {
      console.error(err);
    }
  };

  const updateTaskSubSub = async (id: string) => {
    try {
      const taskDoc = doc(db, "Todo", id);
      await updateDoc(taskDoc, { subSubTask: updateSubSubTask });
      getTodoList();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    console.log("Hello");
    getTodoList();
  }, []);

  const onSubmitTask = async () => {
    try {
      await addDoc(todoCollectionRef, {
        title: newTitle,
        subTask: newSubTask,
        subSubTask: newSubSubTask,
        completed: newcompleted,
        userId: auth?.currentUser?.uid,
      });

      getTodoList();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div>
        <input
          placeholder="Task"
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <input
          placeholder="Subtask?"
          onChange={(e) => setNewSubTask(e.target.value)}
        />
        <input
          placeholder="Sub - Subtask?"
          onChange={(e) => setNewSubSubTask(e.target.value)}
        />

        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type="checkbox"
            id="completedCheckbox"
            checked={newcompleted}
            onChange={(e) => setNewcompleted(e.target.checked)}
            style={{ display: "none" }}
          />
          <label
            htmlFor="completedCheckbox"
            style={{
              width: "900px",
              height: "25px",
              border: "2px solid #000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              borderRadius: "4px",
              backgroundColor: newcompleted ? "green" : "red",
              margin: "10px",
            }}
          >
            {newcompleted && (
              <span
                style={{
                  display: "check",
                  width: "12px",
                  height: "12px",
                  backgroundColor: "green",
                  // borderRadius: "50%",
                }}
              />
            )}
          </label>
        </div>
        <button onClick={onSubmitTask}>Submit Task</button>
      </div>
      {todoList.map((i) => (
        <div>
          {" "}
          <h1
            style={{
              color: i.completed ? "green" : "red",
              textDecoration: i.completed ? "none" : "line-through",
              fontSize: "34px",
              fontWeight: "bold",
            }}
          >
            Task: {i.title}
          </h1>
          <p>Subtask: {i.subTask} </p>
          <p>Sub-Subtask: {i.subSubTask} </p>
          {/* <p>ID: {i.id} </p> */}
          <button onClick={() => deleteTask(i.id)}>Delete </button>
          <input
            placeholder="Update Task"
            onChange={(e) => setUpdateTitle(e.target.value)}
          />
          <button onClick={() => updateTaskTitle(i.id)}>Update Task </button>
          <input
            placeholder="Update Subtask"
            onChange={(e) => setUpdateSubTask(e.target.value)}
          />
          <button onClick={() => updateTaskSub(i.id)}>Update Subtask </button>
          <input
            placeholder="Update Sub-Subtask"
            onChange={(e) => setUpdateSubSubTask(e.target.value)}
          />
          <button onClick={() => updateTaskSubSub(i.id)}>
            Update Sub-Subtask{" "}
          </button>
        </div>
      ))}
    </div>
  );
};

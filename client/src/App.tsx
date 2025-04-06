import { useState, useEffect } from "react";
import "./App.css";
import { Box, Slider } from "@chakra-ui/react";
import { MdGraphicEq } from "react-icons/md";
import { Auth } from "./components/auth";
import { Todo } from "./components/todo";
import { CDNMarkdownEditor } from "./components/textbox";

function App() {
  const [count, setCount] = useState(0);
  const [array, setArray] = useState([]);

  return (
    <>
      {/* FIRE BASE TUTORIAL */}
      <div className="navbar">
        <Auth />
      </div>

      <div className="card">
        {array.map((user, index) => (
          <div key={index}>
            <span key={index}>{user}</span>
          </div>
        ))}
      </div>
      <div>
        <Todo />
        <CDNMarkdownEditor />
      </div>
    </>
  );
}

export default App;

import { useState, useEffect } from "react";
import "./App.css";
import { Box, Slider } from "@chakra-ui/react";
import { HStack, Progress } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { Auth } from "../components/auth";
import { Todo } from "../components/todo";
import { CDNMarkdownEditor } from "../components/textbox";
import { Test } from "./test";
import { Book } from "./book";

function App() {
  const [count, setCount] = useState(0);
  const [array, setArray] = useState([]);

  return (
    <>
      <div className="navbar">
        <Auth />
        <li>
          <Link to="/">Homdsfsdfsdfdsfsdfe</Link>
        </li>
        <li>
          <Link to="/test">Test Page </Link>
        </li>
      </div>
      <Routes>
        <Route path="/" element={<CDNMarkdownEditor />}></Route>
        <Route path="/test" element={<Test />}></Route>
        <Route path="/test/: id" element={<Book />}></Route>
      </Routes>

      {/* <CDNMarkdownEditor /> */}
    </>
  );
}

export default App;

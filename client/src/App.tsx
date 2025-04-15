import { useState, useEffect } from "react";
import "./App.css";
import { Box, Slider } from "@chakra-ui/react";
import { HStack, Progress } from "@chakra-ui/react";

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
        {/* <Todo /> */}
        <CDNMarkdownEditor />

        {/* <Progress.Root defaultValue={90}   maxW="sm">
          <HStack gap="5">
            <Progress.Label>Usage</Progress.Label>
            <Progress.Track flex="1">
              <Progress.Range />
            </Progress.Track>
            <Progress.ValueText>50%</Progress.ValueText>
          </HStack>
        </Progress.Root> */}
      </div>
    </>
  );
}

export default App;

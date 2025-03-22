import { useState, useEffect } from "react";
import axios from "axios";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Box, Slider } from "@chakra-ui/react";
import { MdGraphicEq } from "react-icons/md";
import { Auth } from "./components/auth";

function App() {
  const [count, setCount] = useState(0);
  const [array, setArray] = useState([]);

  //---------- Python Server Interaction ---------------------//

  const fetchAPI = async () => {
    const response = await axios.get("http://127.0.0.1:8008/api/users");
    console.log(response.data.users);
    setArray(response.data.users);
  };

  useEffect(() => {
    fetchAPI();

    //------------------------------------------------//
  }, []);
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
      {/* <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
      <Slider.Root maxW="1200px" defaultValue={[50]}>
        <Slider.Control>
          <Slider.Track bg="red.100">
            <Slider.Range bg="tomato" />
          </Slider.Track>
          <Slider.Thumb index={0} boxSize={6} borderColor="tomato" shadow="md">
            <Box color="tomato" as={MdGraphicEq} />
            <Slider.DraggingIndicator
              bg="red.100"
              layerStyle="fill.solid"
              top="6"
              rounded="sm"
              px="1.5"
            >
              <Slider.ValueText />
            </Slider.DraggingIndicator>
          </Slider.Thumb>
        </Slider.Control>
      </Slider.Root>
    </>
  );
}

export default App;

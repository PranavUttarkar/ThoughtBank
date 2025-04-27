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
import DailyCheckIn from "@/components/DailyCheckIn";
import DynamicTabs from "@/components/DynamicTabs";
import { MdBed } from "react-icons/md";

function App() {
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
        <li>
          <Link to="/DailyCheckIn">Daily Check In </Link>
        </li>
      </div>
      <div style={{ marginTop: "100px" }}> {/* NAVBAR BREAK FROM TOP: */}</div>

      <Routes>
        {/* <Route path="/" element={<DynamicTabs />}></Route> */}
        <Route path="/test" element={<Test />}></Route>
        <Route path="/test/: id" element={<Book />}></Route>
        <Route path="/DailyCheckIn" element={<DailyCheckIn />}></Route>
      </Routes>
    </>
  );
}

export default App;

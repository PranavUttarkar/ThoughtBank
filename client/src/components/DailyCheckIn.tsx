import React from "react";

import { Editable } from "@chakra-ui/react";

const Demo = () => {
  return (
    <Editable.Root defaultValue="Click to edit">
      <Editable.Preview minH="48px" alignItems="flex-start" width="full" />
      <Editable.Textarea />
    </Editable.Root>
  );
};

const DailyCheckIn = () => {
  let x = "hello";
  let y: number = 20;
  y++;

  return (
    <>
      <div
        style={{
          paddingTop: "100px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>Daily Check-In {x + y}</h1>
        <Demo />
      </div>
    </>
  );
};

export default DailyCheckIn;

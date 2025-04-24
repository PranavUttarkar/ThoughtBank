import React from "react";

import { Editable, HStack } from "@chakra-ui/react";

const Demo = () => {
  return (
    <Editable.Root defaultValue="Click to edit">
      <Editable.Preview minH="48px" alignItems="flex-start" width="full" />
      <Editable.Textarea />
    </Editable.Root>
  );
};

import { Box, Slider } from "@chakra-ui/react";
import { MdBed, MdGraphicEq, MdOutlinePhoneIphone } from "react-icons/md";

// const Rater = () => {
//   return (

//   );
// };

const DailyCheckIn = () => {
  let x = "hello";
  let y: number = 20;
  let z = "Hours Slept";
  let a = "Screen Time";
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
      </div>
      <Box
        width="90%"
        maxWidth="500px"
        padding="6"
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="lg"
        bg="white"
        textAlign="center"
      >
        <h2
          style={{
            marginBottom: "16px",
            fontSize: "1.5rem",
            fontWeight: "bold",
          }}
        >
          {z}
        </h2>
        <br></br>
        <Slider.Root
          defaultValue={[30]}
          size={"lg"}
          variant={"solid"}
          width={"100%"}
          max={12}
          step={0.25}
        >
          <Slider.Control>
            <HStack
              justify="right"
              position="absolute"
              top="-40px"
              right={"3"}
              width="100%"
            >
              <Slider.ValueText fontSize="lg" fontWeight="bold" />
            </HStack>
            <Slider.Track bg="green.100">
              <Slider.Range bg="#4ced87" />
            </Slider.Track>
            <Slider.Thumb
              index={0}
              boxSize={11}
              borderColor="tomato"
              shadow="md"
            >
              <Box color="white" as={MdBed} boxSize={6} />
            </Slider.Thumb>
          </Slider.Control>
        </Slider.Root>
      </Box>
      <br></br>
      {/* Slider 2 */}
      <Box
        width="90%"
        maxWidth="500px"
        padding="6"
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="lg"
        bg="white"
        textAlign="center"
      >
        <h2
          style={{
            marginBottom: "16px",
            fontSize: "1.5rem",
            fontWeight: "bold",
          }}
        >
          {a}
        </h2>
        <br></br>
        <Slider.Root
          defaultValue={[30]}
          size={"lg"}
          variant={"solid"}
          width={"100%"}
          max={12.5}
          step={0.5}
        >
          <Slider.Control>
            <HStack
              justify="right"
              position="absolute"
              top="-40px"
              right={"3"}
              width="100%"
            >
              <Slider.ValueText fontSize="lg" fontWeight="bold" />
            </HStack>
            <Slider.Track bg="blue.100">
              <Slider.Range bg="#051a82" />
            </Slider.Track>
            <Slider.Thumb index={0} boxSize={11} shadow="md">
              <Box color="white" as={MdOutlinePhoneIphone} boxSize={6} />
            </Slider.Thumb>
          </Slider.Control>
        </Slider.Root>
      </Box>
    </>
  );
};

export default DailyCheckIn;

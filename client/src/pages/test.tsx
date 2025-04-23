import { Link } from "react-router-dom";

export function Test() {
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
        <h1> Test page 1 </h1>

        <Link to="/books/1">Book 1</Link>
        <Link to="/books/2">Book 2</Link>
      </div>
    </>
  );
}

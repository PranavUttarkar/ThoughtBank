import { Link, useParams } from "react-router-dom";

export function Book() {
  const { id } = useParams();
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
        <h1> Book {id} </h1>

        {/* <Link to="/books/1">Book 1</Link>
        <Link to="/books/2">Book 2</Link> */}
      </div>
    </>
  );
}

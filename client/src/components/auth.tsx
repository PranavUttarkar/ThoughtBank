import { useEffect, useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user.email || "Anonymous User");
      } else {
        setCurrentUser("");
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  console.log(auth?.currentUser?.displayName);

  // const signIn = async () => {
  //   try {
  //     await createUserWithEmailAndPassword(auth, email, password);
  //     setMessage("✅ Successfully signed in!");
  //   } catch (err) {
  //     setMessage("❌ " + err);
  //   }
  // };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Send user data to your backend
      await fetch("http://localhost:5000/save-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: user.uid,
          email: user.email,
          name: user.displayName,
          photoURL: user.photoURL,
        }),
      });

      setMessage("✅ User signed in and saved!");
    } catch (err) {
      setMessage("❌ " + err);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      window.location.reload();
    } catch (err) {
      setMessage("❌ " + err);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "2px" }}>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "right",
            padding: "10px",
          }}
        >
          <div style={{ justifyContent: "left" }}>
            {auth?.currentUser ? (
              <>
                {auth.currentUser.photoURL && (
                  <img
                    src={auth.currentUser.photoURL}
                    alt="Profile"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      marginLeft: "10px",
                    }}
                  />
                )}
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
        <h1
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "2rem",
            fontWeight: "bold",
            color: "white",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
            margin: "5px",
            marginRight: "10px",
          }}
        >
          [ ThoughtBank ]
        </h1>
        <div style={{ justifyContent: "right" }}>
          <button
            className="NavbarButton"
            onClick={signInWithGoogle}
            style={{ margin: "5px" }}
          >
            {auth?.currentUser ? "Switch Account" : "Sign In with Google"}
          </button>
          <button
            className="NavbarButton"
            onClick={logout}
            style={{ margin: "5px" }}
          >
            Logout
          </button>

          {message && (
            <p style={{ marginTop: "15px", fontWeight: "bold" }}>{message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

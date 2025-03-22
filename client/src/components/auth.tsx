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

  console.log(auth?.currentUser?.photoURL);

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
      await signInWithPopup(auth, googleProvider);
      setMessage("✅ Successfully signed in with Google!");
    } catch (err) {
      setMessage("❌ " + err);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setMessage("✅ Successfully logged out!");
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
            justifyContent: "center",
            alignItems: "right",
            padding: "10px",
          }}
        >
          <div>
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

        {/* <input
        placeholder="Email..."
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ margin: "5px", padding: "8px" }}
      />
      <input
        placeholder="Password..."
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ margin: "5px", padding: "8px" }}
      />
      <button onClick={signIn} style={{ margin: "5px" }}>
        Sign In
      </button> */}

        <button onClick={signInWithGoogle} style={{ margin: "5px" }}>
          Sign In with Google
        </button>
        <button onClick={logout} style={{ margin: "5px" }}>
          Logout
        </button>

        {message && (
          <p style={{ marginTop: "15px", fontWeight: "bold" }}>{message}</p>
        )}
      </div>
    </div>
  );
};

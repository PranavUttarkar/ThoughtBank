import React, { useEffect, useRef, useState } from "react";
import "./toastUI.css";

import { db, auth } from "../config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  updateDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

interface GeneralNotesPage {
  content: string;
  userID: string;
}

declare global {
  interface Window {
    toastui: any;
  }
}

export const CDNMarkdownEditor: React.FC = () => {
  const editorRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [docId, setDocId] = useState<string | null>(null);
  const GeneralNotesCollectionRef = collection(db, "GeneralNotes");
  const [saveTime, setSaveTime] = useState<Date | null>(null);

  // Function to initialize or reset editor with specific value
  const loadEditor = (initialValue: string) => {
    const { Editor } = window.toastui;

    if (editorRef.current) {
      editorRef.current.destroy();
      editorRef.current = null;
    }

    if (containerRef.current) {
      editorRef.current = new Editor({
        el: containerRef.current,
        height: "500px",
        toolbarItems: [
          ["heading", "bold", "italic", "strike"],
          ["hr", "quote"],
          ["ul", "ol", "task"],
          ["table", "link"],
          ["code", "codeblock"],
        ],
        usageStatistics: false,
        previewStyle: "vertical",
        initialEditType: "wysiwyg",
        initialValue,
      });
    }
  };

  // Fetch note from Firestore for the logged-in user
  const fetchAndLoadUserNote = async (userId: string) => {
    try {
      const q = query(GeneralNotesCollectionRef, where("userID", "==", userId));
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const docData = snapshot.docs[0].data() as GeneralNotesPage;
        setDocId(snapshot.docs[0].id);
        loadEditor(docData.content);
      } else {
        setDocId(null);
        loadEditor("# Hello!\n\nStart writing your notes!");
      }
    } catch (err) {
      console.error("Error fetching note:", err);
      loadEditor("# Error loading your notes.");
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://uicdn.toast.com/editor/latest/toastui-editor-all.min.js";
    script.onload = () => {
      // Detect user login/logout
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is logged in
          fetchAndLoadUserNote(user.uid);
        } else {
          // User logged out
          setDocId(null);
          loadEditor("# Hello!\n\nPlease log in to start writing.");
        }
      });
      return unsubscribe;
    };
    document.body.appendChild(script);

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
      }
    };
  }, []);

  const handleSave = async () => {
    if (!auth.currentUser?.uid) {
      alert("You must be logged in to save notes.");
      return;
    }
    setSaveTime(new Date());

    const content = editorRef.current?.getMarkdown() || "";
    const userID = auth.currentUser.uid;

    try {
      const q = query(GeneralNotesCollectionRef, where("userID", "==", userID));
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const existingDoc = snapshot.docs[0];
        await updateDoc(doc(db, "GeneralNotes", existingDoc.id), {
          content,
        });
        setDocId(existingDoc.id);
      } else {
        const newDocRef = await addDoc(GeneralNotesCollectionRef, {
          content,
          userID,
        });
        setDocId(newDocRef.id);
      }

      // Reload editor with updated content (optional)
      editorRef.current.setMarkdown(content);

      console.log("Note saved!");
    } catch (err) {
      console.error("Error saving note:", err);
    }
  };

  return (
    <div className="flex flex-col items-center px-4 py-6 space-y-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center">General Notes</h1>

      {/* Toast UI container */}
      <div
        ref={containerRef}
        style={{ background: "white", borderRadius: "3rem" }}
        className="w-full max-w-4xl bg-white p-4 rounded-xl shadow-md"
      ></div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Save
      </button>
      {saveTime && (
        <p className="text-sm text-gray-500">
          Last saved: {saveTime.toLocaleTimeString()}
        </p>
      )}
    </div>
  );
};

import React, { useEffect, useRef, useState } from "react";

import { db, auth } from "../config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

interface GeneralNotesPage {
  content: string;
  userID: string;
  // Add other fields from your Firestore documents if necessary
}

// Tell TypeScript about global toastui
declare global {
  interface Window {
    toastui: any;
  }
}

export const CDNMarkdownEditor: React.FC = () => {
  const editorRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [markdownOutput, setMarkdownOutput] = useState<string>("");
  const [savedMarkdown, setSavedMarkdown] = useState<string | null>(null);
  const [saveTime, setSaveTime] = useState<Date | null>(null);

  const [GeneralNotes, setGeneralNotes] = useState<GeneralNotesPage[]>([]); // Explicitly type the state
  const GeneralNotesCollectionRef = collection(db, "GeneralNotes");

  useEffect(() => {
    const loadEditor = async () => {
      try {
        const data = await getDocs(GeneralNotesCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          userID: doc.id,
        })) as GeneralNotesPage[];
        console.log(filteredData);
        // setTodoList(filteredData);
      } catch (err) {
        console.error(err);
      }

      // Load CSS
      const cssLink = document.createElement("link");
      cssLink.rel = "stylesheet";
      cssLink.href =
        "https://uicdn.toast.com/editor/latest/toastui-editor.min.css";
      document.head.appendChild(cssLink);

      // Load JS
      const script = document.createElement("script");
      script.src =
        "https://uicdn.toast.com/editor/latest/toastui-editor-all.min.js";
      script.onload = () => {
        const { Editor } = window.toastui;
        if (containerRef.current) {
          editorRef.current = new Editor({
            el: containerRef.current,
            height: "500px",
            // backgroud: "#ffff",
            previewStyle: "vertical",
            initialEditType: "wysiwyg",
            initialValue: `# Hello! \n\n Start writing!`,
            events: {
              change: () => {
                const updatedMarkdown = editorRef.current?.getMarkdown() || "";
                setMarkdownOutput(updatedMarkdown);
              },
            },
          });

          setMarkdownOutput(editorRef.current.getMarkdown());
        }
      };
      document.body.appendChild(script);
    };

    loadEditor();

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
      }
    };
  }, []);

  const handleSave = async () => {
    const current = editorRef.current?.getMarkdown() || "";
    setSavedMarkdown(current);
    setSaveTime(new Date());

    console.log(current);
    try {
      await addDoc(GeneralNotesCollectionRef, {
        content: current,
        userID: auth?.currentUser?.uid,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center px-4 py-6 space-y-6 bg-gray-100 min-h-screen">
      <h1 className="text-13xl font-bold text-center"></h1>
      {/* Markdown Editor */}
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
      {/* <div
        ref={containerRef}
        style={{ background: "white" }}
        className="w-full max-w-4xl bg-white p-4 rounded-xl shadow-md"
      ></div>

      <div
        className="w-full max-w-4xl bg-white p-4 rounded-xl shadow-sm"
        style={{ display: "none", background: "white" }}
      >
        <h2 className="text-xl font-semibold mb-2">Markdown Output:</h2>
        <pre className="whitespace-pre-wrap break-words bg-gray-50 p-4 rounded-md border border-gray-200 text-sm">
          {markdownOutput}
        </pre>
      </div> */}
    </div>
  );
};

// export default CDNMarkdownEditor;

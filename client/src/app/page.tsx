"use client";
import { getNotes, addNotes } from "@/utils/api";
import { Note } from "@/utils/models";
import { useEffect, useState } from "react";


export default function Home() {
  const [notes, setNotes] = useState<Note[]>([])
  const [text, setText] = useState<string>("hello")
  useEffect(() => {
    getNotes().then(notes => setNotes(notes))
  }, [])
  return (
    <div className="grid place-items-center h-screen">
      <div>
        <form className="p-2 flex gap-2">
          <input type="text" value={text} className="text-black p-1 bg-blue-50 w-full rounded-lg" onChange={(e) => setText(e.target.value)}></input>
          <button onClick={(e) => {
            e.preventDefault()
            addNotes(text)
            getNotes().then(notes=>setNotes(notes))
          }} className="bg-blue-500 p-1 rounded-lg">press to add </button>
        </form>

        {notes && (
          <div className="grid place-items-center gap-2 p-2 overflow-auto h-80">{notes.map((note, index) => {
            return (
              <div key={index} className="w-full h-30 rounded-lg bg-blue-200 text-black p-4">
                {note.notes}
              </div>
            )
          })}</div>
        )}

      </div>
    </div>
  );
}

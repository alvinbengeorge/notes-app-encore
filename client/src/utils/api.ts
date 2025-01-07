import { Note } from "./models"

export async function getNotes(): Promise<Note[]> {
    const response = await fetch("http://localhost:4000/notes")
    const { notes } = await response.json()
    return notes
}

export async function addNotes(note: string): Promise<boolean> {
    const response = await fetch("http://localhost:4000/notes", {
        method: "POST",
        body: JSON.stringify({ note }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    return response.ok
}

export async function editNotes(id: number, note: string): Promise<boolean> {
    const response = await fetch(`http://localhost:4000/notes/${id}`, {
        method: "PUT",
        body: JSON.stringify({ note }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    return response.ok
}

export async function deleteNotes(id: number): Promise<boolean> {
    const response = await fetch(`http://localhost:4000/notes/${id}`, {
        method: "DELETE"
    })
    return response.ok
}
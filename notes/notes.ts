import { api } from "encore.dev/api";
import { SQLDatabase } from "encore.dev/storage/sqldb";
import { NotesOutput, Response } from "./notes.types";


const db = new SQLDatabase("encore_notes", {
    migrations: "./migrations",
});

export const getNotes = api(
    {method: 'GET', path: '/notes', expose: true},
    async (): Promise<NotesOutput> => {
        const notes = await db.query`SELECT * FROM notes`;
        const notesArray = [];
        for await (const note of notes) {
            notesArray.push(note);
        }
        return { notes: notesArray };
    }
)

export const addNote = api(
    {method: 'POST', path: '/notes', expose: true},
    async ({ note }: { note: string }): Promise<Response> => {
        try {
            await db.exec`INSERT INTO notes (notes) VALUES (${note})`;
            return {
                message: 'Note added',
                status: true
            }
        } catch (err) {
            console.error(err);
            return {
                message: 'Failed to add note',
                status: false
            }
        }
    }
)

export const editNote = api(
    {method: 'PUT', path: '/notes/:id', expose: true},
    async ({ id, note }: { id: number, note: string }): Promise<Response> => {
        try {
            await db.exec`UPDATE notes SET notes = ${note} WHERE id = ${id};`;
            return {
                message: 'Note updated',
                status: true
            }
        } catch (err) {
            console.error(err);
            return {
                message: 'Failed to update note',
                status: false
            }
        }
    }
)

export const deleteNote = api(
    {method: 'DELETE', path: '/notes/:id', expose: true},
    async ({ id }: { id: number }): Promise<Response> => {
        try {
            await db.exec`DELETE FROM notes WHERE id = ${id}`;
            return {
                message: 'Note deleted',
                status: true
            }
        } catch (err) {
            console.error(err);
            return {
                message: 'Failed to delete note',
                status: false
            }
        }
    }
)
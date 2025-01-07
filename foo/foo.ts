import { api } from "encore.dev/api";

export const test = api(
    {method: 'GET', expose: true},
    async (): Promise<Response> => {
        return {message: 'Hello world!'};
    }
);

interface Response { 
    message: string;
}
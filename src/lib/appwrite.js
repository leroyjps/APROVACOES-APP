// src/lib/appwrite.js
import { Client, Databases, Storage, ID } from "appwrite";

const client = new Client();

client
  .setEndpoint(import.meta.env.VITE_APPWRITE_PUBLIC_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export const databases = new Databases(client);
export const storage = new Storage(client);
export const IDHelper = ID;

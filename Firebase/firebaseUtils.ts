import { collection, doc, setDoc, updateDoc, deleteDoc, getDoc } from "firebase/firestore";
import { db } from "./initFirebase.js"; // Adjust path as needed

// Function to add a user
export const addUser = async (userData: { firstName: string; lastName: string; email: string }) => {
  const userRef = doc(collection(db, "users")); // Create a new document reference
  await setDoc(userRef, userData); // Set the user data
  return userRef.id; // Return the document ID
};


// Function to update a user
export const updateUser = async (userId: string, updatedData: any) => {
  const userRef = doc(db, "users", userId); // Reference to the specific user document
  await updateDoc(userRef, updatedData); // Update the user data
};


// Function to upload image (stub - implement with actual storage logic)
export const uploadImage = async (image: File, userId: any) => {
  // Implement Firebase Storage upload logic here
  // For now, return a placeholder URL
  return "https://example.com/placeholder-image.jpg";
};

// Function to delete a user
export const deleteUser = async (userId: string) => {
  const userRef = doc(db, "users", userId); // Reference to the specific user document
  await deleteDoc(userRef); // Delete the user document
};

// Function to read a user
export const getUser = async (userId: string) => {
  const userRef = doc(db, "users", userId); // Reference to the specific user document
  const userDoc = await getDoc(userRef); // Get the user document
  return userDoc.exists() ? userDoc.data() : null; // Return user data or null if not found
};

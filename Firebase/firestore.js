// firestoreService.js
import { db, storage } from './initFirebase';
import { collection, addDoc, doc, updateDoc, getDocs } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Function to add a new user
export const addUser = async (userData) => {
  try {
    const userRef = collection(db, 'users');
    const docRef = await addDoc(userRef, userData);
    return docRef.id;
  } catch (error) {
    console.error('Error adding user:', error);
    throw new Error('Error adding user');
  }
};

// Function to update a user
export const updateUser = async (userId, updateData) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, updateData);
  } catch (error) {
    console.error('Error updating user:', error);
    throw new Error('Error updating user');
  }
};

// Function to upload an image and get its URL
export const uploadImage = async (file, userId) => {
  try {
    const imageRef = ref(storage, `user-images/${userId}/${file.name}`);
    await uploadBytes(imageRef, file);
    const imageURL = await getDownloadURL(imageRef);
    return imageURL;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error('Error uploading image');
  }
};

// Function to fetch all users
export const fetchUsers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'users'));
    const users = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Error fetching users');
  }
};

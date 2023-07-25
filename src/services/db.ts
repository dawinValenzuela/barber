import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
} from 'firebase/firestore';

import { db } from '../../firebase/config';

export const addDocument = async (collectionName: string, data: any) => {
  return addDoc(collection(db, collectionName), data);
};

export const getDocument = async (collectionName: string, condition = []) => {
  const q = query(collection(db, collectionName), ...condition);
  const querySnapshot = await getDocs(q);
  const results = [];
  querySnapshot.forEach((doc) => {
    results.push({
      id: doc.id,
      ...doc.data(),
    });
  });
  return results;
};

export const updateDocument = async (
  collectionName: string,
  id: string,
  data: any
) => {
  const docRef = doc(db, collectionName, id);
  return updateDoc(docRef, data);
};

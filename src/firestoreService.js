import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase";

// collection ref
const shiftsCollection = collection(db, "shifts");

// Fetch all shifts
export async function fetchShifts() {
    const snapshot = await getDocs(shiftsCollection);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Add a new shift
export async function addShiftToFirestore(shiftData) {
    const docRef = await addDoc(shiftsCollection, shiftData);
    return docRef.id;
}

// Update shift
export async function updateShiftInFirestore(id, updatedData) {
    const docRef = doc(db, "shifts", id);
    await updateDoc(docRef, updatedData);
}

// Delete shift
export async function deleteShiftFromFirestore(id) {
    const docRef = doc(db, "shifts", id);
    await deleteDoc(docRef);
}
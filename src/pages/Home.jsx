import { useEffect, useState } from "react";
import { fetchShifts, addShiftToFirestore } from "../firestoreService";

import Shift from "../classes/Shift";
import ShiftsTable from "../components/ShiftsTable";
import AddShiftForm from "./AddShiftForm";

export default function Home() {
  const [shifts, setShifts] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // Fetch shifts from Firestore
  useEffect(() => {
    async function loadShifts() {
      const data = await fetchShifts();
      setShifts(data.map(d => new Shift(d.id, d.date, d.startTime, d.endTime, d.wage)));
    }
    loadShifts();
  }, []);

  // Add new shift
  async function addShift(newShift) {
    const id = await addShiftToFirestore(newShift);
    const newShiftInstance = new Shift(id, newShift.date, newShift.startTime, newShift.endTime);
    setShifts(prev => [...prev, newShiftInstance]);
  }

  return (
    <div>
      <h1>ברוכים הבאים למערכת המשמרות</h1>
      <ShiftsTable shifts={shifts} />
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "סגור טופס" : "הוסף משמרת"}
      </button>
      {showForm && <AddShiftForm addShift={addShift} />}
    </div>
  );
}
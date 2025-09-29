import { useEffect, useState } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebase";

import Shift from "../classes/Shift";
import ShiftsTable from "../components/ShiftsTable";
import AddShiftForm from "./AddShiftForm";

export default function Home() {
    const [shifts, setShifts] = useState([]);
    const [showForm, setShowForm] = useState(false);

    // Fetch shifts from Firestore
    useEffect(() => {
        async function fetchShifts() {
            const querySnapshot = await getDocs(collection(db, "shifts"));
            const shiftsData = querySnapshot.docs.map(doc => {
                const data = doc.data();
                return new Shift(
                    doc.id,
                    data.date,
                    data.startTime,
                    data.endTime,
                    data.wage || 44
                );
            });
            setShifts(shiftsData);
        }
        fetchShifts();
    }, []);

    // Add new shift
    async function handleAddShift(newShiftData) {
        try {
            const [year, month, day] = newShiftData.date.split("-").map(Number);
            const formattedDate = `${day}/${month}/${year}`;
            const dateObj = new Date(newShiftData.date);
            const dayName = dateObj.toLocaleDateString("he-IL", { weekday: "long" });

            const [startH, startM] = newShiftData.startTime.split(":").map(Number);
            const [endH, endM] = newShiftData.endTime.split(":").map(Number);
            let totalHours = (endH + endM / 60) - (startH + startM / 60);
            if (totalHours < 0) totalHours += 24;
            totalHours = Number(totalHours.toFixed(2));

            const wage = 44;
            const totalMoney = Number((totalHours * wage).toFixed(2));

            // Save to Firestore
            const docRef = await addDoc(collection(db, "shifts"), {
                date: newShiftData.date,
                day: dayName,
                startTime: newShiftData.startTime,
                endTime: newShiftData.endTime,
                totalHours: totalHours,
                totalMoney: totalMoney,
                wage: wage
            });

            // Add to local state
            const newShift = new Shift(
                docRef.id,
                newShiftData.date,
                newShiftData.startTime,
                newShiftData.endTime,
                wage
            );

            setShifts([...shifts, newShift]);
            setShowForm(false);
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    }

    return (
        <div>
            <h1>ברוכים הבאים למערכת המשמרות</h1>
            <ShiftsTable shifts={shifts} />
            <button onClick={() => setShowForm(!showForm)}>
                {showForm ? "סגור טופס" : "הוסף משמרת"}
            </button>
            {showForm && <AddShiftForm addShift={handleAddShift} />}
        </div>
    );
}
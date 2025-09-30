import { useState } from "react";
import EditShiftForm from "../pages/EditShiftForm";
import { updateShiftInFirestore } from "../firestoreService";
import DeleteMessage from "./DeleteMessage";

export default function ShiftsTable({ shifts, setShifts }) {
    const [editShift, setEditShift] = useState(null);
    const [showDeleteMessage, setDeleteMessage] = useState(null);

    function handleUpdateShift(shift) {
        setEditShift(shift);
        updateShiftInFirestore(shift.id, {
            date: shift.originalDate,
            day: shift.day,
            startTime: shift.startTime,
            endTime: shift.endTime,
            totalHours: shift.totalHours,
            totalMoney: shift.totalMoney,
        });
    }

    return (
        <div>
            <table style={{ margin: "20px auto", borderCollapse: "collapse", textAlign: "center" }}>
                <thead>
                    <tr>
                        <th>פעולות</th>
                        <th>סה״כ שכר</th>
                        <th>סה״כ שעות</th>
                        <th>סיום</th>
                        <th>התחלה</th>
                        <th>יום</th>
                        <th>תאריך</th>
                    </tr>
                </thead>
                <tbody>
                    {shifts.map((shift) => (
                        <tr key={shift.id}>
                            <td>
                                <button onClick={() => setDeleteMessage(shift.id)} style={{ backgroundColor: "red", color: "white", fontWeight: "bold" }}>מחק</button>
                                <button onClick={() => handleUpdateShift(shift)} style={{ backgroundColor: "blue", color: "white", fontWeight: "bold" }}>ערוך</button>
                            </td>
                            <td>{shift.totalMoney.toFixed(2)}₪</td>
                            <td>{shift.totalHours}</td>
                            <td>{shift.endTime}</td>
                            <td>{shift.startTime}</td>
                            <td>{shift.day}</td>
                            <td>{shift.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showDeleteMessage && <DeleteMessage showDeleteMessage={showDeleteMessage} setDeleteMessage={setDeleteMessage} shifts={shifts} setShifts={setShifts} />}

            {editShift && <EditShiftForm editShift={editShift} handleUpdateShift={handleUpdateShift} setEditShift={setEditShift} />}
        </div>
    );
}
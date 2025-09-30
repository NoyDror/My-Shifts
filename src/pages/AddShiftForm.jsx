import { useState } from "react";

export default function AddShiftForm({ addShift, setShowForm }) {
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        addShift({date, startTime, endTime});
        setDate("");
        setStartTime("");
        setEndTime("");
        setShowForm(false);
    }

    return (
        <div style={{ margin: "20px auto", padding: "20px", border: "2px solid black", borderRadius: "8px", maxWidth: "250px" }}>
            <form onSubmit={handleSubmit}>
                <h3>הוסף משמרת</h3>
                <label style={{ display: "flex", justifyContent: "center" }}>:תאריך</label>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
                    <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
                </div>
                <label style={{ display: "flex", justifyContent: "center" }}>:שעת התחלה</label>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
                    <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} required />
                </div>
                <label style={{ display: "flex", justifyContent: "center" }}>:שעת סיום</label>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
                    <input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} required />
                </div>
                <button type="submit">הוסף</button>
            </form>
        </div>
    );
}
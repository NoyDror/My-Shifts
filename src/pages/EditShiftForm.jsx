export default function EditShiftForm({ editShift, handleUpdateShift, setEditShift }) {
    function handleSubmit(e) {
        e.preventDefault();
        handleUpdateShift(editShift);
        setEditShift(null);
    }

    return (
        <div style={{ margin: "20px auto", padding: "20px", border: "2px solid black", borderRadius: "8px", maxWidth: "250px" }}>
            <form>
                <h3>ערוך משמרת</h3>
                <label style={{ display: "flex", justifyContent: "center" }}>:תאריך</label>

                <input
                    type="date"
                    value={editShift.originalDate}
                    onChange={(e) => handleUpdateShift({ ...editShift, originalDate: e.target.value })}
                />
                <br />
                <label style={{ display: "flex", justifyContent: "center" }}>:שעת התחלה</label>

                <input
                    type="time"
                    value={editShift.startTime}
                    onChange={(e) => handleUpdateShift({ ...editShift, startTime: e.target.value })}
                />
                <br />
                <label style={{ display: "flex", justifyContent: "center" }}>:שעת סיום</label>

                <input
                    type="time"
                    value={editShift.endTime}
                    onChange={(e) => handleUpdateShift({ ...editShift, endTime: e.target.value })}
                />
                <div>
                    <button onSubmit={handleSubmit} type="submit">שמור</button>
                </div>
            </form>
        </div>
    );
}
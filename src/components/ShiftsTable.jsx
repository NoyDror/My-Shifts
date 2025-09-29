export default function ShiftsTable({ shifts }) {
    return (
        <table style={{ margin: "20px auto", borderCollapse: "collapse", textAlign: "center" }}>
            <thead>
                <tr>
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
    );
}
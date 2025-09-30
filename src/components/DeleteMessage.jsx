import { useNavigate } from "react-router-dom";
import { deleteShiftFromFirestore } from "../firestoreService";

export default function DeleteMessage({ showDeleteMessage, setDeleteMessage, shifts, setShifts }) {
    const navigate = useNavigate();


    function handleCancel() {
        setDeleteMessage(null);
        navigate("/");
    }

    async function handleConfirm(id) {
        const old = [...shifts];
        setShifts(prev => prev.filter(s => s.id !== id));

        try {
            await deleteShiftFromFirestore(id);
            setDeleteMessage(null);
            navigate("/");
        } catch (err) {
            console.error("Delete failed, restoring state:", err);
            setShifts(old);
        }
    }
    return (
        <div style={{ backgroundColor: "wheat", color: "green", textAlign: "center", border: "2px solid green", borderRadius: "8px", maxWidth: "250px", margin: "20px auto", padding: "10px", fontWeight: "bold" }}>
            <p>?האם בטוח למחוק את המשמרת</p>
            <div>
                <button onClick={() => handleCancel()}>בטל</button>
                <button onClick={() => handleConfirm(showDeleteMessage)}>אשר</button>
            </div>
        </div>
    );
}
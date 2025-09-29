class Shift {
    constructor(id, date, startTime, endTime, wage = 44) {
        this.id = id;
        this.originalDate = date;
        this.date = this.formatDate(this.originalDate);
        this.day = this.getDayName(this.originalDate);
        this.startTime = startTime;
        this.endTime = endTime;
        this.wage = wage;
        this.totalHours = this.calculateTotalHours(startTime, endTime);
        this.totalMoney = this.calculateTotalMoney(this.totalHours, wage);
    }

    formatDate(date) {
        if (!date) return "";
        const [year, month, day] = date.split("-").map(Number);
        return `${day}/${month}/${year}`;
    }

    getDayName(dateString) {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString('he-IL', { weekday: 'long' });
    }

    calculateTotalHours(startTime, endTime) {
        if (!startTime || !endTime) return 0;
        const [startH, startM] = startTime.split(":").map(Number);
        const [endH, endM] = endTime.split(":").map(Number);
        let total = (endH + endM / 60) - (startH + startM / 60);
        if (total < 0) total += 24;
        return Number(total.toFixed(2));
    }

    calculateTotalMoney(totalHours, wage) {
        return totalHours * wage;
    }
}
export default Shift;
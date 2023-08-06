/**
 * get a string represent to [today, 2 years later]
 * @returns {string}
 */
export function getTimeRange() {
        const date = new Date();
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const today = `${year}-${month}-${day}`;
        const todayDate = new Date(today);
        todayDate.setFullYear(date.getFullYear() + 2);
        const twoYLater = todayDate.toISOString().slice(0, 10);
        return [today, twoYLater];
    }
/**
 * get today's each values
 * @returns {string[]}
 */
export function getToday() {
    const now = new Date();
    const y = now.getFullYear();
    const m = now.getMonth() + 1;
    const d = now.getDate();
    const year = String(y);
    const month = String(m).padStart(2, '0');
    const date = String(d).padStart(2, '0');
    const dayOfWeek = String(now.getDay());

    return [year, month, date, dayOfWeek];
}
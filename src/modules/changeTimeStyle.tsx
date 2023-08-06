/**
 * get today's each values
 * @returns {string[]}
 */
export function changeTimeStyle(time: string | number) {
    switch (typeof time) {
        case 'string':
            const [hours1, minutes1] = time.split(':');
            return parseInt(hours1) + parseInt(minutes1) / 60;
        case 'number':
            const date = new Date();
            date.setHours(time, 0, 0);
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
        default:
            throw new Error('Something wrong with an argument!')
    }

}
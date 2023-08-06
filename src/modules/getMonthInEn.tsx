export function getMonthInEn(num: number) {
    const monthEnArr: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return monthEnArr[num - 1];
}
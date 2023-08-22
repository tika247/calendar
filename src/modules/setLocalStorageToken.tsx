/**
 * setLocalStorageToken
 * @param key 
 * @param token 
 */
export async function setLocalStorageToken(key: string, token: string) {
    const now = new Date();
    const period = 24 * 60 * 60 * 1000; // 1 day
    const item = {
        value: token,
        expiry: now.getTime() + period,
    };
    localStorage.setItem(key, JSON.stringify(item));
}
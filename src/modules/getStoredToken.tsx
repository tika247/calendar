import { CustomSelector } from 'src/store/operator';
import type { TokenType } from 'src/const/type'

export function getStoredToken() {
    return CustomSelector("token") as TokenType;
}
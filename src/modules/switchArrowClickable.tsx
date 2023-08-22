import type { Obj } from 'src/const/type';

/**
 * validate entered
 */
export function switchArrowClickable(enteredText: Obj<string>) {
    return Object.values(enteredText).some((val) => val.length === 0) ? false : true;
}
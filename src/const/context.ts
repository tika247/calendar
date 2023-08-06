import { Context, createContext } from 'react';
import type { CtxHookType } from 'src/const/type';

export const CtxHook: Context<CtxHookType> = createContext<CtxHookType>({
  isDev: true,
});
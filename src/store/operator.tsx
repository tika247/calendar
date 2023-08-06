import { useAppDispatch, useAppSelector } from 'src/store/hooks'
import { reducers } from 'src/store/store'
import { RootState } from 'src/const/type';
/**
 * Redux Operator
 */
function CustomSelector(name: keyof RootState['redux']) {
  const state = (state: RootState) => state.redux[name];
  const selector = useAppSelector(state);
  return selector;
}

function CustomDispatch() {
  const dispatch = useAppDispatch();

  return (method: keyof typeof reducers, newVal :any) => {
      dispatch(reducers[method](newVal));
  };
}

export { CustomSelector, CustomDispatch };

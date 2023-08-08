import { createGlobalState } from 'react-hooks-global-state';

const initialState = {
  signupData:{},
  isLogin:true
};
export const { useGlobalState } = createGlobalState(initialState);

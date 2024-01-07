import { createReducer, on } from "@ngrx/store";

// import { User } from "../../users/user.model";
// import { patchUserDetails, setUsers } from "./users.actions";
import { User } from "../user-table/user-table.model";
import { patchUserDetails, setUsers } from "./store.actions";

// const initialState: User[] = [];

// export const userReducer = createReducer(
//     initialState,
//     on(setUsers, (state, action) => action.data),
//     on(patchUserDetails, (state, { data }) => {
//         const newUserList = [...state];
//         newUserList[data.id - 1] = data;
//         return newUserList;
//     })
// );
const initialState: User[] = [];

export const userReducer = createReducer(
  initialState,
  on(setUsers, (state, action) => action.data),
  on(patchUserDetails, (state, { data }) => {
    const userIdx = state.findIndex(user => user.id === data.id);
    
    if (userIdx !== -1) {
      const updatedState = [...state];
      updatedState[userIdx] = { ...state[userIdx], ...data };
      return updatedState;
    }
    return state;
  })
);
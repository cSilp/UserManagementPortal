
import { User } from "../user-table/user-table.model";
import { userReducer } from "./store.reducer";
// import { userReducer } from "./users.reducer";

export const initialState = {
    users: userReducer
};

export interface StoreDetails {
    users?: User[];
}

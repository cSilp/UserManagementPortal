
import { User } from "../user-table/user-table.model";
import { userReducer } from "./store.reducer";

export const initialState = {
    users: userReducer
};

export interface StoreDetails {
    users?: User[];
}

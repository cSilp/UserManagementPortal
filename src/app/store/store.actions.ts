import { createAction, props } from "@ngrx/store";
import { User } from "../user-table/user-table.model";

export const fetchUsers = createAction(
    '[Users] Init'
);

export const setUsers = createAction(
    '[Users] Set',
    props<{data: User[]}>()
)

export const patchUserDetails = createAction(
    '[Users] Patch',
    props<{ data: User }>()
  );
  
export const setUsersError = createAction(
    '[Users] Set Error',
    props<{ error: any }>()
);
import { Actions, createEffect, ofType } from "@ngrx/effects";
// import { fetchUsers, setUsers, setUsersError } from "./users.actions";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { Injectable } from "@angular/core";
import { UserService } from "../user-table/user.service";
import { fetchUsers, setUsers, setUsersError } from "./store.actions";
// import { UserServiceService } from "../user-table/user-service.service";

@Injectable()
export class UsersEffects {
  loadUsers = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchUsers),
      switchMap(() =>
        this.usersService.getUsers().pipe(
          map((res) => setUsers({ data: res.users.map(user => ({ ...user })) })),
          catchError((error) => of(setUsersError({ error })))
        )
      )
    )
  );

  
  constructor(private actions$: Actions, private usersService: UserService) {}
  
}
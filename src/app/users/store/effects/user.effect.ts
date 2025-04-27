import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  concatMap,
  exhaustMap,
  map,
  mergeMap,
} from 'rxjs/operators';
import { of } from 'rxjs';
import {
  addPermissionsToUser,
  addPermissionsToUserFailed,
  addRolesToUser,
  addRolesToUserFailed,
  createUser,
  createUserFailed,
  createUserSuccess,
  deletePermissionsToUser,
  deletePermissionsToUserFailed,
  deleteRolesToUser,
  deleteRolesToUserFailed,
  deleteUsers,
  deleteUsersFailed,
  fetchUserPermissions,
  fetchUserPermissionsFailed,
  fetchUserPermissionsSuccess,
  fetchUserRoles,
  fetchUserRolesFailed,
  fetchUserRolesSuccess,
  fetchUsers,
  fetchUsersFailed,
  fetchUsersSuccess,
  updateUserStatus,
  updateUserStatusFailed,
} from '../actions/user.action';
import { UsersService } from '../../services/user.service';

@Injectable()
export class UsersEffect {
  constructor(
    private readonly actions$: Actions,
    private readonly usersService: UsersService
  ) {}

  fetchUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchUsers),
      exhaustMap(() =>
        this.usersService.fetchUsers().pipe(
          map((response) => {
            return fetchUsersSuccess({ users: response });
          }),
          catchError((error) => of(fetchUsersFailed({ errors: error })))
        )
      )
    )
  );

  fetchUserRoles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchUserRoles),
      exhaustMap(({ id }) =>
        this.usersService.fetchUserRoles(id).pipe(
          map((response) => {
            return fetchUserRolesSuccess({ roles: response });
          }),
          catchError((error) => of(fetchUserRolesFailed({ errors: error })))
        )
      )
    )
  );

  addRolesToUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addRolesToUser),
      exhaustMap(({ ids, userId }) =>
        this.usersService.addRolesToUser(userId, ids).pipe(
          map(() => {
            return fetchUserRoles({ id: userId });
          }),
          catchError((error) => of(addRolesToUserFailed({ error: error })))
        )
      )
    )
  );

  deleteRolesToUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteRolesToUser),
      exhaustMap(({ ids, userId }) =>
        this.usersService.deleteRolesToUser(userId, ids).pipe(
          map(() => {
            return fetchUserRoles({ id: userId });
          }),
          catchError((error) => of(deleteRolesToUserFailed({ error: error })))
        )
      )
    )
  );

  fetchUserPermissions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchUserPermissions),
      exhaustMap(({ id }) =>
        this.usersService.fetchUserPermissions(id).pipe(
          map((response) => {
            return fetchUserPermissionsSuccess({ permissions: response });
          }),
          catchError((error) =>
            of(fetchUserPermissionsFailed({ error: error }))
          )
        )
      )
    )
  );

  addPermissionsToUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addPermissionsToUser),
      exhaustMap(({ ids, userId }) =>
        this.usersService.addPermissionsToUser(userId, ids).pipe(
          map(() => {
            return fetchUserPermissions({ id: userId });
          }),
          catchError((error) =>
            of(addPermissionsToUserFailed({ error: error }))
          )
        )
      )
    )
  );

  deletePermissionsToUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deletePermissionsToUser),
      exhaustMap(({ ids, userId }) =>
        this.usersService.deletePermissionsToUser(userId, ids).pipe(
          map(() => {
            return fetchUserPermissions({ id: userId });
          }),
          catchError((error) =>
            of(deletePermissionsToUserFailed({ error: error }))
          )
        )
      )
    )
  );

  updateUsersStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUserStatus),
      exhaustMap(({ id, status }) =>
        this.usersService.updateUserStatus(id, status).pipe(
          map(() => {
            return fetchUsers();
          }),
          catchError((error) =>
            of(updateUserStatusFailed({ error: error }), fetchUsers())
          )
        )
      )
    )
  );

  createUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createUser),
      exhaustMap(({ user }) =>
        this.usersService.createUser(user).pipe(
          concatMap((createdUser) => [
            createUserSuccess({ user: createdUser }),
            fetchUsers(),
          ]),
          catchError((error) => of(createUserFailed({ error }), fetchUsers()))
        )
      )
    )
  );

  deleteUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteUsers),
      exhaustMap(({ userIds }) =>
        this.usersService.deleteUsers(userIds).pipe(
          map(() => {
            return fetchUsers();
          }),
          catchError((error) =>
            of(deleteUsersFailed({ error: error }), fetchUsers())
          )
        )
      )
    )
  );
}

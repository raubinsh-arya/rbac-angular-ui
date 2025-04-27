import { ActionReducerMap } from '@ngrx/store';
import { usersReducer, UsersState } from './users.reducer';
import {
  userRolesReducer,
  UserRolesState,
} from './user-roles.reducer';
import {
  permissionsReducer,
  PermissionsState,
} from './permissions.reducer';
import { rolesReducer, RolesState } from './roles.reducer';
import {
  userPermissionsReducer,
  UserPermissionsState,
} from './user-permissions.reducer';
import { createUserReducer, CreateUsersState } from './create-user.reducer';

export interface UsersRootState {
  users: UsersState;
  userRoles: UserRolesState;
  userPermissions: UserPermissionsState;
  roles: RolesState;
  permissions: PermissionsState;
  createUser: CreateUsersState
}

export const usersRootreducers: ActionReducerMap<UsersRootState> = {
  users: usersReducer,
  userRoles: userRolesReducer,
  userPermissions: userPermissionsReducer,
  roles: rolesReducer,
  permissions: permissionsReducer,
  createUser: createUserReducer
};

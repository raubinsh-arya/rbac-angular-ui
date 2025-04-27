import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersRootState } from '../reducers';

export const selectUsersRootState =
  createFeatureSelector<UsersRootState>('users');
// Users
export const selectUsersState = createSelector(
  selectUsersRootState,
  (state) => state.users
);
export const selectUsers = createSelector(
  selectUsersState,
  (state) => state.users
);
export const selectUsersLoading = createSelector(
  selectUsersState,
  (state) => state.loading
);
export const selectUsersError = createSelector(
  selectUsersState,
  (state) => state.errors
);
// Select User Roles
export const selectUserRolesState = createSelector(
  selectUsersRootState,
  (state) => state.userRoles
);

export const selectUserRoles = createSelector(
  selectUserRolesState,
  (state) => state.userRoles
);
export const selectUserRolesLoading = createSelector(
  selectUserRolesState,
  (state) => state.loading
);
export const selectUserRolesError = createSelector(
  selectUserRolesState,
  (state) => state.errors
);

//Select User Permissions
export const selectUserPermissionsState = createSelector(
  selectUsersRootState,
  (state) => state.userPermissions
);

export const selectUserPermissions = createSelector(
  selectUserPermissionsState,
  (state) => state.userPermissions
);
export const selectUserPermissionsLoading = createSelector(
  selectUserPermissionsState,
  (state) => state.loading
);
export const selectUserPermissionsError = createSelector(
  selectUserPermissionsState,
  (state) => state.error
);

//create User
export const createUserState = createSelector(
  selectUsersRootState,
  (state) => state.createUser
);

export const selectCreateUserLoading = createSelector(
  createUserState,
  (state) => state.loading
);
export const selectCreateUserSuccess = createSelector(
  createUserState,
  (state) => state.user
);
export const selectCreateUserError = createSelector(
  createUserState,
  (state) => state.error
);

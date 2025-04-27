import { createAction, props } from '@ngrx/store';
import { UserProfileResponseType } from '../../../models/user.model';
import { RoleType } from '../../../models/role.model';
import { PermissionType } from '../../../models/permission.model';

export const fetchUsers = createAction('[USERS][FETCH] FETCH USERS');
export const fetchUsersSuccess = createAction(
  '[USERS][FETCH] FETCH USERS SUCCESS',
  props<{ users: Array<UserProfileResponseType> }>()
);
export const fetchUsersFailed = createAction(
  '[USERS][FETCH] FETCH USERS FAILED',
  props<{ errors: Array<{ message: string }> | null }>()
);
export const fetchUserRoles = createAction(
  '[USERS][FETCH][ROLES] FETCH USERS ROLES',
  props<{ id: string }>()
);
export const fetchUserRolesSuccess = createAction(
  '[USERS][FETCH][ROLES] FETCH USERS ROLES SUCCESS',
  props<{ roles: Array<RoleType> }>()
);
export const fetchUserRolesFailed = createAction(
  '[USERS][FETCH][ROLES] FETCH USERS ROLES FAILED',
  props<{ errors: Array<{ message: string }> }>()
);
// user status update
export const updateUserStatus = createAction(
  '[USERS][STATUS][UPDATE] USERS STATUS UPDATE',
  props<{ id: number; status: string }>()
);
export const updateUserStatusSuccess = createAction(
  '[USERS][STATUS][UPDATE][SUCCESS] USERS STATUS UPDATE SUCCESS',
  props<{ roles: any }>()
);
export const updateUserStatusFailed = createAction(
  '[USERS][STATUS][UPDATE][FAILED] USERS STATUS UPDATE FAILED',
  props<{ error: string }>()
);

//Roles
export const fetchRoles = createAction(
  '[USERS][ROLES][FETCH][ROLES] FETCH ROLES'
);
export const fetchRolesSuccess = createAction(
  '[USERS][ROLES][FETCH][ROLES] FETCH ROLES SUCCESS',
  props<{ roles: Array<RoleType> }>()
);
export const fetchRolesFailed = createAction(
  '[USERS][ROLES][FETCH][ROLES] FETCH ROLES FAILED',
  props<{ error: string }>()
);
//add Roles
export const addRolesToUser = createAction(
  '[USERS][ADD][ROLES][USER] ADD ROLES TO USER',
  props<{ userId: string; ids: Array<string> }>()
);
export const addRolesToUserSuccess = createAction(
  '[USERS][ADD][ROLES][USER][SUCCESS] ADD ROLES TO USER SUCCESS',
  props<{ roles: Array<RoleType> }>()
);
export const addRolesToUserFailed = createAction(
  '[USERS][ADD][ROLES][USER][FAILED] ADD ROLES TO USER FAILED',
  props<{ error: string }>()
);
//delete Roles
export const deleteRolesToUser = createAction(
  '[USERS][DELETE][ROLES][USER] DELETE ROLES TO USER',
  props<{ userId: string; ids: Array<string> }>()
);
export const deleteRolesToUserSuccess = createAction(
  '[USERS][DELETE][ROLES][USER][SUCCESS] DELETE ROLES TO USER SUCCESS',
  props<{ roles: Array<RoleType> }>()
);
export const deleteRolesToUserFailed = createAction(
  '[USERS][DELETE][ROLES][USER][FAILED] DELETE ROLES TO USER FAILED',
  props<{ error: string }>()
);

// Permissions
export const fetchUserPermissions = createAction(
  '[USERS][FETCH][PERMISSIONS] FETCH USERS PERMISSIONS',
  props<{ id: string }>()
);
export const fetchUserPermissionsSuccess = createAction(
  '[USERS][FETCH][PERMISSIONS] FETCH USERS PERMISSIONS SUCCESS',
  props<{ permissions: Array<PermissionType> }>()
);
export const fetchUserPermissionsFailed = createAction(
  '[USERS][FETCH][PERMISSIONS] FETCH USERS PERMISSIONS FAILED',
  props<{ error: string }>()
);
// fetch permissions
export const fetchPermissions = createAction(
  '[USERS][PERMISSIONS][FETCH][PERMISSIONS] FETCH PERMISSIONS'
);
export const fetchPermissionsSuccess = createAction(
  '[USERS][PERMISSIONS][FETCH][PERMISSIONS][SUCCESS] FETCH PERMISSIONS SUCCESS',
  props<{ permissions: Array<RoleType> }>()
);
export const fetchPermissionsFailed = createAction(
  '[USERS][PERMISSIONS][FETCH][PERMISSIONS][FAILED] FETCH PERMISSIONS FAILED',
  props<{ error: string }>()
);

//add permissions to user
export const addPermissionsToUser = createAction(
  '[USERS][ADD][PERMISSIONS][USER] ADD PERMISSIONS TO USER',
  props<{ userId: string; ids: Array<string> }>()
);
export const addPermissionsToUserSuccess = createAction(
  '[USERS][ADD][PERMISSIONS][USER][SUCCESS] ADD PERMISSIONS TO USER SUCCESS',
  props<{ permissions: Array<PermissionType> }>()
);
export const addPermissionsToUserFailed = createAction(
  '[USERS][ADD][PERMISSIONS][USER][FAILED] ADD PERMISSIONS TO USER FAILED',
  props<{ error: string }>()
);
//delete Permissions from user
export const deletePermissionsToUser = createAction(
  '[USERS][DELETE][PERMISSIONS][USER] DELETE PERMISSIONS TO USER',
  props<{ userId: string; ids: Array<string> }>()
);
export const deletePermissionsToUserSuccess = createAction(
  '[USERS][DELETE][PERMISSIONS][USER][SUCCESS] DELETE PERMISSIONS TO USER SUCCESS',
  props<{ permissions: Array<RoleType> }>()
);
export const deletePermissionsToUserFailed = createAction(
  '[USERS][DELETE][PERMISSIONS][USER][FAILED] DELETE PERMISSIONS TO USER FAILED',
  props<{ error: string }>()
);
//create user
export const createUser = createAction(
  '[USERS][CREATE] CREATE USER',
  props<{ user: UserProfileResponseType }>()
);
export const createUserSuccess = createAction(
  '[USERS][CREATE][SUCCESS] CREATE USER SUCCESS',
  props<{ user: UserProfileResponseType }>()
);
export const createUserFailed = createAction(
  '[USERS][CREATE][FAILED] CREATE USER FAILED',
  props<{ error: string }>()
);
//delete users
export const deleteUsers = createAction(
  '[USERS][DELETE] DELETE TO USERS',
  props<{ userIds: Array<number> }>()
);
export const deleteUsersSuccess = createAction(
  '[USERS][DELETE][SUCCESS] DELETE TO USERS SUCCESS',
  props<{ permissions: Array<RoleType> }>()
);
export const deleteUsersFailed = createAction(
  '[USERS][DELETE][FAILED] DELETE TO USERS FAILED',
  props<{ error: string }>()
);

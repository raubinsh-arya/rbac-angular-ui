import { createReducer, on } from '@ngrx/store';
import { UserProfileResponseType } from '../../../models/user.model';
import {
  createUser,
  createUserFailed,
  createUserSuccess,
} from '../actions/user.action';

export interface CreateUsersState {
  error: string | null;
  loading: boolean;
  user: UserProfileResponseType | null;
}

export const initialState: CreateUsersState = {
  error: null,
  loading: false,
  user: null,
};

export const createUserReducer = createReducer(
  initialState,
  on(createUser, (state) => ({ ...state, loading: true, users: null })),
  on(createUserSuccess, (state, { user }) => ({
    ...state,
    loading: false,
    user,
  })),
  on(createUserFailed, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    user: null,
  }))
);

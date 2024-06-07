import { createSlice } from '@reduxjs/toolkit'

export const thisUserSlice = createSlice({
  name: 'thisUser',
  initialState: {
    accessToken: null,
    refreshToken: null,
    user: {
      id: null,
      roles: []
    }
  },
  reducers: {
    login: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.user.id = action.payload.user.id;
      state.user.roles = action.payload.user.roles;
    },
    logout: state => {
      state = {
        accessToken: null,
        refreshToken: null,
        user: {
          id: null,
          roles: []
        }
      };
    }
  }
})

export const { login, logout} = thisUserSlice.actions
export const selectAccessToken = state => state.thisUser.accessToken;
export const selectThisUserId = state => state.thisUser.user.id;
export const selectUserRole = state => state.thisUser.user.roles[0];
export default thisUserSlice.reducer

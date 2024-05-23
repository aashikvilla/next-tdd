import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'

export interface UserState {
  userId: string,
  firstName: string,
  lastName: string,
  token: string,
}

export const initialUserState: UserState = {
  userId: "",
  firstName: "",
  lastName: "",
  token: "",
}

export const userSlice = createSlice({
  name: 'user',  
  initialState:initialUserState,
  reducers: {
    loginUser: (state, action: PayloadAction<UserState>) => {     
      state.userId = action.payload.userId;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.token = action.payload.token;
    },
    logoutUser: (state) => {
      state.userId = initialUserState.userId;
      state.firstName = initialUserState.firstName;
      state.lastName = initialUserState.lastName;
      state.token = initialUserState.token;
    },
  },
})

export const { loginUser, logoutUser } = userSlice.actions

export default userSlice.reducer

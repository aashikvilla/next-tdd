import { mockUserData } from "@/__tests__/__fixtures__/store";
import userReducer, { initialUserState, loginUser, logoutUser } from "@/app/store/features/user/userSlice";


describe('user slice', () => {

    it('should return the initial state on first run', () => {
      const result = userReducer(undefined, { type: '' });

      expect(result).toEqual(initialUserState);
    });

    it('should properly set the user data when loginUser action is dispatched', () => {
      const userData = mockUserData;
      
      const nextState = userReducer(initialUserState, loginUser(userData));

      expect(nextState).toEqual(userData);
    });

    it('should reset to initial state when logoutUser action is dispatched', () => {
    
      const nextState = userReducer(mockUserData, logoutUser());

      expect(nextState).toEqual(initialUserState);
    });
  });


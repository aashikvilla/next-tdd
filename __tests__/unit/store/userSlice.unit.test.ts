import { mockUserData } from "@/__tests__/__fixtures__/store";
import userReducer, { UserState, initialUserState, loginUser, logoutUser } from "@/app/store/features/user/userSlice";


describe('user slice', () => {

    it('should return the initial state on first run', () => {
      const result = userReducer(undefined, { type: '' });

      expect(result).toEqual(initialUserState);
    });

    it('should properly set the user data when loginUser action is dispatched', () => {
        const data = mockUserData;
        const expectedState = {
          ...data
        };
  
      const nextState = userReducer(initialUserState, loginUser(data));

      expect(nextState).toEqual(data);
    });

    it('should reset to initial state when logoutUser action is dispatched', () => {
      // Arrange
      const mockUserData1: UserState = {
        userId: "1",
        firstName: "John",
        lastName: "Doe",
        token: "token123",
      };
      const preLogoutState = {
        ...initialUserState,
        ...mockUserData1
      };

      // Act
      const nextState = userReducer(preLogoutState, logoutUser());

      // Assert
      expect(nextState).toEqual(initialUserState);
    });
  });


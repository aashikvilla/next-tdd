import { UserState } from "@/app/store/features/user/userSlice";
import { faker } from "@faker-js/faker";

export const mockUserData: UserState = {
  userId: faker.string.uuid(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  token: faker.string.alphanumeric(),
};

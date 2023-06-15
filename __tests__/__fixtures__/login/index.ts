import { faker} from '@faker-js/faker';
export const LoginFakeData = {
  validCredentials: {
    email: faker.internet.email(),
    password: faker.internet.password(),
  },
  invalidCredentials: {
    email: "1Javonte11@yahoo.com",
    password: "18oO9wlzQDWCMolU",
  },
  invalidEmail: faker.person.fullName(),
  invalidPassword: faker.person.fullName(),
  shortPassword: faker.internet.password().substring(0, 6),
};
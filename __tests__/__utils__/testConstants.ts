import { faker} from '@faker-js/faker';

export const LoginConstants = {
  validCredentials: {
    email: "1Javonte11@yahoo.com",
    password: "18oO9wlzQDWCMolU",
    // email: faker.internet.email(),
    // password: faker.internet.password()
  },
  invalidCredentials: {
    email: faker.internet.email(),
    password: faker.internet.password(),
  },
  invalidEmail: faker.person.fullName(),
  invalidPassword: faker.person.fullName(),
  shortPassword:faker.internet.password().substring(0,6),
  emailLabel: /email/i,
  passwordLabel: /password/i,
  loginButton: /login/i,
  registerLink: /register/i,
  passwordIsRequired: "Password is required",
  passwordLengthError: "Password should be at least 8 characters long",
  passwordTypeError: "Password should contain at least 1 number, lowercase and uppercase letter",
  emailIsRequired: "Email is required",
  invalidEmailFormat: "Email should be in proper format: abc@example.com",
};
  
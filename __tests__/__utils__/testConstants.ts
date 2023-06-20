export const LoginTestConstants = {
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
  
export const HeaderTestConstants={
  loginButton: /login/i,
  logoutButton: /logout/i,
}

export const DashboardTestConstants={
  Columns : ['Id','Title','Description','Status','Priority','Action'],
  DashboardHeading :/Dashboard/i,
  Status : ['NOT STARTED', 'IN PROGRESS','COMPLETED']
}
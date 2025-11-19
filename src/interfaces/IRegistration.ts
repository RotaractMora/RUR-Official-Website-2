export interface RegistrationConfig {
  allowCompanySignUp: boolean;
  allowCompanySignIn: boolean;
  allowStudentSignUp: boolean;
  allowStudentSignIn: boolean;
}

export interface RegistrationStatus {
  company: {
    signUp: boolean;
    signIn: boolean;
  };
  student: {
    signUp: boolean;
    signIn: boolean;
  };
}

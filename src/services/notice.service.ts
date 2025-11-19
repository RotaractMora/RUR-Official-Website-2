import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { app } from './firebaseConfig';
import { RegistrationConfig, RegistrationStatus } from '../interfaces/IRegistration';

// Initialize Firestore
const db = getFirestore(app);

// Get registration status
export const getRegistrationStatus = async (): Promise<RegistrationStatus | null> => {
  try {
    const configDoc = await getDoc(doc(db, 'campaigns', 'rur-25'));
    const data = configDoc.data() as RegistrationConfig | undefined;

    if (!data) {
      console.warn('Registration configuration not found');
      return null;
    }

    return {
      company: {
        signUp: data.allowCompanySignUp ?? false,
        signIn: data.allowCompanySignIn ?? false,
      },
      student: {
        signUp: data.allowStudentSignUp ?? false,
        signIn: data.allowStudentSignIn ?? false,
      },
    };
  } catch (error) {
    console.error('Error fetching registration status:', error);
    return null;
  }
};

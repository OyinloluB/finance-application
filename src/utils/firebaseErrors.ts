const firebaseErrorMessages: Record<string, string> = {
  "auth/email-already-in-use": "This email is already in use.",
  "auth/user-not-found": "No user found with this email.",
  "auth/wrong-password": "Incorrect password.",
  "auth/invalid-email": "Invalid email address.",
  "auth/weak-password": "Password should be at least 6 characters.",
  "auth/network-request-failed":
    "Network error. Please check your internet connection.",
  "auth/too-many-requests": "Too many attempts. Please try again later.",
};

/**
 * type guard to check if an error is a Firebase authentication error.
 */
const isFirebaseAuthError = (error: unknown): error is { code: string } => {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof (error as Record<string, unknown>).code === "string"
  );
};

export const getFirebaseErrorMessage = (error: unknown): string => {
  if (!isFirebaseAuthError(error)) {
    return "An unexpected error occurred.";
  }

  return firebaseErrorMessages[error.code] ?? "An unexpected error occurred.";
};

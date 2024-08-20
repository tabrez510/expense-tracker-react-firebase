import { authActions } from "./auth";

export const loginUser = (email, password) => {
  return async (dispatch) => {
    const firebaseApiKey = process.env.REACT_APP_FIREBASE_API_KEY;

    try {
      const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseApiKey}`,
        {
          method: "POST",
          body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        let errorMessage = "Authentication failed!";
        if (data && data.error && data.error.message) {
          errorMessage = data.error.message;
        }
        throw new Error(errorMessage);
      }

      dispatch(authActions.login({ token: data.idToken, uid: data.localId }));
    } catch (err) {
      throw new Error(err.message || "Something went wrong!");
    }
  };
};

export const signUpUser = (email, password) => {
  return async (dispatch) => {
    const firebaseApiKey = process.env.REACT_APP_FIREBASE_API_KEY;

    try {
      const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebaseApiKey}`,
        {
          method: "POST",
          body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        let errorMessage = "Sign up failed!";
        if (data && data.error && data.error.message) {
          errorMessage = data.error.message;
        }
        throw new Error(errorMessage);
      }

      dispatch(authActions.login({ token: data.idToken, uid: data.localId }));
    } catch (err) {
      throw new Error(err.message || "Something went wrong!");
    }
  };
};


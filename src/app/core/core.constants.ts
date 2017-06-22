import { FirebaseAuthProvider } from "./providers/auth-providers/firebase-auth.provider";

export const coreConstants = () => {
    const options = {
        "MAIN_TOAST_POSITION": "bottom left",
        "AUTH": {
            "PROVIDER": FirebaseAuthProvider,
        },
    };

    return options;
};
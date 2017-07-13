import { FirebaseAuthProvider, FirebaseRequestProvider } from "./providers";

export const coreConstants = () => {
    const options = {
        "MAIN_TOAST_POSITION": "bottom left",
        "AUTH": {
            "PROVIDER": FirebaseAuthProvider,
        },
        "REQUEST": {
            "PROVIDER": FirebaseRequestProvider,
            "ROUTES": {
                "CONTRIBUTION": "contribution"
            }
        }
    };

    return options;
};
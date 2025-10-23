import { LogLevel } from '@azure/msal-browser';

export const msalConfig = {
    auth: {
        clientId: import.meta.env.VITE_MSAL_CLIENT_ID,
        authority: import.meta.env.VITE_MSAL_AUTHORITY,
        redirectUri: import.meta.env.VITE_MSAL_REDIRECT_URI,
        postLogoutRedirectUri: import.meta.env.VITE_MSAL_LOGOUT_REDIRECT_URI,
        navigateToLoginRequestUrl: import.meta.env.VITE_MSAL_NAVIGATE_TO_LOGIN === 'true',
    },
    cache: {
        cacheLocation: import.meta.env.VITE_MSAL_CACHE_LOCATION || 'sessionStorage',
        storeAuthStateInCookie: import.meta.env.VITE_MSAL_STORE_COOKIE === 'false',
    },
    system: {
        loggerOptions: {
            loggerCallback: (level: any, message: any, containsPii: any) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                    default:
                        return;
                }
            },
        },
    },
};


export const loginRequest = {
    scopes: ["api://50f4d39b-b45d-4e81-a516-4af8f4d1c6a0/api.read"],
};
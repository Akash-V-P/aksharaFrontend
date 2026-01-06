let onAuthLogout: (() => void) | null = null;

export const registerAuthLogoutHandler = (handler: () => void) => {
    onAuthLogout = handler;
}

export const triggerAuthLogout = () => {
    onAuthLogout?.();
}
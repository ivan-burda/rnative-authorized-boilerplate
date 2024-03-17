export const isPasswordValid = (password: string): boolean => {
    return password.length > 3;
    // const passwordRegex = /^[a-zA-Z0-9_]{5,}$/;
    // return passwordRegex.test(password);
};
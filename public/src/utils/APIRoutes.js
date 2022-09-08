// const host = "http://localhost:5000";
// if(process.env.ENVIRONMENT === 'production'){
const host = "https://quiet-caverns-00497.herokuapp.com";
// }
export const registerRoute = `${host}/api/auth/register`;
export const loginRoute = `${host}/api/auth/login`;
export const setAvatarRoute = `${host}/api/auth/setAvatar`;
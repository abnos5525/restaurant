export const logOut = () =>{
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('expirationTime');
    sessionStorage.removeItem('signature');
    sessionStorage.removeItem('userId');
}
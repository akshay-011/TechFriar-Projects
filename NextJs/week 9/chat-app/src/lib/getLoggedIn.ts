export default function getLoggedin ():boolean{
    const loggedIn:any= localStorage.getItem("loggedIn");

    if (loggedIn === null || loggedIn === false){
        return false
    }
    return true;
    
}

const rpgpassword = () => {
    let key_str = document.getElementById("key").value

    if(key_str === ""){
        document.getElementById("output").innerHTML = `<div class="alert alert-danger" role="alert">
        Enter some Key....
      </div>`;
      return ;
    }
    let str = rpg(key_str, 10);
    document.getElementById("output").innerHTML = `Password is<br> <b> <code>${str}</code></b>`;

}
function rpg(key, length) {

    const str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_+=<>?";
    
    let password = "";
    for (let i = 0; password.length < length; i++) {
      password += key.charAt(Math.floor(Math.random() * key.length));
      password += str.charAt(Math.floor(Math.random() * str.length));
    }
  
    return password;
  }
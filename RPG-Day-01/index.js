const rpgpassword = () => {
    let str = rpg(document.getElementById("generate").value, 10);
    document.getElementById("output").innerHTML = `Password is<br> <b> <code>${str}</code></b>`;

}
function rpg(key, length) {

    const str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_+=<>?";
    
    let password = "";
    for (let i = 0; password.length < length; i++) {
      const randomIndex = Math.floor(Math.random() * str.length);
      password += str.charAt(randomIndex);
    }
  
    return password;
  }
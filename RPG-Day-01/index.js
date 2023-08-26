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
function validate(){
    const email = document.getElementById('inputEmail4').value;
    const name = document.getElementById('inputPassword4').value;
    const address = document.getElementById('inputAddress').value;
    const city = document.getElementById('inputCity').value;
    const state = document.getElementById('inputState').value;
    const zip = document.getElementById('inputZip').value;  
    if (!email || !name || !address || !city || state === 'Choose' || !zip) {
        document.getElementById("warning").innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Warning !! <br></strong> You should check in on some of those fields below.
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>`
    }

}
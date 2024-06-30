"use client"

import Button from "@/components/ui/Button"
import loginAction from "@/lib/actions/loginAction"

const Page = ({}) => {
  const submitLogin =async (formData:FormData) => {
    const response = await loginAction(formData);
    if(response.status === 404){
      alert("user not found");
      // alert user not found
    }
    else if (response.status === 402){
      // alert invalid password
      alert("invalid password");
    }
    else if(response.status === 200){
      alert("Succesfully loged in");

      localStorage.setItem("loggedIn", "true");
      // localStorage.setItem("token", response.token);
      document.cookie = "auth="+response.token;
    }
  }
  return (
    <section className="fill-screen center">
      <form action={submitLogin} className="main-form">
        <div className="form-input" >
            <label htmlFor="phoneNumber">Phone Number</label>
            <input placeholder="987654321" type="number" name="phoneNumber" />
        </div>
        <div className="form-input" >
            <label htmlFor="username">Password</label>
            <input placeholder="*********" type="password" name="password" />
        </div>
        <Button text="Login" />
      </form>
    </section>
  )

}

export default Page
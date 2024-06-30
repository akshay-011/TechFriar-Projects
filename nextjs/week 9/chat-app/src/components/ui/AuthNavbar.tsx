import Link from "next/link"


const AuthNavbar  = ({}) => {
  return (
    <div className="navbar">
        <ul className="list">
        <section className="cover">
            <b className="head-main" >Chat App</b>
            <div className="auth">
              <Link href={"/login"} className="nav-item" >Login</Link>
              <Link href={"/signup"} className="nav-item" >Sign Up</Link>
            </div>
        </section>
        </ul> 
    </div>
  )
}

export default AuthNavbar
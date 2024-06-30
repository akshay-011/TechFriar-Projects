import Link from "next/link";

export default function NavBar () {
    return (
        <nav className="main-navbar navbar">
            <b className="head-main" >Chat App</b>
            <ul>
                <Link className="nav-item" href={"/logout"}>Logout</Link>
            </ul>
        </nav>
    )
}
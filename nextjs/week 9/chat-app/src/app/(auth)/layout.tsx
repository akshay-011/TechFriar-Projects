import AuthNavbar from "@/components/ui/AuthNavbar"

const Layout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className="main-show" >
        {<AuthNavbar />}
        { children }
    </div>
  )
}

export default Layout
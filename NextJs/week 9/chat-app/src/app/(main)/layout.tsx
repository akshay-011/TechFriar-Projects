import NavBar from "@/components/ui/NavBar";

export default function Layout({ children }:{ children:React.ReactNode }) {
  return (
    <section className="main-show">
        <NavBar />
        {
            children
        }
    </section>
  )
}
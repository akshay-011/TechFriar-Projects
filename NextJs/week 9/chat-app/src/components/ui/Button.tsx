import { ReactElement } from "react"
import { useFormStatus } from "react-dom"
import { text } from "stream/consumers"

const Button = ({text}:{text:string}) => {
    const { pending } = useFormStatus();
  return (
    <button className="btn" >
        { pending ? "Loading..." : text }
    </button>
  )
}

export default Button
import { useEffect } from "react"
import { io } from "socket.io-client"

export default async function Home(){

  const socket = await io("http://localhost:4000");
  socket.on("connect", () => {
    console.log("Connedcted ");
  })

  return(
    <h1>
      Home
    </h1>
  )
}
import SideChatBar from "@/components/ui/SideChatBar";
import io from 'socket.io-client';

export default async function MyApp() {
  const socket = await io("http://localhost:4000");
  socket.on("connection", () => {
    console.log("Connected to server");
  })
  console.log(socket);
  
  return (
    <main>
      <SideChatBar />
    </main>
  )
}
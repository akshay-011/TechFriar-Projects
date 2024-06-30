import getAlluserAction from "@/lib/actions/getAllUserAction";
import UserSchemaInterface from "@/lib/types/userType";

export default async function SideChatBar() {
    const response = await getAlluserAction();
    if(response.status === 200){
        const data:UserSchemaInterface[] = response.data;
        return (
            <section className="chat-sidenav">
                <ul className="chat-container">
                    {
                        data.map((chat:UserSchemaInterface, index:number) => {
                            return(
                                <li key={index} className="chat-item">
                                    {chat.username}
                                </li>
                            )
                        })
                    }
                </ul>
            </section>
        )
    }
}
"use client"
import Button from "@/components/ui/Button";
import signUp from "@/lib/actions/signup"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom"; // pending status

export default function Login() {
    const router:AppRouterInstance = useRouter();
    
    const { pending } = useFormStatus(); // pending status

    const submitSignUp = async (formData:FormData) => {
        const response = await signUp(formData);
        console.log(response);
        if(response?.status === 402){
            alert("duplicate error"); 
            // here goes warning for duplicate
        }
        else if (response?.status === 400){
            alert("Some errorr")
            // here goes warning for error
        }

        else if (response?.status === 200){
            // succes warning
            router.push("/login");
        }
    }
    return(
        <section className="fill-screen center" >
            <form className="main-form" action={submitSignUp} >
                <div className="form-input" >
                    <label htmlFor="username">Full Name</label>
                    <input placeholder="John Doe" type="text" name="name" />
                </div>

                <div className="form-input" >
                    <label htmlFor="username">Username</label>
                    <input placeholder="johndoe" type="text" name="username" />
                </div>

                <div className="form-input" >
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input placeholder="987654321" type="number" name="phoneNumber" />
                </div>

                <div className="form-input" >
                    <label htmlFor="username">Password</label>
                    <input placeholder="*********" type="password" name="password" />
                </div>

                <div>
                    <Button text="Sign Up" />
                </div>

            </form>
        </section>
    )
}
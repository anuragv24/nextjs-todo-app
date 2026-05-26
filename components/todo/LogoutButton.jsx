"use client"

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LogoutButton(){
    const router =  useRouter();
    const handleLogout = async () => {
        try {
            const res = await fetch(
                "/api/auth/logout", {
                    method: "POST"
                }
            )

            const data = await res.json()
            if(data.success){
                router.push("/login")
                router.refresh()
                toast.success("Logout successful")
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <button 
            onClick={handleLogout}
            className="  text-red-400 hover:text-red-600 transition-colors duration-200 font-medium"
        >
            Logout
        </button>
    )

}
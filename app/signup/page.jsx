"use client"

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const SignUp = () => {
    const router = useRouter()

    const [FormData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    })
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev, 
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(FormData),
            })

            const data = await response.json()
            if(!response.ok || data.success === false){
                throw new Error(data.message || "Something went wrong.")
            }

            setFormData({name: "", email: "", password: "" })
            router.push("/login")


        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

  return (
    <div className='flex min-h-screen items-center justify-center px-4 py-12 bg-slate-950 '>
        <div className="w-full max-w-md space-y-8 rounded-xl p-8  bg-slate-800 border border-slate-600 shadow-2xl ">

            <h2 className='text-center text-3xl font-bold text-slate-100 '>Create your account</h2>

            {error && <div className="rounded-md bg-red-950/40 p-3 text-sm text-red-400 border border-red-900/50">{error}</div> }

            <form onSubmit={handleSubmit} className=' space-y-6'>
                <div className="space-y-1">
                    <label htmlFor="name" className='text-slate-300 font-medium block'>Full Name</label>
                    <input 
                        type="text"
                        id="name"
                        name="name"
                        value={FormData.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter your name"
                        className='w-full rounded-md border border-gray-700  bg-slate-950 px-3 py-2 text-gray-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                        '
                    />
                </div>
                <div className="space-y-1">
                    <label htmlFor="email" className='text-slate-300 font-medium block'>Email Address</label>
                    <input 
                        type="email"
                        id="email"
                        name="email"
                        value={FormData.email}
                        onChange={handleChange}
                        required
                        placeholder="Enter your email"
                        className='w-full rounded-md border border-gray-700  bg-slate-950 px-3 py-2 text-gray-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                        '
                    />
                </div>
                <div className="space-y-1">
                    <label htmlFor="name" className='text-slate-300 font-medium block'>Password</label>
                    <input 
                        type="password"
                        id="password"
                        name="password"
                        value={FormData.password}
                        onChange={handleChange}
                        required
                        placeholder="Enter your password"
                        className='w-full rounded-md border border-gray-700  bg-slate-950 px-3 py-2 text-gray-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                        '
                    />
                </div>

                <button
                    type='submit'
                    disabled={loading}
                    className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors'
                >
                    {loading ? "Creating Account..." : "Sign Up"}
                </button>
            </form>

            <p className='text-center  text-gray-300' >Already have an account?{" "} <Link href={"/login"} className='font-medium text-indigo-600 hover:text-indigo-500 transition-colors' >Log in</Link> </p>
        </div>
        
    </div>
  )
}

export default SignUp
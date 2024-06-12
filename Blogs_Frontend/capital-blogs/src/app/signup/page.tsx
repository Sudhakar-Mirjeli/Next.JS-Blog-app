"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("http://localhost:5050/api/signup", user);
            console.log("Signup success", response.data);
            if (response.data.status)
                router.push("/login");
            else
                toast.error(response.data.message);

        } catch (error: any) {
            console.log("Signup failed", error.message);

            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-2">
            <div className="w-full max-w-md p-8 space-y-4 bg-white rounded shadow-md">
                <h1 className="text-2xl font-bold text-center">{loading ? "Processing..." : "Signup"}</h1>
                <hr />
                <div>
                    <label htmlFor="email" className="block text-gray-700 py-2">Email</label>
                    <input
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-black"
                        id="email"
                        type="email"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        placeholder="Email"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-gray-700">Password</label>
                    <input
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-black"
                        id="password"
                        type="password"
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        placeholder="Password"
                        required
                    />
                </div>
                <button
                    onClick={onSignup}
                    className={`w-full px-3 py-2 text-white rounded-lg ${buttonDisabled ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
                        } focus:outline-none`}
                    disabled={buttonDisabled}
                >
                    {loading ? 'Logging in...' : 'Sign up'}
                </button>
                <div className="text-center text-md mt-4">
                    <Link href="/login">Already have an account? <u>Login here</u></Link>
                </div>
            </div>
        </div>
    );
}
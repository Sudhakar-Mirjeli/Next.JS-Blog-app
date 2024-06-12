"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("http://localhost:5050/api/login", user);
            if (response.data.status) {
                toast.success("Login success");
                localStorage.setItem('token', response.data.token);
                router.push("/dashboard");
            }
        } catch (error: any) {
            console.log("Login failed", error.message);
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
                <h1 className="text-2xl font-bold text-center">{loading ? "Processing..." : "Login"}</h1>
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
                        required />
                </div>
                <button
                    onClick={onLogin}
                    className={`w-full px-3 py-2 text-white rounded-lg ${buttonDisabled ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
                        } focus:outline-none`}
                    disabled={buttonDisabled}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
                <div className="text-center mt-4">
                    <Link href="/signup">Don't have an account? <u>Signup here</u></Link>
                </div>
            </div>
        </div>
    );
}
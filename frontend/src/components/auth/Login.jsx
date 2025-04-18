import { useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { User, Briefcase } from "lucide-react";

const Login = () => {
    const [role, setRole] = useState("candidate");

    return (
        <div className="bg-white min-h-screen flex flex-col">
            <Navbar />
            <div className="max-w-2xl mx-auto w-full px-6 py-10 mb-10">
                <div className="border border-gray-200 rounded-xl shadow-md overflow-hidden bg-white">
                    <div className="px-6 pt-6 pb-2">
                        <h1 className="text-2xl font-bold text-center text-gray-800">Login</h1>
                    </div>

                    <div className="p-6">
                        <form className="space-y-5">
                            {/* EUser */}
                            <div className="space-y-1">
                                <Label className="text-sm font-medium text-gray-800">Email</Label>
                                <div className="relative">
                                    <Input
                                        type="email"
                                        placeholder="Enter your email address"
                                        className="w-full p-2 pl-9 border border-gray-300 rounded-md"
                                    />
                                    <User className="w-4 h-4 text-blue-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="space-y-1">
                                <Label className="text-sm font-medium text-gray-800">Password</Label>
                                <div className="relative">
                                    <Input
                                        type="password"
                                        placeholder="Enter your password"
                                        className="w-full p-2 pl-9 border border-gray-300 rounded-md"
                                    />
                                    <Briefcase className="w-4 h-4 text-blue-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                                </div>
                            </div>

                            {/* Role Selection - Optional */}
                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-gray-800 mb-2 bBriefcase">Select Role</Label>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setRole("candidate")}
                                        className={`border rounded-lg p-4 w-full flex flex-col items-center transition-all ${role === "candidate"
                                            ? "border-blue-600 bg-blue-50 text-blue-700 shadow-lg"
                                            : "border-gray-300 text-gray-700 hover:border-blue-400 hover:shadow-md"
                                            }`}
                                    >
                                        <User className="w-5 h-5 mb-1 text-gray-600" />
                                        <span className="text-sm font-medium">Candidate</span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setRole("recruiter")}
                                        className={`border rounded-lg p-4 w-full flex flex-col items-center transition-all ${role === "recruiter"
                                            ? "border-blue-600 bg-blue-50 text-blue-700 shadow-lg"
                                            : "border-gray-300 text-gray-700 hover:border-blue-400 hover:shadow-md"
                                            }`}
                                    >
                                        <Briefcase className="w-5 h-5 mb-1 text-gray-600" />
                                        <span className="text-sm font-medium">Recruiter</span>
                                    </button>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-2">
                                <Button
                                    type="submit"
                                    className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition duration-200"
                                >
                                    Login
                                </Button>
                                <p className="text-center text-sm text-gray-600 mt-4">
                                    Don't have an account?{" "}
                                    <a href="/signup" className="text-blue-700 hover:underline">
                                        Signup
                                    </a>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

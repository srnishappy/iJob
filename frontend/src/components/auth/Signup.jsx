import { useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { User, Briefcase, Camera, Mail, Lock, Phone } from "lucide-react";

const Signup = () => {
    const [role, setRole] = useState("candidate");

    // ฟังก์ชันเลือก role
    const handleRoleSelect = (selectedRole) => {
        setRole(selectedRole);
    };

    return (
        <div className="bg-white min-h-screen flex flex-col">
            <Navbar />
            <div className="max-w-2xl mx-auto w-full px-6 py-10 mb-10">
                <div className="border border-gray-200 rounded-xl shadow-md overflow-hidden bg-white">
                    <div className="px-6 pt-6 pb-2">
                        <h1 className="text-2xl font-bold text-center text-gray-800">Create Account</h1>
                    </div>

                    <div className="p-6">
                        <form className="space-y-5">
                            {/* Full Name */}
                            <div className="space-y-1">
                                <Label className="text-sm font-medium text-gray-800">Full Name</Label>
                                <div className="relative">
                                    <Input
                                        type="text"
                                        placeholder="Enter your full name"
                                        className="w-full p-2 pl-9 border border-gray-300 rounded-md"
                                    />
                                    <User className="w-4 h-4 text-blue-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="space-y-1">
                                <Label className="text-sm font-medium text-gray-800">Email</Label>
                                <div className="relative">
                                    <Input
                                        type="email"
                                        placeholder="Enter your email address"
                                        className="w-full p-2 pl-9 border border-gray-300 rounded-md"
                                    />
                                    <Mail className="w-4 h-4 text-blue-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="space-y-1">
                                <Label className="text-sm font-medium text-gray-800">Password</Label>
                                <div className="relative">
                                    <Input
                                        type="password"
                                        placeholder="Enter a strong password"
                                        className="w-full p-2 pl-9 border border-gray-300 rounded-md"
                                    />
                                    <Lock className="w-4 h-4 text-blue-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                                </div>
                            </div>

                            {/* Phone Number */}
                            <div className="space-y-1">
                                <Label className="text-sm font-medium text-gray-800">Phone Number</Label>
                                <div className="relative">
                                    <Input
                                        type="tel"
                                        placeholder="Enter your phone number"
                                        className="w-full p-2 pl-9 border border-gray-300 rounded-md"
                                    />
                                    <Phone className="w-4 h-4 text-blue-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                                </div>
                            </div>

                            {/* Role Selection */}
                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-gray-800">Select Role</Label>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        type="button"
                                        onClick={() => handleRoleSelect("candidate")}
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
                                        onClick={() => handleRoleSelect("recruiter")}
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

                            {/* Profile Picture */}
                            <div className="space-y-1">
                                <Label className="text-sm font-medium text-gray-800">Profile Picture</Label>
                                <div className="flex items-center gap-3">
                                    <Camera className="w-5 h-5 text-blue-500" />
                                    <Input
                                        accept="image/*"
                                        type="file"
                                        className="text-sm cursor-pointer border border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-2">
                                <Button
                                    type="submit"
                                    className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition duration-200"
                                >
                                    Sign Up
                                </Button>
                                <p className="text-center text-sm text-gray-600 mt-4">
                                    Already have an account?{" "}
                                    <a href="/login" className="text-blue-700 hover:underline">
                                        Sign in
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

export default Signup;

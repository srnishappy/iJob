import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { User, Briefcase, Camera, Mail, Lock, Phone } from "lucide-react";

const Signup = () => {
    const [role, setRole] = useState("candidate");

    const handleRoleSelect = (selectedRole) => {
        setRole(selectedRole);
    };

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <Navbar />
            <div className="max-w-md sm:max-w-2xl mx-auto w-full px-4 sm:px-6 py-10 mb-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="border border-gray-200 rounded-xl shadow-md overflow-hidden bg-white"
                >
                    <div className="px-4 pt-4 pb-4 bg-gradient-to-r from-blue-500 to-blue-400 rounded-t-xl shadow-sm">
                        <div className="flex flex-col items-center gap-2 mt-4 px-4 py-2">
                            <span className="text-2xl font-semibold text-white">Create Account</span>
                        </div>
                    </div>

                    <div className="p-6 pt-4">
                        <form className="space-y-5">
                            {/* แนวนอน สำหรับข้อมูลส่วนตัว */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Full Name */}
                                <div className="space-y-1">
                                    <Label htmlFor="fullName" className="text-sm font-medium text-gray-800">
                                        Full Name
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="fullName"
                                            type="text"
                                            placeholder="Enter your full name"
                                            className="w-full p-2 pl-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300"
                                        />
                                        <User className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="space-y-1">
                                    <Label htmlFor="email" className="text-sm font-medium text-gray-800">
                                        Email
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="Enter your email address"
                                            className="w-full p-2 pl-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300"
                                        />
                                        <Mail className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Password */}
                                <div className="space-y-1">
                                    <Label htmlFor="password" className="text-sm font-medium text-gray-800">
                                        Password
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="Enter a strong password"
                                            className="w-full p-2 pl-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300"
                                        />
                                        <Lock className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                                    </div>
                                </div>

                                {/* Phone Number */}
                                <div className="space-y-1">
                                    <Label htmlFor="phone" className="text-sm font-medium text-gray-800">
                                        Phone Number
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="phone"
                                            type="tel"
                                            placeholder="Enter your phone number"
                                            className="w-full p-2 pl-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300"
                                        />
                                        <Phone className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                                    </div>
                                </div>
                            </div>

                            {/* Role Selection */}
                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-gray-800">Select Role</Label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <button
                                        type="button"
                                        onClick={() => handleRoleSelect("candidate")}
                                        className={`border rounded-xl p-3 w-full flex flex-col items-center transition-colors ${role === "candidate"
                                            ? "border-blue-600 bg-blue-50 text-blue-700 shadow-md"
                                            : "border-gray-300 text-gray-700 hover:bg-blue-100 hover:shadow-sm"
                                            }`}
                                    >
                                        <User className="w-5 h-5 mb-1 text-gray-600" />
                                        <span className="text-sm font-medium">Candidate</span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => handleRoleSelect("recruiter")}
                                        className={`border rounded-xl p-3 w-full flex flex-col items-center transition-colors ${role === "recruiter"
                                            ? "border-blue-600 bg-blue-50 text-blue-700 shadow-md"
                                            : "border-gray-300 text-gray-700 hover:bg-blue-100 hover:shadow-sm"
                                            }`}
                                    >
                                        <Briefcase className="w-5 h-5 mb-1 text-gray-600" />
                                        <span className="text-sm font-medium">Recruiter</span>
                                    </button>
                                </div>
                            </div>

                            {/* Profile Picture */}
                            <div className="space-y-1">
                                <Label htmlFor="profilePicture" className="text-sm font-medium text-gray-800">
                                    Profile Picture
                                </Label>
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                                        <Camera className="w-5 h-5 text-blue-500" />
                                    </div>
                                    <Input
                                        id="profilePicture"
                                        accept="image/*"
                                        type="file"
                                        className="text-sm cursor-pointer border border-dashed border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-2">
                                <Button
                                    type="submit"
                                    className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 hover:scale-105 transition-transform shadow-md"
                                >
                                    Signup
                                </Button>
                                <p className="text-center text-sm text-gray-600 mt-4">
                                    Already have an account?{" "}
                                    <a href="/login" className="text-blue-600 font-semibold hover:underline">
                                        Sign in
                                    </a>
                                </p>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Signup;
import { useState } from "react";
import { Briefcase, Code, Contact, FileText, Mail, Pen, User, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";

const Profile = () => {
    const [open, setOpen] = useState(false);
    const { user } = useSelector((store) => store.auth);
    const skills = user?.profile?.skills || [];
    const isResume = !!user?.profile?.resume;

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, staggerChildren: 0.2 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -10 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    };

    // Format phone number for better readability
    const formatPhoneNumber = (phone) => {
        const cleaned = ('' + phone).replace(/\D/g, '');
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{3})$/);
        if (match) {
            return `${match[1]}-${match[2]}-${match[3]}`;
        }
        return phone;
    };

    return (
        <div className="min-h-screen text-gray-900 bg-gray-50">
            <Navbar />

            {/* Profile Heading */}
            {/* [Previous heading code omitted for brevity; you can add it back as needed] */}

            {/* Profile Card */}
            <motion.div
                className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-xl my-8 shadow-sm"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Header with Name and Bio */}
                <div className="px-6 pt-6 pb-4 relative flex items-start">
                    {/* Avatar */}
                    <div className="mr-4">
                        <Avatar className="h-16 w-16 ring-2 ring-gray-100 shadow-sm">
                            <AvatarImage src="https://github.com/shadcn.png" alt="profile" />
                        </Avatar>
                    </div>

                    {/* Name and Bio Section */}
                    <div className="flex flex-col">
                        <div className="flex items-center">
                            <User className="h-4 w-4 mr-2 text-gray-500" />
                            <h1 className="font-bold text-xl">{user?.fullname || "No name available"}</h1>
                        </div>
                        <div className="flex items-center mt-1">
                            <MessageCircle className="h-3 w-3 mr-2 text-gray-400" />
                            <p className="text-gray-500 text-sm">{user?.profile?.bio || "No bio available"}</p>
                        </div>
                    </div>

                    {/* Edit Profile Button */}
                    <div className="ml-auto">
                        <Button
                            onClick={() => setOpen(true)}
                            className="bg-blue-500 text-white hover:bg-blue-600 shadow-sm"
                            size="sm"
                        >
                            <Pen className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <div className="border-t border-gray-100"></div>

                {/* Content */}
                <div className="p-6">
                    {/* Contact Information Section */}
                    <motion.div className="mb-8" variants={itemVariants}>
                        <h3 className="font-medium text-gray-800 mb-4 flex items-center">
                            <div className="bg-blue-100 p-1 rounded-md mr-2">
                                <Contact className="h-4 w-4 text-blue-500" />
                            </div>
                            Contact Information
                        </h3>

                        <div className="space-y-4 pl-2">
                            <div className="flex items-center">
                                <div className="bg-gray-100 p-2 rounded-full mr-4">
                                    <Mail className="h-5 w-5 text-blue-500" />
                                </div>
                                <div>
                                    <span className="text-sm font-medium text-gray-600 mr-2">Email :</span>
                                    {user?.email ? (
                                        <a
                                            href={`mailto:${user.email}`}
                                            className="text-blue-600 hover:text-blue-700 hover:underline font-medium transition-all duration-200"
                                        >
                                            {user.email}
                                        </a>
                                    ) : (
                                        <span className="text-gray-500 border border-gray-200 rounded-lg p-1 bg-gray-50">
                                            No email available
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center">
                                <div className="bg-gray-100 p-2 rounded-full mr-4">
                                    <Contact className="h-5 w-5 text-blue-500" />
                                </div>
                                <div>
                                    <span className="text-sm font-medium text-gray-600 mr-2">Phone :</span>
                                    {user?.phoneNumber ? (
                                        <p className="text-gray-800 font-medium">
                                            {formatPhoneNumber(user.phoneNumber)}
                                        </p>
                                    ) : (
                                        <span className="text-gray-500 border border-gray-200 rounded-lg p-1 bg-gray-50">
                                            No contact number available
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Skills Section */}
                    <motion.div className="mb-8" variants={itemVariants}>
                        <h3 className="font-medium text-gray-700 mb-4 flex items-center">
                            <Code className="h-6 w-6 text-blue-500 mr-2" />
                            Skills
                        </h3>

                        <div className="pl-2">
                            {skills.length !== 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {skills.map((item, index) => (
                                        <Badge
                                            key={index}
                                            className="bg-blue-50 text-blue-600 hover:bg-blue-100"
                                        >
                                            {item}
                                        </Badge>
                                    ))}
                                </div>
                            ) : (
                                <span className="text-gray-500 border border-gray-200 rounded-lg p-3 bg-gray-50">
                                    No skills listed
                                </span>
                            )}
                        </div>
                    </motion.div>

                    {/* Resume Section */}
                    <motion.div className="mb-4" variants={itemVariants}>
                        <h3 className="font-medium text-gray-800 mb-4 flex items-center">
                            <div className="bg-blue-100 p-1 rounded-md mr-2">
                                <FileText className="h-4 w-4 text-blue-500" />
                            </div>
                            Resume
                        </h3>

                        <div className="pl-2">
                            {isResume ? (
                                <a
                                    target="_blank"
                                    href={user?.profile?.resume}
                                    className="text-blue-500 hover:text-blue-600 hover:underline flex items-center bg-blue-50 p-2 rounded-md"
                                >
                                    <FileText className="h-4 w-4 mr-2" />
                                    {user.profile.resumeOriginalName || "View Resume"}
                                </a>
                            ) : (
                                <div className="text-gray-500 border border-gray-200 rounded-lg p-3 bg-gray-50">
                                    No resume uploaded
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Applied Jobs Section */}
            <motion.div
                className="max-w-4xl mx-auto bg-white rounded-xl p-6 mb-8 shadow-sm border border-gray-200"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.h2
                    className="font-medium text-gray-800 mb-4 flex items-center"
                    variants={itemVariants}
                >
                    <div className="bg-blue-100 p-1 rounded-md mr-2">
                        <Briefcase className="h-4 w-4 text-blue-500" />
                    </div>
                    Applied Jobs
                </motion.h2>

                <motion.div variants={itemVariants}>
                    <AppliedJobTable />
                </motion.div>
            </motion.div>

            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    );
};

export default Profile;
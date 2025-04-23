import { useState } from "react";
import { Briefcase, Code, Contact, FileText, Mail, Pen } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";

const Profile = () => {
    const [open, setOpen] = useState(false);
    const skills = ['js', 'python', 'html', 'css'];
    const isResume = true;

    // Framer Motion variants for animations
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

    return (
        <div className="min-h-screen text-gray-900 bg-white">
            <Navbar />
            <motion.div
                className="max-w-4xl mx-auto bg-gray-100 border border-gray-200 rounded-2xl my-8 p-8 shadow-lg"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="flex justify-between items-center">
                    <motion.div className="flex items-center gap-4" variants={itemVariants}>
                        <Avatar className="h-24 w-24 ring-2 ring-blue-500">
                            <AvatarImage src="https://github.com/shadcn.png" alt="profile" />
                        </Avatar>
                        <div>
                            <h1 className="font-semibold text-2xl text-gray-900">Full Name</h1>
                            <p className="text-gray-600 mt-1">Add your bio here</p>
                        </div>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <Button
                            onClick={() => setOpen(true)}
                            className="text-blue-500 hover:text-blue-400 hover:bg-gray-200 transition"
                            variant="outline"
                        >
                            <Pen className="mr-2 h-4 w-4" /> Edit
                        </Button>
                    </motion.div>
                </div>
                <motion.div className="my-6" variants={itemVariants}>
                    <div className="flex items-center gap-3 my-3">
                        <Mail className="h-5 w-5 text-blue-500" />
                        <span className="text-gray-600 hover:text-blue-500 transition cursor-pointer">
                            Email
                        </span>
                    </div>
                    <div className="flex items-center gap-3 my-3">
                        <Contact className="h-5 w-5 text-blue-500" />
                        <span className="text-gray-600 hover:text-blue-500 transition cursor-pointer">
                            Contact
                        </span>
                    </div>
                </motion.div>
                <motion.div className="my-6" variants={itemVariants}>
                    <h1 className="font-semibold text-lg text-gray-900 mb-3 flex items-center gap-2">
                        <Code className="h-5 w-5 text-blue-500" /> Skills
                    </h1>
                    <div className="flex flex-wrap gap-2">
                        {skills.length !== 0 ? (
                            skills.map((item, index) => (
                                <Badge
                                    key={index}
                                    className="bg-blue-500 text-white hover:bg-blue-400 transition flex items-center gap-1"
                                >
                                    <Code className="h-4 w-4" /> {item}
                                </Badge>
                            ))
                        ) : (
                            <span className="text-gray-600">N/A</span>
                        )}
                    </div>
                </motion.div>
                <motion.div className="my-6" variants={itemVariants}>
                    <Label className="text-md font-bold text-gray-900 flex items-center gap-2">
                        <FileText className="h-5 w-5 text-blue-500" /> Resume
                    </Label>
                    <div className="mt-2">
                        {isResume ? (
                            <a
                                target="_blank"
                                href="/"
                                className="text-blue-500 hover:text-blue-400 hover:underline transition flex items-center gap-2"
                            >
                                <FileText className="h-4 w-4" /> View Resume
                            </a>
                        ) : (
                            <span className="text-gray-600">N/A</span>
                        )}
                    </div>
                </motion.div>
            </motion.div>
            <motion.div
                className="max-w-4xl mx-auto bg-gray-100 rounded-2xl p-8 mb-8 shadow-lg"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.h1
                    className="font-bold text-xl text-gray-900 mb-5 flex items-center gap-2"
                    variants={itemVariants}
                >
                    <Briefcase className="h-5 w-5 text-blue-500" /> Applied Jobs
                </motion.h1>

                <motion.div
                    className="text-gray-600 italic"
                    variants={itemVariants}
                >
                    <AppliedJobTable />
                </motion.div>
            </motion.div>
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    );
};

export default Profile;
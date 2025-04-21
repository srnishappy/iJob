import Job from "./Job";
import Navbar from "./shared/Navbar";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const Browse = () => {
    const randomJobs = [1, 2, 3, 4];

    const textVariants = {
        hidden: { opacity: 0, scale: 0.8, y: 30 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    };

    // แอนิเมชันสำหรับ Job items
    const jobVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: { duration: 0.4, ease: "easeOut", delay: i * 0.1 }, // Stagger effect
        }),
    };

    return (
        <div>
            <Navbar />
            <div className="max-w-7xl mx-auto my-10">
                <motion.div
                    className="flex items-center gap-2 font-bold text-xl my-10"
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <Search className="w-6 h-6 text-blue-500" />
                    <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-600 drop-shadow-md">
                        Search Results ({randomJobs.length})
                    </h1>
                </motion.div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {randomJobs.map((job, index) => (
                        <motion.div
                            key={job}
                            variants={jobVariants}
                            initial="hidden"
                            animate="visible"
                            custom={index} // ใช้ index สำหรับ stagger
                        >
                            <Job job={job} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Browse;
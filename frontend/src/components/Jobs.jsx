import { motion } from 'framer-motion';
import FilterCard from "./FilterCard";
import Job from "./Job";
import Navbar from "./shared/Navbar";
import { useSelector } from 'react-redux';

const Jobs = () => {
    const { allJobs } = useSelector(store => store.job);
    console.log(allJobs);

    return (
        <div className="min-h-screen flex flex-col overflow-hidden bg-gray-50">
            <Navbar />
            <div className="max-w-7xl mx-auto mt-5 px-4 md:px-6 lg:px-8 flex-1">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Filter Card */}
                    <div className="w-full lg:w-1/4">
                        <FilterCard />
                    </div>

                    {/* Job Grid */}
                    {allJobs.length === 0 ? (
                        <span className="text-gray-500">Job not found</span>
                    ) : (
                        <div className="w-full lg:w-3/4 overflow-y-auto pb-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                {allJobs.map((job) => (
                                    <motion.div
                                        initial={{ opacity: 0, x: 100 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -100 }}
                                        transition={{ duration: 0.3 }}
                                        key={job._id}
                                        className="min-w-[300px]"
                                    >
                                        <Job job={job} />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Jobs;
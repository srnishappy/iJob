import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { SearchX, Briefcase } from 'lucide-react';
import FilterCard from "./FilterCard";
import Job from "./Job";
import Navbar from "./shared/Navbar";

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 800);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase());
            });
            setFilterJobs(filteredJobs);
        } else {
            setFilterJobs(allJobs);
        }
    }, [allJobs, searchedQuery]);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
    };

    // Skeleton loading component
    const JobSkeleton = () => (
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 h-64 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-10 bg-gray-200 rounded w-1/2 mb-6"></div>
            <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6 mb-6"></div>
            <div className="flex justify-between items-center mt-auto">
                <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            </div>
        </div>
    );

    // Empty state component
    const EmptyState = () => (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full flex flex-col items-center justify-center py-16 text-center"
        >
            <div className="bg-gray-100 p-6 rounded-full mb-6">
                <SearchX size={64} className="text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-3">No jobs found</h3>
            <p className="text-gray-500 max-w-md mb-8">
                We couldn't find any jobs matching your search criteria. Try adjusting your filters or search terms.
            </p>
            <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
                Reset Filters
            </button>
        </motion.div>
    );

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />

            <div className="max-w-7xl mx-auto w-full mt-5 px-4 md:px-6 lg:px-8 flex-1">
                <div className="mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center mb-2"
                    >
                        <Briefcase className="mr-2 text-blue-600" />
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Browse Jobs</h1>
                    </motion.div>
                    <p className="text-gray-600">Find your dream job from our curated listings</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Filter Card - Sticky on larger screens */}
                    <div className="w-full lg:w-1/4 lg:sticky lg:top-6 h-fit">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <FilterCard />
                        </motion.div>
                    </div>

                    {/* Job Grid */}
                    <div className="w-full lg:w-3/4 pb-12">
                        {isLoading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[...Array(6)].map((_, i) => (
                                    <JobSkeleton key={i} />
                                ))}
                            </div>
                        ) : filterJobs.length === 0 ? (
                            <EmptyState />
                        ) : (
                            <motion.div
                                variants={container}
                                initial="hidden"
                                animate="show"
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                            >
                                {filterJobs.map((job) => (
                                    <motion.div
                                        key={job._id}
                                        variants={item}
                                        className="h-full"
                                    >
                                        <Job job={job} />
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Jobs;
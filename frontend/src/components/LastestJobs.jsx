import { useSelector } from "react-redux";
import LastestJobsCard from "./LastestJobsCard";

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job);

    return (
        <div className="max-w-7xl mx-auto my-20 px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">
                <span className="text-blue-500">Latest & Top </span> Job Openings
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 auto-rows-fr">
                {allJobs.length <= 0 ? (
                    <span>No Job Available</span>
                ) : (
                    allJobs.slice(0, 6).map((job) => (
                        <LastestJobsCard key={job._id} job={job} />
                    ))
                )}
            </div>
        </div>
    );
};

export default LatestJobs;
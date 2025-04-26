import { Button } from './ui/button';
import { MapPin, Briefcase, User, Clock, Award, ChevronRight, Bookmark } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { useNavigate } from 'react-router-dom';

const Job = ({ job }) => {
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        if (!mongodbTime) return 'New';
        try {
            const createdAt = new Date(mongodbTime);
            if (isNaN(createdAt.getTime())) return 'New';
            const currentTime = new Date();
            const timeDifference = currentTime - createdAt;
            const daysAgo = Math.floor(timeDifference / (1000 * 24 * 60 * 60));
            return daysAgo === 0 ? 'Today' : `${daysAgo} days ago`;
        } catch (error) {
            return 'New';
        }
    };

    const getCompanyInitial = (companyName) => {
        if (!companyName) return 'C';
        return companyName.charAt(0).toUpperCase();
    };

    const formatSalary = (salary) => {
        if (!salary) return 'Not specified';
        return `${salary.toLocaleString()}`;
    };

    return (
        <div className="h-full flex flex-col justify-between p-6 rounded-2xl shadow-lg bg-white border border-gray-200 cursor-pointer transform hover:scale-105 transition-all duration-300 ease-in-out hover:shadow-xl relative overflow-hidden group">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500 opacity-10 rounded-full -mr-8 -mt-8"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500 opacity-5 rounded-full -ml-12 -mb-12"></div>

            {/* Company header */}
            <div className="mb-4 -m-6 p-6 bg-gray-900 rounded-t-2xl border-b-4 border-blue-500 relative">
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                        {job?.company?.logo ? (
                            <Avatar className="w-12 h-12 rounded-full border-2 border-gray-700">
                                <AvatarImage src={job.company.logo} alt={job?.company?.name || 'Company'} />
                                <AvatarFallback className="bg-blue-100 text-blue-600 font-bold">
                                    {getCompanyInitial(job?.company?.name)}
                                </AvatarFallback>
                            </Avatar>
                        ) : (
                            <Avatar className="w-12 h-12 rounded-full border-2 border-gray-700">
                                <AvatarFallback className="bg-blue-100 text-blue-600 font-bold">
                                    {getCompanyInitial(job?.company?.name)}
                                </AvatarFallback>
                            </Avatar>
                        )}
                        <div>
                            <h1 className="font-bold text-xl sm:text-2xl text-white">{job?.company?.name || 'Unknown Company'}</h1>
                            <div className="mt-2 flex items-center text-gray-400">
                                <Clock size={16} className="mr-1" />
                                <span className="text-sm">{daysAgoFunction(job?.createdAt)}</span>
                            </div>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        className="rounded-full hover:bg-gray-700 h-8 w-8 p-0"
                        size="icon"
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        <Bookmark className="text-gray-400 hover:text-blue-500" size={16} />
                    </Button>
                </div>
                {job?.location && (
                    <div className="mt-2 flex items-center text-gray-400">
                        <MapPin size={16} className="mr-1" />
                        <span className="text-sm">{job.location}</span>
                    </div>
                )}
            </div>

            {/* Job details */}
            <div className="flex-1 mt-6 mb-3">
                <h2 className="font-semibold text-lg sm:text-xl text-gray-800 mb-2 border-l-4 border-blue-500 pl-3">
                    {job?.title || 'No Title'}
                </h2>
                <p className="text-sm text-gray-600 mb-4 pl-4 break-words whitespace-pre-wrap">
                    {job?.description || 'No description available.'}
                </p>

                {/* Job details items */}
                <div className="grid grid-cols-1 gap-3 mb-4">
                    {job?.experience && (
                        <div className="flex items-center p-2 rounded-lg border border-gray-100 bg-gray-50 shadow-sm w-full">
                            <Award size={16} className="mr-2 text-blue-500" />
                            <span className="text-sm">{job.experience} experience</span>
                        </div>
                    )}
                    {job?.jobType && (
                        <div className="flex items-center p-2 rounded-lg border border-gray-100 bg-gray-50 shadow-sm w-full">
                            <Briefcase size={16} className="mr-2 text-blue-500" />
                            <span className="text-sm">{job.jobType}</span>
                        </div>
                    )}
                    {job?.salary && (
                        <div className="flex items-center p-2 rounded-lg border border-gray-100 bg-gray-50 shadow-sm w-full">
                            <span className="mr-2 font-medium text-green-500">฿</span>
                            <span className="text-sm font-medium text-green-600">{formatSalary(job.salary)}</span>
                        </div>
                    )}
                    {job?.position && (
                        <div className="flex items-center p-2 rounded-lg border border-gray-100 bg-gray-50 shadow-sm w-full">
                            <User size={16} className="mr-2 text-blue-500" />
                            <span className="text-sm break-all whitespace-pre-wrap min-w-[150px]">{job.position}{job.position > 1 ? 's' : ''}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Action buttons */}
            <div className="mt-auto flex items-center gap-3">
                <Button
                    onClick={() => navigate(`/description/${job?._id}`)}
                    variant="outline"
                    className="hover:bg-gray-100 font-medium border-gray-300 flex-1"
                >
                    Details
                </Button>
                <Button
                    className="bg-blue-600 hover:bg-blue-700 font-medium flex-1"
                >
                    Save For Later
                </Button>
            </div>

            {/* View details hover effect */}
            <div className="mt-4 absolute bottom-4 right-6 transform translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                <div
                    className="flex items-center text-blue-500 font-medium"
                    onClick={() => navigate(`/description/${job?._id}`)}
                >

                </div>
            </div>
        </div>
    );
};

export default Job;
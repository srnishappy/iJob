import { useParams } from "react-router-dom";
import Navbar from "./shared/Navbar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import {
    Briefcase,
    MapPin,
    CalendarDays,
    Users,
    Coins,
    FileText,
    Clock,
    CheckCircle,
    GraduationCap,
    ArrowLeft
} from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const JobDescription = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const Jobid = params.id;
    const { singleJob, allJobs } = useSelector((store) => store.job);
    const { user } = useSelector((store) => store.auth);
    const [loading, setLoading] = useState(true);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);
    const applyJobHandler = async () => {
        try {
            const res = await axios.post(
                `${APPLICATION_API_END_POINT}/apply/${Jobid}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${user?.token}`,
                    },
                    withCredentials: true,
                }
            );

            if (res.data.success) {
                setIsApplied(true);
                const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }
                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || 'Something went wrong');
        }
    }

    useEffect(() => {
        const fetchSingleJob = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`${JOB_API_END_POINT}get/${Jobid}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchSingleJob();
    }, [Jobid, dispatch, user?.id]);

    const formatEnglishDate = (dateString) => {
        if (!dateString) return "N/A";
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    const getCompanyInitial = (companyName) => {
        if (!companyName) return 'C';
        return companyName.charAt(0).toUpperCase();
    };

    const getRequirementsList = () => {
        if (!singleJob?.requirements) return [];
        if (Array.isArray(singleJob.requirements)) return singleJob.requirements;
        try {
            return JSON.parse(singleJob.requirements);
        } catch {
            return singleJob.requirements.includes('\n')
                ? singleJob.requirements.split('\n').filter(item => item.trim())
                : [singleJob.requirements];
        }
    };

    const requirementsList = getRequirementsList();
    const companyData = allJobs?.find(job => job._id === Jobid)?.company;

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="h-12 w-12 bg-gray-300 rounded-full mb-4"></div>
                    <div className="h-4 w-40 bg-gray-300 rounded mb-3"></div>
                    <div className="h-3 w-32 bg-gray-200 rounded"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />

            {/* Back Button */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-2">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
                >
                    <ArrowLeft size={16} className="mr-1" />
                    <span>Back to Jobs</span>
                </button>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 md:py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-xl shadow-md overflow-hidden"
                >
                    {/* Header Section with Company Information */}
                    <div className="px-6 sm:px-8 py-6 border-b border-gray-100">
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                            {/* Company Logo */}
                            <Avatar className="w-20 h-20 rounded-xl border border-gray-200 shadow-sm">
                                <AvatarImage src={companyData?.logo} alt={companyData?.name || 'Company'} />
                                <AvatarFallback className="bg-gray-200 text-gray-600 text-xl font-bold">
                                    {getCompanyInitial(companyData?.name)}
                                </AvatarFallback>
                            </Avatar>

                            {/* Company & Job Info */}
                            <div className="text-center sm:text-left">
                                <h2 className="text-2xl font-bold text-gray-800">
                                    {companyData?.name || "Company Name"}
                                </h2>

                                <div className="flex justify-center sm:justify-start flex-wrap items-center gap-2 mt-3">
                                    <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-200 border-none px-3 py-1 rounded-full">
                                        {singleJob?.position || 0} {singleJob?.position === 1 ? 'Position' : 'Positions'}
                                    </Badge>
                                    <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-200 border-none px-3 py-1 rounded-full">
                                        {singleJob?.jobType || "Full-time"}
                                    </Badge>
                                    <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-200 border-none px-3 py-1 rounded-full">
                                        {singleJob?.salary ? `${singleJob?.salary.toLocaleString()} ฿` : "Negotiable"}
                                    </Badge>
                                </div>
                            </div>

                            <div className="sm:ml-auto flex flex-col items-center sm:items-end mt-4 sm:mt-0">
                                <div className="bg-gray-50 px-4 py-2 rounded-lg text-sm text-gray-600 flex items-center">
                                    <Clock size={16} className="text-gray-500 mr-2" />
                                    <span>Posted {formatEnglishDate(singleJob?.createdAt)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Job Header */}
                    <div className="px-6 sm:px-8 py-6 border-b border-gray-100">
                        {/* Display Position Available above the Job Title */}
                        <p className="text-sm text-gray-500 uppercase font-semibold tracking-wider">
                            Position Available
                        </p>
                        <h1 className="font-bold text-2xl sm:text-3xl text-gray-800 text-center sm:text-left mt-2">
                            {singleJob?.title || 'Job Title'}
                        </h1>
                    </div>


                    {/* Content Section */}
                    <div className="px-6 sm:px-8 py-8">
                        {/* Job Details */}
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                                <Briefcase size={20} className="mr-2 text-gray-600" /> Job Overview
                            </h2>

                            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                                <InfoItem
                                    icon={<Briefcase className="text-blue-600" />}
                                    label="Role"
                                    value={singleJob?.title || "Title"}
                                />
                                <InfoItem
                                    icon={<MapPin className="text-green-600" />}
                                    label="Location"
                                    value={singleJob?.location || "Location"}
                                />
                                <InfoItem
                                    icon={<GraduationCap className="text-yellow-600" />}
                                    label="Experience"
                                    value={`${singleJob?.experienceLevel || 0} Years`}
                                />
                                <InfoItem
                                    icon={<Coins className="text-orange-600" />}
                                    label="Salary"
                                    value={`${singleJob?.salary?.toLocaleString() || 0} ฿`}
                                />
                                <InfoItem
                                    icon={<Users className="text-purple-600" />}
                                    label="Total Applicants"
                                    value={singleJob?.applications?.length || 0}
                                />
                                <InfoItem
                                    icon={<CalendarDays className="text-red-600" />}
                                    label="Posted Date"
                                    value={formatEnglishDate(singleJob?.createdAt)}
                                />
                            </div>
                        </div>

                        {/* Job Description */}
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                <FileText size={20} className="mr-2 text-gray-600" /> Job Description
                            </h2>
                            <div className="bg-gray-50 p-6 rounded-xl">
                                <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                                    {singleJob?.description || "Job description not available."}
                                </p>
                            </div>
                        </div>

                        {/* Requirements */}
                        {requirementsList.length > 0 && (
                            <div className="mb-8">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                    <CheckCircle size={20} className="mr-2 text-gray-600" /> Requirements
                                </h2>
                                <div className="bg-gray-50 p-6 rounded-xl">
                                    <ul className="space-y-3">
                                        {requirementsList.map((requirement, index) => (
                                            <RequirementItem key={index} text={requirement} />
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}

                        {/* Apply Button - Single Button Only */}
                        <div className="mt-10 text-center">
                            <Button

                                onClick={isApplied ? null : applyJobHandler}
                                disabled={isApplied}
                                className={`rounded-lg px-8 py-4 text-white font-medium shadow-md transition transform hover:translate-y-px ${isApplied
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-blue-800 hover:bg-blue-900'
                                    }`}
                            >
                                {isApplied ? 'Already Applied' : 'Apply for This Position'}
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

const InfoItem = ({ icon, label, value }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:shadow-sm transition-all duration-300"
        >
            <div className="bg-white p-3 rounded-full shadow-sm">
                {icon}
            </div>
            <div>
                <h4 className="text-sm font-medium text-gray-500">{label}</h4>
                <p className="text-base font-semibold text-gray-800">{value}</p>
            </div>
        </motion.div>
    );
};

const RequirementItem = ({ text }) => (
    <motion.li
        initial={{ opacity: 0, x: -5 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-start"
    >
        <div className="flex-shrink-0 h-5 w-5 relative mt-1">
            <div className="absolute inset-0 bg-gray-400 rounded-full opacity-20"></div>
            <CheckCircle size={20} className="text-gray-600" />
        </div>
        <span className="ml-3 text-gray-700">{text}</span>
    </motion.li>
);

export default JobDescription;

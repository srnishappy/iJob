import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useSelector } from 'react-redux';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import {
    Loader2,
    Briefcase,
    FileText,
    CheckSquare,
    DollarSign,
    MapPin,
    Clock,
    Sparkles,
    Users,
    Building,
    ArrowLeft
} from 'lucide-react';
import { Textarea } from '../ui/textarea';

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { companies } = useSelector(store => store.company);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
        setInput({ ...input, companyId: selectedCompany._id });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}post`, input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    const goBack = () => {
        navigate(-1);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                className="max-w-6xl mx-auto px-4 py-8"
            >
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 flex items-center">
                            <Briefcase className="mr-3 text-blue-600" />
                            Post a New Job
                        </h1>
                        <p className="text-gray-600 mt-2">Fill in the details to create a job listing</p>
                    </div>
                    <Button
                        variant="outline"
                        onClick={goBack}
                        className="flex items-center gap-2"
                    >
                        <ArrowLeft size={16} />
                        Back
                    </Button>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
                    <form onSubmit={submitHandler}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Job Title */}
                            <div className="space-y-2">
                                <Label className="flex items-center text-gray-700">
                                    <Briefcase className="h-4 w-4 mr-2 text-blue-600" />
                                    Job Title
                                </Label>
                                <Input
                                    type="text"
                                    name="title"
                                    value={input.title}
                                    onChange={changeEventHandler}
                                    placeholder="e.g. Senior Frontend Developer"
                                    className="focus-visible:ring-blue-500"
                                />
                            </div>

                            {/* Job Location */}
                            <div className="space-y-2">
                                <Label className="flex items-center text-gray-700">
                                    <MapPin className="h-4 w-4 mr-2 text-blue-600" />
                                    Location
                                </Label>
                                <Input
                                    type="text"
                                    name="location"
                                    value={input.location}
                                    onChange={changeEventHandler}
                                    placeholder="e.g. Bangkok, Remote"
                                    className="focus-visible:ring-blue-500"
                                />
                            </div>

                            {/* Job Description - Full width */}
                            <div className="space-y-2 md:col-span-2">
                                <Label className="flex items-center text-gray-700">
                                    <FileText className="h-4 w-4 mr-2 text-blue-600" />
                                    Description
                                </Label>
                                <Textarea
                                    name="description"
                                    value={input.description}
                                    onChange={changeEventHandler}
                                    placeholder="Describe the role, responsibilities, and objectives"
                                    className="focus-visible:ring-blue-500 min-h-[100px]"
                                />
                            </div>

                            {/* Job Requirements - Full width */}
                            <div className="space-y-2 md:col-span-2">
                                <Label className="flex items-center text-gray-700">
                                    <CheckSquare className="h-4 w-4 mr-2 text-blue-600" />
                                    Requirements
                                </Label>
                                <Textarea
                                    name="requirements"
                                    value={input.requirements}
                                    onChange={changeEventHandler}
                                    placeholder="List the skills, qualifications, and experience required"
                                    className="focus-visible:ring-blue-500 min-h-[100px]"
                                />
                            </div>

                            {/* Salary */}
                            <div className="space-y-2">
                                <Label className="flex items-center text-gray-700">
                                    <DollarSign className="h-4 w-4 mr-2 text-blue-600" />
                                    Salary
                                </Label>
                                <Input
                                    type="text"
                                    name="salary"
                                    value={input.salary}
                                    onChange={changeEventHandler}
                                    placeholder="e.g. 50K-80K THB per month"
                                    className="focus-visible:ring-blue-500"
                                />
                            </div>

                            {/* Job Type */}
                            <div className="space-y-2">
                                <Label className="flex items-center text-gray-700">
                                    <Clock className="h-4 w-4 mr-2 text-blue-600" />
                                    Job Type
                                </Label>
                                <Input
                                    type="text"
                                    name="jobType"
                                    value={input.jobType}
                                    onChange={changeEventHandler}
                                    placeholder="e.g. Full-time, Part-time, Contract"
                                    className="focus-visible:ring-blue-500"
                                />
                            </div>

                            {/* Experience Level */}
                            <div className="space-y-2">
                                <Label className="flex items-center text-gray-700">
                                    <Sparkles className="h-4 w-4 mr-2 text-blue-600" />
                                    Experience Level
                                </Label>
                                <Input
                                    type="text"
                                    name="experience"
                                    value={input.experience}
                                    onChange={changeEventHandler}
                                    placeholder="e.g. Entry-level, Mid-level, Senior"
                                    className="focus-visible:ring-blue-500"
                                />
                            </div>

                            {/* Number of Positions */}
                            <div className="space-y-2">
                                <Label className="flex items-center text-gray-700">
                                    <Users className="h-4 w-4 mr-2 text-blue-600" />
                                    Number of Positions
                                </Label>
                                <Input
                                    type="number"
                                    name="position"
                                    value={input.position}
                                    onChange={changeEventHandler}
                                    min="1"
                                    className="focus-visible:ring-blue-500"
                                />
                            </div>

                            {/* Company Selection */}
                            {companies.length > 0 && (
                                <div className="space-y-2 md:col-span-2">
                                    <Label className="flex items-center text-gray-700">
                                        <Building className="h-4 w-4 mr-2 text-blue-600" />
                                        Select Company
                                    </Label>
                                    <Select onValueChange={selectChangeHandler}>
                                        <SelectTrigger className="w-full focus:ring-blue-500">
                                            <SelectValue placeholder="Select a Company" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {companies.map((company) => (
                                                    <SelectItem key={company._id} value={company?.name?.toLowerCase()}>
                                                        {company.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="mt-8">
                            {loading ? (
                                <Button disabled className="w-full py-6 text-lg">
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Posting Job...
                                </Button>
                            ) : (
                                <Button
                                    type="submit"
                                    className="w-full py-6 text-lg bg-blue-600 hover:bg-blue-700"
                                    disabled={companies.length === 0}
                                >
                                    <Briefcase className="mr-2 h-5 w-5" />
                                    Post New Job
                                </Button>
                            )}
                        </div>

                        {/* Warning Message */}
                        {companies.length === 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg"
                            >
                                <p className="text-red-600 font-medium text-center flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                                    </svg>
                                    Please register a company first before posting a job
                                </p>
                            </motion.div>
                        )}
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default PostJob;
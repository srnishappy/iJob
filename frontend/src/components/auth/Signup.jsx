import { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '../../utils/constant';
import { toast } from 'sonner';
import { Loader2, Mail, Lock, UserRound, Phone, Briefcase, GraduationCap, Upload, CheckCircle2, User } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';

const Signup = () => {
    const [input, setInput] = useState({
        fullname: '',
        email: '',
        phoneNumber: '',
        password: '',
        role: '',
        file: '',
    });

    const [fileName, setFileName] = useState('');
    const [formSteps, setFormSteps] = useState({
        fullname: false,
        email: false,
        phoneNumber: false,
        password: false,
        role: false,
        file: false
    });

    const { loading } = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });

        // Update steps completion status
        if (e.target.value.trim() !== '') {
            setFormSteps({ ...formSteps, [e.target.name]: true });
        } else {
            setFormSteps({ ...formSteps, [e.target.name]: false });
        }
    };

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file: file });
        if (file) {
            setFileName(file.name);
            setFormSteps({ ...formSteps, file: true });
        } else {
            setFileName('');
            setFormSteps({ ...formSteps, file: false });
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('fullname', input.fullname);
        formData.append('email', input.email);
        formData.append('phoneNumber', input.phoneNumber);
        formData.append('password', input.password);
        formData.append('role', input.role);
        if (input.file) {
            formData.append('file', input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate('/login');
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    };

    // Calculate form completion percentage
    const getCompletionPercentage = () => {
        const completedSteps = Object.values(formSteps).filter(Boolean).length;
        return Math.floor((completedSteps / Object.keys(formSteps).length) * 100);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            <Navbar />
            <div className="flex justify-center items-center px-4">
                <form
                    onSubmit={submitHandler}
                    className="w-full max-w-xl bg-white border border-gray-200 rounded-2xl p-8 my-12 
                    shadow-lg space-y-6 transition-all duration-500 ease-in-out hover:shadow-xl 
                    transform hover:-translate-y-1 relative overflow-hidden"
                >
                    {/* Progress bar */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gray-100">
                        <div
                            className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-700 ease-out"
                            style={{ width: `${getCompletionPercentage()}%` }}
                        ></div>
                    </div>

                    <div className="flex justify-between items-center">
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                            Create Account
                        </h2>
                        <span className="text-sm font-medium text-gray-500">{getCompletionPercentage()}% Complete</span>
                    </div>

                    <p className="text-gray-500 -mt-2">Get Started with iJob</p>

                    {/* Fullname */}
                    <div className="space-y-2 transition duration-300 ease-in-out transform hover:scale-[1.01]">
                        <Label className="text-gray-700 font-medium flex items-center">
                            Full Name
                            {formSteps.fullname && (
                                <CheckCircle2 className="ml-2 h-4 w-4 text-green-500 animate-pulse" />
                            )}
                        </Label>
                        <div className="relative">
                            <Input
                                type="text"
                                name="fullname"
                                value={input.fullname}
                                onChange={changeEventHandler}
                                placeholder="Your full name"
                                className="pl-10 py-6 rounded-xl transition-all duration-300 border-gray-300 focus:border-blue-400 
                                focus:ring-2 focus:ring-blue-200 focus:shadow-md"
                            />
                            <UserRound className="absolute left-3 top-3.5 text-gray-400 transition-colors duration-300" size={20} />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-2 transition duration-300 ease-in-out transform hover:scale-[1.01]">
                        <Label className="text-gray-700 font-medium flex items-center">
                            Email Address
                            {formSteps.email && (
                                <CheckCircle2 className="ml-2 h-4 w-4 text-green-500 animate-pulse" />
                            )}
                        </Label>
                        <div className="relative">
                            <Input
                                type="email"
                                name="email"
                                value={input.email}
                                onChange={changeEventHandler}
                                placeholder="you@example.com"
                                className="pl-10 py-6 rounded-xl transition-all duration-300 border-gray-300 focus:border-blue-400 
                                focus:ring-2 focus:ring-blue-200 focus:shadow-md"
                            />
                            <Mail className="absolute left-3 top-3.5 text-gray-400 transition-colors duration-300" size={20} />
                        </div>
                    </div>



                    {/* Password */}
                    <div className="space-y-2 transition duration-300 ease-in-out transform hover:scale-[1.01]">
                        <Label className="text-gray-700 font-medium flex items-center">
                            Password
                            {formSteps.password && (
                                <CheckCircle2 className="ml-2 h-4 w-4 text-green-500 animate-pulse" />
                            )}
                        </Label>
                        <div className="relative">
                            <Input
                                type="password"
                                name="password"
                                value={input.password}
                                onChange={changeEventHandler}
                                placeholder="Create a secure password"
                                className="pl-10 py-6 rounded-xl transition-all duration-300 border-gray-300 focus:border-blue-400 
                                focus:ring-2 focus:ring-blue-200 focus:shadow-md"
                            />
                            <Lock className="absolute left-3 top-3.5 text-gray-400 transition-colors duration-300" size={20} />
                        </div>
                    </div>

                    {/* Phone */}
                    <div className="space-y-2 transition duration-300 ease-in-out transform hover:scale-[1.01]">
                        <Label className="text-gray-700 font-medium flex items-center">
                            Phone Number
                            {formSteps.phoneNumber && (
                                <CheckCircle2 className="ml-2 h-4 w-4 text-green-500 animate-pulse" />
                            )}
                        </Label>
                        <div className="relative">
                            <Input
                                type="text"
                                name="phoneNumber"
                                value={input.phoneNumber}
                                onChange={changeEventHandler}
                                placeholder="Your contact number"
                                className="pl-10 py-6 rounded-xl transition-all duration-300 border-gray-300 focus:border-blue-400 
                                focus:ring-2 focus:ring-blue-200 focus:shadow-md"
                            />
                            <Phone className="absolute left-3 top-3.5 text-gray-400 transition-colors duration-300" size={20} />
                        </div>
                    </div>
                    {/* Role Selection */}
                    <div className="space-y-3">
                        <Label className="text-gray-700 font-medium flex items-center">
                            Role
                            {formSteps.role && (
                                <CheckCircle2 className="ml-2 h-4 w-4 text-green-500 animate-pulse" />
                            )}
                        </Label>
                        <p className="text-sm text-gray-500 -mt-1">Select your role to personalize your experience</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                            <div
                                className={`p-4 border rounded-xl transition-all duration-300 cursor-pointer
                                ${input.role === 'candidate'
                                        ? 'border-blue-500 bg-blue-50 shadow-md transform scale-[1.02]'
                                        : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'}`}
                                onClick={() => {
                                    setInput({ ...input, role: 'candidate' });
                                    setFormSteps({ ...formSteps, role: true });
                                }}
                            >
                                <div className="flex items-center mb-2">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="candidate"
                                        checked={input.role === 'candidate'}
                                        onChange={changeEventHandler}
                                        className="h-4 w-4 text-blue-600"
                                    />
                                    <div className="ml-3 flex items-center">
                                        <User className="h-5 w-5 text-blue-600 mr-2" />
                                        <span className="font-medium">Candidate</span>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600 ml-7">Looking for job opportunities and career growth</p>
                            </div>

                            <div
                                className={`p-4 border rounded-xl transition-all duration-300 cursor-pointer
                                ${input.role === 'recruiter'
                                        ? 'border-purple-500 bg-purple-50 shadow-md transform scale-[1.02]'
                                        : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'}`}
                                onClick={() => {
                                    setInput({ ...input, role: 'recruiter' });
                                    setFormSteps({ ...formSteps, role: true });
                                }}
                            >
                                <div className="flex items-center mb-2">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="recruiter"
                                        checked={input.role === 'recruiter'}
                                        onChange={changeEventHandler}
                                        className="h-4 w-4 text-blue-500"
                                    />
                                    <div className="ml-3 flex items-center">
                                        <Briefcase className="h-5 w-5 text-purple-600 mr-2" />
                                        <span className="font-medium">Recruiter</span>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600 ml-7">Hiring talent for your organization</p>
                            </div>
                        </div>
                    </div>

                    {/* Profile Upload */}
                    <div className="space-y-2">
                        <Label className="text-gray-700 font-medium flex items-center">
                            Profile Photo
                            {formSteps.file && (
                                <CheckCircle2 className="ml-2 h-4 w-4 text-green-500 animate-pulse" />
                            )}
                        </Label>
                        <div
                            className={`border-2 border-dashed rounded-xl p-4 transition-all duration-300
                            ${fileName ? 'border-green-300 bg-green-50' : 'border-gray-300 hover:border-blue-300 hover:bg-blue-50'}`}
                        >
                            <div className="flex flex-col items-center justify-center">
                                {fileName ? (
                                    <>
                                        <div className="bg-green-100 p-2 rounded-full mb-2">
                                            <CheckCircle2 className="h-6 w-6 text-green-500" />
                                        </div>
                                        <p className="text-sm font-medium text-green-600">{fileName}</p>
                                        <p className="text-xs text-gray-500 mt-1">File uploaded successfully</p>
                                    </>
                                ) : (
                                    <>
                                        <div className="bg-blue-100 p-2 rounded-full mb-2">
                                            <Upload className="h-6 w-6 text-blue-500" />
                                        </div>
                                    </>
                                )}

                                <label className="mt-2 cursor-pointer">
                                    <span className={`inline-block px-4 py-2 rounded-lg text-sm font-medium
                                    ${fileName ? 'bg-green-500 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'} 
                                    transition-colors duration-300`}>
                                        {fileName ? 'Change Photo' : 'Browse Files'}
                                    </span>
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={changeFileHandler}
                                        className="hidden"
                                    />
                                </label>
                                {!fileName && (
                                    <p className="text-xs text-gray-500 mt-1">JPEG, PNG or GIF (Max. 2MB)</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    {loading ? (
                        <Button className="w-full bg-blue-500 text-white py-6 rounded-xl transition-all duration-300" disabled>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Creating Your Account...
                        </Button>
                    ) : (
                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 
                            text-white py-6 rounded-xl transition-all duration-500 ease-in-out 
                            transform hover:scale-[1.02] active:scale-95 hover:shadow-lg shadow-md"
                        >
                            Create Account
                        </Button>
                    )}

                    {/* Login link */}
                    <p className="text-center text-gray-600 transition-all duration-300 ease-in-out pt-2">
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-300">
                            Log in
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;
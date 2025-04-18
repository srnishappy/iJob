import { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '../../redux/authSlice';
import { Loader2, Mail, Lock, User, Briefcase } from 'lucide-react';
import { toast } from 'sonner';

const Login = () => {
    const [input, setInput] = useState({
        email: '',
        password: '',
        role: '',
    });
    const { loading, user } = useSelector((store) => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate('/');
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            <Navbar />
            <div className="flex justify-center items-center px-4">
                <form
                    onSubmit={submitHandler}
                    className="w-full max-w-xl bg-white border border-gray-200 rounded-2xl p-8 my-12 shadow-lg space-y-6 transition-all duration-500 ease-in-out hover:shadow-xl transform hover:-translate-y-1 relative"
                >
                    {/* Progress bar */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gray-100">
                        <div
                            className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-700 ease-out"
                            style={{ width: '100%' }}
                        ></div>
                    </div>

                    <div className="flex justify-between items-center">
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                            Login
                        </h2>
                    </div>

                    <p className="text-gray-500 -mt-2">Log in to your account</p>

                    {/* Email */}
                    <div className="space-y-2">
                        <Label className="text-gray-700 font-medium flex items-center">Email</Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                            <Input
                                type="email"
                                name="email"
                                value={input.email}
                                onChange={changeEventHandler}
                                placeholder="you@example.com"
                                className="pl-10 py-6 rounded-xl transition-all duration-300 border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 focus:shadow-md"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                        <Label className="text-gray-700 font-medium flex items-center">Password</Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                            <Input
                                type="password"
                                name="password"
                                value={input.password}
                                onChange={changeEventHandler}
                                placeholder="Your password"
                                className="pl-10 py-6 rounded-xl transition-all duration-300 border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 focus:shadow-md"
                            />
                        </div>
                    </div>

                    {/* Role Selection */}
                    <div className="space-y-3">
                        <Label className="text-gray-700 font-medium flex items-center">I am a</Label>
                        <p className="text-sm text-gray-500 -mt-1">Select your role to personalize your experience</p>

                        {/* แยก Role ด้วยการใช้ flex */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-3">
                            <div
                                className={`p-4 border rounded-xl transition-all duration-300 cursor-pointer
                                ${input.role === 'candidate'
                                        ? 'border-blue-500 bg-blue-50 shadow-md transform scale-[1.02]'
                                        : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'}`}
                                onClick={() => setInput({ ...input, role: 'candidate' })}
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
                                        <User className="h-5 w-5 text-blue-600" />
                                        <span className="font-medium px-1">Candidate</span>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600 ml-7">Looking for job opportunities and career growth</p>
                            </div>

                            <div
                                className={`p-4 border rounded-xl transition-all duration-300 cursor-pointer
                                ${input.role === 'recruiter'
                                        ? 'border-purple-500 bg-purple-50 shadow-md transform scale-[1.02]'
                                        : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'}`}
                                onClick={() => setInput({ ...input, role: 'recruiter' })}
                            >
                                <div className="flex items-center mb-2">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="recruiter"
                                        checked={input.role === 'recruiter'}
                                        onChange={changeEventHandler}
                                        className="h-4 w-4 text-purple-600"
                                    />
                                    <div className="ml-3 flex items-center">
                                        <Briefcase className="h-5 w-5 text-purple-600" />
                                        <span className="font-medium px-1">Recruiter</span>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600 ml-7">Hiring talent for your organization</p>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    {loading ? (
                        <Button className="w-full bg-blue-500 text-white py-6 rounded-xl transition-all duration-300" disabled>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Logging in...
                        </Button>
                    ) : (
                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-6 rounded-xl transition-all duration-500 ease-in-out transform hover:scale-[1.02] active:scale-95 hover:shadow-lg shadow-md"
                        >
                            Login
                        </Button>
                    )}

                    {/* Signup link */}
                    <p className="text-center text-gray-600 transition-all duration-300 ease-in-out pt-8">
                        Don't have an account?{' '}
                        <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-300">
                            Sign up
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;

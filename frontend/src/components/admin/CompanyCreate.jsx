import { useNavigate } from "react-router-dom"
import Navbar from "../shared/Navbar"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { ArrowLeft, Building2 } from "lucide-react"
import axios from "axios"
import { toast } from "sonner"
import { COMPANY_API_END_POINT } from "@/utils/constant"
import { setSingleCompany } from "@/redux/companySlice"

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const registerNewCompany = async () => {
        if (!companyName.trim()) {
            return toast.error("Company name is required");
        }

        try {
            setLoading(true);
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-4xl mx-auto px-4 py-12 md:px-8">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

                    {/* Logo Icon */}
                    <div className="flex justify-center py-10">
                        <div className="bg-blue-50 rounded-full p-4">
                            <Building2 className="w-10 h-10 text-blue-500" />
                        </div>
                    </div>

                    {/* Form Header */}
                    <div className="text-center px-4 mb-8">
                        <h1 className="text-2xl font-bold text-gray-800">Company Registration</h1>
                        <p className="text-gray-500 mt-2 text-sm">
                            What would you like to name your company? You can update this information later.
                        </p>
                    </div>

                    <div className="px-6 md:px-10 pb-10">
                        <div className="max-w-md mx-auto">
                            {/* Company Name Input */}
                            <div className="mb-8">
                                <Label className="mb-1.5 text-gray-700 flex items-center text-sm font-medium">
                                    <Building2 className="w-4 h-4 text-blue-500 mr-1.5" />
                                    Company Name
                                </Label>
                                <Input
                                    type="text"
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                                    placeholder="Enter your company name"
                                />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-between items-center pt-2">
                                <button
                                    type="button"
                                    onClick={() => navigate("/admin/companies")}
                                    className="flex items-center text-gray-600 hover:text-blue-500 transition-colors"
                                >
                                    <ArrowLeft className="w-4 h-4 mr-1" />
                                    <span>Back</span>
                                </button>

                                <Button
                                    type="button"
                                    onClick={registerNewCompany}
                                    disabled={loading}
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
                                >
                                    {loading ? (
                                        <div className="flex items-center">
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            <span>Creating...</span>
                                        </div>
                                    ) : (
                                        "Continue"
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompanyCreate
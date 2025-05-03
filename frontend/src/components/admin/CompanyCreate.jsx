import { useNavigate } from "react-router-dom"
import Navbar from "../shared/Navbar"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { ArrowLeft } from "lucide-react"
import axios from "axios"
import { toast } from "sonner"
import { COMPANY_API_END_POINT } from "@/utils/constant"
import { setSingleCompany } from "@/redux/companySlice"

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState("");
    const dispatch = useDispatch();
    const registerNewCompany = async () => {
        try {
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
        }
    }
    return (
        <div className="min-h-screen bg-white text-gray-800">
            <Navbar />
            <div className="max-w-4xl mx-auto px-6 py-12">
                {/* Heading */}
                <div className="mb-10">
                    <h1 className="text-3xl font-bold text-gray-900">Your Company Name</h1>
                    <p className="text-gray-500 mt-2">
                        What would you like to give your company name? You can change this later.
                    </p>
                </div>

                {/* Input Field */}
                <div className="mb-8">
                    <Label className="text-gray-700">Company Name</Label>
                    <Input
                        type="text"
                        className="mt-2 bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Enter your company name"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                    />
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-6">
                    <div
                        className="flex items-center gap-2 text-blue-600 cursor-pointer hover:underline"
                        onClick={() => navigate("/admin/companies")}
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span>Back</span>
                    </div>

                    <Button className="bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={registerNewCompany}
                    >
                        Continue
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default CompanyCreate

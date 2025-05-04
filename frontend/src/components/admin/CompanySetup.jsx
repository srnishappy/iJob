import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2, Building2, FileText, Globe, MapPin, ImagePlus } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById'

const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id);
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });
    const { singleCompany } = useSelector(store => store.company);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.file) {
            formData.append("file", input.file);
        }
        if (!input.name || !input.description || !input.website || !input.location) {
            toast.error("Please fill all the fields");
            return;
        }

        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setInput({
            name: singleCompany.name || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            file: singleCompany.file || null
        })
    }, [singleCompany]);

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
                        <h1 className="text-2xl font-bold text-gray-800">Company Setup</h1>
                        <p className="text-gray-500 mt-2 text-sm">
                            Update your company details and information. These details will be visible to others.
                        </p>
                    </div>

                    <form onSubmit={submitHandler} className="px-6 md:px-10 pb-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                            {/* Company Name */}
                            <div className="mb-2">
                                <Label className="mb-1.5 text-gray-700 flex items-center text-sm font-medium">
                                    <Building2 className="w-4 h-4 text-blue-500 mr-1.5" />
                                    Company Name
                                </Label>
                                <Input
                                    type="text"
                                    name="name"
                                    value={input.name}
                                    onChange={changeEventHandler}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                                    placeholder="Enter company name"
                                />
                            </div>

                            {/* Description */}
                            <div className="mb-2">
                                <Label className="mb-1.5 text-gray-700 flex items-center text-sm font-medium">
                                    <FileText className="w-4 h-4 text-blue-500 mr-1.5" />
                                    Description
                                </Label>
                                <Input
                                    type="text"
                                    name="description"
                                    value={input.description}
                                    onChange={changeEventHandler}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                                    placeholder="Brief description of your company"
                                />
                            </div>

                            {/* Website */}
                            <div className="mb-2">
                                <Label className="mb-1.5 text-gray-700 flex items-center text-sm font-medium">
                                    <Globe className="w-4 h-4 text-blue-500 mr-1.5" />
                                    Website
                                </Label>
                                <Input
                                    type="text"
                                    name="website"
                                    value={input.website}
                                    onChange={changeEventHandler}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                                    placeholder="https://yourcompany.com"
                                />
                            </div>

                            {/* Location */}
                            <div className="mb-2">
                                <Label className="mb-1.5 text-gray-700 flex items-center text-sm font-medium">
                                    <MapPin className="w-4 h-4 text-blue-500 mr-1.5" />
                                    Location
                                </Label>
                                <Input
                                    type="text"
                                    name="location"
                                    value={input.location}
                                    onChange={changeEventHandler}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                                    placeholder="City, Country"
                                />
                            </div>
                        </div>

                        {/* Company Logo */}
                        <div className="mt-4 mb-8">
                            <Label className="mb-1.5 text-gray-700 flex items-center text-sm font-medium">
                                <ImagePlus className="w-4 h-4 text-blue-500 mr-1.5" />
                                Company Logo
                            </Label>
                            <div className="flex items-center mt-1 border border-gray-200 rounded-lg overflow-hidden">
                                <label className="flex-shrink-0 cursor-pointer">
                                    <span className="block bg-blue-500 text-white px-4 py-2 text-sm font-medium">Choose File</span>
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={changeFileHandler}
                                        className="hidden"
                                    />
                                </label>
                                <span className="ml-3 text-sm text-gray-500">
                                    {input.file ? input.file.name : "No file chosen"}
                                </span>
                            </div>
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
                                type="submit"
                                disabled={loading}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
                            >
                                {loading ? (
                                    <div className="flex items-center">
                                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                        <span>Please wait</span>
                                    </div>
                                ) : (
                                    "Update Company"
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CompanySetup
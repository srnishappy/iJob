import Navbar from "./shared/Navbar"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { motion } from "framer-motion"
import { Briefcase, MapPin, CalendarDays, Users, Coins, FileText } from "lucide-react"

const JobDescription = ({ job }) => {
    const isApplied = false;

    return (
        <>
            <Navbar />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="max-w-7xl mx-auto my-10 px-6"
            >
                <div className="flex flex-col md:flex-row items-start justify-between gap-4 mb-8 bg-gray-50 p-6 rounded-xl border border-gray-200">
                    <div>
                        <h1 className="font-bold text-3xl text-gray-800">{job?.title || 'Job Title'}</h1>
                        <div className="flex flex-wrap items-center gap-2 mt-4">
                            <Badge className="bg-blue-50 text-blue-500 border-blue-200 hover:bg-blue-100" variant="outline">
                                {job?.position || 0} {job?.position === 1 ? 'Position' : 'Positions'}
                            </Badge>
                            <Badge className="bg-red-50 text-red-600 border-red-200 hover:bg-red-100" variant="outline">
                                {job?.jobType || "Full-time"}
                            </Badge>
                            <Badge className="bg-green-50 text-green-600 border-green-200 hover:bg-green-100" variant="outline">
                                {job?.salary ? `${job?.salary} ฿` : "฿"}
                            </Badge>
                        </div>
                    </div>
                    <Button
                        onClick={() => console.log("Apply clicked")}
                        disabled={isApplied}
                        className={`rounded-xl text-white px-6 py-2 text-sm font-medium transition ${isApplied ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                            }`}
                    >
                        {isApplied ? 'Already Applied' : 'Apply Now'}
                    </Button>
                </div>

                <h2 className="text-xl font-semibold border-b border-gray-300 pb-2 mb-4 text-gray-700 flex items-center">
                    <FileText size={20} className="mr-2 text-blue-500" /> Job Description
                </h2>

                <div className="grid md:grid-cols-2 gap-4 text-gray-700">
                    <InfoItem icon={<Briefcase size={20} />} label="Role" value={job?.title || "Title"} />
                    <InfoItem icon={<MapPin size={20} />} label="Location" value={job?.location || "Location"} />
                    <InfoItem icon={<FileText size={20} />} label="Description" value={job?.description || "Description"} />
                    <InfoItem icon={<CalendarDays size={20} />} label="Experience" value={`${job?.experience || 0} ปี`} />
                    <InfoItem icon={<Coins size={20} />} label="Salary" value={`${job?.salary || 0} ฿`} />
                    <InfoItem icon={<Users size={20} />} label="Total Applicants" value={job?.totalApplicants || 0} />
                    <InfoItem icon={<CalendarDays size={20} />} label="Posted Date" value={job?.createdAt || "N/A"} />
                </div>
            </motion.div>
        </>
    )
}

const InfoItem = ({ icon, label, value }) => (
    <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:border-gray-200"
    >
        <div className="text-blue-500">{icon}</div>
        <div>
            <h4 className="text-sm font-semibold text-gray-600">{label}</h4>
            <p className="text-base font-normal text-gray-800">{value}</p>
        </div>
    </motion.div>
)

export default JobDescription;
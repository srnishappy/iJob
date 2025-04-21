import { Button } from './ui/button'
import { Bookmark, Clock } from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({ job }) => {
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        // ตรวจสอบว่า mongodbTime มีค่าหรือไม่
        if (!mongodbTime) return "New";

        try {
            const createdAt = new Date(mongodbTime);
            // ตรวจสอบว่า createdAt เป็นวันที่ที่ถูกต้องหรือไม่
            if (isNaN(createdAt.getTime())) return "New";

            const currentTime = new Date();
            const timeDifference = currentTime - createdAt;
            const daysAgo = Math.floor(timeDifference / (1000 * 24 * 60 * 60));

            return daysAgo === 0 ? "Today" : `${daysAgo} days ago`;
        } catch (error) {
            return "New";
        }
    }

    // ฟังก์ชันสำหรับสร้างตัวอักษรแรกของชื่อบริษัท
    const getCompanyInitial = (companyName) => {
        if (!companyName) return "C";
        return companyName.charAt(0).toUpperCase();
    }

    return (
        <div className='p-4 sm:p-5 rounded-lg shadow-md bg-white border border-gray-200 hover:shadow-lg transition-all duration-300'>
            <div className='flex items-center justify-between'>
                <div className="flex items-center text-gray-500">
                    <Clock size={14} className="mr-1" />
                    <p className='text-xs sm:text-sm font-medium'>{daysAgoFunction(job?.createdAt)}</p>
                </div>
                <Button variant="ghost" className="rounded-full hover:bg-gray-100 h-8 w-8 p-0" size="icon">
                    <Bookmark className="text-gray-400 hover:text-blue-500" size={16} />
                </Button>
            </div>

            <div className='flex items-center gap-3 my-3'>
                <div className="h-12 w-12 rounded-md overflow-hidden border border-gray-200">
                    <Avatar className="h-full w-full">
                        <AvatarImage src={job?.company?.logo} alt={job?.company?.name || "Company"} />
                        <AvatarFallback className="bg-blue-100 text-blue-600 font-bold">
                            {getCompanyInitial(job?.company?.name)}
                        </AvatarFallback>
                    </Avatar>
                </div>
                <div>
                    <h2 className='font-semibold text-gray-800'>{job?.company?.name || "Company Name"}</h2>
                </div>
            </div>

            <div className="my-3">
                <h1 className='font-bold text-lg text-gray-900 mb-2'>{job?.title || "Job Title"}</h1>
                <p className='text-sm text-gray-600 line-clamp-2'>{job?.description || "No description available"}</p>
            </div>

            <div className='flex flex-wrap items-center gap-2 mt-3'>
                <Badge className='bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100' variant="outline">
                    {job?.position || 0} {(job?.position === 1) ? 'Position' : 'Positions'}
                </Badge>
                <Badge className='bg-red-50 text-red-600 border-red-200 hover:bg-red-100' variant="outline">
                    {job?.jobType || "Full-time"}
                </Badge>
                <Badge className='bg-green-50 text-green-600 border-green-200 hover:bg-green-100' variant="outline">
                    {job?.salary ? `${job?.salary}฿` : "฿"}
                </Badge>
            </div>

            <div className='flex items-center gap-3 mt-4'>
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
        </div>
    )
}

export default Job
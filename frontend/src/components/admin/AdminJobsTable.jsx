import { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminJobsTable = () => {
    const { allAdminJobs, searchJobByText } = useSelector((store) => store.job)
    const [filterJobs, setFilterJobs] = useState(allAdminJobs)
    const navigate = useNavigate()

    useEffect(() => {
        const filteredJobs = allAdminJobs.filter((job) => {
            const titleMatch = job?.title?.toLowerCase().includes(searchJobByText?.toLowerCase())
            const companyMatch = job?.company?.name?.toLowerCase().includes(searchJobByText?.toLowerCase())
            return !searchJobByText || titleMatch || companyMatch
        })
        setFilterJobs(filteredJobs)
    }, [allAdminJobs, searchJobByText])

    return (
        <div className="p-6 min-h-screen">
            <Table className="w-full border border-gray-200 rounded-xl shadow-md">
                <TableCaption className="text-sm text-gray-500">
                    A list of your recent posted jobs
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterJobs?.map((job) => (
                        <TableRow key={job._id}>
                            <TableCell>{job?.company?.name || 'N/A'}</TableCell>
                            <TableCell>{job?.title || 'N/A'}</TableCell>
                            <TableCell>{job?.createdAt?.split('T')[0] || '—'}</TableCell>
                            <TableCell className="text-right">
                                <Popover>
                                    <PopoverTrigger>
                                        <MoreHorizontal className="cursor-pointer" />
                                    </PopoverTrigger>
                                    <PopoverContent className="w-40">
                                        <div
                                            onClick={() => navigate(`/admin/companies/${job._id}`)}
                                            className="flex items-center gap-2 cursor-pointer text-sm hover:text-blue-600"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                            <span>Edit</span>
                                        </div>
                                        <div
                                            onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                                            className="flex items-center gap-2 cursor-pointer mt-2 text-sm hover:text-blue-600"
                                        >
                                            <Eye className="w-4 h-4" />
                                            <span>Applicants</span>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default AdminJobsTable

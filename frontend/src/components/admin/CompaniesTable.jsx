import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company)
    const [filterCompany, setFilterCompany] = useState(companies)
    const navigate = useNavigate()

    useEffect(() => {
        const filteredCompany = companies.filter(company => {
            if (!searchCompanyByText) return true
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
        })
        setFilterCompany(filteredCompany)
    }, [companies, searchCompanyByText])

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <Table className="w-full rounded-lg shadow-md border border-gray-200 bg-white">
                <TableCaption className="text-gray-600 text-sm mb-4">
                    A list of your recent registered companies
                </TableCaption>
                <TableHeader>
                    <TableRow className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                        <TableHead className="text-gray-700 font-semibold text-left py-4 px-6">
                            Logo
                        </TableHead>
                        <TableHead className="text-gray-700 font-semibold text-left py-4 px-6">
                            Name
                        </TableHead>
                        <TableHead className="text-gray-700 font-semibold text-left py-4 px-6">
                            Date
                        </TableHead>
                        <TableHead className="text-gray-700 font-semibold text-right py-4 px-6">
                            Action
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterCompany?.length === 0 ? (
                        <TableRow className="border-b border-gray-200">
                            <TableCell colSpan={4} className="text-center text-gray-500 py-8 font-medium">
                                No companies found.
                            </TableCell>
                        </TableRow>
                    ) : (
                        filterCompany.map(company => (
                            <TableRow key={company._id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                                <TableCell className="py-4 px-6">
                                    <Avatar className="w-12 h-12 ring-2 ring-blue-400 ring-opacity-30">
                                        <AvatarImage
                                            src={company.logo}
                                            className="object-cover"
                                            alt={`${company.name} logo`}
                                        />
                                    </Avatar>
                                </TableCell>
                                <TableCell className="text-gray-900 font-medium py-4 px-6">
                                    {company.name}
                                </TableCell>
                                <TableCell className="text-gray-600 py-4 px-6">
                                    {company.createdAt?.split("T")[0]}
                                </TableCell>
                                <TableCell className="text-right py-4 px-6">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal className="w-5 h-5 text-gray-500 hover:text-blue-600 cursor-pointer transition-colors duration-200" />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-40 bg-white border border-gray-200 rounded-lg shadow-lg p-2">
                                            <div
                                                onClick={() => navigate(`/admin/companies/${company._id}`)}
                                                className="flex items-center gap-3 p-2 rounded-md cursor-pointer w-full hover:bg-gray-100 hover:text-blue-600 transition-colors duration-200"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                                <span className="text-sm font-medium">Edit</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default CompaniesTable
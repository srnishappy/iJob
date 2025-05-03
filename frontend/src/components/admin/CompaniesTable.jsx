import { Edit2, MoreHorizontal } from "lucide-react"
import { Avatar, AvatarImage } from "../ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"

const CompaniesTable = () => {
    return (
        <div>
            <Table>
                <TableCaption>A list of your recent registered</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <Avatar>
                                <AvatarImage src="https://thafd.bing.com/th/id/OIP.QhsyC7cx6AJOz0gRwllLUwHaE_?rs=1&pid=ImgDetMain" />
                            </Avatar>
                        </TableCell>
                        <TableCell>Company Name</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell className="text-right">
                            <Popover>
                                <PopoverTrigger>
                                    <MoreHorizontal className="cursor-pointer" />
                                </PopoverTrigger>
                                <PopoverContent className="w-32">
                                    <div className="flex items-center gap-2 cursor-pointer w-fit hover:text-blue-600">
                                        <Edit2 className="w-4 h-4" />
                                        <span>Edit</span>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}

export default CompaniesTable

import { useState } from "react"
import Navbar from "../shared/Navbar"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import CompaniesTable from "./CompaniesTable"
import { Plus } from "lucide-react"

const Companies = () => {
    const [input, setInput] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <div className="max-w-6xl mx-auto my-10 p-4 sm:p-6 bg-white rounded-lg shadow-md">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                    <Input
                        className="sm:w-1/3"
                        placeholder="🔍 Filter by company name..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button
                        onClick={() => navigate("/admin/companies/create")}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        New Company
                    </Button>
                </div>

                <CompaniesTable />
            </div>
        </div>
    )
}

export default Companies

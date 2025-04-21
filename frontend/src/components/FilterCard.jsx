import { Label } from "./ui/label"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { MapPin, Briefcase, Banknote, Filter } from "lucide-react"

const FilterCard = () => {
    const filterData = [
        {
            filterType: "Location",
            icon: MapPin,
            array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
        },
        {
            filterType: "Industry",
            icon: Briefcase,
            array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
        },
        {
            filterType: "Salary",
            icon: Banknote,
            array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
        },
    ]

    return (
        <div className="w-full bg-white p-5 rounded-lg shadow-md border border-gray-100">
            <div className="flex items-center space-x-2 mb-4">
                <Filter size={18} className="text-blue-600" />
                <h1 className="font-bold text-xl text-gray-800">Filter Jobs</h1>
            </div>

            <RadioGroup>
                {filterData.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <div key={index} className="mb-5">
                            <div className="flex items-center space-x-2 mb-2">
                                <Icon size={16} className="text-blue-600" />
                                <h2 className="font-semibold text-gray-700">{item.filterType}</h2>
                            </div>
                            <div className="ml-6">
                                {item.array.map((value, idx) => (
                                    <div key={idx} className="flex items-center space-x-3 mb-3">
                                        <RadioGroupItem
                                            value={value}
                                            id={`${item.filterType}-${idx}`}
                                            className="border-gray-400 focus:ring-blue-500"
                                        />
                                        <Label
                                            htmlFor={`${item.filterType}-${idx}`}
                                            className="text-gray-600 cursor-pointer hover:text-blue-500 transition-colors"
                                        >
                                            {value}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                })}
            </RadioGroup>
        </div>
    )
}

export default FilterCard

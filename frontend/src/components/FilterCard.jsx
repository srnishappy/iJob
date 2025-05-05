import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { Filter, X } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { setSearchedQuery } from '@/redux/jobSlice';

const filterData = [
    {
        filterType: "Location",
        array: ["Bangkok", "Chiang Mai", "Phuket", "Pattaya",]
    },
    {
        filterType: "Position",
        array: ["Frontend Developer", "Backend Developer", "Full Stack Developer", "Mobile Developer", "DevOps Engineer", "UI/UX Developer", "QA Engineer", "Game Developer", "Blockchain Developer", "AI/ML Engineer"]
    },

];

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const dispatch = useDispatch();

    const changeHandler = (value) => {
        setSelectedValue(value);
    };

    const clearFilters = () => {
        setSelectedValue('');
    };

    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue));
    }, [selectedValue, dispatch]);

    // Show filters on desktop by default, but hide on mobile until toggled
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsFilterVisible(true);
            } else {
                setIsFilterVisible(false);
            }
        };

        // Initial setup
        handleResize();

        // Listen for window resize
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="w-full bg-white rounded-lg shadow-sm border border-gray-100">
            {/* Filter Header */}
            <div className="p-4 flex justify-between items-center border-b border-gray-100">
                <div className="flex items-center">
                    <Filter className="h-5 w-5 mr-2 text-blue-600" />
                    <h1 className="font-bold text-lg text-gray-800">Filter Jobs</h1>
                </div>
                <div className="flex items-center gap-2">
                    {selectedValue && (
                        <button
                            onClick={clearFilters}
                            className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                        >
                            <X className="h-4 w-4 mr-1" />
                            Clear
                        </button>
                    )}
                    <button
                        className="lg:hidden p-1.5 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
                        onClick={() => setIsFilterVisible(!isFilterVisible)}
                    >
                        {isFilterVisible ?
                            <X className="h-4 w-4" /> :
                            <Filter className="h-4 w-4" />
                        }
                    </button>
                </div>
            </div>

            {/* Filter Content */}
            {isFilterVisible && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-4"
                >
                    <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                        {filterData.map((data, index) => (
                            <div key={index} className="mb-6 last:mb-0">
                                <h2 className="font-bold text-md text-gray-700 mb-2 flex items-center">
                                    {data.filterType}
                                    {selectedValue && data.array.includes(selectedValue) && (
                                        <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                                            Active
                                        </span>
                                    )}
                                </h2>
                                <div className="ml-1 space-y-2">
                                    {data.array.map((item, idx) => {
                                        const itemId = `id${index}-${idx}`;
                                        return (
                                            <div key={itemId} className="flex items-center space-x-2 hover:bg-gray-50 rounded-md p-1 transition-colors cursor-pointer">
                                                <RadioGroupItem value={item} id={itemId} />
                                                <Label
                                                    htmlFor={itemId}
                                                    className={`cursor-pointer text-sm ${selectedValue === item ? 'text-blue-600 font-medium' : 'text-gray-600'}`}
                                                >
                                                    {item}
                                                </Label>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </RadioGroup>
                </motion.div>
            )}
        </div>
    );
};

export default FilterCard;
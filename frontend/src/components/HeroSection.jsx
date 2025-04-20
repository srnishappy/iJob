import { Search, Briefcase, Users, Building, Code, TrendingUp } from "lucide-react"
import { Button } from "./ui/button"
import Category from "./Category"

const HeroSection = () => {
    return (
        <div className="relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-50 to-white opacity-50"></div>

            <div className="max-w-6xl mx-auto px-4 py-12">
                <div className="text-center">
                    <div className="flex flex-col gap-3 my-6">
                        <span className="mx-auto px-4 py-2 rounded-full bg-blue-500 text-white font-medium">
                            Let's find your job
                        </span>
                        <h1 className="text-4xl font-bold">
                            Search, Apply & <br />
                            Get Your <span className="text-blue-600">Job</span>
                        </h1>
                        <p className="text-gray-600 max-w-xl mx-auto mt-4">
                            Discover and apply for your next job opportunity
                        </p>
                        <div className="flex w-full max-w-lg shadow-lg border border-gray-200 pl-5 rounded-full items-center gap-3 mx-auto mt-6">
                            <input
                                type="text"
                                placeholder="Find your dream job"
                                className="outline-none border-none w-full text-sm text-gray-700 placeholder-gray-400"
                            />
                            <Button className="rounded-r-full bg-blue-500">
                                <Search className='h-5 w-5' />
                            </Button>
                        </div>

                        {/* ✅ Popular categories */}
                        <div className="mt-6 px-4 sm:px-6">
                            <Category />
                        </div>
                    </div>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 border-t border-gray-100 pt-8">
                    {[
                        {
                            icon: <Search className="w-6 h-6 text-blue-600" />,
                            title: "Easy Job Search",
                            desc: "Filter by location, job type, and more"
                        },
                        {
                            icon: <Users className="w-6 h-6 text-blue-600" />,
                            title: "Connect with Employers",
                            desc: "Direct applications to top companies"
                        },
                        {
                            icon: <Briefcase className="w-6 h-6 text-blue-600" />,
                            title: "Career Growth",
                            desc: "Find opportunities that match your skills"
                        }
                    ].map((item, idx) => (
                        <div key={idx} className="flex flex-col items-center text-center p-4">
                            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                                {item.icon}
                            </div>
                            <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                            <p className="text-gray-600 text-sm">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default HeroSection

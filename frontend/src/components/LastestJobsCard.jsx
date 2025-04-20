import { Badge } from "./ui/badge";

const LastestJobsCard = () => {
    return (
        <div className="p-5 rounded-md shadow-xl bg-white border-gray-100 cursor-pointer transform hover:scale-102 hover:animate-bounce-slow max-w-sm sm:max-w-md lg:max-w-lg mx-auto">
            <div>
                <h1 className="font-bold text-xl sm:text-2xl">Company Name</h1>
            </div>
            <div>
                <h1 className="font-medium my-2 text-lg sm:text-xl">Job Title</h1>
                <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet consectetur.</p>
            </div>
            <div className="flex flex-wrap items-center gap-2 mt-4">
                <Badge className="text-blue-500 font-bold" variant="ghost">12 Position</Badge>
                <Badge className="text-blue-500 font-bold" variant="ghost">Position</Badge>
                <Badge className="text-blue-500 font-bold" variant="ghost">2 Position</Badge>
            </div>
        </div>
    );
};

export default LastestJobsCard;

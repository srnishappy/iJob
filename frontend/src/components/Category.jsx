import {
    Code,
    Smartphone,
    Server,
    MonitorSmartphone,
    Settings,
    Brush,
    Bug,
    Gamepad2,
    ShieldCheck,
    BrainCircuit
} from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel"
import { Button } from "./ui/button"

const Category = () => {
    const category = [
        { name: "Frontend Developer", icon: <MonitorSmartphone className="w-4 h-4" /> },
        { name: "Backend Developer", icon: <Server className="w-4 h-4" /> },
        { name: "Full Stack Developer", icon: <Code className="w-4 h-4" /> },
        { name: "Mobile Developer", icon: <Smartphone className="w-4 h-4" /> },
        { name: "DevOps Engineer", icon: <Settings className="w-4 h-4" /> },
        { name: "UI/UX Developer", icon: <Brush className="w-4 h-4" /> },
        { name: "QA Engineer", icon: <Bug className="w-4 h-4" /> },
        { name: "Game Developer", icon: <Gamepad2 className="w-4 h-4" /> },
        { name: "Blockchain Developer", icon: <ShieldCheck className="w-4 h-4" /> },
        { name: "AI/ML Engineer", icon: <BrainCircuit className="w-4 h-4" /> },
    ]

    return (
        <div className="mx-auto max-w-6xl px-4 relative">
            <Carousel className="w-full overflow-visible">
                <CarouselContent className="flex gap-4 md:gap-6 lg:gap-8">
                    {category.map((item, index) => (
                        <CarouselItem key={index} className="flex-none w-1/2 sm:w-1/3 md:w-1/4">
                            <Button variant="outline" className="rounded-full flex items-center gap-2 p-3 w-full">
                                {item.icon}
                                <span>{item.name}</span>
                            </Button>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                <CarouselPrevious className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 z-10" />
                <CarouselNext className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 z-10" />
            </Carousel>
        </div>
    )
}

export default Category

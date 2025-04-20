import { Code, TrendingUp, Users, Pencil, Clipboard, BarChart } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel"
import { Button } from "./ui/button"

const Category = () => {
    const category = [
        { name: "Software Engineer", icon: <Code className="w-4 h-4" /> },
        { name: "Marketing Specialist", icon: <TrendingUp className="w-4 h-4" /> },
        { name: "Graphic Designer", icon: <Pencil className="w-4 h-4" /> },
        { name: "Product Manager", icon: <Clipboard className="w-4 h-4" /> },
        { name: "HR Manager", icon: <Users className="w-4 h-4" /> },
        { name: "Business Analyst", icon: <BarChart className="w-4 h-4" /> },
        { name: "Web Developer", icon: <Code className="w-4 h-4" /> },
        { name: "Data Scientist", icon: <BarChart className="w-4 h-4" /> }
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

import useGetAlljobs from "@/hooks/useGetAlljobs"
import HeroSection from "./HeroSection"
import LatestJobs from "./LastestJobs"
import Footer from "./shared/Footer"
import Navbar from "./shared/Navbar"

const Home = () => {
    useGetAlljobs()
    return (
        <div>

            <Navbar />
            <HeroSection />
            <LatestJobs />
            <Footer />
        </div>
    )
}
export default Home
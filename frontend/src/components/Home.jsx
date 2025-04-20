import HeroSection from "./HeroSection"
import LatestJobs from "./LastestJobs"
import Footer from "./shared/Footer"
import Navbar from "./shared/Navbar"

const Home = () => {
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
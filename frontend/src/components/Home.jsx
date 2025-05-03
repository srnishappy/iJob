import useGetAlljobs from "@/hooks/useGetAlljobs"
import HeroSection from "./HeroSection"
import LatestJobs from "./LastestJobs"
import Footer from "./shared/Footer"
import Navbar from "./shared/Navbar"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Home = () => {
    useGetAlljobs()
    const { user } = useSelector(store => store.auth)
    const navigate = useNavigate();
    useEffect(() => {
        if (user?.role === 'recruiter') {
            navigate("/admin/companies");
        }
    }, []);
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
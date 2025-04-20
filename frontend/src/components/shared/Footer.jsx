import { Link } from 'react-router-dom';
import { Github, Linkedin, Facebook, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Main Footer Content */}
                <div className="flex flex-col md:flex-row justify-between">
                    {/* Brand Section */}
                    <div className="mb-6 md:mb-0">
                        <div className="text-xl font-bold tracking-tight flex items-center gap-1 mb-3">
                            <span className="text-white">i</span>
                            <span className="text-blue-500">Job</span>
                        </div>
                        <p className="text-sm text-gray-400 max-w-md">
                            Find your next career opportunity with iJob.
                            We connect talented professionals with the best companies.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="mb-6 md:mb-0">
                        <h3 className="text-white font-semibold mb-3">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/jobs" className="text-gray-400 hover:text-blue-400 transition text-sm">Jobs</Link>
                            </li>
                            <li>
                                <Link to="/browse" className="text-gray-400 hover:text-blue-400 transition text-sm">Browse</Link>
                            </li>

                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white font-semibold mb-3">Contact Us</h3>
                        <div className="text-sm text-gray-400 space-y-2">
                            <p>Email: srnishappy@gmail.com</p>
                            <p>Phone: +1 (555) 123-4567</p>
                            <div className="flex space-x-4 pt-2">
                                <a target="_blank"
                                    href="https://www.facebook.com/kong.157284/" className="hover:text-blue-400 transition" aria-label="Facebook">
                                    <Facebook size={18} />
                                </a>
                                <a href="https://github.com/srnishappy" target="_blank"
                                    className="hover:text-blue-400 transition" aria-label="Github">
                                    <Github size={18} />
                                </a>
                                <a href="mailto:srnishappy@gmail.com" target="_blank"
                                    className="hover:text-blue-400 transition" aria-label="Email">
                                    <Mail size={18} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-6 mt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-gray-500">© {new Date().getFullYear()} iJob. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
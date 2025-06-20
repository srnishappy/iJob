import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Avatar, AvatarImage } from '../ui/avatar';
import { AvatarFallback } from '@radix-ui/react-avatar';
import { Button } from '../ui/button';
import { Home, Briefcase, Search, User, LogOut, Menu } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.post(`${USER_API_END_POINT}/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <header className="bg-gray-900 text-white shadow-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Brand */}
        <div className="flex items-center gap-3">
          <Link to="/" className="text-xl font-bold tracking-tight flex items-center gap-1">
            <span className="text-white">i</span>
            <span className="text-blue-500">Job</span>
          </Link>
          <span className="bg-blue-500 text-white text-[10px] px-3 py-1 rounded-full font-semibold tracking-wide mt-1">
            Find a job
          </span>
        </div>

        {/* Hamburger Menu on Mobile */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setMenuOpen(!menuOpen)}>
            <Menu className="text-white" />
          </Button>
        </div>

        {/* Nav Menu Desktop */}
        <nav className="hidden md:flex items-center gap-10">
          {
            user && user.role === 'recruiter' ? (
              <>
                <Link to="/admin/companies" className="flex flex-col items-center text-sm text-gray-300 hover:text-blue-400 transition group">
                  <Briefcase size={18} />
                  <span>Companies</span>
                  <div className="h-0.5 w-full bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left mt-0.5"></div>
                </Link>
                <Link to="/admin/jobs" className="flex flex-col items-center text-sm text-gray-300 hover:text-blue-400 transition group">
                  <Search size={18} />
                  <span>Jobs</span>
                  <div className="h-0.5 w-full bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left mt-0.5"></div>
                </Link>
              </>
            ) : (
              [{ to: '/', icon: Home, label: 'Home' }, { to: '/jobs', icon: Briefcase, label: 'Jobs' }, { to: '/browse', icon: Search, label: 'Browse' }]
                .map(({ to, icon: Icon, label }) => (
                  <Link
                    key={label}
                    to={to}
                    className="flex flex-col items-center text-sm text-gray-300 hover:text-blue-400 transition group"
                  >
                    <Icon size={18} />
                    <span>{label}</span>
                    <div className="h-0.5 w-full bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left mt-0.5"></div>
                  </Link>
                ))
            )
          }
        </nav>

        {/* User Section */}
        {!user ? (
          <div className="hidden md:flex items-center gap-2">
            <Link to="/login">
              <Button variant="outline" className="text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-blue-500 hover:bg-blue-400 text-white">
                Signup
              </Button>
            </Link>
          </div>
        ) : (
          <Popover>
            <PopoverTrigger asChild>
              <div className="hidden md:flex items-center gap-2 cursor-pointer bg-gray-800 px-3 py-1.5 rounded-full border border-gray-700 hover:border-gray-500 transition">
                <Avatar className="h-8 w-8 ring-2 ring-blue-500">
                  <AvatarImage src={user?.profile?.profilePhoto} alt="avatar" />
                </Avatar>
                <span className="text-sm font-medium hidden md:block">{user.fullname}</span>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0 bg-gray-800 text-gray-200 border border-gray-700 rounded-lg shadow-xl" align="end">
              <div className="p-4 border-b border-gray-700 bg-gray-800">
                <div className="flex items-center gap-4">
                  <Avatar className="h-14 w-14 ring-2 ring-blue-500">
                    <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                    <AvatarFallback className="bg-gray-700 text-gray-200">SC</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium text-white">{user.fullname}</h4>
                    <p className="text-sm text-gray-400">{user?.profile?.bio}</p>
                  </div>
                </div>
              </div>
              <div className="p-2">


                {/* Don't show View Profile if role is 'recruiter' */}
                {user.role !== 'recruiter' && (
                  <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700">
                    <User size={16} className="mr-2" /> <Link to="/profile"> View Profile</Link>
                  </Button>
                )}

                <div className="text-xs text-gray-500 uppercase px-2 py-1 mt-3">Session</div>
                <Button
                  onClick={logoutHandler}
                  variant="ghost" className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-gray-700">
                  <LogOut size={16} className="mr-2" /> Logout
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700 px-6 py-4 space-y-3">
          {
            user && user.role === 'recruiter' ? (
              <>
                <Link to="/admin/companies" className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition" onClick={() => setMenuOpen(false)}>
                  <Briefcase size={18} />
                  <span>Companies</span>
                </Link>
                <Link to="/admin/jobs" className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition" onClick={() => setMenuOpen(false)}>
                  <Search size={18} />
                  <span>Jobs</span>
                </Link>
              </>
            ) : (
              [{ to: '/', icon: Home, label: 'Home' }, { to: '/jobs', icon: Briefcase, label: 'Jobs' }, { to: '/browse', icon: Search, label: 'Browse' }]
                .map(({ to, icon: Icon, label }) => (
                  <Link
                    key={label}
                    to={to}
                    className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    <Icon size={18} />
                    <span>{label}</span>
                  </Link>
                ))
            )
          }

          {!user && (
            <div className="pt-3 border-t border-gray-700 flex gap-2">
              <Link to="/login" className="flex-1">
                <Button variant="outline" className="w-full text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white">
                  Login
                </Button>
              </Link>
              <Link to="/signup" className="flex-1">
                <Button className="w-full bg-blue-500 hover:bg-blue-400 text-white">
                  Signup
                </Button>
              </Link>
            </div>
          )}

          {user && (
            <div className="pt-4 border-t border-gray-700">
              <div className="flex items-center gap-3 mb-3">
                <Avatar className="h-10 w-10 ring-2 ring-blue-500">
                  <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                  <AvatarFallback className="bg-gray-700 text-gray-200">SC</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="text-white text-sm font-medium">{user.fullname}</h4>
                  <p className="text-xs text-gray-400">{user?.profile?.bio}</p>
                </div>
              </div>

              {/* Don't show View Profile if role is 'recruiter' */}
              {user.role !== 'recruiter' && (
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700"
                >
                  <User size={16} className="mr-2" />  <Link to="/profile"> View Profile</Link>
                </Button>
              )}

              <Button
                onClick={logoutHandler}
                variant="ghost"
                className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-gray-700 mt-2"
              >
                <LogOut size={16} className="mr-2" /> Logout
              </Button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;

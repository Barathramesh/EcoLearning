import { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Leaf, Award, BookOpen, Users, Mail, Globe, Camera, Gamepad2, Brain, LogOut, Trophy, User, Upload, Shield, BarChart3, AlertTriangle, School, Settings } from "lucide-react";

const Navigation = ({ userType = null, onLogout = null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if user is logged in based on current route
  const isLoggedIn = location.pathname.includes('dashboard') || userType;
  const currentUserType = userType || (location.pathname.includes('student') ? 'student' : location.pathname.includes('teacher') ? 'teacher' : location.pathname.includes('admin') ? 'admin' : null);

  // Default navigation items (for non-logged in users)
  const defaultNavItems = [
    { name: "Home", path: "/", icon: Leaf },
    { name: "Features", path: "/features", icon: Award },
    { name: "About", path: "/about", icon: BookOpen },
    { name: "Contact", path: "/contact", icon: Mail },
    { name: "Explore Nature", path: "/explore-nature", icon: Camera },
  ];

  // Student navigation items - organized in groups
  const studentNavItems = [
    { name: "Dashboard", path: "/student-dashboard", icon: Leaf, group: "main" },
    { name: "Games", path: "/student/games", icon: Gamepad2, group: "learning" },
    { name: "Lessons", path: "/student/lessons", icon: BookOpen, group: "learning" },
    { name: "Upload", path: "/student/upload-assignment", icon: Upload, group: "learning" },
    { name: "AI", path: "/student/ai", icon: Brain, group: "explore" },
    { name: "Profile", path: "/student/profile", icon: User, group: "account" },
    { name: "Leaderboard", path: "/student/leaderboard", icon: Trophy, group: "account" },
  ];

  // Teacher navigation items
  const teacherNavItems = [
    { name: "Dashboard", path: "/teacher-dashboard", icon: Leaf, group: "main" },
    { name: "Classes", path: "/teacher/classes", icon: Users, group: "management" },
    { name: "Students", path: "/teacher/students", icon: User, group: "management" },
    { name: "Assignments", path: "/teacher/assignments", icon: BookOpen, group: "content" },
    { name: "Analytics", path: "/teacher/analytics", icon: Award, group: "insights" },
  ];

  // Admin navigation items
  const adminNavItems = [
    { name: "Users", path: "/admin/users", icon: Users, group: "management" },
    { name: "Analytics", path: "/admin/analytics", icon: BarChart3, group: "insights" },
    { name: "Moderation", path: "/admin/moderation", icon: AlertTriangle, group: "management" },
    { name: "Settings", path: "/admin/settings", icon: Settings, group: "system" },
  ];

  // Choose navigation items based on user type
  const getNavItems = () => {
    if (currentUserType === 'student') return studentNavItems;
    if (currentUserType === 'teacher') return teacherNavItems;
    if (currentUserType === 'admin') return adminNavItems;
    return defaultNavItems;
  };

  const navItems = getNavItems();

  // Helper function to get display name
  const getDisplayName = (item, isMobile = false) => {
    if (item.name === 'Upload') {
      return isMobile ? 'Upload Assignment' : item.name;
    }
    return item.name;
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      // Default logout behavior - navigate to home
      navigate('/');
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md border-b border-emerald-100 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Fixed width to prevent shifting */}
          <div className="flex-shrink-0">
            <NavLink 
              to={
                currentUserType === 'student' ? '/student-dashboard' :
                currentUserType === 'teacher' ? '/teacher-dashboard' :
                currentUserType === 'admin' ? '/admin/users' :
                '/'
              } 
              className="flex items-center space-x-3 group"
            >
              <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:scale-105">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent whitespace-nowrap">
                EcoLearn
              </span>
            </NavLink>
          </div>

          {/* Desktop Navigation - Centered and responsive */}
          <div className="hidden lg:flex items-center justify-center flex-1 mx-8">
            <div className="flex items-center space-x-1 xl:space-x-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center space-x-1 px-2 xl:px-3 py-2 rounded-lg transition-all duration-300 hover:bg-emerald-50 text-sm xl:text-base whitespace-nowrap ${
                      isActive 
                        ? "text-emerald-600 font-medium bg-emerald-50 shadow-sm" 
                        : "text-gray-600 hover:text-emerald-600"
                    }`
                  }
                >
                  <item.icon className="w-4 h-4 flex-shrink-0" />
                  <span className="hidden xl:inline">{getDisplayName(item, true)}</span>
                  <span className="xl:hidden">{getDisplayName(item, false)}</span>
                </NavLink>
              ))}
            </div>
          </div>

          {/* Right side - Auth button */}
          <div className="flex-shrink-0 flex items-center space-x-4">
            {/* Desktop Auth Button */}
            <div className="hidden lg:block">
              {isLoggedIn ? (
                <Button 
                  className="bg-red-600 hover:bg-red-700 text-white shadow-sm" 
                  size="sm"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  <span className="hidden xl:inline">Logout</span>
                  <span className="xl:hidden">Exit</span>
                </Button>
              ) : (
                <Button 
                  className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm" 
                  size="sm"
                  onClick={() => navigate('/login')}
                >
                  <span className="hidden xl:inline">Get Started</span>
                  <span className="xl:hidden">Login</span>
                </Button>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
                className="hover:bg-emerald-50"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden absolute left-0 right-0 top-16 bg-white border-b border-emerald-100 shadow-lg">
            <div className="px-4 py-3 space-y-2 max-h-96 overflow-y-auto">
              {currentUserType === 'student' ? (
                // Grouped navigation for students
                <>
                  {/* Main */}
                  {navItems.filter(item => item.group === 'main').map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                          isActive 
                            ? "text-emerald-600 font-medium bg-emerald-50 shadow-sm" 
                            : "text-gray-600 hover:text-emerald-600 hover:bg-emerald-50"
                        }`
                      }
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      <span className="font-medium">{getDisplayName(item, true)}</span>
                    </NavLink>
                  ))}
                  
                  {/* Learning Section */}
                  <div className="pt-2">
                    <div className="px-4 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Learning
                    </div>
                    {navItems.filter(item => item.group === 'learning').map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                            isActive 
                              ? "text-emerald-600 font-medium bg-emerald-50 shadow-sm" 
                              : "text-gray-600 hover:text-emerald-600 hover:bg-emerald-50"
                          }`
                        }
                      >
                        <item.icon className="w-5 h-5 flex-shrink-0" />
                        <span className="font-medium">{getDisplayName(item, true)}</span>
                      </NavLink>
                    ))}
                  </div>

                  {/* Explore Section */}
                  <div className="pt-2">
                    <div className="px-4 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Explore
                    </div>
                    {navItems.filter(item => item.group === 'explore').map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                            isActive 
                              ? "text-emerald-600 font-medium bg-emerald-50 shadow-sm" 
                              : "text-gray-600 hover:text-emerald-600 hover:bg-emerald-50"
                          }`
                        }
                      >
                        <item.icon className="w-5 h-5 flex-shrink-0" />
                        <span className="font-medium">{getDisplayName(item, true)}</span>
                      </NavLink>
                    ))}
                  </div>

                  {/* Account Section */}
                  <div className="pt-2">
                    <div className="px-4 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Account
                    </div>
                    {navItems.filter(item => item.group === 'account').map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                            isActive 
                              ? "text-emerald-600 font-medium bg-emerald-50 shadow-sm" 
                              : "text-gray-600 hover:text-emerald-600 hover:bg-emerald-50"
                          }`
                        }
                      >
                        <item.icon className="w-5 h-5 flex-shrink-0" />
                        <span className="font-medium">{getDisplayName(item, true)}</span>
                      </NavLink>
                    ))}
                  </div>
                </>
              ) : currentUserType === 'teacher' ? (
                // Grouped navigation for teachers
                <>
                  {/* Main */}
                  {navItems.filter(item => item.group === 'main').map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                          isActive 
                            ? "text-emerald-600 font-medium bg-emerald-50 shadow-sm" 
                            : "text-gray-600 hover:text-emerald-600 hover:bg-emerald-50"
                        }`
                      }
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      <span className="font-medium">{getDisplayName(item, true)}</span>
                    </NavLink>
                  ))}
                  
                  {/* Management Section */}
                  <div className="pt-2">
                    <div className="px-4 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Management
                    </div>
                    {navItems.filter(item => item.group === 'management').map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                            isActive 
                              ? "text-emerald-600 font-medium bg-emerald-50 shadow-sm" 
                              : "text-gray-600 hover:text-emerald-600 hover:bg-emerald-50"
                          }`
                        }
                      >
                        <item.icon className="w-5 h-5 flex-shrink-0" />
                        <span className="font-medium">{getDisplayName(item, true)}</span>
                      </NavLink>
                    ))}
                  </div>

                  {/* Content Section */}
                  <div className="pt-2">
                    <div className="px-4 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Content
                    </div>
                    {navItems.filter(item => item.group === 'content').map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                            isActive 
                              ? "text-emerald-600 font-medium bg-emerald-50 shadow-sm" 
                              : "text-gray-600 hover:text-emerald-600 hover:bg-emerald-50"
                          }`
                        }
                      >
                        <item.icon className="w-5 h-5 flex-shrink-0" />
                        <span className="font-medium">{getDisplayName(item, true)}</span>
                      </NavLink>
                    ))}
                  </div>

                  {/* Insights Section */}
                  <div className="pt-2">
                    <div className="px-4 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Insights
                    </div>
                    {navItems.filter(item => item.group === 'insights').map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                            isActive 
                              ? "text-emerald-600 font-medium bg-emerald-50 shadow-sm" 
                              : "text-gray-600 hover:text-emerald-600 hover:bg-emerald-50"
                          }`
                        }
                      >
                        <item.icon className="w-5 h-5 flex-shrink-0" />
                        <span className="font-medium">{getDisplayName(item, true)}</span>
                      </NavLink>
                    ))}
                  </div>
                </>
              ) : currentUserType === 'admin' ? (
                // Grouped navigation for admins
                <>
                  {/* Management Section */}
                  <div className="pt-2">
                    <div className="px-4 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Management
                    </div>
                    {navItems.filter(item => item.group === 'management').map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                            isActive 
                              ? "text-emerald-600 font-medium bg-emerald-50 shadow-sm" 
                              : "text-gray-600 hover:text-emerald-600 hover:bg-emerald-50"
                          }`
                        }
                      >
                        <item.icon className="w-5 h-5 flex-shrink-0" />
                        <span className="font-medium">{getDisplayName(item, true)}</span>
                      </NavLink>
                    ))}
                  </div>

                  {/* Insights Section */}
                  <div className="pt-2">
                    <div className="px-4 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Insights
                    </div>
                    {navItems.filter(item => item.group === 'insights').map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                            isActive 
                              ? "text-emerald-600 font-medium bg-emerald-50 shadow-sm" 
                              : "text-gray-600 hover:text-emerald-600 hover:bg-emerald-50"
                          }`
                        }
                      >
                        <item.icon className="w-5 h-5 flex-shrink-0" />
                        <span className="font-medium">{getDisplayName(item, true)}</span>
                      </NavLink>
                    ))}
                  </div>

                  {/* System Section */}
                  <div className="pt-2">
                    <div className="px-4 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      System
                    </div>
                    {navItems.filter(item => item.group === 'system').map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                            isActive 
                              ? "text-emerald-600 font-medium bg-emerald-50 shadow-sm" 
                              : "text-gray-600 hover:text-emerald-600 hover:bg-emerald-50"
                          }`
                        }
                      >
                        <item.icon className="w-5 h-5 flex-shrink-0" />
                        <span className="font-medium">{getDisplayName(item, true)}</span>
                      </NavLink>
                    ))}
                  </div>
                </>
              ) : (
                // Regular navigation for other user types
                navItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                        isActive 
                          ? "text-emerald-600 font-medium bg-emerald-50 shadow-sm" 
                          : "text-gray-600 hover:text-emerald-600 hover:bg-emerald-50"
                      }`
                    }
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    <span className="font-medium">{getDisplayName(item, true)}</span>
                  </NavLink>
                ))
              )}
              
              {/* Mobile Auth Button */}
              <div className="pt-3 border-t border-emerald-100">
                {isLoggedIn ? (
                  <Button 
                    className="w-full bg-red-600 hover:bg-red-700 text-white justify-start" 
                    onClick={() => {
                      setIsOpen(false);
                      handleLogout();
                    }}
                  >
                    <LogOut className="w-5 h-5 mr-3" />
                    Logout
                  </Button>
                ) : (
                  <Button 
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white justify-start" 
                    onClick={() => {
                      setIsOpen(false);
                      navigate('/login');
                    }}
                  >
                    Get Started
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
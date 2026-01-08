import { useState } from "react";
import { useNavigate } from "react-router-dom";
import mediReachLogo from "../assets/images/MediReach_Logo.png";
import {
  LayoutDashboard,
  Users,
  Building2,
  Hospital,
  Activity,
  FileText,
  Star,
  X,
} from "lucide-react";

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  // ==================== CRUD MENU ====================
  const crudItems = [
  { name: "Doctors Management", icon: Users, path: "/doctors" },
  { name: "Clinics Management", icon: Building2, path: "/clinics" },
  { name: "Hospitals Management", icon: Hospital, path: "/hospitals" },
  { name: "Diagnostics Management", icon: Activity, path: "/diagnostics" },
  { name: "Success Stories Management", icon: Star, path: "/success-stories" },
  { name: "Blogs Management", icon: FileText, path: "/blogs" },
];

  return (
    <>
      <aside
              className={`fixed left-0 top-0 z-50 h-full w-64 bg-linear-to-b from-blue-900 to-indigo-900 text-white transition-all duration-300 ${
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <div className="flex h-full flex-col">
                {/* Logo */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-blue-800">
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="lg:hidden text-white hover:bg-white/10 rounded-lg p-2"
                  >
                    <X className="h-5 w-5" />
                  </button>
                  <div className="flex items-center justify-center space-x-3">
                    <div className="flex w-40 items-center justify-center rounded-lg bg-white">
                      <img
                        src={mediReachLogo}
                        alt="Medireach Logo"
                        className="w-36 object-contain"
                      />
                    </div>
                  </div>
                </div>
      
                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto px-4 py-6">
                  <div className="space-y-2">
                    <button className="w-full flex items-center space-x-3 rounded-lg bg-white/10 px-4 py-3 text-white"
                    onClick={() => navigate("/")}>
                      <LayoutDashboard className="h-5 w-5" />
                      <span>Home</span>
                    </button>
      
                    <div className="pt-4 pb-2">
                      <p className="px-4 text-xs font-semibold text-blue-300 uppercase tracking-wider">
                        Management
                      </p>
                    </div>
      
                    {crudItems.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => navigate(item.path)}
                        className="flex items-center text-start space-x-3 rounded-lg px-4 py-3 cursor-grab text-blue-100 hover:bg-white/10 transition-colors"
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.name}</span>
                      </button>
                    ))}
                  </div>
                </nav>
      
                {/* User Profile */}
                <div className="border-t border-blue-800 px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-linear-to-br from-blue-400 to-indigo-400 flex items-center justify-center">
                      <span className="font-semibold">AD</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Admin</p>
                      <p className="text-xs text-blue-300">admin@medireach.com</p>
                    </div>
                    {/* <button
                      onClick={handleLogout}
                      className="text-blue-300 hover:text-white hover:bg-white/10 rounded-lg p-2 transition-colors"
                    >
                      <LogOut className="h-5 w-5" />
                    </button> */}
                  </div>
                </div>
              </div>
            </aside>
    </>
  )
}

export default Sidebar

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllDoctors } from "../features/doctors/doctorSlice";
import { fetchAllClinics } from "../features/clinics/clinicSlice";
import { fetchAllHospitals } from "../features/hospitals/hospitalSlice";
import { fetchAllDiagnostics } from "../features/diagnostics/diagnosticSlice";
import { fetchAllBlogs } from "../features/blogs/blogSlice";
import { fetchAllSuccessStories } from "../features/successStories/successStoriesSlice";
import RevenueChart from "../components/RevenueChart";
import AnalyticsChart from "../components/AnalyticsChart";
import {
  setQuery,
  clearSuggestions,
  fetchSearchSuggestions,
  toggleDropdown,
} from "../features/search/searchSlice";

import {
  LogOut,
  Search,
  Plus,
  Eye,
  Users,
  Building2,
  Hospital,
  Activity,
  FileText,
  Star,
  CreditCard,
  Clock,
  BarChart3,
  Menu,
  X,
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import LogoutButton from "../commonComponents/LogoutButton";

function Dashboard() {
  //const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

   const dropdownRef = useRef(null);

  const { query, suggestions, loading, showDropdown } = useSelector(
    (state) => state.search
  );

  /* -------------------- DEBOUNCE -------------------- */
  useEffect(() => {
    if (!query.trim()) {
      dispatch(clearSuggestions());
      return;
    }

    const delay = setTimeout(() => {
      dispatch(fetchSearchSuggestions({ q: query }));
    }, 400);

    return () => clearTimeout(delay);
  }, [query, dispatch]);

  /* -------------------- CLICK OUTSIDE TO CLOSE -------------------- */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        dispatch(toggleDropdown(false));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dispatch]);

  /* -------------------- SELECT -------------------- */
  const handleSelect = (item) => {
    dispatch(clearSuggestions());

    switch (item.type) {
      case "doctor":
        navigate(`/doctors/${item.slug}`);
        break;
      case "clinic":
        navigate(`/clinics/${item.slug}`);
        break;
      case "hospital":
        navigate(`/hospitals/${item.slug}`);
        break;
      case "diagnostic":
        navigate(`/diagnostics/${item.slug}`);
        break;
      default:
        break;
    }
  };

  // ==================== REDUX STATE ====================
  const { doctors, loading: doctorsLoading, error: doctorsError } = useSelector(
    (state) => state.doctor
  );
  const { clinics, loading: clinicsLoading, error: clinicsError } = useSelector(
    (state) => state.clinic
  );
  const { hospitals, loading: hospitalsLoading, error: hospitalsError } =
    useSelector((state) => state.hospital);
  const {
    diagnostics,
    loading: diagnosticsLoading,
    error: diagnosticsError,
  } = useSelector((state) => state.diagnostic);
  // Blogs
  const { blogs, loading: blogsLoading, error: blogsError } = 
    useSelector((state) => state.blog);

   // Success Stories
  const { stories, loading: successStoriesLoading, error: successStoriesError } = 
  useSelector((state) => state.successStory);


  // ==================== FETCH DATA ====================
  useEffect(() => {
    dispatch(fetchAllDoctors());
    dispatch(fetchAllClinics());
    dispatch(fetchAllHospitals());
    dispatch(fetchAllDiagnostics());
    dispatch(fetchAllBlogs());
    dispatch(fetchAllSuccessStories());
  }, [dispatch]);

  // ==================== GLOBAL LOADING & ERROR ====================
  const isLoading =
    doctorsLoading ||
    clinicsLoading ||
    hospitalsLoading ||
    diagnosticsLoading ||
    blogsLoading ||
    successStoriesLoading;

  const hasError =
    doctorsError || clinicsError || hospitalsError || diagnosticsError || blogsError || successStoriesError;

  if (isLoading) {
    return (
      <main className="p-4">
        <p className="text-gray-500">Loading statistics...</p>
      </main>
    );
  }

  if (hasError) {
    return (
      <main className="p-4">
        <p className="text-red-600 font-semibold">
          Error:{" "}
          {doctorsError ||
            clinicsError ||
            hospitalsError ||
            diagnosticsError ||
            blogsError ||
            successStoriesError
            }
        </p>
      </main>
    );
  }
 
  const totalDataCount =
  (doctors?.length || 0) +
  (clinics?.length || 0) +
  (hospitals?.length || 0) +
  (diagnostics?.length || 0) +
  (blogs?.length || 0) +
  (stories?.length || 0);

  // ==================== STATISTICS ====================
  const stats = [
    {
      title: "Total Data List",
      count: totalDataCount,
      icon: Users,
      color: "bg-blue-500",
      
    },
    {
      title: "Total Doctors",
      count: doctors?.length || 0,
      icon: Users,
      color: "bg-blue-500",
     
    },
    {
      title: "Total Clinics",
      count: clinics?.length || 0,
      icon: Building2,
      color: "bg-green-500",
     
    },
    {
      title: "Total Hospitals",
      count: hospitals?.length || 0,
      icon: Hospital,
      color: "bg-purple-500",
      trend: "+5%",
    },
    {
      title: "Diagnostic Centers",
      count: diagnostics?.length || 0,
      icon: Activity,
      color: "bg-pink-500",
     
    },
    {
      title: "Total Blogs",
      count: blogs?.length || 0,
      icon: FileText,
      color: "bg-yellow-500",
    
    },
    {
      title: "Success Stories",
      count: stories?.length || 0,
      icon: Star,
      color: "bg-orange-500",
    
    },
    {
      title: "Subscriptions",
      count: 0,
      icon: CreditCard,
      color: "bg-indigo-500",
      
    },
  ];

  // ==================== RECENT ACTIVITY (REAL DATA) ====================
const recentActivities = [
  ...(doctors || []).map((item) => ({
    id: item._id,
    type: "Doctor",
    name: item.doctorName || item.name,
    time: item.createdAt,
    action: "Added",
  })),
  ...(clinics || []).map((item) => ({
    id: item._id,
    type: "Clinic",
    name: item.clinicName,
    time: item.createdAt,
    action: "Added",
  })),
  ...(hospitals || []).map((item) => ({
    id: item._id,
    type: "Hospital",
    name: item.hospitalName,
    time: item.createdAt,
    action: "Added",
  })),
  ...(diagnostics || []).map((item) => ({
    id: item._id,
    type: "Diagnostic",
    name: item.centerName || item.name,
    time: item.createdAt,
    action: "Added",
  })),
  ...(blogs || []).map((item) => ({
    id: item._id,
    type: "Blog",
    name: item.title,
    time: item.createdAt,
    action: "Published",
  })),
  ...(stories || []).map((item) => ({
    id: item._id,
    type: "Success Story",
    name: item.title,
    time: item.createdAt,
    action: "Added",
  })),
]
  .sort((a, b) => new Date(b.time) - new Date(a.time)) // Latest first
  .slice(0, 8); // Show only latest 8 activities
  
  const timeAgo = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
    }
  }
  return "Just now";
};

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ==================== SIDEBAR ==================== */}
       <Sidebar />

      {/* ==================== MAIN ==================== */}
      <div
        className={`transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {!sidebarOpen && (
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden text-gray-600 hover:bg-gray-100 rounded-lg p-2"
                >
                  <Menu className="h-5 w-5" />
                </button>
              )}
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            </div>

            {/* Search */}
           <div className="relative w-full max-w-2xl mx-auto" ref={dropdownRef}>
      <div className="relative flex items-center bg-white border border-gray-300 rounded-xl shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
        <Search className="ml-3 h-5 w-5 text-gray-400" />

        <input
          type="text"
          placeholder="Search doctors, clinics, hospitals..."
          value={query}
          onChange={(e) => dispatch(setQuery(e.target.value))}
          onFocus={() => query && dispatch(toggleDropdown(true))}
          className="w-full px-3 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none rounded-xl"
        />

        {/* Close Button */}
        {query && (
          <button
            // onClick={() => dispatch(clearSuggestions())}
            onClick={() => {
      dispatch(setQuery(""));        // 👈 clears input text
      dispatch(clearSuggestions()); // 👈 clears dropdown results
    }}
            className="mr-3 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-xl max-h-72 overflow-y-auto">
          {loading && (
            <div className="px-4 py-3 text-sm text-gray-500">
              Searching...
            </div>
          )}

          {!loading && suggestions.length === 0 && (
            <div className="px-4 py-3 text-sm text-gray-500">
              No results found
            </div>
          )}

          {!loading &&
            suggestions.map((item, index) => (
              <div
                key={index}
                onClick={() => handleSelect(item)}
                className="px-4 py-3 cursor-pointer transition hover:bg-blue-50"
              >
                <p className="text-sm font-medium text-gray-900">
                  {item.name}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {item.type.toUpperCase()} • {item.suburbArea},{" "}
                  {item.addressCity}
                </p>
              </div>
            ))}
        </div>
      )}
    </div>
         <LogoutButton />
          </div>
        </header>

        {/* ==================== CONTENT ==================== */}
        <main className="p-4">
          {/* Stats */}
          <div className="mb-4">
          
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.title}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className={`${stat.color} p-3 rounded-lg`}>
                      <stat.icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-700 text-center">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1 text-center">
                        {stat.count}
                      </p>
                    
                    </div>
                    
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Analytics + Subscriptions + Recent */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-3 h-100">

  {/* Analytics Overview */}
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2">
    <h2 className="text-lg font-semibold text-gray-900 mb-4">
      Analytics Overview
    </h2>
    <AnalyticsChart
      doctors={doctors}
      clinics={clinics}
      hospitals={hospitals}
      diagnostics={diagnostics}
      blogs={blogs}
      stories={stories}
    />
  </div>

  {/* Subscriptions & Revenue */}
  <div className=" bg-white rounded-xl shadow-sm border border-gray-200 p-6">
    <h2 className="text-lg font-semibold text-gray-900 mb-4">
      Subscriptions & Revenue
    </h2>
    <RevenueChart />
  </div>

  {/* Recent Activity */}
  <div className="h-100 overflow-scroll bg-white rounded-xl shadow-sm border border-gray-200 p-6">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-semibold text-gray-900">
        Recent Activity
      </h2>
      <Clock className="h-5 w-5 text-gray-400" />
    </div>

    <div className="space-y-4">
      {recentActivities.map((item) => (
        <div
          key={item.id}
          className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg"
        >
          <div className="bg-blue-100 p-2 rounded-lg mt-1">
            <Eye className="h-4 w-4 text-blue-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">
              {item.name}
            </p>
            <p className="text-xs text-gray-500">
              {item.type} • {item.action}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {timeAgo(item.time)}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>
        </main>
        {/* ==================== PERFORMANCE STATISTICS ==================== */}
<div className="mb-4 p-5">
  <h2 className="text-lg font-semibold text-gray-900 mb-4">
    Website Performance
  </h2>

  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
    
    {/* Total Views */}
    <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition">
      <div className="flex items-center justify-between">
        <div className="bg-indigo-500 p-3 rounded-lg">
          <Eye className="h-5 w-5 text-white" />
        </div>
      </div>
      <p className="text-sm font-medium text-gray-600 mt-2">Total Views</p>
      <p className="text-2xl font-bold text-gray-900">0</p>
      <p className="text-xs text-green-600 mt-1">+0% this month</p>
    </div>

    {/* Monthly Visitors */}
    <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition">
      <div className="flex items-center justify-between">
        <div className="bg-blue-500 p-3 rounded-lg">
          <Users className="h-5 w-5 text-white" />
        </div>
      </div>
      <p className="text-sm font-medium text-gray-600 mt-2">Monthly Visitors</p>
      <p className="text-2xl font-bold text-gray-900">0</p>
      <p className="text-xs text-green-600 mt-1">+0% growth</p>
    </div>

    {/* Engagement */}
    <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition">
      <div className="flex items-center justify-between">
        <div className="bg-pink-500 p-3 rounded-lg">
          <BarChart3 className="h-5 w-5 text-white" />
        </div>
      </div>
      <p className="text-sm font-medium text-gray-600 mt-2">User Engagement</p>
      <p className="text-2xl font-bold text-gray-900">0%</p>
      <p className="text-xs text-green-600 mt-1">+0% improvement</p>
    </div>

    {/* Conversion Rate */}
    <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition">
      <div className="flex items-center justify-between">
        <div className="bg-green-500 p-3 rounded-lg">
          <CreditCard className="h-5 w-5 text-white" />
        </div>
      </div>
      <p className="text-sm font-medium text-gray-600 mt-2">Revenue Generated</p>
      <p className="text-2xl font-bold text-gray-900">0</p>
      <p className="text-xs text-red-600 mt-1">-0% drop</p>
    </div>

  </div>
</div>

      </div>
      
    </div>
  );
}

export default Dashboard;

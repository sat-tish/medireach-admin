import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchAllDoctors, deleteDoctor } from "../features/doctors/doctorSlice";
import { logout } from "../features/auth/authSlice";
import dummyImage from "../assets/images/dummyProfileImage.jpg"
import ExportDoctorsExcel from "../components/ExportDoctorsExcel";

import {
  LogOut,
  Search,
  Plus,
  Trash2,
  Edit,
  MapPin,
  Briefcase,
  Menu,
  Users
} from "lucide-react";
import Sidebar from "../components/Sidebar";

function DoctorsManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ==================== REDUX STATE ====================
  const { doctors, loading, error } = useSelector((state) => state.doctor);

  // ==================== FETCH DOCTORS ====================
  useEffect(() => {
    dispatch(fetchAllDoctors());
  }, [dispatch]);

  // ==================== HANDLERS ====================
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      dispatch(logout());
      navigate("/login");
    }
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this doctor?"
    );
    if (confirmDelete) {
      dispatch(deleteDoctor(id));
    }
  };

  // ==================== FILTER ====================
  const filteredDoctors = doctors?.filter((doc) =>
    doc?.doctorName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ==================== UI STATES ====================
  if (loading) {
    return (
      <main className="p-6">
        <p className="text-gray-500">Loading doctors...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="p-6">
        <p className="text-red-600 font-semibold">Error: {error}</p>
      </main>
    );
  }

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
        {/* ==================== HEADER ==================== */}
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
              <h1 className="text-2xl font-bold text-gray-900">
                Doctors Management
              </h1>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search doctor by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* ==================== CONTENT ==================== */}
        <main className="p-4">
          {/* ==================== TOP BAR ==================== */}
          <div className="flex items-center justify-between mb-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow" >
                  <div className="flex items-center justify-between">
                    <div className= "bg-blue-500 p-3 rounded-lg">
                      <Users className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1 px-5">
                      <p className="font-bold text-gray-700 text-center">Total Doctors</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1 text-center">
                        {doctors?.length || 0}
                      </p>
                    
                    </div>
                    
                  </div>
                </div>
                <div className="flex gap-3">
                   <button
                      onClick={() => navigate("/doctors/add")}
                      className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                      <Plus className="h-5 w-5" />
                      <span>Add New Doctor</span>
                    </button>
                    <ExportDoctorsExcel doctors={doctors} />
                  </div>
          </div>

          {/* ==================== DOCTOR LIST ==================== */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-500">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold text-gray-600">
                      Doctor Name
                    </th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-600">
                      Designation
                    </th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-600">
                      Location
                    </th>
                    <th className="px-6 py-3 text-right font-semibold text-gray-600">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDoctors?.length > 0 ? (
                    filteredDoctors.map((doctor) => (
                      <tr
                        key={doctor._id}
                        className="border-b border-gray-400 hover:bg-gray-50 transition"
                      >
                        {/* ==================== PROFILE ==================== */}
                        <td className="px-6 py-2">
                          <div className="flex items-center gap-8">
                            <img
                              src={
                                doctor.profileImage || dummyImage
                                
                              }
                             
                              className="h-14 w-14 rounded-full object-cover"
                            />
                            <div>
                              <p className="font-semibold text-gray-900">
                                {doctor.doctorName}
                              </p>
                              <p className="text-sm text-gray-500">
                                ID: {doctor.uidNumber}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* ==================== DESIGNATION ==================== */}
                        <td className="px-6 py-4 text-gray-700">
                          <div className="flex items-center gap-2">
                            <Briefcase className="h-4 w-4 text-blue-500" />
                            {doctor.designation || "Not specified"}
                          </div>
                        </td>

                        {/* ==================== LOCATION ==================== */}
                        <td className="px-6 py-4 text-gray-700">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-green-500" />
                            {doctor.suburbArea
                              ? `${doctor.suburbArea}, ${doctor.addressCity}`
                              : doctor.addressCity || "Not available"}
                          </div>
                        </td>

                        {/* ==================== ACTIONS ==================== */}
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <button
                              onClick={() =>
                                navigate(`/doctors/edit/${doctor._id}`)
                              }
                              className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200"
                              title="Edit Doctor"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(doctor._id)}
                              className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200"
                              title="Delete Doctor"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="px-6 py-10 text-center text-gray-500"
                      >
                        No doctors found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default DoctorsManagement;

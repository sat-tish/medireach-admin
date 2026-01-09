import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDoctor, clearDoctorState } from "../features/doctors/doctorSlice";
import { useNavigate } from "react-router-dom";
import {
  Save,
  User,
  MapPin,
  Phone,
  Mail,
  Award,
  Image,
  CheckCircle,
  AlertCircle,
  X,
  Loader2,
} from "lucide-react";
import InputField from "../components/InputField";
import LogoutButton from "../commonComponents/LogoutButton";
import Sidebar from "../components/Sidebar";

/* ===================== INITIAL STATE ===================== */

const initialState = {
  uidNumber: "",
  doctorName: "",
  designation: "",
  category: "",
  subcategories: "",
  services: "",
  experience: "",
  education: "",
  achievements: "",
  fees: "",
  shortInfo: "",
  phoneNumber: "",
  email: "",
  website: "",
  addressCity: "",
  suburbArea: "",
  isFeatured: false,
  priority: 0,
  status: "pending",
  profileImage: null,
};

function AddDoctor() {
  const [formData, setFormData] = useState(initialState);
  const [imagePreview, setImagePreview] = useState(null);
  const [fileInputKey, setFileInputKey] = useState(() => Date.now());
   const [sidebarOpen, setSidebarOpen] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.doctor);

  /* ===================== HANDLERS ===================== */

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    setFormData((prev) => ({
      ...prev,
      profileImage: file,
    }));

    if (file) {
      const previewURL = URL.createObjectURL(file);
      setImagePreview(previewURL);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (["category", "subcategories", "services"].includes(key)) {
        data.append(
          key,
          JSON.stringify(
            value
              .split(",")
              .map((v) => v.trim())
              .filter(Boolean)
          )
        );
      } else {
        data.append(key, value);
      }
    });

    const result = await dispatch(createDoctor(data));

    // ✅ Reset only after successful submission
    if (createDoctor.fulfilled.match(result)) {
      setFormData(initialState);
      setImagePreview(null);
      setFileInputKey(Date.now()); // 🔁 reset file input

      // Clear redux flags after short delay
      setTimeout(() => {
        dispatch(clearDoctorState());
      }, 2000);
    }
  };

  /* ===================== UI ===================== */

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
            <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-6 py-2">
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
    
               <LogoutButton />
              </div>
            </header>
    <div className="relative p-6 max-w-7xl mx-auto">
      <div className="bg-white shadow-sm rounded-2xl border p-6">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <User className="h-5 w-5 text-blue-600" />
          Add New Doctor
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* ================= CORE ================= */}
          <InputField
            label="UID Number"
            name="uidNumber"
            value={formData.uidNumber}
            onChange={handleChange}
            required
          />
          <InputField
            label="Doctor Name"
            name="doctorName"
            value={formData.doctorName}
            onChange={handleChange}
            required
          />
          <InputField
            label="Designation"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            icon={<Award className="h-4 w-4" />}
          />

          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded-lg border px-3 py-2 text-sm"
            >
              <option value="pending">Pending</option>
              <option value="active">Active</option>
              <option value="blocked">Blocked</option>
            </select>
          </div>

          {/* ================= LOCATION ================= */}
          <InputField
            label="City"
            name="addressCity"
            value={formData.addressCity}
            onChange={handleChange}
            required
            icon={<MapPin className="h-4 w-4" />}
          />
          <InputField
            label="Suburb / Area"
            name="suburbArea"
            value={formData.suburbArea}
            onChange={handleChange}
            required
          />

          {/* ================= PROFESSIONAL ================= */}
          <InputField
            label="Category (comma separated)"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
          <InputField
            label="Subcategories (comma separated)"
            name="subcategories"
            value={formData.subcategories}
            onChange={handleChange}
          />
          <InputField
            label="Services (comma separated)"
            name="services"
            value={formData.services}
            onChange={handleChange}
          />
          <InputField
            label="Experience"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
          />
          <InputField
            label="Education"
            name="education"
            value={formData.education}
            onChange={handleChange}
          />
          <InputField
            label="Achievements"
            name="achievements"
            value={formData.achievements}
            onChange={handleChange}
          />
          <InputField
            label="Consultation Fees"
            name="fees"
            value={formData.fees}
            onChange={handleChange}
          />

          {/* ================= CONTACT ================= */}
          <InputField
            label="Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            icon={<Phone className="h-4 w-4" />}
          />
          <InputField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            icon={<Mail className="h-4 w-4" />}
          />
          <InputField
            label="Website"
            name="website"
            value={formData.website}
            onChange={handleChange}
          />

          {/* ================= SHORT INFO ================= */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">
              Short Description
            </label>
            <textarea
              name="shortInfo"
              value={formData.shortInfo}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-lg border px-3 py-2 text-sm"
            />
          </div>

          {/* ================= FEATURE & PRIORITY ================= */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleChange}
              className="h-4 w-4"
            />
            <label className="text-sm">Featured Doctor</label>
          </div>

          <InputField
            label="Priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          />

          {/* ================= PROFILE IMAGE ================= */}
          <div className="md:col-span-2">
            <label className="text-sm font-medium mb-1 flex items-center gap-1">
              <Image className="h-4 w-4" /> Profile Image
            </label>
            <input
              key={fileInputKey} // 🔁 forces reset
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-sm border rounded-lg p-2"
            />

            {/* Image Preview */}
            {imagePreview && (
              <div className="mt-3">
                <p className="text-sm text-gray-500 mb-1">Preview:</p>
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-32 w-32 object-cover rounded-xl border"
                />
              </div>
            )}
          </div>

          {/* ================= ACTIONS ================= */}
          <div className="md:col-span-2 flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={() => navigate("/doctors")}
              className="px-5 py-2 rounded-lg text-sm border hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 rounded-lg text-sm bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2 disabled:opacity-60"
            >
              <Save className="h-4 w-4" />
              {loading ? "Saving..." : "Save Doctor"}
            </button>
          </div>
        </form>
      </div>

      {/* ================= FULLSCREEN LOADER ================= */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <p className="text-sm text-gray-600">Saving doctor...</p>
          </div>
        </div>
      )}

      {/* ================= CENTER ALERT ================= */}
      {(success || error) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-xl relative">
            <button
              onClick={() => dispatch(clearDoctorState())}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>

            {success && (
              <div className="flex flex-col items-center text-center gap-3">
                <CheckCircle className="h-10 w-10 text-green-600" />
                <h3 className="text-lg font-semibold text-green-700">
                  Doctor Added Successfully
                </h3>
                <p className="text-sm text-gray-600">
                  You can now add another doctor.
                </p>
              </div>
            )}

            {error && (
              <div className="flex flex-col items-center text-center gap-3">
                <AlertCircle className="h-10 w-10 text-red-600" />
                <h3 className="text-lg font-semibold text-red-700">
                  Failed to Add Doctor
                </h3>
                <p className="text-sm text-gray-600">{error}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
    </div>
    </div>
  );
}

export default AddDoctor;

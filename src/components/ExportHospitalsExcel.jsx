import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Download } from "lucide-react";

function ExportHospitalsExcel({ hospitals }) {
  const handleDownload = () => {
    if (!hospitals || hospitals.length === 0) {
      alert("No hospitals available to download");
      return;
    }

    const excelData = hospitals.map((hosp, index) => ({
      SrNo: index + 1,

      // -------- Core Identity --------
      UID: hosp.uidNumber || "",
      HospitalName: hosp.hospitalName || "",
      Slug: hosp.slug || "",
      Status: hosp.status || "",
      IsFeatured: hosp.isFeatured ? "Yes" : "No",
      Priority: hosp.priority || 0,
      Views: hosp.views || 0,

      // -------- Subscription --------
      DiamondId: hosp.diamondId || "",
      GoldId: hosp.goldId || "",
      SilverId: hosp.silverId || "",

      // -------- Media --------
      ProfileImage: hosp.profileImage || "",

      // -------- Address --------
      AddressLine1: hosp.addressLine1 || "",
      AddressArea: hosp.addressArea || "",
      SuburbArea: hosp.suburbArea || "",
      AddressCity: hosp.addressCity || "",
      MapDirection: hosp.mapDirection || "",

      // -------- Geo --------
      Longitude: hosp.location?.coordinates?.[0] || "",
      Latitude: hosp.location?.coordinates?.[1] || "",

      // -------- Professional --------
      Category: Array.isArray(hosp.category) ? hosp.category.join(", ") : "",
      Subcategories: Array.isArray(hosp.subcategories)
        ? hosp.subcategories.join(", ")
        : "",
      Services: Array.isArray(hosp.services) ? hosp.services.join(", ") : "",
      ShortInfo: hosp.shortInfo || "",

      // -------- Contact --------
      PhoneNumber: hosp.phoneNumber || "",
      Email: hosp.email || "",
      Website: hosp.website || "",

      // -------- Timings --------
      Monday: JSON.stringify(hosp.timings?.monday || {}),
      Tuesday: JSON.stringify(hosp.timings?.tuesday || {}),
      Wednesday: JSON.stringify(hosp.timings?.wednesday || {}),
      Thursday: JSON.stringify(hosp.timings?.thursday || {}),
      Friday: JSON.stringify(hosp.timings?.friday || {}),
      Saturday: JSON.stringify(hosp.timings?.saturday || {}),
      Sunday: JSON.stringify(hosp.timings?.sunday || {}),

      // -------- Reviews --------
      CustomerReviews: Array.isArray(hosp.customerReviews)
        ? hosp.customerReviews
            .map(
              (r) =>
                `${r.customerName} (${r.rating || "N/A"}⭐): ${r.review || ""}`
            )
            .join(" | ")
        : "",

      // -------- Treating Doctors --------
      TreatingDoctors: Array.isArray(hosp.treatingDoctors)
        ? hosp.treatingDoctors
            .map(
              (d) =>
                `${d.name} (${d.designation || ""}), ${d.suburbArea || ""}, ${
                  d.addressCity || ""
                }`
            )
            .join(" | ")
        : "",

      // -------- Timestamps --------
      CreatedAt: hosp.createdAt
        ? new Date(hosp.createdAt).toLocaleString()
        : "",
      UpdatedAt: hosp.updatedAt
        ? new Date(hosp.updatedAt).toLocaleString()
        : "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Hospitals");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    saveAs(blob, "Hospitals_Full_Database.xlsx");
  };

  return (
    <button
      onClick={handleDownload}
      className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
    >
      <Download className="h-5 w-5" />
      <span>Download Hospital List</span>
    </button>
  );
}

export default ExportHospitalsExcel;

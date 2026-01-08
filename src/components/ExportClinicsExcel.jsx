import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Download } from "lucide-react";

function ExportClinicsExcel({ clinics }) {
  const handleDownload = () => {
    if (!clinics || clinics.length === 0) {
      alert("No clinics available to download");
      return;
    }

    const excelData = clinics.map((cln, index) => ({
      SrNo: index + 1,

      // -------- Core Identity --------
      UID: cln.uidNumber || "",
      ClinicName: cln.clinicName || "",
      Slug: cln.slug || "",
      Status: cln.status || "",
      IsFeatured: cln.isFeatured ? "Yes" : "No",
      Priority: cln.priority || 0,
      Views: cln.views || 0,

      // -------- Subscription --------
      DiamondId: cln.diamondId || "",
      GoldId: cln.goldId || "",
      SilverId: cln.silverId || "",

      // -------- Media --------
      ProfileImage: cln.profileImage || "",

      // -------- Address --------
      AddressLine1: cln.addressLine1 || "",
      AddressArea: cln.addressArea || "",
      SuburbArea: cln.suburbArea || "",
      AddressCity: cln.addressCity || "",
      MapDirection: cln.mapDirection || "",

      // -------- Geo --------
      Longitude: cln.location?.coordinates?.[0] || "",
      Latitude: cln.location?.coordinates?.[1] || "",

      // -------- Professional --------
      Category: Array.isArray(cln.category) ? cln.category.join(", ") : "",
      Subcategories: Array.isArray(cln.subcategories)
        ? cln.subcategories.join(", ")
        : "",
      Services: Array.isArray(cln.services) ? cln.services.join(", ") : "",
      ShortInfo: cln.shortInfo || "",

      // -------- Contact --------
      PhoneNumber: cln.phoneNumber || "",
      Email: cln.email || "",
      Website: cln.website || "",

      // -------- Timings --------
      Monday: JSON.stringify(cln.timings?.monday || {}),
      Tuesday: JSON.stringify(cln.timings?.tuesday || {}),
      Wednesday: JSON.stringify(cln.timings?.wednesday || {}),
      Thursday: JSON.stringify(cln.timings?.thursday || {}),
      Friday: JSON.stringify(cln.timings?.friday || {}),
      Saturday: JSON.stringify(cln.timings?.saturday || {}),
      Sunday: JSON.stringify(cln.timings?.sunday || {}),

      // -------- Reviews --------
      CustomerReviews: Array.isArray(cln.customerReviews)
        ? cln.customerReviews
            .map(
              (r) =>
                `${r.customerName} (${r.rating || "N/A"}⭐): ${r.review || ""}`
            )
            .join(" | ")
        : "",

      // -------- Treating Doctors --------
      TreatingDoctors: Array.isArray(cln.treatingDoctors)
        ? cln.treatingDoctors
            .map(
              (d) =>
                `${d.name} (${d.designation || ""}), ${d.suburbArea || ""}, ${
                  d.addressCity || ""
                }`
            )
            .join(" | ")
        : "",

      // -------- Timestamps --------
      CreatedAt: cln.createdAt
        ? new Date(cln.createdAt).toLocaleString()
        : "",
      UpdatedAt: cln.updatedAt
        ? new Date(cln.updatedAt).toLocaleString()
        : "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Clinics");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    saveAs(blob, "Clinics_Full_Database.xlsx");
  };

  return (
    <button
      onClick={handleDownload}
      className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
    >
      <Download className="h-5 w-5" />
      <span>Download Clinic List</span>
    </button>
  );
}

export default ExportClinicsExcel;

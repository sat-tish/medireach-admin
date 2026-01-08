import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Download } from "lucide-react";

function ExportDoctorsExcel({ doctors }) {
  const handleDownload = () => {
    if (!doctors || doctors.length === 0) {
      alert("No doctors available to download");
      return;
    }

    const excelData = doctors.map((doc, index) => ({
      SrNo: index + 1,

      // -------- Core Identity --------
      UID: doc.uidNumber || "",
      DoctorName: doc.doctorName || "",
      Slug: doc.slug || "",
      Status: doc.status || "",
      IsFeatured: doc.isFeatured ? "Yes" : "No",
      Priority: doc.priority || 0,
      Views: doc.views || 0,

      // -------- Subscription --------
      DiamondId: doc.diamondId || "",
      GoldId: doc.goldId || "",
      SilverId: doc.silverId || "",

      // -------- Media --------
      ProfileImage: doc.profileImage || "",

      // -------- Location --------
      AddressCity: doc.addressCity || "",
      SuburbArea: doc.suburbArea || "",

      // -------- Professional --------
      Designation: doc.designation || "",
      Category: Array.isArray(doc.category) ? doc.category.join(", ") : "",
      Subcategories: Array.isArray(doc.subcategories)
        ? doc.subcategories.join(", ")
        : "",
      Services: Array.isArray(doc.services) ? doc.services.join(", ") : "",
      Experience: doc.experience || "",
      Education: doc.education || "",
      Achievements: doc.achievements || "",
      Fees: doc.fees || "",
      ShortInfo: doc.shortInfo || "",

      // -------- Contact --------
      PhoneNumber: doc.phoneNumber || "",
      Email: doc.email || "",
      Website: doc.website || "",

      // -------- Timings --------
      Monday: JSON.stringify(doc.timings?.monday || {}),
      Tuesday: JSON.stringify(doc.timings?.tuesday || {}),
      Wednesday: JSON.stringify(doc.timings?.wednesday || {}),
      Thursday: JSON.stringify(doc.timings?.thursday || {}),
      Friday: JSON.stringify(doc.timings?.friday || {}),
      Saturday: JSON.stringify(doc.timings?.saturday || {}),
      Sunday: JSON.stringify(doc.timings?.sunday || {}),

      // -------- Reviews --------
      CustomerReviews: Array.isArray(doc.customerReviews)
        ? doc.customerReviews
            .map(
              (r) =>
                `${r.customerName} (${r.rating || "N/A"}⭐): ${r.review || ""}`
            )
            .join(" | ")
        : "",

      // -------- Working Places --------
      Clinics: Array.isArray(doc.workingAt?.clinics)
        ? doc.workingAt.clinics
            .map(
              (c) =>
                `${c.name}, ${c.addressSuburb || ""}, ${c.addressCity || ""}`
            )
            .join(" | ")
        : "",

      Hospitals: Array.isArray(doc.workingAt?.hospitals)
        ? doc.workingAt.hospitals
            .map(
              (h) =>
                `${h.name}, ${h.addressSuburb || ""}, ${h.addressCity || ""}`
            )
            .join(" | ")
        : "",

      Diagnostics: Array.isArray(doc.workingAt?.diagnostics)
        ? doc.workingAt.diagnostics
            .map(
              (d) =>
                `${d.name}, ${d.addressSuburb || ""}, ${d.addressCity || ""}`
            )
            .join(" | ")
        : "",

      // -------- Timestamps --------
      CreatedAt: doc.createdAt
        ? new Date(doc.createdAt).toLocaleString()
        : "",
      UpdatedAt: doc.updatedAt
        ? new Date(doc.updatedAt).toLocaleString()
        : "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Doctors");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    saveAs(blob, "Doctors_Full_Database.xlsx");
  };

  return (
    <button
      onClick={handleDownload}
      className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
    >
      <Download className="h-5 w-5" />
      <span>Download Doctor List</span>
    </button>
  );
}

export default ExportDoctorsExcel;

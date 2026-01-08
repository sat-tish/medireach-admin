import React from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Download } from "lucide-react";

const DownloadDiagnosticsExcel = ({ diagnostics }) => {
  const handleDownload = () => {
    if (!diagnostics || diagnostics.length === 0) {
      alert("No diagnostics data available to download");
      return;
    }

    // Flatten diagnostics data for Excel
    const formattedData = diagnostics.map((diag) => ({
      UID: diag.uidNumber || "",
      Name: diag.diagnosticName || "",
      Status: diag.status || "",
      Featured: diag.isFeatured ? "Yes" : "No",
      Priority: diag.priority || 0,
      Views: diag.views || 0,

      Address_Line1: diag.addressLine1 || "",
      Area: diag.addressArea || "",
      Suburb: diag.suburbArea || "",
      City: diag.addressCity || "",
      Map_Direction: diag.mapDirection || "",

      Phone: diag.phoneNumber || "",
      Email: diag.email || "",
      Website: diag.website || "",

      Category: diag.category?.join(", ") || "",
      Services: diag.services?.join(", ") || "",
      Short_Info: diag.shortInfo || "",

      Doctors: diag.treatingDoctors
        ?.map((d) => `${d.name} (${d.designation || ""})`)
        .join(" | ") || "",

      Reviews_Count: diag.customerReviews?.length || 0,
      Created_At: diag.createdAt || "",
      Updated_At: diag.updatedAt || "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Diagnostics");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const fileData = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(fileData, "Diagnostics_List.xlsx");
  };

  return (
    <button
      onClick={handleDownload}
      className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 transition"
    >
      <Download className="h-4 w-4" />
      Download Diagnostics
    </button>
  );
};

export default DownloadDiagnosticsExcel;

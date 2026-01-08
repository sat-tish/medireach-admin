import * as XLSX from "xlsx";
import { Download } from "lucide-react";

function ExportBlogsExcel({ blogs }) {
  const handleExport = () => {
    const formattedData = blogs.map((blog) => ({
      Title: blog.title,
      Author: blog.blogAuthor?.name || "",
      Designation: blog.blogAuthor?.authorDesignation || "",
      Clinic: blog.blogAuthor?.clinicName || "",
      Suburb: blog.blogAuthor?.suburbArea || "",
      City: blog.blogAuthor?.addressCity || "",
      Published: blog.isPublished ? "Yes" : "No",
      CreatedAt: new Date(blog.createdAt).toLocaleDateString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Blogs");

    XLSX.writeFile(workbook, "Blogs_List.xlsx");
  };

  return (
    <button
      onClick={handleExport}
      className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
    >
      <Download className="h-5 w-5" />
      <span>Download Excel</span>
    </button>
  );
}

export default ExportBlogsExcel;

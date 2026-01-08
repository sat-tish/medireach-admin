import * as XLSX from "xlsx";
import { Download } from "lucide-react";

function ExportSuccessStoriesExcel({ stories }) {
  const handleExport = () => {
    if (!stories || stories.length === 0) {
      alert("No success stories to export");
      return;
    }

    const formattedData = stories.map((story) => ({
      Title: story.title,
      Slug: story.slug,
      Description: story.description,
      AuthorName: story.successAuthor?.name || "",
      AuthorDesignation: story.successAuthor?.authorDesignation || "",
      ClinicName: story.successAuthor?.clinicName || "",
      Suburb: story.successAuthor?.suburbArea || "",
      City: story.successAuthor?.addressCity || "",
      OwnerType: story.ownerType,
      Published: story.isPublished ? "Yes" : "No",
      PublishedAt: story.publishedAt || "",
      Views: story.views,
      Priority: story.priority,
      CreatedAt: story.createdAt,
      UpdatedAt: story.updatedAt,
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Success Stories");

    XLSX.writeFile(workbook, "success_stories.xlsx");
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

export default ExportSuccessStoriesExcel;

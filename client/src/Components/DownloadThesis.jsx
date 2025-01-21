import { useState } from "react";

// Frontend React Component
const DownloadThesis = ({ studentId }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  console.log("THIS IS STUDENT ID IN DOWNLOAD THESIS " + studentId);

  const handleDownload = async () => {
    setIsDownloading(true);
    setErrorMessage(null);

    try {
      const response = await fetch(
        `http://localhost:3001/api/thesis/downloadThesis/${encodeURI(
          studentId
        )}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      // Get filename from Content-Disposition header if available
      const contentDisposition = response.headers.get("Content-Disposition");
      let filename = "thesis.pdf";
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/);
        if (filenameMatch) {
          filename = filenameMatch[1];
        }
      }

      // Convert response to blob and create download link
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      setErrorMessage(error.message || "Eroare la descărcarea lucrării");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div style={{ backgroundColor: "#2c2c2c", marginTop: "10px" }}>
      <button
        onClick={handleDownload}
        className="formButton"
        disabled={isDownloading}
      >
        {isDownloading ? "Se descarcă..." : "Descarcă Lucrarea"}
      </button>
      {errorMessage && <p className="text-danger mt-2">{errorMessage}</p>}
    </div>
  );
};

export default DownloadThesis;

import jsPDF from "jspdf";

const downloadBlob = (content, filename, mimeType) => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
};

export const exportAsJSON = (prompts) => {
  const content = JSON.stringify(prompts, null, 2);
  downloadBlob(content, "promptvault-export.json", "application/json");
};

export const exportAsTXT = (prompts) => {
  const content = prompts
    .map((prompt) => {
      return [
        `Title: ${prompt.title}`,
        `Category: ${prompt.category}`,
        `AI Model: ${prompt.aiModel}`,
        `Tags: ${prompt.tags.join(", ") || "none"}`,
        `Description: ${prompt.description || "none"}`,
        `Prompt:`,
        prompt.prompt,
        "-".repeat(50),
      ].join("\n");
    })
    .join("\n\n");

  downloadBlob(content, "promptvault-export.txt", "text/plain");
};

export const exportAsPDF = (prompts) => {
  const doc = new jsPDF();
  const pageHeight = doc.internal.pageSize.getHeight();
  const marginLeft = 14;
  const maxWidth = 180;
  let cursorY = 20;

  doc.setFontSize(16);
  doc.text("PromptVault AI - Exported Prompts", marginLeft, cursorY);
  cursorY += 10;

  prompts.forEach((prompt, index) => {
    if (cursorY > pageHeight - 40) {
      doc.addPage();
      cursorY = 20;
    }

    doc.setFontSize(12);
    doc.setFont(undefined, "bold");
    doc.text(`${index + 1}. ${prompt.title}`, marginLeft, cursorY);
    cursorY += 6;

    doc.setFont(undefined, "normal");
    doc.setFontSize(10);
    doc.text(`Category: ${prompt.category} | Model: ${prompt.aiModel}`, marginLeft, cursorY);
    cursorY += 6;

    const promptLines = doc.splitTextToSize(prompt.prompt, maxWidth);
    doc.text(promptLines, marginLeft, cursorY);
    cursorY += promptLines.length * 5 + 8;
  });

  doc.save("promptvault-export.pdf");
};
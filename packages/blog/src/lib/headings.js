export function extractHeadings(markdownContent) {
  if (!markdownContent) return [];

  const headingRegex = /^(#{2,4})\s+(.+)$/gm;
  const headings = [];
  let match;

  while ((match = headingRegex.exec(markdownContent)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\u4e00-\u9fa5]+/g, "-")
      .replace(/^-+|-+$/g, "");

    headings.push({
      level,
      text,
      id,
    });
  }

  return headings;
}

export function addHeadingIds(htmlContent) {
  if (!htmlContent) return htmlContent;

  let index = 0;
  return htmlContent.replace(
    /<h([2-4])>(.*?)<\/h\1>/gi,
    (match, level, text) => {
      const cleanText = text.replace(/<[^>]*>/g, "").trim();
      const id =
        cleanText
          .toLowerCase()
          .replace(/[^\w\u4e00-\u9fa5]+/g, "-")
          .replace(/^-+|-+$/g, "") || `heading-${index++}`;
      return `<h${level} id="${id}">${text}</h${level}>`;
    },
  );
}

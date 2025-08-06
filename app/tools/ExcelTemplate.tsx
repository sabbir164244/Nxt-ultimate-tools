import React from 'react';

// Yeh function Markdown table ko data mein badalta hai
const parseMarkdownTable = (markdown: string) => {
  if (!markdown.includes('|')) return { header: [], rows: [] };
  const lines = markdown.trim().split('\n');
  const headerLine = lines[0];
  const rowsData = lines.slice(2); // Separator line ko skip karein

  const header = headerLine.split('|').map(h => h.trim()).slice(1, -1);
  const rows = rowsData.map(rowLine => 
    rowLine.split('|').map(cell => cell.trim()).slice(1, -1)
  );
  return { header, rows };
};

interface ExcelTemplateProps {
  markdownContent: string;
}

const ExcelTemplate: React.FC<ExcelTemplateProps> = React.forwardRef(({ markdownContent }, ref) => {
  const { header, rows } = parseMarkdownTable(markdownContent);

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="bg-white p-4 shadow-lg">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr>
            {header.map((col, index) => (
              <th key={index} className="p-3 bg-green-200 text-green-800 font-bold border border-green-300">{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="bg-green-50 hover:bg-green-100">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="p-3 border border-green-200 text-gray-700">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default ExcelTemplate;

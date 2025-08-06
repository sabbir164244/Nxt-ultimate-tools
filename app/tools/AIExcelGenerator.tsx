import AIGenerator from "./AIGenerator";

export default function AIExcelGenerator() {
  return (
    <AIGenerator
      toolName="AI Excel Sheet Generator"
      icon="ri-file-excel-2-line"
      description="Describe the data you need, and AI will generate a table for you, downloadable as an Excel file."
      promptPlaceholder="e.g., 'A list of 10 countries with their capital and population', or 'A monthly budget plan with columns for Item, Category, Budgeted, Actual'..."
      initialPrompt="Create a table with the following columns: \nAnd fill it with example data for: "
      generatePrompt={(input, language) =>
        `Create a data table in ${language} based on this request: "${input}". The output MUST be a valid Markdown table format. Do not add any text before or after the table.`
      }
      isExcelTool={true}
    />
  );
}

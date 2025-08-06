import AIGenerator from "./AIGenerator";

export default function AIFormGenerator() {
  return (
    <AIGenerator
      toolName="AI HTML Form Generator"
      icon="ri-input-method-line"
      description="Describe the form you need, and AI will generate the HTML code for it."
      promptPlaceholder="e.g., 'A contact form with fields for Name, Email, and Message', or 'A registration form with Username, Password, and Confirm Password fields'..."
      initialPrompt="I need a form with these fields: "
      generatePrompt={(input, language) =>
        `Generate the HTML code for a form based on this request: "${input}". The output must be a valid HTML code block written in Markdown. Include basic styling inside a <style> tag within the code if possible.`
      }
    />
  );
}

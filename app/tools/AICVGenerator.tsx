import AIGenerator from "./AIGenerator";

export default function AICVGenerator() {
  return (
    <AIGenerator
      toolName="AI CV Generator"
      icon="ri-file-user-line"
      description="Enter your details and let AI create a professional CV for you in any language."
      promptPlaceholder="Enter your full name, contact, summary, work experience, education, and skills..."
      initialPrompt="Full Name: \nEmail: \nPhone: \nLinkedIn: \nSummary: \nExperience: \nEducation: \nSkills: "
      generatePrompt={(input, language) =>
        `Create a professional CV in ${language} using Markdown. Details: ${input}. Structure it with clear headings. Ensure it is ATS-friendly.`
      }
    />
  );
}

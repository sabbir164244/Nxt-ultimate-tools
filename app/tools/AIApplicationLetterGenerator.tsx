import AIGenerator from "./AIGenerator";

export default function AIApplicationLetterGenerator() {
  return (
    <AIGenerator
      toolName="AI Application Letter Generator"
      icon="ri-mail-send-line"
      description="Generate a compelling job application letter tailored to your needs."
      promptPlaceholder="Your Name, Your Address, Date, Hiring Manager's Name, Company Name, Company Address, Job Title you're applying for, Your key skills/experience..."
      initialPrompt="Job Title: \nCompany Name: \nMy key skills related to the job: \nMy experience relevant to the job: "
      generatePrompt={(input, language) =>
        `Write a professional job application letter in ${language} using Markdown. Details: ${input}. The tone should be formal and confident. Structure it like a proper letter.`
      }
    />
  );
}

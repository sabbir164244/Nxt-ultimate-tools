import AIGenerator from "./AIGenerator";

export default function AIFormalLetterGenerator() {
  return (
    <AIGenerator
      toolName="AI Formal Letter Generator"
      icon="ri-draft-line"
      description="Generate any type of formal letter for official purposes."
      promptPlaceholder="Recipient's Name/Title, Recipient's Address, Subject of the letter, Main points you want to cover..."
      initialPrompt="Subject: \nRecipient: \nKey points to include: "
      generatePrompt={(input, language) =>
        `Write a formal letter in ${language} using Markdown. Details: ${input}. Ensure it has a formal tone, proper salutation, and closing.`
      }
    />
  );
}

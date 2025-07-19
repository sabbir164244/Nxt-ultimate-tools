// app/tools/MarkdownPreviewer.tsx

'use client';

import { useState, useEffect } from 'react';
import { marked } from 'marked';

export default function MarkdownPreviewer() {
  const [markdown, setMarkdown] = useState(`# Hello, Markdown!

## This is a live previewer
You can type **Markdown** on the left, and see the rendered **HTML** on the right.

- Create lists
- Use \`inline code\`
- And even insert links: [Nxt Ultimate Tools](https://nexttools.netlify.app/)

\`\`\`javascript
// Code blocks are supported too!
function greet() {
    console.log("Hello, World!");
}
\`\`\`
`);
  const [html, setHtml] = useState('');

  useEffect(() => {
    const parsedHtml = marked.parse(markdown);
    setHtml(parsedHtml as string);
  }, [markdown]);

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-gray-700 to-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-markdown-line text-white text-3xl"></i>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Markdown Live Previewer</h2>
            <p className="text-white/70">Write Markdown on the left and see the result instantly on the right.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Input Area */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Markdown Input</h3>
              <textarea
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                className="w-full h-96 p-4 bg-black/30 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-gray-500 resize-none font-mono text-sm"
              />
            </div>

            {/* Output Area */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">HTML Preview</h3>
              <div
                className="prose prose-invert max-w-none w-full h-96 p-4 bg-black/30 border border-white/10 rounded-xl text-white overflow-auto"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

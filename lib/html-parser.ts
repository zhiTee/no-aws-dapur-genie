export function parseAIResponseToHTML(response: string): string {
  let html = response;

  // Parse tables first (pipe-separated format)
  html = html.replace(/\|(.+)\|\n\|[-\s|:]+\|\n((\|.+\|\n?)+)/g, (match, header, body) => {
    const headerCells = header.split('|').map((cell: string) => cell.trim()).filter((cell: string) => cell)
      .map((cell: string) => `<th class="px-6 py-4 bg-gradient-to-r from-gray-800 to-gray-900 text-white font-bold text-left border border-gray-600 first:rounded-tl-lg last:rounded-tr-lg">${cell}</th>`).join('');
    
    const bodyRows = body.trim().split('\n').map((row: string, index: number) => {
      const cells = row.split('|').map((cell: string) => cell.trim()).filter((cell: string) => cell)
        .map((cell: string, cellIndex: number) => `<td class="px-6 py-4 border border-gray-200 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} ${cellIndex === 0 ? 'font-medium text-gray-900' : 'text-gray-700'} hover:bg-blue-50 transition-colors">${cell}</td>`).join('');
      return `<tr class="hover:shadow-md transition-all duration-200">${cells}</tr>`;
    }).join('');
    
    return `<div class="overflow-x-auto my-8 shadow-xl rounded-lg border border-gray-300 bg-white"><table class="min-w-full border-collapse">
      <thead><tr>${headerCells}</tr></thead>
      <tbody class="divide-y divide-gray-200">${bodyRows}</tbody>
    </table></div>`;
  });

  // Convert markdown-style formatting to HTML
  html = html
    // Headers with adjusted spacing
    .replace(/^### (.*$)/gm, '<h3 class="text-lg font-semibold mt-6 mb-1 text-gray-800">$1</h3>')
    .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold mt-8 mb-1 text-gray-800">$1</h2>')
    .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mt-8 mb-1 text-gray-900">$1</h1>')
    
    // Bold and italic
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="italic text-gray-700">$1</em>')
    
    // Handle nested lists (2+ spaces for sub-items)
    .replace(/^  \d+\. ([^:]+):\s*(.*)$/gm, '<li class="ml-8 mb-2 text-gray-700"><strong>$1:</strong> $2</li>')
    .replace(/^  \d+\. (.*$)/gm, '<li class="ml-8 mb-2 text-gray-700"><strong>$1</strong></li>')
    .replace(/^    [\*\-] ([^:]+):\s*(.*)$/gm, '<li class="ml-12 mb-1 flex items-start"><span class="text-black mr-3 mt-1 font-bold">◦</span><span class="text-gray-600"><strong>$1:</strong> $2</span></li>')
    .replace(/^    [\*\-] (.*$)/gm, '<li class="ml-12 mb-1 flex items-start"><span class="text-black mr-3 mt-1 font-bold">◦</span><span class="text-gray-600"><strong>$1</strong></span></li>')
    
    // Main numbered lists with bold points and descriptions
    .replace(/^\d+\. ([^:]+):\s*(.*)$/gm, '<li class="mb-2 text-gray-900 text-base leading-relaxed"><strong>$1:</strong> $2</li>')
    .replace(/^\d+\. (.*$)/gm, '<li class="mb-2 text-gray-900 text-base leading-relaxed"><strong>$1</strong></li>')
    
    // Main bullet lists with bold points and descriptions
    .replace(/^[\*\-] ([^:]+):\s*(.*)$/gm, '<li class="mb-1 flex items-start"><span class="text-blue-600 mr-2 mt-1 font-bold">●</span><span class="text-gray-900"><strong class="text-gray-800">$1:</strong> <span class="text-gray-700">$2</span></span></li>')
    .replace(/^[\*\-] (.*$)/gm, '<li class="mb-1 flex items-start"><span class="text-blue-600 mr-2 mt-1 font-bold">●</span><span class="text-gray-900 font-medium">$1</span></li>')
    
    // Sub-bullet lists with bold points and descriptions
    .replace(/^  [\*\-] ([^:]+):\s*(.*)$/gm, '<li class="ml-6 mb-1 flex items-start"><span class="text-green-600 mr-2 mt-1 font-bold">◆</span><span class="text-gray-700"><strong class="text-gray-800">$1:</strong> <span class="text-gray-600">$2</span></span></li>')
    .replace(/^  [\*\-] (.*$)/gm, '<li class="ml-6 mb-1 flex items-start"><span class="text-green-600 mr-2 mt-1 font-bold">◆</span><span class="text-gray-700 font-medium">$1</span></li>')
    
    // Code blocks with styling
    .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-100 p-4 rounded-lg my-3 overflow-x-auto"><code class="text-sm font-mono">$1</code></pre>')
    .replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono">$1</code>')
    
    // Clean up excessive line breaks first
    .replace(/\n{3,}/g, '\n') // Replace 3+ line breaks with 2
    .replace(/^\s*\n/gm, '') // Remove empty lines with only whitespace
    
    // Line breaks
    .replace(/\n\n/g, '</p><p class="mb-2">')
    .replace(/\n/g, ' '); // Convert single line breaks to spaces instead of <br>

  // Wrap in paragraphs and handle lists
  html = '<div class="prose max-w-none"><p class="mb-2">' + html + '</p></div>';
  
  // Handle ordered lists with adjusted spacing
  html = html.replace(/<p[^>]*>(<li[^>]*>[\s\S]*?<\/li>)<\/p>/g, '<ol class="list-none mb-4 pl-0">$1</ol>');
  
  // Handle unordered lists with adjusted spacing
  html = html.replace(/<p[^>]*>(<li[^>]*class="mb-1[^>]*>[\s\S]*?<\/li>)<\/p>/g, '<ul class="list-none mb-3 pl-0">$1</ul>');
  html = html.replace(/<p[^>]*>(<li[^>]*class="ml-6[^>]*>[\s\S]*?<\/li>)<\/p>/g, '<ul class="list-none mb-2 pl-0">$1</ul>');
  
  // Clean up formatting
  html = html.replace(/<p[^>]*>\s*<\/p>/g, ''); // Remove empty paragraphs
  html = html.replace(/\s+/g, ' '); // Normalize multiple spaces

  return html;
}
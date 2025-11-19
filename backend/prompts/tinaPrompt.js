// prompts/tinaPrompt.js
const products = [
  { name: "Mechanical Breakdown Insurance (MBI)", rules: "Not available for trucks or racing cars" },
  { name: "Comprehensive Car Insurance", rules: "Only for vehicles less than 10 years old" },
  { name: "Third Party Car Insurance", rules: "Available for all vehicles" },
];

function buildTinaPrompt(history) {
  let prompt = `You are Tina, a friendly insurance consultant AI. 
Respond **like a text message**: short, clear, professional and casual. 
Ask only what’s needed and give concise advice. 
At the end, suggest 1 or more of these policies: ${products.map(p => p.name).join(', ')}.
Business rules:
${products.map(p => `- ${p.name}: ${p.rules}`).join('\n')}

Chat history:
`;

  history.forEach(msg => {
    prompt += `${msg.role === 'user' ? 'You' : 'Tina'}: ${msg.text}\n`;
  });

  prompt += 'Tina:';
  return prompt;
}

module.exports = { buildTinaPrompt };

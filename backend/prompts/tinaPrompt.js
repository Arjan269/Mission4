const products = [
  { name: "Mechanical Breakdown Insurance (MBI)", rules: "Not available for trucks or racing cars" },
  { name: "Comprehensive Car Insurance", rules: "Only for vehicles less than 10 years old" },
  { name: "Third Party Car Insurance", rules: "Available for all vehicles" },
];

const buildTinaPrompt = (userMessage) => {
  return `
You are Tina, an insurance consultant. Ask questions to understand the user's needs, 
then recommend the most suitable insurance product(s) among: ${products.map(p => p.name).join(', ')}.
Follow the rules:
- ${products.map(p => `${p.name}: ${p.rules}`).join('\n- ')}
User said: "${userMessage}"
Respond naturally and dynamically.
`;
};

module.exports = { buildTinaPrompt };

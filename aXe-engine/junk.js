const defaultPrompt = require('./prompts/defaultViolationPrompt');

// const generateFramework = async (item) => {
//     if (!item) return [];

//     const finalPrompt = `${defaultPrompt}\n\n### Audit data:\n${JSON.stringify(item, null, 2)}\n\n### Your response:\n`;
//     try {
//         const response = await fetch(`https://api-inference.huggingface.co/models/${HF_MODEL}`, {
//             method: 'POST',
//             headers: {
//                 'Authorization': `Bearer ${HF_API_KEY}`,
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ inputs: finalPrompt })
//         });

//         if (!response.ok) {
//             const errorText = await response.text();
//             throw new Error(`Hugging Face API error: ${response.status} ${errorText}`);
//         }

//         const data = await response.json();
//         const rawText = data?.[0]?.generated_text || '';

//         console.log("Test: ", rawText[0])


//         const startIndex = rawText.indexOf('```json');
//         const endIndex = rawText.lastIndexOf('```');

//         const jsonString = (startIndex !== -1 && endIndex !== -1)
//             ? rawText.substring(startIndex + 7, endIndex).trim()
//             : rawText.trim();
        
//         let parsed;
//         try {
//             parsed = JSON.parse(jsonString);
//         } catch (e) {
//             console.error('JSON parse error:', e);
//             return res.status(500).json({ error: 'Model returned invalid JSON', raw: rawText });
//         }

//         console.log("Parsed: ", parsed)
//         return {
//             explanation: parsed.issue_explanation,
//             impact: parsed.impact,
//             technicalAnalysis: parsed.technical_analysis,
//             fixes: parsed.fixes,
//             bestPractices: parsed.best_practices,
//             codeExamples: parsed.code_examples,
//             wcagGuidelines: parsed.wcag_guidelines,
//         };
//     } catch (error) {
//         console.error('Error calling Hugging Face model:', error);
//     }
// };
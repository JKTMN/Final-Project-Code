/**
 * Acts as an API server for running accessibility audits using aXe.
 * @param {req} String - The URL passed in the request body.
 * @param {res} Object - The response object.
 * @returns {Object} - Returns an object containing the violations found in the audit.
 * Based on {@link https://github.com/dequelabs/axe-puppeteer}
 */
const express = require('express');
const puppeteer = require('puppeteer');
const { AxePuppeteer } = require('axe-puppeteer');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const port = 3001;

app.use(cors({
    origin: ['http://localhost:3000','chrome-extension://pmgmglmdclpaipolmofbkjbigaabcohj']
}));

app.use(express.json());

const HF_API_KEY = process.env.HUGGINGFACE_API_KEY;
const HF_MODEL = process.env.HUGGINGFACE_MODEL;

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

const formatResults = async (items, shouldGenerateFramework = false, pageUrl = '') => {
        const results = await Promise.all(items.map(async item => {
        const formattedItem = {
            id: item.id,
            impact: item.impact || 'N/A',
            description: item.description || 'No description available',
            help: item.help,
            helpUrl: item.helpUrl,
            tags: item.tags || [],
            pageUrl: pageUrl || '',
            nodes: item?.nodes.map(node => ({
            html: node?.html || "No HTML available",
            message: Array.isArray(node?.any) && node.any.length > 0
                ? node.any.map(error => error.message).join(', ')
                : "Error message not available",
            target: node?.target || "No target available"
            })) || [],
        };
    
        // if (shouldGenerateFramework) {
        //     formattedItem.generatedFramework = await generateFramework(item);
        // }
    
        return formattedItem;
        }));
    
        return results;
    };

const runAccessibilityAudit = async (url) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const results = await new AxePuppeteer(page).analyze();

    await browser.close();

    // const ruleIds = [
    //     ...results.passes,
    //     ...results.violations,
    //     ...results.inapplicable,
    //     ...results.incomplete
    //   ].map(test => test.id);
      
    // const uniqueRuleIds = [...new Set(ruleIds)];

    // console.log("Unique rule IDs: ", uniqueRuleIds);

    return {
        url,
        passes: await formatResults(results.passes || [], false,  url),
        violations: await formatResults(results.violations || [], true, url),
        incomplete: await formatResults(results.incomplete || [], false,  url),
        inapplicable: await formatResults(results.inapplicable || [], false, url),
        testsRun: [...results.passes, ...results.violations, ...results.inapplicable, ...results.incomplete].map(test => ({
            id: test.id,
            title: test.help,
            description: test.description || 'No description available',
            tags: test.tags || []
        }))
    };
};

app.post('/api/audit', async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        const auditResults = await runAccessibilityAudit(url);
        res.json(auditResults);
    } catch (error) {
        console.error('Error running accessibility audit:', error);
        res.status(500).json({ error: 'Failed to run accessibility audit' });
    }
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
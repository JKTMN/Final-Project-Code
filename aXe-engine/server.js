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

const engine = express();
const port = 3001;

engine.use(cors({
    origin: ['http://localhost:3000','chrome-extension://pmgmglmdclpaipolmofbkjbigaabcohj']
}));

engine.use(express.json());

const runAccessibilityAudit = async (url) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const results = await new AxePuppeteer(page).analyze();

    const formatResults = (items) => items.map(item => ({
        id: item.id,
        impact: item.impact || 'N/A',
        description: item.description || 'No description available',
        help: item.help,
        helpUrl: item.helpUrl,
        tags: item.tags || [],
        pageUrl: url
    }));

    await browser.close();

    return {
        url,
        passes: formatResults(results.passes || []),
        violations: formatResults(results.violations || []),
        incomplete: formatResults(results.incomplete || []),
        inapplicable: formatResults(results.inapplicable || []),
        testsRun: [...results.passes, ...results.violations, ...results.inapplicable, ...results.incomplete].map(test => ({
            id: test.id,
            title: test.help,
            description: test.description || 'No description available',
            tags: test.tags || []
        }))
    };
};

engine.post('/api/audit', async (req, res) => {
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


engine.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
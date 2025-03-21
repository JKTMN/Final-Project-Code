const express = require('express');
const puppeteer = require('puppeteer');
const { AxePuppeteer } = require('axe-puppeteer');
const cors = require('cors');

const engine = express();
const port = 3001;

engine.use(cors({
    origin: 'http://localhost:3000',
}));

engine.use(express.json());

engine.post('/api/audit', async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);

        const results = await new AxePuppeteer(page).analyze();

        await browser.close();

        const violations = (results.violations || []).map(violation => {
            return {
                id: violation.id,
                impact: violation.impact,
                description: violation.description,
                nodes: violation.nodes.map(node => ({
                    message: node.any ? node.any.map(error => error.message).join(', ') : '',
                    target: node.target
                }))
            };
        });

        res.json({ violations });
    } catch (error) {
        console.error('Error running accessibility audit:', error);
        res.status(500).json({ error: 'Failed to run accessibility audit' });
    }
});

engine.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
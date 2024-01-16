const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

const API_KEY = 'dbcb2f4203584288bdf7ef3043498ace'; // Replace 'your-api-key' with your actual API key

app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    next();
});

app.get('/api/data/', async (req, res) => {
    try {
        const searchTerm = req.query.search || 'iphone'; // Default to 'iphone' if search parameter is not provided
        const page = req.query.page || 1;
        const response = await axios.get('https://api.axesso.de/amz/amazon-search-by-keyword-asin', {
            params: {
                domainCode: 'co.uk',
                keyword: searchTerm,
                page: page,
                sortBy: 'relevanceblender',
            },
            headers: {
                'Cache-Control': 'no-cache',
                'axesso-api-key': API_KEY,
            },
        });
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/api/data/:asin', async (req, res) => {
    try {
        const asin = req.params.asin;
        const response = await axios.get('https://api.axesso.de/amz/amazon-lookup-product', {
            params: {
                url: 'https://www.amazon.co.uk/dp/'+asin,
            },
            headers: {
                'Cache-Control': 'no-cache',
                'axesso-api-key': API_KEY,
            },
        });
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`Proxy server is running on http://localhost:${PORT}`);
});

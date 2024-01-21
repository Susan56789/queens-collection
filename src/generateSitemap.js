const SitemapGenerator = require('sitemap-generator');



// Set the URL of your Vue.js app
const targetUrl = 'https://queenscollection.vercel.app';

// Set the path where you want to save the sitemap
const outputPath = './public/sitemap.xml';

// Initialize the generator
const generator = SitemapGenerator(targetUrl, {
    stripQuerystring: false, // Keep query parameters in URLs
    filepath: outputPath,    // Output path for the sitemap
});

// Register event listeners
generator.on('done', () => {
    console.log('Sitemap generated successfully.');
});

generator.on('error', (error) => {
    console.error('Error generating sitemap:', error);
});

// Start the generation process
generator.start();

// node src/generateSitemap.js
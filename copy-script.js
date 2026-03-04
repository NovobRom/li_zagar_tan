const fs = require('fs');
const path = require('path');

const src = "C:/Users/roman/.gemini/antigravity/brain/cfc95871-91ad-4f6f-93ff-b3b4c879a912/li_zagar_tan_og_image_1772656170803.png";
const dest = path.join(__dirname, 'public', 'opengraph-image.png');

try {
    fs.copyFileSync(src, dest);
    console.log('Copy successful!');
} catch (e) {
    console.error('Copy failed:', e);
}

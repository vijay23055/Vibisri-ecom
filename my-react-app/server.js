import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Function to update mockProducts.js file
const updateMockProductsFile = (data) => {
  try {
    const { products, categories, offers } = data;

    const fileContent = `export const products = ${JSON.stringify(products, null, 2)};

export const categories = ${JSON.stringify(categories, null, 2)};

export const offers = ${JSON.stringify(offers, null, 0)};`;

    const filePath = path.join(__dirname, 'src', 'data', 'mockProducts.js');
    fs.writeFileSync(filePath, fileContent, 'utf8');

    return { success: true, message: 'File updated successfully' };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// API endpoint to update products file
app.post('/api/update-products', (req, res) => {
  try {
    const result = updateMockProductsFile(req.body);

    if (result.success) {
      res.json({ success: true, message: 'mockProducts.js updated successfully!' });
      console.log('✅ mockProducts.js automatically updated!');
    } else {
      res.status(500).json({ success: false, message: result.message });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Server running', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Auto-save server running at http://localhost:${PORT}`);
  console.log(`📝 File save endpoint: POST /api/update-products`);
});

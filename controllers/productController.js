const Product = require('../models/product')

// Create a new product
exports.createProduct = async (req, res) => {
    try {
      const { name, price, description, category } = req.body;
      if (!name || !price || !description || !category) {
        return res.status(400).json({ message: 'All fields are required' });
      }
      if (typeof name !== 'string' || name.trim().length < 3) {
        return res.status(400).json({ message: 'Name must be a string with at least 3 characters' });
      }
      if (typeof price !== 'number' || price <= 0) {
        return res.status(400).json({ message: 'Price must be a positive number' });
      }
      if (typeof description !== 'string' || description.trim().length < 10) {
        return res.status(400).json({ message: 'Description must be a string with at least 10 characters' });
      }
      if (typeof category !== 'string' || category.trim().length < 3) {
        return res.status(400).json({ message: 'Category must be a string with at least 3 characters' });
      }
      const product = new Product({ name, price, description, category });
      await product.save();
      res.status(201).json(product);
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  

// Retrieve all products
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Retrieve a single product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Update a product by ID
exports.updateProduct = async (req, res) => {
    try {
        const { name, price, description, category } = req.body;
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            { name, price, description, category },
            { new: true }
        );
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
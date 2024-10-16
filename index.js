const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 4000;

// MongoDB connection details (Make sure this is correct)
const connectionString = 'mongodb+srv://zawwar:Zz1i6JKIsC0kEnkl@cluster0.jfmrfho.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const databaseName = 'zawwar';
const productsCollectionName = 'CrudReact';

// Middleware
app.use(bodyParser.json());
app.use(cors()); // To handle CORS requests from frontend

// Connect to MongoDB
let db, productsCollection;
MongoClient.connect(connectionString)
    .then(client => {
        db = client.db(databaseName);
        productsCollection = db.collection(productsCollectionName);
        console.log(`Connected to database: ${databaseName}`);
    })
    .catch(error => console.error('MongoDB Connection Error:', error));

// Route to add a new product
app.post('/addProduct', async (req, res) => {
    try {
        const product = req.body;
        const result = await productsCollection.insertOne(product);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send('Error adding product');
    }
});

// Route to get all products
app.get('/', async (req, res) => {
    try {
        const products = await productsCollection.find().toArray();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).send('Error fetching products');
    }
});

// Test route to check backend connection
app.get('/b', (req, res) => {
    console.log('Backend is connected');
    res.json({ message: "Backend is connected" });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

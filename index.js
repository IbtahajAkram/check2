const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 4000;

// MongoDB connection details
const connectionString = 'mongodb+srv://zawwar1313:dG1qZmINoxHyHIe1@cluster0.h9jziii.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const databaseName = 'zawwar';
const productsCollectionName = 'CrudReact';

// Middleware
app.use(bodyParser.json());
app.use(cors()); // To handle CORS requests from frontend

// Connect to MongoDB
let db, productsCollection;
MongoClient.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
        db = client.db(databaseName);
        productsCollection = db.collection(productsCollectionName);
        console.log(`Connected to database: ${databaseName}`);
    })
    .catch(error => console.error(error));

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

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

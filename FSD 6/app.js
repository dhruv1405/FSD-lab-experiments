const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const items = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' },
];

// Endpoint to get all items
app.get('/items', (req, res) => {
  res.json(items);
});

// Endpoint to get a specific item by ID
app.get('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const item = items.find(item => item.id === itemId);

  if (!item) {
    res.status(404).json({ error: 'Item not found' });
  } else {
    res.json(item);
  }
});

// Endpoint to add a new item
app.post('/items', (req, res) => {
  const newItem = req.body;
  newItem.id = items.length + 1;
  items.push(newItem);
  res.status(201).json(newItem);
});

// Endpoint to update an existing item by ID
app.put('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const updatedItem = req.body;
  const index = items.findIndex(item => item.id === itemId);

  if (index === -1) {
    res.status(404).json({ error: 'Item not found' });
  } else {
    items[index] = { ...items[index], ...updatedItem };
    res.json(items[index]);
  }
});

// Endpoint to delete an item by ID
app.delete('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const index = items.findIndex(item => item.id === itemId);

  if (index === -1) {
    res.status(404).json({ error: 'Item not found' });
  } else {
    const deletedItem = items.splice(index, 1)[0];
    res.json(deletedItem);
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
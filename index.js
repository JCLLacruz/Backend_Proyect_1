const express = require('express');
const app = express();
const PORT = 3001;

app.use(express.json());

app.use('/products',require('./routes/products.js'));
app.use('/categories',require('./routes/categories.js'));
app.use('/users',require('./routes/users.js'));
app.use('/orders',require('./routes/orders.js'));
app.use('/reviews',require('./routes/reviews.js'));

app.listen(PORT, () => `Server started on port ${PORT}`);
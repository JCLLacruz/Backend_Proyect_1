const express = require('express');
const { typeError } = require('./middleware/errors.js');
const app = express();
const PORT = 3001;
const path = require('path');

app.use(express.json());

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	res.setHeader('Access-Control-Allow-Headers', 'authorization');
	next();
});

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/products', require('./routes/products.js'));
app.use('/categories', require('./routes/categories.js'));
app.use('/users', require('./routes/users.js'));
app.use('/orders', require('./routes/orders.js'));
app.use('/reviews', require('./routes/reviews.js'));

app.use(typeError);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = app;

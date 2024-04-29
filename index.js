const express = required('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.listen(PORT,`Server started on port ${PORT}`);
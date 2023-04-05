const express = require('express')
const cors = require('cors')
const registeredRoutes = require('./routes/regRoute.js');
const ProductRouter = require('./routes/productRoute.js');
const errorrouter = require('./routes/errorrouter.js');
const app = express()
// Register the registered routes
app.use(express.json())
app.use('/registered', registeredRoutes);
app.use('/product', ProductRouter);
app.use('*', errorrouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});






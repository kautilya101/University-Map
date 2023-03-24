const express = require('express');
const cors = require('cors');
const app = express();
const mainRouter = require('./routes/main.route');

port = 4800;
app.use(cors());
app.use('/v1',mainRouter);
app.listen(port,()=>{
    console.log(`working on port : ${port}`);
})
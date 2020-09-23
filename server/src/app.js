const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const taskRouter = require('./routers/task');
const userRouter = require('./routers/user');
const clientRouter = require('./routers/client');
const path = require('path');
const cookieParser = require('cookie-parser');
const port = process.env.PORT;
const cors = require('cors');
const session = require('express-session');
require('./db/db');
// Path 
const staticsPath = path.join(__dirname, '../../statics')
// Setup express
app.use(express.static(staticsPath));
app.use(cookieParser());
app.use(bodyParser.json());
//Router
app.use(taskRouter);
app.use(userRouter);
app.use(clientRouter);

app.listen(port);
console.log('Server start at port ' + port)

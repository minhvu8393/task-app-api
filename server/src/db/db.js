const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
})
.then(() => {
    console.log('Connected to DB');
})
.catch(() => {
    console.log('Unable to connect to DB');
})

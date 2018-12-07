const express = require ('express');
const bodyParser = require('body-parser');
const ctrlAlpha = require('./controllers/alpha-controller');
const cors = require('cors')

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors())

app.get('/api/libs' , ctrlAlpha.readStory)

app.listen( port , () => console.log(`Talk cruddy to me on ${port}`))
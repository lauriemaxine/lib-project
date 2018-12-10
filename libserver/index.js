const express = require ('express');
const bodyParser = require('body-parser');
const ctrlAlpha = require('./controllers/alpha-controller');
const cors = require('cors')

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors())

app.get('/api/libs' , ctrlAlpha.getSkellies)

app.get('/api/libs/titles' , ctrlAlpha.sendList)

app.get('/api/libs/search/:title' , ctrlAlpha.readSaved)

// app.put('/api/libs' , ctrlAlpha.buildStory)

app.delete('/api/libs/:delTarget' , ctrlAlpha.deleteSaved)

app.post('/api/libs/' , ctrlAlpha.saveStory)

app.put('/api/editTitle' , ctrlAlpha.editTitle)

app.listen( port , () => console.log(`Talk cruddy to me on ${port}`))
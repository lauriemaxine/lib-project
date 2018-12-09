const express = require ('express');
const bodyParser = require('body-parser');
const ctrlAlpha = require('./controllers/alpha-controller');
const cors = require('cors')

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors())

app.get('/api/libs' , ctrlAlpha.readStory)

app.get('/api/libs/:title' , ctrlAlpha.readSaved)

app.put('/api/libs' , ctrlAlpha.buildStory)

app.delete('/api/libs' , (req, res) => {req.query.delTarget ? ctrlAlpha.deleteSaved(req,res) : ctrlAlpha.deleteChambered(req, res)})

app.post('/api/libs/:title' , ctrlAlpha.saveStory)

app.listen( port , () => console.log(`Talk cruddy to me on ${port}`))
const storyDB = ["Once upon a time, there was little boy named NAME. He had a fine NOUN. He liked to VERB on his NOUN. After a good amount of time, his NOUN began to turn ADJECTIVE." , "Let's pretend this is a story! We'll call it \"Second Story\""]

let chamberedStory = {};

module.exports = {
  readStory(req, res) {
    console.log('readStory invoked!')
    res.status(200).send(storyDB)
  } ,

  buildStory(req, res){
    console.log("Build story invoked!", req.body)
    let [noun, verb, adjective, name] = req.body
    let scaffold = storyDB[0].split(' ')
    console.log(scaffold)
    scaffold.splice(9,1,name)
    scaffold.splice(14,1,noun)
    scaffold.splice(18,1,verb)
    scaffold.splice(21,1,noun)
    scaffold.splice(29,1,noun)
    scaffold.splice(33,1,adjective)
    scaffold = scaffold.join(' ')
    res.status(200).send(scaffold)
  }
  
}
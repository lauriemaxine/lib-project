const skeletons = ["Once upon a time, there was little boy named NAME. He had a fine NOUN. He liked to VERB on his NOUN. After a good amount of time, his NOUN began to turn ADJECTIVE." , "Let's pretend this is a story! We'll call it \"Second Story\""]

let savedStories = [{title: "The Little Mermaid" , text: "Text is not important"} , {title: "Borty and the Beast" , text: "Release your inner animality"}]

let chamberedStory = '';

module.exports = {
  readStory(req, res) {
    console.log('readStory invoked!')
    res.status(200).send(skeletons[0])
  } ,

  buildStory(req, res){
    console.log("Build story invoked!", req.body)
    let [noun, verb, adjective, name] = req.body
    let scaffold = skeletons[0].split(' ')
    nameName = name.slice()
    scaffold.splice(9,1,name)
    scaffold.splice(14,1,noun)
    scaffold.splice(18,1,verb)
    scaffold.splice(21,1,noun)
    scaffold.splice(29,1,noun)
    scaffold.splice(33,1,adjective)
    scaffold = scaffold.join(' ')
    chamberedStory = scaffold.slice()
    console.log('Chambered: ' + chamberedStory)
    res.status(200).send(scaffold)
  } ,

  deleteChambered(req, res){
    chamberedStory = ''
    nameName = ''
    console.log('Chambered: ' + chamberedStory)
    res.sendStatus(200)
  } ,

  deleteSaved(req, res){
    console.log('deleteSaved invoked')
    let {delTarget} = req.query
    console.log('To be deleted: ' + delTarget)
    savedStories = savedStories.filter(storyOb => storyOb.title !== delTarget)
    res.status(200).send(savedStories.map(story => story.title))
  } ,
  
  saveStory(req, res){
    if (req.params.title === "titles"){res.status(200).send(savedStories.map(story => story.title)); return }
    else if (!chamberedStory){res.sendStatus(404)}
    let newStory = {
      title: req.params.title ,
      text: chamberedStory
    }
    savedStories.push(newStory)
    chamberedStory = ''
    res.status(200).send(savedStories.map(story => story.title))
  } ,
  
  readSaved(req, res){
    console.log('readSaved invoked')
    let {title} = req.params
    console.log('To be read: ' + title)
    let readTarget = savedStories.filter(storyOb => storyOb.title === title)
    if(!readTarget[0]){res.sendStatus(404)}{
      res.status(200).send(readTarget[0])
    }
  } ,

  
}
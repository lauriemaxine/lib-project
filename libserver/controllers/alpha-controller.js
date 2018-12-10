const skeletons = [
  {
    title: "Dummy Data" , 
    storyBones: [["Once upon a time, there was little boy named "] , 10 , [". He had a fine "] , 20 ,[". He liked to "] , 30 ,[" on his "] , 20 , [". After a good amount of time, his "] , 20 , [" began to turn "] , 40, ["."]] ,
  } , {
    title: "The Other Story" , 
    storyBones: [['I once saw a man walking along with a huge '] , 20 , [' in his hand. Now, I was feeling pretty darn '] , 40 , ' on that particular day, so I said, "hey ' , 41 , 21 , ', what are you doing with that big ' , 42 , 20 , '?" Well, he put the ' , 20 , ' down, looked me right in the eyes, and said, "If I had a dollar for every time somebody asked me that, I\'d be a ' , 22 , ' by now." I felt pretty ' , 43 , ' after that, so I didn\'t hang around. I got right back on my ' , 23 , ' and got outta there. And that\'s the only time I ever met a professional ' , 24 , ' ' , 30 , 'er.']
  } , {
    title: "The Lion and the Mouse" , 
    storyBones: [['A Lion lay asleep in the '],20,[', his '],40,[' head resting on his paws. A '],41,[' little Mouse came upon him unexpectedly, and in her fright and haste to get away, ran across the Lion\'s '],21,['. Roused from his nap, the Lion laid his '],42,[' paw angrily on the tiny creature to '],30,[' her. "'],31,[' me!" begged the poor Mouse. "Please let me go and some day I will surely '],32,[' you." The Lion was much amused to think that a Mouse could ever '],32,[' him. But he was '],43,[' and finally let the Mouse go. Some days later, while '],33,['ing his '],22,[' in the '],20,[', the Lion was caught in the toils of a '],34,['er`s '],23,['. Unable to '],24,[' himself, he filled the '],20,[' with his '],44,[' '],35,['ing. The Mouse knew the voice and quickly found the Lion '],36,['ing in the '],23,['. Running to one of the great '],25,['s that bound him, she gnawed it until it parted, and soon the Lion was '],45,['. "You laughed when I said I would '],32,[' you," said the Mouse. "Now you see that even a Mouse can '],37,[' a Lion."   Moral; A '],26,[' is never wasted.']]
  }
]

let savedStories = [{title: "The Little Mermaid" , text: "Text is not important"} , {title: "Borty and the Beast" , text: "Release your inner animality"}]

let chamberedStory = '';

module.exports = {

  sendList(req,res){
    res.status(200).send(savedStories.map((storyOb,i) => storyOb.title).sort())
  } ,

  editTitle(req,res){
    savedStories = savedStories.map(storyOb => {if(storyOb.title === req.body.title) {storyOb.title = req.body.newTitle} {return storyOb}})
    res.status(200).send(savedStories.map(storyOb => storyOb.title).sort())
  } ,

  getSkellies(req, res) {
    console.log('readStory invoked!')
    res.status(200).send(skeletons[2])
  } ,

  // buildStory(req, res){
  //   console.log("Build story invoked!", req.body)
  //   let [noun, verb, adjective, name] = req.body
  //   let scaffold = skeletons[0].split(' ')
  //   nameName = name.slice()
  //   scaffold.splice(9,1,name)
  //   scaffold.splice(14,1,noun)
  //   scaffold.splice(18,1,verb)
  //   scaffold.splice(21,1,noun)
  //   scaffold.splice(29,1,noun)
  //   scaffold.splice(33,1,adjective)
  //   scaffold = scaffold.join(' ')
  //   chamberedStory = scaffold.slice()
  //   console.log('Chambered: ' + chamberedStory)
  //   res.status(200).send(scaffold)
  // } ,

  // deleteChambered(req, res){
  //   chamberedStory = ''
  //   nameName = ''
  //   console.log('Chambered: ' + chamberedStory)
  //   res.sendStatus(200)
  // } ,

  deleteSaved(req, res){
    console.log('deleteSaved invoked')
    let {delTarget} = req.params
    console.log('To be deleted: ' + delTarget)
    savedStories = savedStories.filter(storyOb => storyOb.title !== delTarget)
    res.status(200).send(savedStories.map((storyOb,i) => storyOb.title).sort())
  } ,
  
  saveStory(req, res){
    savedStories.push(req.body)
    res.status(200).send(savedStories.map((storyOb,i) => storyOb.title).sort())
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
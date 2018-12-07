const storyDB = ["Let's pretend this is a story! We'll call it \"First Story\"" , "Let's pretend this is a story! We'll call it \"Second Story\""]

module.exports = {
  readStory(req, res) {
    console.log('readStory invoked!')
    res.status(200).send(storyDB)
  }
}
function skeletonParser(storyBones){
  let nameArray = []
  let nounArray = []
  let verbArray = []
  let adjectiveArray = []
  for (let i=1; i < storyBones.length; i++){
    if(typeof storyBones[i] === 'number'){
      if(9 < storyBones[i] && storyBones[i] < 20){if(nameArray.indexOf(storyBones[i]) === -1){nameArray.push(storyBones[i])}}
      if(19 < storyBones[i] && storyBones[i] < 30){if(nounArray.indexOf(storyBones[i]) === -1){nounArray.push(storyBones[i])}}
      if(29 < storyBones[i] && storyBones[i] < 40){if(verbArray.indexOf(storyBones[i]) === -1){verbArray.push(storyBones[i])}}
      if(39 < storyBones[i] && storyBones[i] < 50){if(adjectiveArray.indexOf(storyBones[i]) === -1){adjectiveArray.push(storyBones[i])}}
    }
  }
  nameArray.sort()
  nounArray.sort()
  verbArray.sort()
  adjectiveArray.sort()
  return { nameArray, nounArray, verbArray , adjectiveArray }
}

export default skeletonParser
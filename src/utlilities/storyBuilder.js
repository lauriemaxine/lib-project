function storyBuilder(props){
  let {currentSkeleton, nameArray, nounArray, verbArray, adjectiveArray} = props
  let {storyBones} = currentSkeleton
  for (let i=1; i < storyBones.length; i++){
    let operator = [];
    if(typeof storyBones[i] === 'number'){
      if(9 < storyBones[i] && storyBones[i] < 20){operator = nameArray}
      if(19 < storyBones[i] && storyBones[i] < 30){operator = nounArray}
      if(29 < storyBones[i] && storyBones[i] < 40){operator = verbArray}
      if(39 < storyBones[i] && storyBones[i] < 50){operator = adjectiveArray}
      storyBones.splice(i, 1, [operator[storyBones[i] % 10]])
    }
  }
  let storyFlesh = storyBones.join('')
  return storyFlesh
}

export default storyBuilder
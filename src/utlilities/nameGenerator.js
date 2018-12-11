import axios from 'axios'

function nameGenerator(){
  
  return axios.get("https://acedev-project-name-generator-v1.p.rapidapi.com/without-number" ,
  {headers: {"X-RapidAPI-Key": "7d171a7c5cmsha9e755031a8c254p15cf15jsnffb30839217c"}}).then((res) => res.data.spaced)
}

// unirest.get("https://acedev-project-name-generator-v1.p.rapidapi.com/without-number")
// .header("X-RapidAPI-Key", "SIGN-UP-FOR-KEY")
// .end(function (result) {
//   console.log(result.status, result.headers, result.body);
// });

export default nameGenerator
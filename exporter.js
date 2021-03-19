const axios = require('axios')
const fs = require('fs')

const exported = JSON.parse(fs.readFileSync('./adjusted.json'))


// for(var i = 5; i < 8; i++){
//     axios.post('https://rb-portal-backend.herokuapp.com/project', {
//         name: exported[i].project
//     }).then(function(response) {
//             console.log(response.data)
//             for(var j = 0; j < exported[i].units.length; j++){
//                 console.log(j)
//                 axios.post('https://rb-portal-backend.herokuapp.com/' + response.id + '/addUnit', {
//                     name: exported[i].units[j].unit,
//                     location: exported[i].units[j].location,
//                     description: exported[i].units[j].description
//                 }).then((res) => console.log(res))
//     }
// }
// )}

// async function go(){
//     for(var i = 0; i < 2; i++){
//         await axios.post('https://rb-portal-backend.herokuapp.com/project', {
//             name: exported[i].project
//         }).then((res) => console.log(res.data))
//     }
// }
// go()

const fetchPosts = async (obj) => {
    try {
      const data = await axios.post('https://rb-portal-backend.herokuapp.com/project', {
          name: obj,
          address: "EMPTY"
      })
      return data;
    } catch (error) {
      console.log(error);
    }
  };

// fetchPosts(exported[1].project)

const getPostsSync = async () => {
    for (const project of exported) {
        const post = await fetchPosts(project.project);
        console.log(`Synchronous ${post.data.id} is fetched for ${project.project}`);
        for(const unit of project.units) {
            axios.post('https://rb-portal-backend.herokuapp.com/project/' + post.data.id + '/addUnit', {
                name: unit.unit,
                location: unit.location,
                description: unit.description
            })
        } 
    }
  };
  getPostsSync();
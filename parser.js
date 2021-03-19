const fs = require('fs')

function search(key, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].project === key) {
            return i;
        }
    }
}

const raw = fs.readFileSync('./converted.json')
const mydata = JSON.parse(raw)

const seenArray = []
const dataToReturn = []
for(var i=0; i < mydata.length; i++){
    if(mydata[i].Project != "" && mydata[i].Project != null && mydata[i].Door != "" && mydata[i].Door != null){
        console.log('Project: ' + mydata[i].Project.trim() + ' Unit: ' + mydata[i].Door.trim() + ' Location: ' + mydata[i].Location.trim() + ' Description: ' + mydata[i].Description.trim())
        if(seenArray.includes(mydata[i].Project)){
            const index = search(mydata[i].Project, dataToReturn)
            dataToReturn[index].units.push({
                unit: mydata[i].Door,
                location: mydata[i].Location,
                description: mydata[i].Description
            })
        } else {
            seenArray.push(mydata[i].Project)
            dataToReturn.push({
                project: mydata[i].Project,
                units:[]
            })
        }
    }
}

fs.writeFileSync('./adjusted.json', JSON.stringify(dataToReturn));
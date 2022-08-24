const fs = require('fs');

function shuffleArray(array){
    let copy = [];
    let n = array.length;

    while(n){
        i = Math.floor(Math.random() * array.length);

        if(i in array){
            copy.push(array[i]);
            delete array[i];
            n--
        }
    }

    return copy;
}

const images = fs.readdirSync(`./images`);
const shuffleImages = shuffleArray(images);

let i = 1;
shuffleImages.forEach( image => {
    // rename the image
    fs.renameSync(`./images${image}`, `./images/${i}.png`);
    i++

    // finds the json that relates to this image and renames it
    const JSONname = image.split('.')[0];
    fs.renameSync(`./jsons/${JSONname}.json`, `./jsons/${i}.json`);
})
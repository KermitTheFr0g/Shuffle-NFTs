const fs = require('fs');

function shuffleArray(array){
    let copy = [];
    let n = array.length;
    let i;

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

function removeHolderName(){
    return;
}

const images = fs.readdirSync(`./images`);
const shuffleImages = shuffleArray(images);

console.log(images);
console.log(shuffleImages)

let i = 1;
shuffleImages.forEach( image => {
    // rename the image
    fs.renameSync(`./images/${image}`, `./images/${i}-holder.png`);

    // finds the json that relates to this image and renames it
    const JSONname = image.split('.')[0];
    fs.renameSync(`./jsons/${JSONname}.json`, `./jsons/${i}-holder.json`);

    delete shuffleImages[`${i}-holder`];

    i++

    //let file = JSON.parse(fs.readFileSync(`./jsons/${i}-holder.json`));
    //file.edition = i;
    //file = JSON.stringify(file);
    //fs.writeFileSync(`./jsons/${i}-holder.json`, file, 'utf-8');
    //console.log(`${JSONname} -> ${i}`);
})
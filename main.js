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

const jsons = fs.readdirSync('./jsons');
const images = fs.readdirSync('./images');

const currentJsons = fs.readdirSync('./jsons');
const shuffledJsons = shuffleArray(jsons);

let i = 0;

try{
    fs.mkdirSync('./shuffledJsons');
    fs.mkdirSync('./shuffledImages');
} catch(err){
    console.error(err);
}

currentJsons.forEach( nft => {
    fs.renameSync(`./jsons/${nft}`, `./shuffledJsons/${shuffledJsons[i]}`);
    fs.renameSync(`./images/${nft.split('.')[0]}.png`, `./shuffledImages/${shuffledJsons[i].split('.')[0]}.png`);

    i++
    console.log(`Changed: ${nft} - ${shuffledJsons[i]}`);
})
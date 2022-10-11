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

fs.rmSync('./images');
fs.rmSync('./jsons');
fs.renameSync('./shuffledImages', './images');
fs.renameSync('./shuffledJsons', './jsons');


// put vars for description and ipfs to replace in jsons
const metaData = fs.readdirSync('./jsons');

const CollectionName = 'ENTER COLLECTION NAME';
const IPFS = 'ENTER IPFS'

metaData.forEach( nft => {
    let edition = nft.split('.')[0];
    let file = JSON.parse( fs.readFileSync(`./jsons/${nft}`));

    file.name = `${CollectionName} #${edition}`;
    file.image = `ipfs://${file.image.split('/')[1]}${IPFS}/${edition}.png`;
    file.edition = edition;
    fs.writeFileSync(`./jsons/${nft}`, JSON.stringify(file), null, '/t');
})
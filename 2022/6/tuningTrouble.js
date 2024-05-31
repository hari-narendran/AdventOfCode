const str= 'v';
const strArray = str.split('');
let packetSize = 4;

const toFindDuplicates = arry => arry.filter((item, index) => arry.indexOf(item) !== index);

for(let i=0;i<strArray.length;i++) {
    let start = i;
    let end = i+packetSize;
    let packet = strArray.slice(start,end);
    console.log('-- Packet ' +(i+1)+ ' --')
    console.log(packet);
    let duplicates = toFindDuplicates(packet);
    if(!duplicates.length){
        console.log(i+packetSize);
        //break;
    }-q
}

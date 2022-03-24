// installer la dépendance si besoin avec : npm install keccak256
const keccak256 = require('keccak256')

targetHash = "db81b4d58595fbbbb592d3661a34cdca14d7ab379441400cbfa1b78bc447c365"

function bruteforce() {
    for (let i = 0; i < 1000000; ++i) {
        hash = keccak256(i).toString("hex");;
        if (hash == targetHash) {
            console.log("Hash found ! i = " + i + " and hash = " + hash);
            return;
        }
        console.log(i + " : " + hash);
    }
}

bruteforce();
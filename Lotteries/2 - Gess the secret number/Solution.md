# Gess the secret number

## Intitulé 

[Url du challenge](https://capturetheether.com/challenges/lotteries/guess-the-secret-number/)

> Putting the answer in the code makes things a little too easy.
> This time I’ve only stored the hash of the number. Good luck reversing a cryptographic hash!

## Solution

Comme le challenge précédent, on doit proposer un nombre avec la fonction `guess`. Ici, le nombre est haché par la fonction `keccak256`. Il n'est pas possible de reverse une fonction de hachage, on peut soit bruteforce pour trouver le hash correspondant, soit utiliser une *rainbow table* si quelqu'un à déjà calculé ce hash.

On fait un petit script javascript qui va bruteforce le hash. On s'arrête après 1 000 000 de hash si on ne trouve pas la solution, on essayera une autre méthode.

```js
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
```

On lance le script et on trouve que pour i = 170, les hash correspondent. On appelle la fonction `guess` avec comme argument 170 et c'est bon !
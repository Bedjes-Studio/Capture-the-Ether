# Gess the random number

## Intitulé 

[Url du challenge](https://capturetheether.com/challenges/lotteries/guess-the-random-number/)

> This time the number is generated based on a couple fairly random sources.

## Solution

L'aléatoire n'existe pas dans les smart contracts et toutes les variables peuvent êtres identifiés. Lors de la création du contrat, la méthode suivante est appelée :

```solidity
function GuessTheRandomNumberChallenge() public payable {
        require(msg.value == 1 ether);
        answer = uint8(keccak256(block.blockhash(block.number - 1), now));
}
```

Elle initialise `answer` à `uint8(keccak256(block.blockhash(block.number - 1), now));`. Il est possible de retrouver la valeur de answer de 2 manière :
* regarder l'état des variables depuis un explorateur de blocs
* calculer la valeur de `answer` étant donné les informations de la transaction

La méthode la plus simple est de regarder l'état des variables. Déployer le contrat, dans Metamask, cliquer sur la transaction utiliée pour créer le contrat et faire "Afficher sur l’explorateur de blocs", ce qui nous ouvre (par défaut) la transaction sur l'explorateur de bloc [ropsten.etherscan.io](https://ropsten.etherscan.io).

Comme `answer` est la première variable du contrat, elle est stockée à l'adresse (ou dans le slot) 0 (0x0) et vaut initialement 0 (0x0).

Dans l'onglet "State" on peut voir l'évolution des variables suite à la transaction. On regarde pour notre contrat (l'identifier grâce à son addresse), une modification est faite à l'adresse 0x0, et passe de 0x0 à 0xf, c'est `answer`. En décimal, 0xf faut 15, donc la réponse est 15 !

On appelle la méthode `guess` avec comme argument 15 et c'est bon !
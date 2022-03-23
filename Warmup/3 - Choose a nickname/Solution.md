# Choose a nickname

## Intitulé 

[Url du challenge](https://capturetheether.com/challenges/warmup/nickname/)

> It’s time to set your Capture the Ether nickname! This nickname is how you’ll show up on the leaderboard.
>
> The CaptureTheEther smart contract keeps track of a nickname for every player. To complete this challenge, set your nickname to a non-empty string. The smart contract is running on the Ropsten test network at the address 0x71c46Ed333C35e4E6c62D32dc7C8F00D125b4fee.

## Solution

On doit appeler la fonction `setNickname` du smart contrat et passer en argument notre surnom.

Déployer le smart contract `NicknameChallenge` avec le bouton de la plateforme. Nous obtenons ensuite son adresse.

Comme pour le challenge précédent, on copie le code du contrat dans [Remix](https://remix.ethereum.org/) et on compile.

On récupère le contrat `CaptureTheEther` déployé (attention à bien choisir `CaptureTheEther` et non `NicknameChallenge`) avec son addresse : `0x71c46Ed333C35e4E6c62D32dc7C8F00D125b4fee`

L'argument de la fonction `setNickname` soit être de type `bytes32`. On souhaite passer un string pour que ce soit plus simple ! On crée donc un contrat très simple pour nous faire la conversion :

```solididy
contract easyConverter {
     bytes32 public nickname = bytes32("Bedjes");
}
```

On déploye le contrat et on accède ensuite la valeur de nickname, qui peut directement être passé en argument à la fonction `setNickname` et on valide le challenge !
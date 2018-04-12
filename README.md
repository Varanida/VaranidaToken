# Varanida Contract

## How to install

+ Install node https://github.com/creationix/nvm    

+ Install truffle https://github.com/trufflesuite/truffle

+ Install mocha https://mochajs.org/#installation

+ Install dependencies : `npm i`

+ Build Varanida contract : `npm run build`

+ Test the contract `npm run test`

+ Deploy the contract `truffle deploy --network truffle`

## Documentation

#### Varanida.sol
This is the main contract, it contains no functions but is the root of all sub-contracts.
You will find in it every constant for the initialization of each sub-contracts.

#### Ico.sol
This contract will be used for the ico.
It contains a limited amount of tokens to distribute to an unlimited amount of addresses.
Only the owner have access to the different functions.

+ `function allocateTokens(address _to, uint256 _amount) public onlyOwner returns (bool)`

This first function allocate a fixed amount of tokens to a fixed address.

+ `function allocateTokensBatch(address[] _to, uint256[] _amount) onlyOwner public returns (bool)`

This second function allocate N fixed amounts of tokens to N fixed addresses.
Not all the addresses will receive the same amount of tokens.
Before using this function, be sure that an address and the corresponding amount of token to distribute have the same index.

+ `function burnUndistributedTokens() public onlyOwner returns (bool)`

This last function will burn all the tokens wich were allocated for the ICO and haven't been distributed.

#### MintableToken.sol
This contract will be used for the airdrop.
It contains a limited amount of tokens to distribute to an unlimited amount of addresses.
Only the owner have access to the different functions.

+ `function mint(address _to, uint256 _amount) onlyOwner public returns (bool)`

This first function allocate a fixed amount of tokens to a fixed address.

+ `function mintBatch(address[] _to, uint256[] _amount) onlyOwner public returns (bool)`

This second function allocate N fixed amounts of tokens to N fixed addresses.
Not all the addresses will receive the same amount of tokens.
Before using this function, be sure that an address and the corresponding amount of token to distribute have the same index.

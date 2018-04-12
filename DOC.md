# Varanida Contract - Documentation

### Varanida.sol (is Ico, MintableToken & Vesting)
This is the main contract, it contains no functions but is the root of all sub-contracts.
You will find in it every constant for the initialization of each sub-contracts.

### Ico.sol
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

### MintableToken.sol
This contract will be used for the airdrop.
It contains a limited amount of tokens to distribute to an unlimited amount of addresses.
Only the owner have access to the different functions.

+ `function mint(address _to, uint256 _amount) onlyOwner public returns (bool)`

This first function allocate a fixed amount of tokens to a fixed address.

+ `function mintBatch(address[] _to, uint256[] _amount) onlyOwner public returns (bool)`

This second function allocate N fixed amounts of tokens to N fixed addresses.
Not all the addresses will receive the same amount of tokens.
Before using this function, be sure that an address and the corresponding amount of token to distribute have the same index.

### MultiOwnable.sol

This contract let the contract owner define a list of owners until the list is locked (fixed),
this list will be useful for some the __Reserve__ contract.

 + `function addOwner(address new_owner) onlyOwner canChangeOwners public`

 This function let the contract owner add a new owner to the list of owners.

 + `function removeOwner(address old_owner) onlyOwner canChangeOwners public`

 And this function let the contract owner remove one of the address from the list of owners.

 + `function fixOwners() onlyOwner canChangeOwners public returns (bool)`

This function lock the list of owners and the contract owner won't be able to change the list.
This is to prevent the fact that the contract owner can add some new addresses that have control on and control the result of a vote (_see next contract_).

### Reserve.sol (is MultiOwnable)

Takes in parameters:
```
uint256 _reserve_amount; // The amount allocated to the team and for advisors bonuses (see Vesting contract)
uint256 _majority_percentage; // The percentage of favorable votes to unlock tokens from a locked list of owners
uint256 _distribution_duration; // The amount of time wich will be required to withdraw all tokens from the reserve
```

This contract contains the 2 following functions:

 + `function reserveBalance() public view returns (uint256 balance)`

This function will allow everyone to look at the current balance of the reserve.

 + `function withdraw(address _address, uint256 _amount) cantChangeOwners onlyOwners public returns (bool)`

In this function, one of the owners from the list of __MultiOwnable__ contract can vote to withdraw a certain amount of tokens to an address X.
If more than _majority_percentage_ owners have the same vote (amount + address) the function try to process the transaction.
The transaction will fail if there is not enough tokens to distribute at the time of the call.

### Vesting.sol (is Reserve)

This contract will hold the tokens reserved to the Reserve contract, advisors, founders and tech team.
Advisors, founders and tech team will hold a fixed amount of tokens.
However, the advisors will have to wait a fixed amount of time after the contract deployment to get their bonuses.
Tech team and founders, won't have any bonuses,
and will have to wait a fixed amount of time,
and won't be able to withdraw all of their tokens until another further date.

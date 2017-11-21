pragma solidity ^0.4.17;

contract owned {
    address public owner;

    function owned() {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    function transferOwnership(address newOwner) onlyOwner {
        owner = newOwner;
    }
}

contract USIcoin is owned {

	string public name;
	string public symbol;
	uint8 public decimals;
	uint256 public totalSupply;

	/* This creates an array with all balances */
    mapping (address => uint256) public balanceOf;
    mapping (address => bool) public approvedAccounts;

    /* A function that approve accounts when owner permit that */ 
    event Approved(address target, bool status);
	event Transfer(address indexed from, address indexed to, uint256 value);

	/* Initializes contract with initial supply tokens to the creator of the contract */
    function USIcoin(uint256 initialSupply, string tokenName, string tokenSymbol, uint8 decimalUnits, address centralMinter) {
    	if(centralMinter != 0 ) owner = centralMinter;
    	totalSupply = initialSupply;
        balanceOf[msg.sender] = initialSupply;              // Give the creator all initial tokens
        name = tokenName;                                   // Set the name for display purposes
        symbol = tokenSymbol;                               // Set the symbol for display purposes
        decimals = decimalUnits;                            // Amount of decimals for display purposes
    }

    function transfer(address _to, uint256 _value) {
    	/* Check if sender is approved */
    	require(approvedAccounts[msg.sender]);
        /* Check if sender has balance and for overflows */
        require(balanceOf[msg.sender] >= _value);
    	require(balanceOf[_to] + _value >= balanceOf[_to]);

        /* Add and subtract new balances */
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        /* Notify anyone listening that this transfer took place */
        Transfer(msg.sender, _to, _value);
    }

    function mintToken(address target, uint256 mintedAmount) onlyOwner {
        balanceOf[target] += mintedAmount;
        totalSupply += mintedAmount;
        Transfer(0, owner, mintedAmount);
        Transfer(owner, target, mintedAmount);
    }
    
    function approveAccount(address target, bool status) onlyOwner{
    	approvedAccounts[target] = status;
    	Approved(target, status);
    }
    /* TODO: Add AUTOMATIC SELLING AND BUYING*/
}
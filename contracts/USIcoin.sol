pragma solidity ^0.4.17;

contract owned {
    address public owner;

    function owned() public {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    function transferOwnership(address newOwner) public onlyOwner {
        owner = newOwner;
    }
}


contract USIcoin is owned {

    string public name;
    string public symbol;
    uint8 public decimals;
    uint256 public price;
    uint256 public totalSupply;

    /* This creates an array with all balances */
    mapping (address => uint256) public balanceOf;
    mapping (address => bool) public authorizationStatus;
    //mapping (bytes32 => address) public email;

    /* A function that approve accounts when owner permit that */ 
    event Authorized(address target, bool status);
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Mint(address indexed from, address indexed to, uint256 value);
    event NewPrice(uint256 tokenPrice);
    //event EmailSet(address target);

    /* Initializes contract with initial supply tokens to the creator of the contract */
    function USIcoin(uint256 initialSupply, string tokenName, string tokenSymbol, 
                     uint8 decimalUnits, uint256 tokenPrice, address centralMinter) public {
        if (centralMinter != 0) owner = centralMinter;
        
        authorizeAccount(centralMinter, true);
        totalSupply = initialSupply;
        balanceOf[msg.sender] = initialSupply;              // Give the creator all initial tokens
        name = tokenName;                                   // Set the name 
        symbol = tokenSymbol;                               // Set the symbol
        decimals = decimalUnits; 
        setPrice(tokenPrice);    
    }
    
    function setPrice(uint256 tokenPrice) public onlyOwner {
        price = tokenPrice; //price in wei
        NewPrice(tokenPrice);
    }

    function buy() public payable returns (uint amount) {
        amount = msg.value / price; //wei                  
        require(balanceOf[owner] >= amount);               
        balanceOf[msg.sender] += amount;                  
        balanceOf[owner] -= amount;                        
        Transfer(this, msg.sender, amount);   
        return amount;           
    }


    function transfer(address _to, uint256 _value) public {
        /* Check if sender is Authorized */
        require(authorizationStatus[msg.sender]);
        /* Check if sender has balance and for overflows */
        require(balanceOf[msg.sender] >= _value);
        require(balanceOf[_to] + _value >= balanceOf[_to]);

        /* Add and subtract new balances */
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        /* Notify anyone listening that this transfer took place */
        Transfer(msg.sender, _to, _value);
    }

    function mintToken(address target, uint256 mintedAmount) public onlyOwner {
        balanceOf[target] += mintedAmount;
        totalSupply += mintedAmount;
        Mint(0, owner, mintedAmount);
        Mint(owner, target, mintedAmount);
    }
    
    function authorizeAccount(address target, bool status) public onlyOwner{
        authorizationStatus[target] = status;
        Authorized(target, status);
    }
/*
    function setEmail(bytes32 newEmail, address target) public {
        email[newEmail] = target;
        EmailSet(target);
    }
*/
}
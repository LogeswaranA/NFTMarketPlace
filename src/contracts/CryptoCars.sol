// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.8.0;
pragma abicoder v2;

// import ERC721 iterface
import "./ERC721.sol";

// CryptoCars smart contract inherits ERC721 interface
contract CryptoCars is ERC721 {
    // this contract's token collection name
    string public collectionName;
    // this contract's token symbol
    string public collectionNameSymbol;
    // total number of crypto cars minted
    uint256 public cryptoCarCounter;


    Royalties private _royalty;

    // define crypto car struct
    struct CryptoCar {
        uint256 tokenId;
        string tokenName;
        string tokenURI;
        address payable mintedBy;
        address payable currentOwner;
        address payable previousOwner;
        uint256 price;
        uint256 numberOfTransfers;
        bool forSale;
    }

    // map cryptocar's token id to crypto car
    mapping(uint256 => CryptoCar) public allCryptoCars;
    // check if token name exists
    mapping(string => bool) public tokenNameExists;
    // check if color exists
    mapping(string => bool) public colorExists;
    // check if token URI exists
    mapping(string => bool) public tokenURIExists;

    // initialize contract while deployment with contract's collection name and token
    constructor() payable ERC721("Crypto Cars Collection", "CK") {
        collectionName = name();
        collectionNameSymbol = symbol();
    }

    // Set royalty contract
    function setRoyaltyContract(address who) external {
        _royalty = Royalties(who);
    }

    // mint a new crypto car
    function mintCryptoCar(
        string memory _name,
        string memory _tokenURI,
        uint256 _price,
        string[] calldata _colors,
        address[] memory royaltyRecipients, 
        uint256[] memory royaltyValues
    ) external {
        // check if thic fucntion caller is not an zero address account
        require(
            msg.sender != address(0),
            "Caller must not be the zero address account"
        );

        require(
            royaltyRecipients.length == royaltyValues.length,
            'ERC721: Arrays length mismatch'
        );

        // increment counter
        cryptoCarCounter++;
        // check if a token exists with the above token id => incremented counter
        require(!_exists(cryptoCarCounter), "Token ID is already exists!");

        // loop through the colors passed and check if each colors already exists or not
        for (uint256 i = 0; i < _colors.length; i++) {
            require(!colorExists[_colors[i]], "Color code is Already Exists");
        }

        // check if the token URI already exists or not
        require(!tokenURIExists[_tokenURI], "TokenURI Already Exists");
        // check if the token name already exists or not
        require(!tokenNameExists[_name], "Token Name not exists");

        // mint the token
        _mint(msg.sender, cryptoCarCounter);

        _royalty.setTokenRoyalty(cryptoCarCounter, royaltyRecipients, royaltyValues);
                
        // set token URI (bind token id with the passed in token URI)
        _setTokenURI(cryptoCarCounter, _tokenURI);

        // loop through the colors passed and make each of the colors as exists since the token is already minted
        for (uint256 i = 0; i < _colors.length; i++) {
            colorExists[_colors[i]] = true;
        }
        // make passed token URI as exists
        tokenURIExists[_tokenURI] = true;
        // make token name passed as exists
        tokenNameExists[_name] = true;

        // creat a new crypto car (struct) and pass in new values
        CryptoCar memory newCryptoCar = CryptoCar(
            cryptoCarCounter,
            _name,
            _tokenURI,
            msg.sender,
            msg.sender,
            address(0),
            _price,
            0,
            true
        );
        // add the token id and it's crypto car to all crypto cars mapping
        allCryptoCars[cryptoCarCounter] = newCryptoCar;
    }

    // get owner of the token
    function getTokenOwner(uint256 _tokenId) public view returns (address) {
        address _tokenOwner = ownerOf(_tokenId);
        return _tokenOwner;
    }

    // get metadata of the token
    function getTokenMetaData(uint256 _tokenId)
        public
        view
        returns (string memory)
    {
        string memory tokenMetaData = tokenURI(_tokenId);
        return tokenMetaData;
    }

    // get total number of tokens minted so far
    function getNumberOfTokensMinted() public view returns (uint256) {
        uint256 totalNumberOfTokensMinted = totalSupply();
        return totalNumberOfTokensMinted;
    }

    // get total number of tokens owned by an address
    function getTotalNumberOfTokensOwnedByAnAddress(address _owner)
        public
        view
        returns (uint256)
    {
        uint256 totalNumberOfTokensOwned = balanceOf(_owner);
        return totalNumberOfTokensOwned;
    }

    // check if the token already exists
    function getTokenExists(uint256 _tokenId) public view returns (bool) {
        bool tokenExists = _exists(_tokenId);
        return tokenExists;
    }

    // by a token by passing in the token's id
    function buyToken(uint256 _tokenId) public payable {
        // check if the function caller is not an zero account address
        require(msg.sender != address(0));
        // check if the token id of the token being bought exists or not
        require(_exists(_tokenId));
        // get the token's owner
        address tokenOwner = ownerOf(_tokenId);
        // token's owner should not be an zero address account
        require(tokenOwner != address(0));
        // the one who wants to buy the token should not be the token's owner
        require(tokenOwner != msg.sender);
        // get that token from all crypto cars mapping and create a memory of it defined as (struct => CryptoCar)
        CryptoCar memory cryptocar = allCryptoCars[_tokenId];
        // price sent in to buy should be equal to or more than the token's price
        require(msg.value >= cryptocar.price);
        // token should be for sale
        require(cryptocar.forSale);
        // transfer the token from owner to the caller of the function (buyer)
        _transfer(tokenOwner, msg.sender, _tokenId);
        // get owner of the token
        address payable sendTo = cryptocar.currentOwner;
        // send token's worth of ethers to the owner
        sendTo.transfer(msg.value);
        // update the token's previous owner
        cryptocar.previousOwner = cryptocar.currentOwner;
        // update the token's current owner
        cryptocar.currentOwner = msg.sender;
        // update the how many times this token was transfered
        cryptocar.numberOfTransfers += 1;
        // set and update that token in the mapping
        allCryptoCars[_tokenId] = cryptocar;
    }

    function changeTokenPrice(uint256 _tokenId, uint256 _newPrice) public {
        // require caller of the function is not an empty address
        require(msg.sender != address(0));
        // require that token should exist
        require(_exists(_tokenId));
        // get the token's owner
        address tokenOwner = ownerOf(_tokenId);
        // check that token's owner should be equal to the caller of the function
        require(tokenOwner == msg.sender);
        // get that token from all crypto cars mapping and create a memory of it defined as (struct => CryptoCar)
        CryptoCar memory cryptocar = allCryptoCars[_tokenId];
        // update token's price with new price
        cryptocar.price = _newPrice;
        // set and update that token in the mapping
        allCryptoCars[_tokenId] = cryptocar;
    }

    // switch between set for sale and set not for sale
    function toggleForSale(uint256 _tokenId) public {
        // require caller of the function is not an empty address
        require(msg.sender != address(0));
        // require that token should exist
        require(_exists(_tokenId));
        // get the token's owner
        address tokenOwner = ownerOf(_tokenId);
        // check that token's owner should be equal to the caller of the function
        require(tokenOwner == msg.sender);
        // get that token from all crypto cars mapping and create a memory of it defined as (struct => CryptoCar)
        CryptoCar memory cryptocar = allCryptoCars[_tokenId];
        // if token's forSale is false make it true and vice versa
        if (cryptocar.forSale) {
            cryptocar.forSale = false;
        } else {
            cryptocar.forSale = true;
        }
        // set and update that token in the mapping
        allCryptoCars[_tokenId] = cryptocar;
    }



}

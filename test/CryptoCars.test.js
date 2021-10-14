const { assert } = require("chai");

const CryptoCars = artifacts.require("./CryptoCars.sol");

require("chai")
  .use(require("chai-as-promised"))
  .should();

contract("Crypto Cars", async (accounts) => {
  let cryptoCars, result, cryptoCarCount;

  before(async () => {
    cryptoCars = await CryptoCars.deployed();
  });

  describe("Deployment", async () => {
    it("contract has an address", async () => {
      const address = await cryptoCars.address;
      assert.notEqual(address, 0x0);
      assert.notEqual(address, "");
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });

    it("has a name", async () => {
      const name = await cryptoCars.collectionName();
      assert.equal(name, "Crypto Cars Collection");
    });

    it("has a symbol", async () => {
      const symbol = await cryptoCars.collectionNameSymbol();
      assert.equal(symbol, "CB");
    });
  });

  describe("application features", async () => {
    it("allows users to mint ERC721 token", async () => {
      cryptoCarCount = await cryptoCars.cryptoCarCounter();
      assert.equal(cryptoCarCount.toNumber(), 0);

      let tokenExists;
      tokenExists = await cryptoCars.getTokenExists(1, { from: accounts[0] });
      assert.equal(tokenExists, false);

      let tokenURIExists;
      tokenURIExists = await cryptoCars.tokenURIExists(
        "https://gateway.pinata.cloud/ipfs/QmYFmJgQGH4uPHRYN15Xdv4aLd9o4Aq63y1e4GgN6kj5aK/2",
        { from: accounts[0] }
      );
      assert.equal(tokenURIExists, false);

      let tokenNameExists;
      tokenNameExists = await cryptoCars.tokenNameExists("myCBNFT", {
        from: accounts[0],
      });
      assert.equal(tokenNameExists, false);

      let colorExists;
      const colorsArray1 = [
        "#2a2b2e",
        "#5a5a66",
        "#a4c2a8",
        "#aceb98",
        "#87ff65",
        "#995d81",
        "#eb8258",
        "#f6f740",
        "#d8dc6a",
        "#6689a1",
        "#fe938c",
        "#e6b89c",
        "#ead2ac",
        "#9cafb7",
        "#4281a4",
      ];
      for (let i = 0; i < colorsArray1.length; i++) {
        colorExists = await cryptoCars.colorExists(colorsArray1[i], {
          from: accounts[0],
        });
        assert.equal(colorExists, false);
      }

      result = await cryptoCars.mintCryptoCar(
        "myCBNFT",
        "https://gateway.pinata.cloud/ipfs/QmYFmJgQGH4uPHRYN15Xdv4aLd9o4Aq63y1e4GgN6kj5aK/2",
        web3.utils.toWei("1", "Ether"),
        colorsArray1,
        { from: accounts[0] }
      );

      cryptoCarCount = await cryptoCars.cryptoCarCounter();
      assert.equal(cryptoCarCount.toNumber(), 1);

      tokenExists = await cryptoCars.getTokenExists(1, { from: accounts[0] });
      assert.equal(tokenExists, true);

      tokenURIExists = await cryptoCars.tokenURIExists(
        "https://gateway.pinata.cloud/ipfs/QmYFmJgQGH4uPHRYN15Xdv4aLd9o4Aq63y1e4GgN6kj5aK/2",
        { from: accounts[0] }
      );
      assert.equal(tokenURIExists, true);

      tokenNameExists = await cryptoCars.tokenNameExists("myCBNFT", {
        from: accounts[0],
      });
      assert.equal(tokenNameExists, true);

      for (let i = 0; i < colorsArray1.length; i++) {
        colorExists = await cryptoCars.colorExists(colorsArray1[i], {
          from: accounts[0],
        });
        assert.equal(colorExists, true);
      }

      let cryptocar;
      cryptocar = await cryptoCars.allCryptoCars(1, {
        from: accounts[0],
      });
      assert.equal(cryptocar.tokenId.toNumber(), 1);
      assert.equal(cryptocar.tokenName, "myCBNFT");
      assert.equal(
        cryptocar.tokenURI,
        "https://gateway.pinata.cloud/ipfs/QmYFmJgQGH4uPHRYN15Xdv4aLd9o4Aq63y1e4GgN6kj5aK/2"
      );
      assert.equal(cryptocar.mintedBy, accounts[0]);
      assert.equal(cryptocar.currentOwner, accounts[0]);
      assert.equal(
        cryptocar.previousOwner,
        0x0000000000000000000000000000000000000000
      );
      assert.equal(web3.utils.fromWei(cryptocar.price, "ether"), 1);
      assert.equal(cryptocar.numberOfTransfers.toNumber(), 0);
      assert.equal(cryptocar.forSale, true);

      const colorsArray2 = [
        "#212b2e",
        "#515a66",
        "#a1c2a8",
        "#a1eb98",
        "#81ff65",
        "#915d81",
        "#e18258",
        "#f1f740",
        "#d1dc6a",
        "#6189a1",
        "#f1938c",
        "#e1b89c",
        "#e1d2ac",
        "#91afb7",
        "#4181a4",
      ];

      await cryptoCars.mintCryptoCar(
        "myCBNFT2",
        "https://gateway.pinata.cloud/ipfs/QmYFmJgQGH4uPQRYN15Xdv4aLd9o4Aq63y1e4GgN6kj5aK/2",
        web3.utils.toWei("1", "Ether"),
        colorsArray2,
        { from: accounts[1] }
      );

      const colorsArray3 = [
        "#232b2e",
        "#535a66",
        "#a3c2a8",
        "#a3eb98",
        "#83ff65",
        "#935d81",
        "#e38258",
        "#f3f740",
        "#d3dc6a",
        "#6389a1",
        "#f3938c",
        "#e3b89c",
        "#e3d2ac",
        "#93afb7",
        "#4381a4",
      ];

      // same token uri -reject
      await cryptoCars.mintCryptoCar(
        "myCBNFT3",
        "https://gateway.pinata.cloud/ipfs/QmYFmJgQGH4uPQRYN15Xdv4aLd9o4Aq63y1e4GgN6kj5aK/2",
        web3.utils.toWei("1", "Ether"),
        colorsArray3,
        { from: accounts[3] }
      ).should.be.rejected;

      const colorsArray4 = [
        "#252b2e",
        "#555a66",
        "#a5c2a8",
        "#a5eb98",
        "#85ff65",
        "#955d81",
        "#e58258",
        "#f5f740",
        "#d5dc6a",
        "#6589a1",
        "#f5938c",
        "#e5b89c",
        "#e5d2ac",
        "#95afb7",
        "#4581a4",
      ];

      // 0x0 adress sending txn - reject
      await cryptoCars.mintCryptoCar(
        "myCBNFT4",
        "https://gateway.pinata.cloud/ipfs/QmYFmJgQGH4uPQRYN14Xdv4aLd9o4Aq63y1e4GgN6kj5aK/2",
        web3.utils.toWei("1", "Ether"),
        colorsArray4,
        { from: 0x0000000000000000000000000000000000000000 }
      ).should.be.rejected;

      const colorsArray5 = [
        "#2d2b2e",
        "#5d5a66",
        "#adc2a8",
        "#adeb98",
        "#8dff65",
        "#9d5d81",
        "#ed8258",
        "#fdf740",
        "#dddc6a",
        "#6d89a1",
        "#fd938c",
        "#edb89c",
        "#edd2ac",
        "#9dafb7",
        "#4d81a4",
      ];

      await cryptoCars.mintCryptoCar(
        "myCBNFT5",
        "https://gateway.pinata.cloud/ipfs/QmYFmJgQGH4uPRRYN15Xdv4aLd9o4Aq63y1e4GgN6kj5aK/2",
        web3.utils.toWei("1", "Ether"),
        colorsArray5,
        { from: accounts[0] }
      );

      const colorsArray6 = [
        "#2f2b2e",
        "#5f5a66",
        "#afc2a8",
        "#afeb98",
        "#8fff65",
        "#9f5d81",
        "#ef8258",
        "#fff740",
        "#dfdc6a",
        "#6f89a1",
        "#ff938c",
        "#efb89c",
        "#efd2ac",
        "#9fafb7",
        "#4f81a4",
      ];

      await cryptoCars.mintCryptoCar(
        "myCBNFT6",
        "https://gateway.pinata.cloud/ipfs/QmYFmJgQGH4uPSRYN15Xdv4aLd9o4Aq63y1e4GgN6kj5aK/2",
        web3.utils.toWei("1", "Ether"),
        colorsArray6,
        { from: accounts[0] }
      );

      const colorsArray7 = [
        "#2a2b22",
        "#5a5a62",
        "#a4c2a2",
        "#aceb92",
        "#87ff62",
        "#995d82",
        "#eb8252",
        "#f6f742",
        "#d8dc62",
        "#6689a2",
        "#fe9382",
        "#e6b892",
        "#ead2a2",
        "#9cafb2",
        "#4281a2",
      ];

      // same token name - reject
      await cryptoCars.mintCryptoCar(
        "myCBNFT6",
        "https://gateway.pinata.cloud/ipfs/QmYFmJgQGH4uPSRYN15Xdv4aLd3o4Aq63y1e4GgN6kj5aK/2",
        web3.utils.toWei("1", "Ether"),
        colorsArray7,
        { from: accounts[0] }
      ).should.be.rejected;

      const colorsArray8 = [
        "#2a242e",
        "#5a5466",
        "#a4c4a8",
        "#ace498",
        "#87f465",
        "#995481",
        "#eb8458",
        "#f6f440",
        "#d8d46a",
        "#6684a1",
        "#fe948c",
        "#e6b49c",
        "#f6f740",
        "#9ca4b7",
        "#4284a4",
      ];

      // same color/colors - reject (13th value of array8 is same as 8th value of array1)
      await cryptoCars.mintCryptoCar(
        "myCBNFT8",
        "https://gateway.pinata.cloud/ipfs/QmYFmJgQGH4uPSRYN15Xdv4aLd3o4Bq46y1f4GgN6kj5aK/2",
        web3.utils.toWei("1", "Ether"),
        colorsArray8,
        { from: accounts[0] }
      ).should.be.rejected;
    });

    it("returns address of the token's owner", async () => {
      const tokenOwner = await cryptoCars.getTokenOwner(2);
      assert.equal(tokenOwner, accounts[1]);
    });

    // returns tokenURI of the token
    it("returns metadata of a token", async () => {
      const tokenMetaData = await cryptoCars.getTokenMetaData(2);
      assert.equal(
        tokenMetaData,
        "https://gateway.pinata.cloud/ipfs/QmYFmJgQGH4uPQRYN15Xdv4aLd9o4Aq63y1e4GgN6kj5aK/2"
      );
    });

    it("returns total number of tokens minted so far", async () => {
      const totalNumberOfTokensMinted = await cryptoCars.getNumberOfTokensMinted();
      assert.equal(totalNumberOfTokensMinted.toNumber(), 4);
    });

    it("returns total number of tokens owned by an address", async () => {
      const totalNumberOfTokensOwnedByAnAddress = await cryptoCars.getTotalNumberOfTokensOwnedByAnAddress(
        accounts[0]
      );
      assert.equal(totalNumberOfTokensOwnedByAnAddress.toNumber(), 3);
    });

    it("allows users to buy token for specified ethers", async () => {
      const oldTokenOwner = await cryptoCars.getTokenOwner(1);
      assert.equal(oldTokenOwner, accounts[0]);

      let oldTokenOwnerBalance;
      oldTokenOwnerBalance = await web3.eth.getBalance(accounts[0]);
      oldTokenOwnerBalance = new web3.utils.BN(oldTokenOwnerBalance);

      let oldTotalNumberOfTokensOwnedBySeller;
      oldTotalNumberOfTokensOwnedBySeller = await cryptoCars.getTotalNumberOfTokensOwnedByAnAddress(
        accounts[0]
      );
      assert.equal(oldTotalNumberOfTokensOwnedBySeller.toNumber(), 3);

      let cryptoCar;
      cryptoCar = await cryptoCars.allCryptoCars(1, {
        from: accounts[0],
      });
      assert.equal(cryptoCar.numberOfTransfers.toNumber(), 0);

      result = await cryptoCars.buyToken(1, {
        from: accounts[2],
        value: web3.utils.toWei("1", "Ether"),
      });

      const newTokenOwner = await cryptoCars.getTokenOwner(1);
      assert.equal(newTokenOwner, accounts[2]);

      let newTokenOwnerBalance;
      newTokenOwnerBalance = await web3.eth.getBalance(accounts[0]);
      newTokenOwnerBalance = new web3.utils.BN(newTokenOwnerBalance);

      let newTotalNumberOfTokensOwnedBySeller;
      newTotalNumberOfTokensOwnedBySeller = await cryptoCars.getTotalNumberOfTokensOwnedByAnAddress(
        accounts[0]
      );
      assert.equal(newTotalNumberOfTokensOwnedBySeller.toNumber(), 2);

      cryptoCar = await cryptoCars.allCryptoCars(1, {
        from: accounts[0],
      });
      assert.equal(cryptoCar.numberOfTransfers.toNumber(), 1);

      let price;
      price = web3.utils.toWei("1", "Ether");
      price = new web3.utils.BN(price);

      const exepectedBalance = oldTokenOwnerBalance.add(price);
      assert.equal(
        newTokenOwnerBalance.toString(),
        exepectedBalance.toString()
      );

      cryptoCar = await cryptoCars.allCryptoCars(1, {
        from: accounts[0],
      });
      assert.equal(cryptoCar.currentOwner, accounts[2]);

      await cryptoCars.buyToken(2, {
        from: 0x0000000000000000000000000000000000000000,
        value: web3.utils.toWei("1", "Ether"),
      }).should.be.rejected;

      await cryptoCars.buyToken(56, {
        from: accounts[4],
        value: web3.utils.toWei("1", "Ether"),
      }).should.be.rejected;

      await cryptoCars.buyToken(3, {
        from: accounts[0],
        value: web3.utils.toWei("1", "Ether"),
      }).should.be.rejected;
    });

    it("allows users to change token price", async () => {
      let cryptoCarPrice;
      cryptoCarPrice = await cryptoCars.allCryptoCars(1, {
        from: accounts[0],
      });
      assert.equal(web3.utils.fromWei(cryptoCarPrice.price, "ether"), 1);

      result = await cryptoCars.changeTokenPrice(
        1,
        web3.utils.toWei("2", "Ether"),
        {
          from: accounts[2],
        }
      );

      cryptoCarPrice = await cryptoCars.allCryptoCars(1, {
        from: accounts[0],
      });
      assert.equal(web3.utils.fromWei(cryptoCarPrice.price, "ether"), 2);

      await cryptoCars.changeTokenPrice(1, web3.utils.toWei("3", "Ether"), {
        from: 0x0000000000000000000000000000000000000000,
      }).should.be.rejected;

      await cryptoCars.changeTokenPrice(82, web3.utils.toWei("3", "Ether"), {
        from: accounts[2],
      }).should.be.rejected;

      await cryptoCars.changeTokenPrice(1, web3.utils.toWei("3", "Ether"), {
        from: accounts[6],
      }).should.be.rejected;
    });

    it("allows users to toggle between setting the token for sale or not for sale", async () => {
      let cryptocar;
      cryptocar = await cryptoCars.allCryptoCars(1, {
        from: accounts[0],
      });
      assert.equal(cryptocar.forSale, true);

      result = await cryptoCars.toggleForSale(1, { from: accounts[2] });

      cryptocar = await cryptoCars.allCryptoCars(1, {
        from: accounts[0],
      });
      assert.equal(cryptocar.forSale, false);

      result = await cryptoCars.toggleForSale(1, { from: accounts[2] });

      cryptocar = await cryptoCars.allCryptoCars(1, {
        from: accounts[0],
      });
      assert.equal(cryptocar.forSale, true);

      await cryptoCars.toggleForSale(1, {
        from: 0x0000000000000000000000000000000000000000,
      }).should.be.rejected;

      await cryptoCars.toggleForSale(94, { from: accounts[2] }).should.be
        .rejected;

      await cryptoCars.toggleForSale(1, { from: accounts[8] }).should.be
        .rejected;
    });
  });
});

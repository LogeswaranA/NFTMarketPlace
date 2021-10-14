import React, { Component } from "react";
import { HashRouter, Route } from "react-router-dom";
import "./App.css";
import Web3 from "web3";
import CryptoCars from "../abis/CryptoCars.json";

import FormAndPreview from "../components/FormAndPreview/FormAndPreview";
import AllCryptoCars from "./AllCryptoCars/AllCryptoCars";
import AccountDetails from "./AccountDetails/AccountDetails";
import ContractNotDeployed from "./ContractNotDeployed/ContractNotDeployed";
import ConnectToMetamask from "./ConnectMetamask/ConnectToMetamask";
import Loading from "./Loading/Loading";
import Navbar from "./Navbar/Navbar";
import MyCryptoCars from "./MyCryptoCars/MyCryptoCars";
import Queries from "./Queries/Queries";

const ipfsClient = require("ipfs-http-client");
const ipfs = ipfsClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountAddress: "",
      accountBalance: "",
      cryptoCarsContract: null,
      cryptoCarsCount: 0,
      cryptoCars: [],
      loading: true,
      metamaskConnected: false,
      contractDetected: false,
      totalTokensMinted: 0,
      totalTokensOwnedByAccount: 0,
      nameIsUsed: false,
      colorIsUsed: false,
      colorsUsed: [],
      lastMintTime: null,
    };
  }

  componentWillMount = async () => {
    await this.loadWeb3();
    await this.loadBlockchainData();
    await this.setMetaData();
    await this.setMintBtnTimer();
  };

  setMintBtnTimer = () => {
    const mintBtn = document.getElementById("mintBtn");
    if (mintBtn !== undefined && mintBtn !== null) {
      this.setState({
        lastMintTime: localStorage.getItem(this.state.accountAddress),
      });
      (mintBtn.innerHTML = "Mint My Crypto Car")
      // this.state.lastMintTime === undefined || this.state.lastMintTime === null
      //   ? (mintBtn.innerHTML = "Mint My Crypto Car")
      //   : this.checkIfCanMint(parseInt(this.state.lastMintTime));
    }
  };

  checkIfCanMint = (lastMintTime) => {
    const mintBtn = document.getElementById("mintBtn");
    const timeGap = 300000; //5min in milliseconds
    const countDownTime = lastMintTime + timeGap;
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = countDownTime - now;
      if (diff < 0) {
        mintBtn.removeAttribute("disabled");
        mintBtn.innerHTML = "Mint My Crypto Car";
        localStorage.removeItem(this.state.accountAddress);
        clearInterval(interval);
      } else {
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        mintBtn.setAttribute("disabled", true);
        mintBtn.innerHTML = `Next mint in ${minutes}m ${seconds}s`;
      }
    }, 1000);
  };

  loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  loadBlockchainData = async () => {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    if (accounts.length === 0) {
      this.setState({ metamaskConnected: false });
    } else {
      this.setState({ metamaskConnected: true });
      this.setState({ loading: true });
      this.setState({ accountAddress: accounts[0] });
      let accountBalance = await web3.eth.getBalance(accounts[0]);
      accountBalance = web3.utils.fromWei(accountBalance, "Ether");
      this.setState({ accountBalance });
      this.setState({ loading: false });
      const networkId = await web3.eth.net.getId();
      const networkData = CryptoCars.networks[networkId];
      if (networkData) {
        this.setState({ loading: true });
        const cryptoCarsContract = web3.eth.Contract(
          CryptoCars.abi,
          networkData.address
        );
        this.setState({ cryptoCarsContract });
        this.setState({ contractDetected: true });
        const cryptoCarsCount = await cryptoCarsContract.methods
          .cryptoCarCounter()
          .call();
        this.setState({ cryptoCarsCount });
        for (var i = 1; i <= cryptoCarsCount; i++) {
          const cryptoCar = await cryptoCarsContract.methods
            .allCryptoCars(i)
            .call();
          this.setState({
            cryptoCars: [...this.state.cryptoCars, cryptoCar],
          });
        }
        let totalTokensMinted = await cryptoCarsContract.methods
          .getNumberOfTokensMinted()
          .call();
        totalTokensMinted = totalTokensMinted.toNumber();
        this.setState({ totalTokensMinted });
        let totalTokensOwnedByAccount = await cryptoCarsContract.methods
          .getTotalNumberOfTokensOwnedByAnAddress(this.state.accountAddress)
          .call();
        totalTokensOwnedByAccount = totalTokensOwnedByAccount.toNumber();
        this.setState({ totalTokensOwnedByAccount });
        this.setState({ loading: false });
      } else {
        this.setState({ contractDetected: false });
      }
    }
  };

  connectToMetamask = async () => {
    await window.ethereum.enable();
    this.setState({ metamaskConnected: true });
    window.location.reload();
  };

  setMetaData = async () => {
    if (this.state.cryptoCars.length !== 0) {
      this.state.cryptoCars.map(async (cryptocar) => {
        const result = await fetch(cryptocar.tokenURI);
        const metaData = await result.json();
        this.setState({
          cryptoCars: this.state.cryptoCars.map((cryptocar) =>
            cryptocar.tokenId.toNumber() === Number(metaData.tokenId)
              ? {
                ...cryptocar,
                metaData,
              }
              : cryptocar
          ),
        });
      });
    }
  };

  mintMyNFT = async (colors, name, tokenPrice) => {
    this.setState({ loading: true });
    const colorsArray = Object.values(colors);
    let colorsUsed = [];
    for (let i = 0; i < colorsArray.length; i++) {
      if (colorsArray[i] !== "") {
        let colorIsUsed = await this.state.cryptoCarsContract.methods
          .colorExists(colorsArray[i])
          .call();
        if (colorIsUsed) {
          colorsUsed = [...colorsUsed, colorsArray[i]];
        } else {
          continue;
        }
      }
    }
    console.log("colorsUsed",colorsUsed)

    const nameIsUsed = await this.state.cryptoCarsContract.methods
      .tokenNameExists(name)
      .call();
    
      console.log("nameIsUsed",nameIsUsed)

    if (colorsUsed.length === 0 && !nameIsUsed) {
      const {
        //new object
        wheelBackgroundColor,
        wheelBorderColor,
        wheelTopColor,
        wheelDotColor,
        doorColor,
        doorKnobColor,
        carTop1Color,
        carTop2Color,
        window1Color,
        window2Color,
        windowBorderColor,
        carTop2BorderColor
      } = colors;
      let previousTokenId;
      previousTokenId = await this.state.cryptoCarsContract.methods
        .cryptoCarCounter()
        .call();
      previousTokenId = previousTokenId.toNumber();
      const tokenId = previousTokenId + 1;
      const tokenObject = {
        tokenName: "Crypto Car",
        tokenSymbol: "CK",
        tokenId: `${tokenId}`,
        name: name,
        metaData: {
          type: "color",
          colors: {
            //testing
            wheelBackgroundColor,
            wheelBorderColor,
            wheelTopColor,
            wheelDotColor,
            doorColor,
            doorKnobColor,
            carTop1Color,
            carTop2Color,
            window1Color,
            window2Color,
            windowBorderColor,
            carTop2BorderColor
          },
        },
      };
      console.log("name",name)

      console.log("metdata",tokenObject)
      const cid = await ipfs.add(JSON.stringify(tokenObject));
      let tokenURI = `https://ipfs.infura.io/ipfs/${cid.path}`;
      console.log("tokenURI",tokenURI)

      const price = window.web3.utils.toWei(tokenPrice.toString(), "Ether");
      console.log("colorsArray",colorsArray)

      this.state.cryptoCarsContract.methods
        .mintCryptoCar(name, tokenURI, price, colorsArray)
        .send({ from: this.state.accountAddress })
        .on("confirmation", () => {
          localStorage.setItem(this.state.accountAddress, new Date().getTime());
          this.setState({ loading: false });
          window.location.reload();
        });
    } else {
      if (nameIsUsed) {
        this.setState({ nameIsUsed: true });
        this.setState({ loading: false });
      } else if (colorsUsed.length !== 0) {
        this.setState({ colorIsUsed: true });
        this.setState({ colorsUsed });
        this.setState({ loading: false });
      }
    }
  };

  toggleForSale = (tokenId) => {
    this.setState({ loading: true });
    this.state.cryptoCarsContract.methods
      .toggleForSale(tokenId)
      .send({ from: this.state.accountAddress })
      .on("confirmation", () => {
        this.setState({ loading: false });
        window.location.reload();
      });
  };

  changeTokenPrice = (tokenId, newPrice) => {
    this.setState({ loading: true });
    const newTokenPrice = window.web3.utils.toWei(newPrice, "Ether");
    this.state.cryptoCarsContract.methods
      .changeTokenPrice(tokenId, newTokenPrice)
      .send({ from: this.state.accountAddress })
      .on("confirmation", () => {
        this.setState({ loading: false });
        window.location.reload();
      });
  };

  buyCryptoCar = (tokenId, price) => {
    this.setState({ loading: true });
    this.state.cryptoCarsContract.methods
      .buyToken(tokenId)
      .send({ from: this.state.accountAddress, value: price })
      .on("confirmation", () => {
        this.setState({ loading: false });
        window.location.reload();
      });
  };

  render() {
    return (
      <div className="container-fluid">
        {!this.state.metamaskConnected ? (
          <ConnectToMetamask connectToMetamask={this.connectToMetamask} />
        ) : !this.state.contractDetected ? (
          <ContractNotDeployed />
        ) : this.state.loading ? (
          <Loading />
        ) : (
          <>
            <HashRouter basename="/">
              <Navbar />
              <Route
                path="/"
                exact
                render={() => (
                  <AccountDetails
                    accountAddress={this.state.accountAddress}
                    accountBalance={this.state.accountBalance}
                  />
                )}
              />
              <Route
                path="/mint"
                render={() => (
                  <FormAndPreview
                    mintMyNFT={this.mintMyNFT}
                    nameIsUsed={this.state.nameIsUsed}
                    colorIsUsed={this.state.colorIsUsed}
                    colorsUsed={this.state.colorsUsed}
                    setMintBtnTimer={this.setMintBtnTimer}
                  />
                )}
              />
              <Route
                path="/marketplace"
                render={() => (
                  <AllCryptoCars
                    accountAddress={this.state.accountAddress}
                    cryptoCars={this.state.cryptoCars}
                    totalTokensMinted={this.state.totalTokensMinted}
                    changeTokenPrice={this.changeTokenPrice}
                    toggleForSale={this.toggleForSale}
                    buyCryptoCar={this.buyCryptoCar}
                  />
                )}
              />
              <Route
                path="/my-tokens"
                render={() => (
                  <MyCryptoCars
                    accountAddress={this.state.accountAddress}
                    cryptoCars={this.state.cryptoCars}
                    totalTokensOwnedByAccount={
                      this.state.totalTokensOwnedByAccount
                    }
                  />
                )}
              />
              <Route
                path="/queries"
                render={() => (
                  <Queries cryptoCarsContract={this.state.cryptoCarsContract} />
                )}
              />
            </HashRouter>
          </>
        )}
      </div>
    );
  }
}

export default App;

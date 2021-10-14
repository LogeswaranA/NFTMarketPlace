import React, { Component } from "react";

class CryptoCarNFTDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newCryptoCarPrice: "",
    };
  }

  callChangeTokenPriceFromApp = (tokenId, newPrice) => {
    this.props.changeTokenPrice(tokenId, newPrice);
  };

  render() {
    return (
      <div key={this.props.cryptocar.tokenId.toNumber()} className="mt-4">
        <p>
          <span className="font-weight-bold">Token Id</span> :{" "}
          {this.props.cryptocar.tokenId.toNumber()}
        </p>
        <p>
          <span className="font-weight-bold">Name</span> :{" "}
          {this.props.cryptocar.tokenName}
        </p>
        <p>
          <span className="font-weight-bold">Minted By</span> :{" "}
          {this.props.cryptocar.mintedBy.substr(0, 5) +
            "..." +
            this.props.cryptocar.mintedBy.slice(
              this.props.cryptocar.mintedBy.length - 5
            )}
        </p>
        <p>
          <span className="font-weight-bold">Owned By</span> :{" "}
          {this.props.cryptocar.currentOwner.substr(0, 5) +
            "..." +
            this.props.cryptocar.currentOwner.slice(
              this.props.cryptocar.currentOwner.length - 5
            )}
        </p>
        <p>
          <span className="font-weight-bold">Previous Owner</span> :{" "}
          {this.props.cryptocar.previousOwner.substr(0, 5) +
            "..." +
            this.props.cryptocar.previousOwner.slice(
              this.props.cryptocar.previousOwner.length - 5
            )}
        </p>
        <p>
          <span className="font-weight-bold">Price</span> :{" "}
          {window.web3.utils.fromWei(
            this.props.cryptocar.price.toString(),
            "Ether"
          )}{" "}
          Ξ
        </p>
        <p>
          <span className="font-weight-bold">No. of Transfers</span> :{" "}
          {this.props.cryptocar.numberOfTransfers.toNumber()}
        </p>
        <div>
          {this.props.accountAddress === this.props.cryptocar.currentOwner ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                this.callChangeTokenPriceFromApp(
                  this.props.cryptocar.tokenId.toNumber(),
                  this.state.newCryptoCarPrice
                );
              }}
            >
              <div className="form-group mt-4 ">
                <label htmlFor="newCryptoCarPrice">
                  <span className="font-weight-bold">Change Token Price</span> :
                </label>{" "}
                <input
                  required
                  type="number"
                  name="newCryptoCarPrice"
                  id="newCryptoCarPrice"
                  value={this.state.newCryptoCarPrice}
                  className="form-control w-50"
                  placeholder="Enter new price"
                  onChange={(e) =>
                    this.setState({
                      newCryptoCarPrice: e.target.value,
                    })
                  }
                />
              </div>
              <button
                type="submit"
                style={{ fontSize: "0.8rem", letterSpacing: "0.14rem" }}
                className="btn btn-outline-info mt-0 w-50"
              >
                change price
              </button>
            </form>
          ) : null}
        </div>
        <div>
          {this.props.accountAddress === this.props.cryptocar.currentOwner ? (
            this.props.cryptocar.forSale ? (
              <button
                className="btn btn-outline-danger mt-4 w-50"
                style={{ fontSize: "0.8rem", letterSpacing: "0.14rem" }}
                onClick={() =>
                  this.props.toggleForSale(
                    this.props.cryptocar.tokenId.toNumber()
                  )
                }
              >
                Remove from sale
              </button>
            ) : (
              <button
                className="btn btn-outline-success mt-4 w-50"
                style={{ fontSize: "0.8rem", letterSpacing: "0.14rem" }}
                onClick={() =>
                  this.props.toggleForSale(
                    this.props.cryptocar.tokenId.toNumber()
                  )
                }
              >
                Keep for sale
              </button>
            )
          ) : null}
        </div>
        <div>
          {this.props.accountAddress !== this.props.cryptocar.currentOwner ? (
            this.props.cryptocar.forSale ? (
              <button
                className="btn btn-outline-primary mt-3 w-50"
                value={this.props.cryptocar.price}
                style={{ fontSize: "0.8rem", letterSpacing: "0.14rem" }}
                onClick={(e) =>
                  this.props.buyCryptoCar(
                    this.props.cryptocar.tokenId.toNumber(),
                    e.target.value
                  )
                }
              >
                Buy For{" "}
                {window.web3.utils.fromWei(
                  this.props.cryptocar.price.toString(),
                  "Ether"
                )}{" "}
                Ξ
              </button>
            ) : (
              <>
                <button
                  disabled
                  style={{ fontSize: "0.8rem", letterSpacing: "0.14rem" }}
                  className="btn btn-outline-primary mt-3 w-50"
                >
                  Buy For{" "}
                  {window.web3.utils.fromWei(
                    this.props.cryptocar.price.toString(),
                    "Ether"
                  )}{" "}
                  Ξ
                </button>
                <p className="mt-2">Currently not for sale!</p>
              </>
            )
          ) : null}
        </div>
      </div>
    );
  }
}

export default CryptoCarNFTDetails;

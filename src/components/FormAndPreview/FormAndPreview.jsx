import React, { Component } from "react";
import CryptoCarNFTImage from "../CryptoCarNFTImage/CryptoCarNFTImage";

class FormAndPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userSelectedColors: [
        {
          //new object style
          wheelBackgroundColor:"",
          wheelBorderColor:"",
          wheelTopColor:"",
          wheelDotColor:"",
          doorColor:"",
          doorKnobColor:"",
          carTop1Color:"",
          carTop2Color:"",
          window1Color:"",
          window2Color:"",
          windowBorderColor:"",
          carTop2BorderColor:""
        },
      ],
      cryptoCarName: "",
      cryptoCarPrice: "",
    };
  }

  componentDidMount = async () => {
    await this.props.setMintBtnTimer();
  };

  callMintMyNFTFromApp = (e) => {
    e.preventDefault();
    this.props.mintMyNFT(
      this.state.userSelectedColors[0],
      this.state.cryptoCarName,
      this.state.cryptoCarPrice
    );
  };

  render() {
    return (
      <div>
        <div className="card mt-1">
          <div className="card-body align-items-center d-flex justify-content-center">
            <h5>Color Your Own Car As You Want It To be!</h5>
          </div>
        </div>
        <form onSubmit={this.callMintMyNFTFromApp} className="pt-4 mt-1">
          <div className="row">
            <div className="col-md-3">
            <div className="form-group">
                <label htmlFor="wheelBackgroundColor">Wheel  Background Color</label>
                <input
                  required
                  type="color"
                  name="wheelBackgroundColor"
                  id="wheelBackgroundColor"
                  value={this.state.userSelectedColors[0].wheelBackgroundColor}
                  className="form-control"
                  onChange={(e) =>
                    this.setState({
                      userSelectedColors: [
                        {
                          ...this.state.userSelectedColors[0],
                          wheelBackgroundColor: e.target.value,
                        },
                      ],
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="wheelBorderColor">Wheel  Border Color</label>
                <input
                  required
                  type="color"
                  name="wheelBorderColor"
                  id="wheelBorderColor"
                  value={this.state.userSelectedColors[0].wheelBorderColor}
                  className="form-control"
                  onChange={(e) =>
                    this.setState({
                      userSelectedColors: [
                        {
                          ...this.state.userSelectedColors[0],
                          wheelBorderColor: e.target.value,
                        },
                      ],
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="wheelTopColor">
                  Wheel Top Color
                </label>
                <input
                  required
                  type="color"
                  name="wheelTopColor"
                  id="wheelTopColor"
                  value={this.state.userSelectedColors[0].wheelTopColor}
                  className="form-control"
                  onChange={(e) =>
                    this.setState({
                      userSelectedColors: [
                        {
                          ...this.state.userSelectedColors[0],
                          wheelTopColor: e.target.value,
                        },
                      ],
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="headBorderColor">Wheel Dot Color</label>
                <input
                  required
                  type="color"
                  name="wheelDotColor"
                  id="wheelDotColor"
                  value={this.state.userSelectedColors[0].wheelDotColor}
                  className="form-control"
                  onChange={(e) =>
                    this.setState({
                      userSelectedColors: [
                        {
                          ...this.state.userSelectedColors[0],
                          wheelDotColor: e.target.value,
                        },
                      ],
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="doorColor">
                  Door Color
                </label>
                <input
                  required
                  type="color"
                  name="doorColor"
                  id="doorColor"
                  value={this.state.userSelectedColors[0].doorColor}
                  className="form-control"
                  onChange={(e) =>
                    this.setState({
                      userSelectedColors: [
                        {
                          ...this.state.userSelectedColors[0],
                          doorColor: e.target.value,
                        },
                      ],
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="doorKnobColor">
                 Door Knob Color
                </label>
                <input
                  required
                  type="color"
                  name="doorKnobColor"
                  id="doorKnobColor"
                  value={this.state.userSelectedColors[0].doorKnobColor}
                  className="form-control"
                  onChange={(e) =>
                    this.setState({
                      userSelectedColors: [
                        {
                          ...this.state.userSelectedColors[0],
                          doorKnobColor: e.target.value,
                        },
                      ],
                    })
                  }
                />
              </div>
            </div>
            <div className="col-md-3">
              
              <div className="form-group">
                <label htmlFor="carTop1Color">
                  Car Top 1 Color
                </label>
                <input
                  required
                  type="color"
                  name="carTop1Color"
                  id="carTop1Color"
                  value={this.state.userSelectedColors[0].carTop1Color}
                  className="form-control"
                  onChange={(e) =>
                    this.setState({
                      userSelectedColors: [
                        {
                          ...this.state.userSelectedColors[0],
                          carTop1Color: e.target.value,
                        },
                      ],
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="carTop2Color">
                Car Top 2 Color
                </label>
                <input
                  required
                  type="color"
                  name="carTop2Color"
                  id="carTop2Color"
                  value={
                    this.state.userSelectedColors[0].carTop2Color
                  }
                  className="form-control"
                  onChange={(e) =>
                    this.setState({
                      userSelectedColors: [
                        {
                          ...this.state.userSelectedColors[0],
                          carTop2Color: e.target.value,
                        },
                      ],
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="carTop2BorderColor">
                Car Top 2  Border Color
                </label>
                <input
                  required
                  type="color"
                  name="carTop2BorderColor"
                  id="carTop2BorderColor"
                  value={
                    this.state.userSelectedColors[0].carTop2BorderColor
                  }
                  className="form-control"
                  onChange={(e) =>
                    this.setState({
                      userSelectedColors: [
                        {
                          ...this.state.userSelectedColors[0],
                          carTop2BorderColor: e.target.value,
                        },
                      ],
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="window1Color">
                  Window 1 Color
                </label>
                <input
                  required
                  type="color"
                  name="window1Color"
                  id="window1Color"
                  value={
                    this.state.userSelectedColors[0].window1Color
                  }
                  className="form-control"
                  onChange={(e) =>
                    this.setState({
                      userSelectedColors: [
                        {
                          ...this.state.userSelectedColors[0],
                          window1Color: e.target.value,
                        },
                      ],
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="window2Color">
                 Window 2 Color
                </label>
                <input
                  required
                  type="color"
                  name="window2Color"
                  id="window2Color"
                  value={
                    this.state.userSelectedColors[0].window2Color
                  }
                  className="form-control"
                  onChange={(e) =>
                    this.setState({
                      userSelectedColors: [
                        {
                          ...this.state.userSelectedColors[0],
                          window2Color: e.target.value,
                        },
                      ],
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="windowBorderColor">
                 Window Border Color
                </label>
                <input
                  required
                  type="color"
                  name="windowBorderColor"
                  id="windowBorderColor"
                  value={
                    this.state.userSelectedColors[0].windowBorderColor
                  }
                  className="form-control"
                  onChange={(e) =>
                    this.setState({
                      userSelectedColors: [
                        {
                          ...this.state.userSelectedColors[0],
                          windowBorderColor: e.target.value,
                        },
                      ],
                    })
                  }
                />
              </div>
            </div>
            <div className="col-md-6 d-flex justify-content-center align-items-center">
              <CryptoCarNFTImage colors={this.state.userSelectedColors[0]} />
            </div>
          </div>
          <div className="row">
           
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="cryptoCarName">Name</label>
                <input
                  required
                  type="text"
                  value={this.state.cryptoCarName}
                  className="form-control"
                  placeholder="Enter Your Crypto Car's Name"
                  onChange={(e) =>
                    this.setState({ cryptoCarName: e.target.value })
                  }
                />
              </div>
              <div>
                <label htmlFor="price">Price</label>
                <input
                  required
                  type="number"
                  name="price"
                  id="cryptoCarPrice"
                  value={this.state.cryptoCarPrice}
                  className="form-control"
                  placeholder="Enter Price In Ξ"
                  onChange={(e) =>
                    this.setState({ cryptoCarPrice: e.target.value })
                  }
                />
              </div>
              <button
                id="mintBtn"
                style={{ fontSize: "0.9rem", letterSpacing: "0.14rem" }}
                type="submit"
                className="btn mt-4 btn-block btn-outline-primary"
              >
                Mint My Crypto Car
              </button>
              <div className="mt-4">
                {this.props.nameIsUsed ? (
                  <div className="alert alert-danger alert-dissmissible">
                    <button
                      type="button"
                      className="close"
                      data-dismiss="alert"
                    >
                      <span>&times;</span>
                    </button>
                    <strong>This name is taken!</strong>
                  </div>
                ) : this.props.colorIsUsed ? (
                  <>
                    <div className="alert alert-danger alert-dissmissible">
                      <button
                        type="button"
                        className="close"
                        data-dismiss="alert"
                      >
                        <span>&times;</span>
                      </button>
                      {this.props.colorsUsed.length > 1 ? (
                        <strong>These colors are taken!</strong>
                      ) : (
                        <strong>This color is taken!</strong>
                      )}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        marginTop: "1rem",
                        marginBottom: "3rem",
                      }}
                    >
                      {this.props.colorsUsed.map((color, index) => (
                        <div
                          key={index}
                          style={{
                            background: `${color}`,
                            width: "50%",
                            height: "50px",
                          }}
                        ></div>
                      ))}
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default FormAndPreview;

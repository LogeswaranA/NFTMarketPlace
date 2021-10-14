import React, { useState, useEffect } from "react";
import CryptoCarNFTImage from "../CryptoCarNFTImage/CryptoCarNFTImage";
import MyCryptoCarNFTDetails from "../MyCryptoCarNFTDetails/MyCryptoCarNFTDetails";
import Loading from "../Loading/Loading";

const MyCryptoCars = ({
  accountAddress,
  cryptoCars,
  totalTokensOwnedByAccount,
}) => {
  const [loading, setLoading] = useState(false);
  const [myCryptoCars, setMyCryptoCars] = useState([]);

  useEffect(() => {
    if (cryptoCars.length !== 0) {
      if (cryptoCars[0].metaData !== undefined) {
        setLoading(loading);
      } else {
        setLoading(false);
      }
    }
    const my_crypto_cars = cryptoCars.filter(
      (cryptocar) => cryptocar.currentOwner === accountAddress
    );
    setMyCryptoCars(my_crypto_cars);
  }, [cryptoCars]);

  return (
    <div>
      <div className="card mt-1">
        <div className="card-body align-items-center d-flex justify-content-center">
          <h5>
            Total No. of CryptoCar's You Own : {totalTokensOwnedByAccount}
          </h5>
        </div>
      </div>
      <div className="d-flex flex-wrap mb-2">
        {myCryptoCars.map((cryptocar) => {
          return (
            <div
              key={cryptocar.tokenId.toNumber()}
              className="w-50 p-4 mt-1 border"
            >
              <div className="row">
                <div className="col-md-6">
                  {!loading ? (
                    <CryptoCarNFTImage
                      colors={
                        cryptocar.metaData !== undefined
                          ? cryptocar.metaData.metaData.colors
                          : ""
                      }
                    />
                  ) : (
                    <Loading />
                  )}
                </div>
                <div className="col-md-6 text-center">
                  <MyCryptoCarNFTDetails
                    cryptocar={cryptocar}
                    accountAddress={accountAddress}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyCryptoCars;

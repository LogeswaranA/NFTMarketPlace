import React, { useState, useEffect } from "react";
import CryptoCarNFTImage from "../CryptoCarNFTImage/CryptoCarNFTImage";
import CryptoCarNFTDetails from "../CryptoCarNFTDetails/CryptoCarNFTDetails";
import Loading from "../Loading/Loading";

const AllCryptoCars = ({
  cryptoCars,
  accountAddress,
  totalTokensMinted,
  changeTokenPrice,
  toggleForSale,
  buyCryptoCar,
}) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (cryptoCars.length !== 0) {
      if (cryptoCars[0].metaData !== undefined) {
        setLoading(loading);
      } else {
        setLoading(false);
      }
    }
  }, [cryptoCars]);

  return (
    <div>
      <div className="card mt-1">
        <div className="card-body align-items-center d-flex justify-content-center">
          <h5>
            Total No. of CryptoCar's Minted On The Platform :{" "}
            {totalTokensMinted}
          </h5>
        </div>
      </div>
      <div className="d-flex flex-wrap mb-2">
        {cryptoCars.map((cryptocar) => {
          return (
            <div
              key={cryptocar.tokenId.toNumber()}
              className="w-33 p-4 mt-1 border"
            >
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
              <CryptoCarNFTDetails
                cryptocar={cryptocar}
                accountAddress={accountAddress}
                changeTokenPrice={changeTokenPrice}
                toggleForSale={toggleForSale}
                buyCryptoCar={buyCryptoCar}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllCryptoCars;

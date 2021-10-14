import React from "react";

const CryptoCarNFTImage = ({ colors }) => {
  const {
    cardBorderColor,
    cardBackgroundColor,
    headBorderColor,
    headBackgroundColor,
    leftEyeBorderColor,
    rightEyeBorderColor,
    leftEyeBackgroundColor,
    rightEyeBackgroundColor,
    leftPupilBackgroundColor,
    rightPupilBackgroundColor,
    mouthColor,
    neckBackgroundColor,
    neckBorderColor,
    bodyBackgroundColor,
    bodyBorderColor,
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

  const dotColor={
    backgroundColor:wheelDotColor
  }


  return (
    <div className="car-container">
    <div className="car-top1" style={{backgroundColor: `${carTop1Color}`}}>
      <div className="window1" style={{backgroundColor: `${window1Color}`,border: `9px solid ${windowBorderColor}`}}/>
      <div className="window2" style={{backgroundColor: `${window2Color}`,border: `9px solid ${windowBorderColor}`}}/>
    </div>
    <div className="car-top2" style={{backgroundColor: `${carTop2Color}`,border: `10px solid ${carTop2BorderColor}`}}>
      <div className="door" style={{border: `3px solid ${doorColor}`}}>
        <div className="door-knob" style={{backgroundColor: `${doorKnobColor}`}}/>
      </div>
    </div>
    <div className="car-bottom">
      <div className="wheel1-top" style={{
         boxShadow: `0px 13px 3px 0px  ${wheelTopColor}`,
      }}/>
      <div className="wheel1" style={{
         backgroundColor: `${wheelBackgroundColor}`,
        border: `20px solid ${wheelBorderColor}`

      }}>
        <div className="wheel-dot1" style={dotColor}/>
        <div className="wheel-dot2" style={dotColor}/>
        <div className="wheel-dot3" style={dotColor}/>
        <div className="wheel-dot4" style={dotColor}/>
      </div>

      <div className="wheel2-top" style={{
         boxShadow: `0px 13px 3px 0px  ${wheelTopColor}`,
      }}/>

      <div className="wheel2" style={{
         backgroundColor: `${wheelBackgroundColor}`,
        border: `20px solid ${wheelBorderColor}`

      }}>
        <div className="wheel-dot1" style={dotColor}/>
        <div className="wheel-dot2" style={dotColor}/>
        <div className="wheel-dot3" style={dotColor}/>
        <div className="wheel-dot4" style={dotColor}/>
      </div>
    </div>
  </div>
  );
};

export default CryptoCarNFTImage;

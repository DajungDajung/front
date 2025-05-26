import styled from "styled-components";
import useKakaoMap from "../../hooks/useKakaoMap";
import point from "../../assets/pointer.svg"
import { useState } from "react";

function Map() {
  const [pointer, _setPointer] = useState(point)
  const { roadAddress, address } = useKakaoMap('map', { lat: 33.4507, lng: 126.5707 });
  
  const handleCloseWindow = () => {
    window.close()
  }

  return (
    <MapStyle>
      <div id="map">
        <img className="pointer" src={pointer} alt="pointer" />
      </div>
      <div className="address-container">
        <h2 className="text-2xl">약속 장소</h2>
        <div className="detail-address">
          <p>지번 주소: {address}</p>
          <p>{!!roadAddress ? `도로명 주소: ${roadAddress}` : ``}</p>
          <div className="flex justify-between">
            <div className="w-5/6">
              <label htmlFor="daddress">상세 설명: </label>
              <input className="w-[100vw]" type="text" id="daddress" placeholder="ex) 편의점 앞 등" />
            </div>
            <button className="confirm-btn" onClick={handleCloseWindow}>확정</button>
          </div>
        </div>
      </div>
    </MapStyle>
  );
}
const MapStyle = styled.div` 
  #map{
    position: relative;
    border: 1px solid rgba(100,100,100,0.4);
    border-radius: 10px;
    width: 95vw;
    height: 70vh;
  }
  .pointer{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -30px);
    pointer-events: none;
    height : 30px;
    z-index: 30;
  }

  .address-container {
    background-color:#FFEDFA;
    margin-top: 16px;
    align-items: center;
    border: 1px solid rgba(0,0,0,0.2);
    border-radius: 10px;
    overflow: hidden;
    height: 170px;
    h2{
      padding: 10px 8px;
      margin:0;
      background-color: #FFB8E0;
      overflow: hidden;
    }
  }

  .detail-address{
    margin: 20px 8px;
    p{
      height: 16px;
      margin-bottom: 10px;
    }
    input{
      padding: 0 8px;
      width: 60vw;
      height: 30px;
      border: 1px solid rgba(0,0,0,0.2);
      border-radius: 10px;
      background-color: white;
    }
    button{
      min-width: 80px;
      height: 30px;
      border-radius: 10px;
      border-color: rgba(0,0,0,0.2);
      background-color: #BE5985;
      color: #fff;
    }
    button:hover{
      background-color: #Ec7FA9;
      color: #fff;
    }
  }
`;

export default Map;
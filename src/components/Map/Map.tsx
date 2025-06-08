import styled from 'styled-components';
import useKakaoMap from '../../hooks/useKakaoMap';
import point from '../../assets/pointer.svg';
import { useEffect, useState } from 'react';
import { Coordination } from '../../types/location.model';

function Map() {
  const [pointer, _setPointer] = useState(point);
  const [latitude, setLatitude] = useState(33.4507);
  const [longitude, setLongitude] = useState(126.5707);
  const { mapRef, center, roadAddress, address } = useKakaoMap({
    containerId: 'map',
    initialCenter: { lat: latitude, lng: longitude },
  });

  useEffect(() => {
    navigator.geolocation?.getCurrentPosition((pos) => {
      const { latitude: lat, longitude: lng } = pos.coords;
      setLatitude(lat);
      setLongitude(lng);
    });
  }, [mapRef]);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setCenter(
        new window.kakao.maps.LatLng(latitude, longitude),
      );
    }
  }, [latitude, longitude, mapRef]);

  const handleCloseWindow = () => {
    const detailAddress = document.getElementById(
      'daddress',
    ) as HTMLInputElement;
    const throwAddress = detailAddress.value;
    if (!throwAddress) {
      alert('상세 설명을 입력해주세요.');
      return;
    }
    window.opener?.postMessage(
      {
        title: throwAddress,
        address: address,
        coords: center,
      },
      window.origin,
    );
    window.close();
  };

  return (
    <MapStyle>
      <div id="map">
        <img className="pointer" src={pointer} alt="pointer" />
      </div>
      <div className="address-container">
        <h2 className="text-2xl">약속 장소</h2>
        <div className="detail-address">
          <p>지번 주소: {address}</p>
          <p>{roadAddress ? `도로명 주소: ${roadAddress}` : ''}</p>
          <div className="flex justify-between">
            <div className="w-5/6">
              <label htmlFor="daddress">상세 설명: </label>
              <input type="text" id="daddress" placeholder="ex) 편의점 앞 등" />
            </div>
            <button className="confirm-btn" onClick={handleCloseWindow}>
              확정
            </button>
          </div>
        </div>
      </div>
    </MapStyle>
  );
}
const MapStyle = styled.div`
  padding: 2.5vw;
  #map {
    position: relative;
    border: 1px solid rgba(100, 100, 100, 0.4);
    border-radius: 10px;
    width: 95vw;
    height: 70vh;
  }
  .pointer {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -30px);
    pointer-events: none;
    height: 30px;
    z-index: 30;
  }

  .address-container {
    background-color: #ffedfa;
    margin-top: 16px;
    align-items: center;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    overflow: hidden;
    height: 170px;
    h2 {
      padding: 10px 8px;
      margin: 0;
      background-color: #ffb8e0;
      overflow: hidden;
    }
  }

  .detail-address {
    margin: 20px 8px;
    p {
      height: 16px;
      margin-bottom: 10px;
    }
    input {
      padding: 0 8px;
      width: 60vw;
      height: 30px;
      border: 1px solid rgba(0, 0, 0, 0.2);
      border-radius: 10px;
      background-color: white;
    }
    button {
      min-width: 80px;
      height: 30px;
      border-radius: 10px;
      border-color: rgba(0, 0, 0, 0.2);
      background-color: #be5985;
      color: #fff;
    }
    button:hover {
      background-color: #ec7fa9;
      color: #fff;
    }
  }
`;

export default Map;

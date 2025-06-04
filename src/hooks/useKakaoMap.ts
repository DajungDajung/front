import { useRef, useState, useEffect } from 'react';

interface Props {
  containerId: string;
  initialCenter: { lat: number; lng: number };
  options?: {
    disableUI?: boolean;
    fixedMap?: boolean;
  };
}

function useKakaoMap({ containerId, initialCenter, options }: Props) {
  const mapRef = useRef<any | null>(null);
  const [center, setCenter] = useState(initialCenter);
  const [roadAddress, setRoadAddress] = useState<string>('');
  const [address, setAddress] = useState<string>('');

  useEffect(() => {
    const { disableUI = false, fixedMap = false } = options || {};
    const container = document.getElementById(containerId);

    if (fixedMap) {
      const staticMapOption = {
        center: new window.kakao.maps.LatLng(center.lat, center.lng),
        level: 3,
      };
      // 나중에 백엔드와 붙이면 삭제예정
      const geocoder = new window.kakao.maps.services.Geocoder();
      const callback = function (result: any, status: any) {
        if (status === window.kakao.maps.services.Status.OK) {
          setAddress(result[0].address.address_name);
        }
      };

      geocoder.coord2Address(center.lng, center.lat, callback);
      new window.kakao.maps.StaticMap(container, staticMapOption);
      return;
    }

    if (!mapRef.current) {
      const mapOptions = {
        center: new window.kakao.maps.LatLng(center.lat, center.lng),
        level: 3,
      };
      const map = new window.kakao.maps.Map(container, mapOptions);

      if (!disableUI) {
        const mapTypeControl = new window.kakao.maps.MapTypeControl();
        const zoomControl = new window.kakao.maps.ZoomControl();
        map.addControl(
          mapTypeControl,
          window.kakao.maps.ControlPosition.TOPRIGHT,
        );
        map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);
      }

      mapRef.current = map;
    }

    const geocoder = new window.kakao.maps.services.Geocoder();

    function searchDetailAddrFromCoords(coords: any, callback: any) {
      geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
    }

    function onCenterChanged() {
      const coord = mapRef.current.getCenter();
      setCenter({ lat: coord.getLat(), lng: coord.getLng() });
      searchDetailAddrFromCoords(coord, (result: any, state: any) => {
        if (state === window.kakao.maps.services.Status.OK) {
          if (result[0]?.road_address) {
            setRoadAddress(result[0]?.road_address.address_name);
          } else {
            setRoadAddress('');
            setAddress(result[0]?.address.address_name);
          }
        }
      });
    }

    window.kakao.maps.event.addListener(
      mapRef.current,
      'center_changed',
      onCenterChanged,
    );

    return () => {
      window.kakao.maps.event.removeListener(
        mapRef.current,
        'center_changed',
        onCenterChanged,
      );
    };
  }, [containerId, center, options]);

  return { mapRef, center, roadAddress, address };
}

export default useKakaoMap;

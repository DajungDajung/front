import { useRef, useState, useEffect } from 'react';

function useKakaoMap(
  containerId: string,
  initialCenter: { lat: number; lng: number },
) {
  const mapRef = useRef<any>(null);
  const [center, setCenter] = useState(initialCenter);
  const [roadAddress, setRoadAddress] = useState<string>('');
  const [address, setAddress] = useState<string>('');

  useEffect(() => {
    if (!mapRef.current) {
      const container = document.getElementById(containerId);
      const options = {
        center: new window.kakao.maps.LatLng(center.lat, center.lng),
        level: 3,
      };

      const map = new window.kakao.maps.Map(container, options);

      const mapTypeControl = new window.kakao.maps.MapTypeControl();
      const zoomControl = new window.kakao.maps.ZoomControl();

      map.addControl(
        mapTypeControl,
        window.kakao.maps.ControlPosition.TOPRIGHT,
      );
      map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

      mapRef.current = map;
    }

    const geocoder = new window.kakao.maps.services.Geocoder();

    function searchDetailAddrFromCoords(coords: any, callback: any) {
      geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
    }

    function onCenterChanged() {
      const coord = mapRef.current.getCenter();
      setCenter({ lat: coord.getLat(), lng: coord.getLng() });
      searchDetailAddrFromCoords(
        mapRef.current.getCenter(),
        (result: any, state: any) => {
          if (state === window.kakao.maps.services.Status.OK) {
            if (result[0]?.road_address) {
              setRoadAddress(result[0]?.road_address.address_name);
            } else {
              setRoadAddress('');
              setAddress(result[0]?.address.address_name);
            }
          }
        },
      );
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
  }, [containerId, center]);

  return { mapRef, center, roadAddress, address };
}

export default useKakaoMap;

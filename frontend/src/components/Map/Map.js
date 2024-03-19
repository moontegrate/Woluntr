// Стилистические импорты
import './map.scss';
import { PiNavigationArrowBold } from "react-icons/pi";

// Прочие библиотеки
import { load } from '@2gis/mapgl';

// Хуки
import { useEffect, useState } from 'react';

const Map = () => {
    const [map, setMap] = useState(null);
    // eslint-disable-next-line
    const [currentLocationMarker, setCurrentLocationMarker] = useState(null);
    const [zoom, setZoom] = useState(10);

    const getUserLocation = () => {
        return new Promise((resolve, reject) => {
            if ('geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        resolve([position.coords.longitude, position.coords.latitude]);
                    },
                    (error) => {
                        reject(error);
                    }
                );
            } else {
                reject(new Error('Geolocation is not supported by your browser'));
            };
        });
    };

    useEffect(() => {
        let mapInstance = null;
        let markerInstance = null;

        const loadMap = async () => {
            try {
                const mapglAPI = await load();
                const coordinates = await getUserLocation();
                const [longitude, latitude] = coordinates;

                mapInstance = new mapglAPI.Map('map-wrapper', {
                    key: '8aa9d22a-14aa-408d-bbdd-faa892eb1d05',
                    center: [longitude, latitude],
                    zoom: 10,
                    zoomControl: false
                });
                setMap(mapInstance);

                markerInstance = new mapglAPI.Marker(mapInstance, {
                    coordinates: [longitude, latitude],
                    icon: 'http://localhost:3000/user-marker.svg',
                    size: [30, 30]
                });
                setCurrentLocationMarker(markerInstance);
            } catch (error) {
                console.error('Error loading map:', error);
            }
        };

        loadMap();

        return () => {
            if (mapInstance) {
                mapInstance.destroy(); // Уничтожаем карту
            }
            if (markerInstance) {
                markerInstance.destroy(); // Уничтожаем маркер
            }
        };
        // eslint-disable-next-line
    }, []);

    return <div className='map'>
        <div id="map-wrapper" style={{ 'height': window.innerHeight}}>
        </div>
        <div className='map-controls'>
            <div className='zoom-control'>
                <div className='zoom-in' onClick={() => {
                    map.setZoom(zoom + 1);
                    setZoom(zoom + 1)
                }}>+</div>
                <div className='zoom-out' onClick={() => {
                    map.setZoom(zoom - 1);
                    setZoom(zoom - 1)
                }}>-</div>
            </div>
            <div className='current-location' onClick={() => {
                getUserLocation().then((coordinates) => {
                    map.setCenter(coordinates);
                    if (currentLocationMarker) {
                        currentLocationMarker.setCoordinates(coordinates);
                    };
                });
            }}>
                <PiNavigationArrowBold/>
            </div>
        </div>
    </div>
};

export default Map;
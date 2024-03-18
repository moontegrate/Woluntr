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
    const [marker, setMarker] = useState(null);
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
        load().then((mapglAPI) => {
            getUserLocation().then((coordinates) => {
                const [longitude, latitude] = coordinates;

                const map = new mapglAPI.Map('map-wrapper', {
                    key: '8aa9d22a-14aa-408d-bbdd-faa892eb1d05',
                    center: [longitude, latitude],
                    zoom: 10,
                    zoomControl: false
                });
                setMap(map);

                const marker = new mapglAPI.Marker(map, {
                    coordinates: [longitude, latitude],
                    icon: 'http://localhost:3000/user-marker.svg',
                    size: [30, 30]
                });
                setMarker(marker);
            })
            .catch(() => {
                const map = new mapglAPI.Map('map-wrapper', {
                    key: '8aa9d22a-14aa-408d-bbdd-faa892eb1d05',
                    center: [71.43, 51.12],
                    zoom: 10,
                    zoomControl: false
                });
                setMap(map);
            });

            
        });
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
                });
            }}>
                <PiNavigationArrowBold/>
            </div>
        </div>
    </div>
};

export default Map;
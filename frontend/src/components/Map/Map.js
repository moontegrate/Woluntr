// Style imports
import './map.scss';
import { PiNavigationArrowBold } from "react-icons/pi";

// Libs
import { load } from '@2gis/mapgl';

// Hooks
import { useEffect, useState } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentLocation } from './mapSlice';
import { setOrders } from '../App/ordersSlice';

export const _key = '8aa9d22a-14aa-408d-bbdd-faa892eb1d05'

const Map = () => {
    const dispatch = useDispatch();

    const orders = useSelector((state) => state.orders.orders);

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

    if (orders) {
        orders.forEach((order) => {
            console.log(order)
            if (order.latitude && order.longitude) {
                // new map.Marker()
            }
        });
    };

    useEffect(() => {
        let mapInstance = null;
        let markerInstance = null;

        const loadMap = async () => {
            load()
            .then((mapglAPI) => {
                try {
                    mapInstance = new mapglAPI.Map('map-wrapper', {
                        key: _key,
                        center: [71.43, 51.12],
                        zoom: 10,
                        zoomControl: false
                    });
                    setMap(mapInstance);
                } catch (error) {
                    console.error('Error loading map:', error);
                };

                getUserLocation()
                .then((coordinates) => {
                    const [longitude, latitude] = coordinates;
                    markerInstance = new mapglAPI.Marker(mapInstance, {
                        coordinates: [longitude, latitude],
                        icon: 'http://localhost:3000/user-marker.svg',
                        size: [30, 30]
                    });
                    mapInstance.setCenter(coordinates);
                    mapInstance.setZoom(15);
                    dispatch(setCurrentLocation(coordinates));
                    setCurrentLocationMarker(markerInstance);
                }).catch((e) => console.error(e));
            })
            .catch((e) => console.log(e));
        };

        loadMap();

        return () => {
            if (mapInstance) {
                mapInstance.destroy();
            }
            if (markerInstance) {
                markerInstance.destroy();
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
                getUserLocation()
                .then((coordinates) => {
                    map.setCenter(coordinates);
                    map.setZoom(15);
                    dispatch(setCurrentLocation(coordinates));
                    if (currentLocationMarker) {
                        currentLocationMarker.setCoordinates(coordinates);
                    };
                })
                .catch((e) => console.error(e));
            }}>
                <PiNavigationArrowBold/>
            </div>
        </div>
    </div>
};

export default Map;
// Style imports
import './map.scss';
import { PiNavigationArrowBold } from "react-icons/pi";

// Hooks
import { useEffect, useState } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentLocation, incZoom, decZoom, setCenter, setZoom } from './mapSlice';
import { setOrders } from '../App/ordersSlice';

// http
import { _host } from '../../services/http';

import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';

// export const _key = '8aa9d22a-14aa-408d-bbdd-faa892eb1d05'
export const _key = '14b576e3-d478-4a07-b8c7-d498fc77a0f2'

const MainMap = () => {
    const dispatch = useDispatch();

    const orders = useSelector((state) => state.orders.orders);
    const zoom = useSelector((state) => state.map.zoom);
    const center = useSelector((state) => state.map.center);
    const currentLocation = useSelector((state) => state.map.currentLocation);

    const getUserLocation = () => {
        return new Promise((resolve, reject) => {
            if ('geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        resolve([position.coords.latitude, position.coords.longitude]);
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
        getUserLocation()
        .then((coordinates) => {
            dispatch(setCenter(coordinates));
            dispatch(setZoom(15));
            dispatch(setCurrentLocation(coordinates));
        }).catch((e) => {
            console.error(e);
            dispatch(setCurrentLocation(null));
        });
    });

    return (
        <div id='map-wrapper'>
            <YMaps>
                <Map state={{ center: center, zoom: zoom }} height='100vh' width='100vw'>
                    {currentLocation ? <Placemark geometry={currentLocation} options={{
                        iconLayout: 'default#image',
                        iconImageHref: 'https://cdn.lovattro.kz/woluntr/user-marker.svg',
                        iconImageSize: [30, 30],
                        // iconImageOffset: [-15, -30] 
                    }}/> : null}
                </Map>
            </YMaps>
            <div className='map-controls'>
                <div className='zoom-control'>
                    <div className='zoom-in' onClick={() => dispatch(incZoom())}>+</div>
                    <div className='zoom-out' onClick={() => dispatch(decZoom())}>-</div>
                </div>
                <div className='current-location' onClick={() => {
                    getUserLocation()
                        .then((coordinates) => {
                            dispatch(setCenter(coordinates));
                            dispatch(setZoom(15));
                            dispatch(setCurrentLocation(coordinates));
                            // if (currentLocationMarker) {
                            //     currentLocationMarker.setCoordinates(coordinates);
                            // };
                        })
                        .catch((e) => console.error(e));
                }}>
                    <PiNavigationArrowBold />
                </div>
            </div>
        </div>
    );
};

export default MainMap;
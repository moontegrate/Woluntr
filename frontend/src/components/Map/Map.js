// Style imports
import './map.scss';
import { PiNavigationArrowBold } from "react-icons/pi";

// Hooks
import { useEffect, useState } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentLocation } from './mapSlice';
import { setOrders } from '../App/ordersSlice';

// http
import { _host } from '../../services/http';

import { YMaps, Map, Placemark, ZoomControl } from '@pbe/react-yandex-maps';

// export const _key = '8aa9d22a-14aa-408d-bbdd-faa892eb1d05'
export const _key = 'fake'

const MainMap = () => {
    const dispatch = useDispatch();

    const orders = useSelector((state) => state.orders.orders);

    const defaultState = {
        center: [51.12, 71.43],
        zoom: 9,
        controls: []
    };

    return (
        <div id='map-wrapper'>
            <YMaps>
                <Map defaultState={defaultState} height='100vh' width='100vw'>
                    <Placemark geometry={[55.684758, 37.738521]} />
                    <ZoomControl options={{ position: {top: 300, right: 20}}} />
                </Map>
            </YMaps>
        </div>
    );
};

export default MainMap;
// Стилистические импорты
import './map.scss';

// Прочие библиотеки
import { load } from '@2gis/mapgl';

// Хуки
import { useEffect, useState } from 'react';

const Map = () => {
    const [map, setMap] = useState(null);
    const [zoom, setZoom] = useState(10);

    useEffect(() => {
        load().then((mapglAPI) => {
            // eslint-disable-next-line
            const map = new mapglAPI.Map('map-wrapper', {
                key: '8aa9d22a-14aa-408d-bbdd-faa892eb1d05',
                center: [71.43, 51.12],
                zoom: 10,
                zoomControl: false
            });
    
            setMap(map);
        });
        // eslint-disable-next-line
    }, []);

    return <div className='map'>
        <div id="map-wrapper" style={{ 'height': '100vh'}}>
        </div>
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
    </div>
};

export default Map;
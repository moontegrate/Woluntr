// Стилистические импорты
import './map.scss';

// Прочие библиотеки
import { load } from '@2gis/mapgl';

const Map = () => {
    load().then((mapglAPI) => {
        // eslint-disable-next-line
        const map = new mapglAPI.Map('map-wrapper', {
            key: '8aa9d22a-14aa-408d-bbdd-faa892eb1d05',
            center: [71.43, 51.12],
            zoom: 10,
            zoomControl: 'centerRight'
        });
    });

    return <div id="map-wrapper" style={{ 'height': '100vh'}}/>
};

export default Map;
// Стилистические импорты
import './App.scss';

// Вспомогательные компоненты
import Header from '../Header/Header';
import AppMode from '../AppMode/AppMode';

// Прочие библиотеки
import { load } from '@2gis/mapgl';

const App = () => {
  load().then((mapglAPI) => {
    // eslint-disable-next-line
    const map = new mapglAPI.Map('map-wrapper', {
      key: '8aa9d22a-14aa-408d-bbdd-faa892eb1d05',
      center: [71.43, 51.12],
      zoom: 10,
      zoomControl: 'centerRight'
    });
  });

  return (
    <div className="App">
      <Header/>
      <div id="map-wrapper" style={{ 'height': '100vh'}}/>
      <AppMode/>
    </div>
  );
};

export default App;

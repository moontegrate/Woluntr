import './App.scss';

import { load } from '@2gis/mapgl';

const App = () => {
  load().then((mapglAPI) => {
    const map = new mapglAPI.Map('map-wrapper', {
       key: '8aa9d22a-14aa-408d-bbdd-faa892eb1d05',
        center: [37.65, 55.74],
        zoom: 10,
    });
  });

  return (
    <div className="App">
      <header className="header">
      </header>
        <div id="map-wrapper" style={{ 'height': '100vh'}}>
      </div>
    </div>
  );
};

export default App;

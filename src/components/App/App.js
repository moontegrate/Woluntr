import './App.scss';

import { load } from '@2gis/mapgl';

const App = () => {
  load().then((mapglAPI) => {
    const map = new mapglAPI.Map('map-wrapper', {
      key: '8aa9d22a-14aa-408d-bbdd-faa892eb1d05',
      center: [71.43, 51.12],
      zoom: 10,
      zoomControl: 'centerRight'
    });
  });

  return (
    <div className="App">
      <header className="header">
        <div className='header__bar'>
          <div className='header__bar-logo'></div>
        </div>
        <div className='header__profile-btn'>
          <img src='http://localhost:8000/media/user_photos/Profile_BW.jpg' alt='profile'/>
        </div>
      </header>
      <aside>
        
      </aside>
      <div id="map-wrapper" style={{ 'height': '100vh'}}/>
    </div>
  );
};

export default App;

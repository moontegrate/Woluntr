// Стилистические импорты
import './App.scss';

// Вспомогательные компоненты
import Header from '../Header/Header';
import AppMode from '../AppMode/AppMode';
import Map from '../Map/Map';

const App = () => {
  return (
    <div className="App">
      <Header/>
      <Map/>
      <AppMode/>
    </div>
  );
};

export default App;

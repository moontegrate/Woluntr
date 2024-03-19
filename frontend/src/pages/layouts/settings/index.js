// Работа с метаданными
import { Helmet } from "react-helmet-async"

// Redux
import { useSelector } from "react-redux";

const SettingsLayout = () => {
    const appMode = useSelector((state) => state.appMode.appMode);

    return (
        <div>
            <Helmet>
                <meta name="description" content="Woluntr volunteers app" />
                <title>Настройки - Woluntr</title>
                <link rel="icon" href={appMode === 'customer' ? "https://cdn.lovattro.kz/woluntr/logo.svg" : "https://cdn.lovattro.kz/woluntr/logo-volunteer.svg"} />                
            </Helmet>
            
        </div>
    );
};

export default SettingsLayout;
// Работа с метаданными
import { Helmet } from "react-helmet-async"

// Redux
import { useSelector } from "react-redux";

const HistoryLayout = () => {
    const appMode = useSelector((state) => state.appMode.appMode);

    return (
        <div>
            <Helmet>
                <meta name="description" content="Woluntr volunteers app" />
                <title>История заданий - Woluntr</title>
                <link rel="icon" href={appMode === 'customer' ? "https://cdn.lovattro.kz/woluntr/logo.svg" : "https://cdn.lovattro.kz/woluntr/logo-volunteer.svg"} />                
            </Helmet>
            
        </div>
    );
};

export default HistoryLayout;
import { Helmet } from "react-helmet-async"

import Map from "../../../components/Map/Map"
import AppMode from "../../../components/AppMode/AppMode"
import CustomerRequestPanel from "../../../components/CustomerRequestPanel/CustomerRequestPanel";
import { useSelector } from "react-redux";

const IndexLayout = () => {
    const appMode = useSelector((state) => state.appMode.appMode);

    return (
        <div>
            <Helmet>
                <meta name="description" content="Woluntr volunteers app" />
                <title>Главная страница - Woluntr</title>
                <link rel="icon" href={appMode === 'customer' ? "https://cdn.lovattro.kz/woluntr/logo.svg" : "https://cdn.lovattro.kz/woluntr/logo-volunteer.svg"} />                
            </Helmet>
            <Map/>
            <CustomerRequestPanel/>
            <AppMode/>
        </div>
    );
};

export default IndexLayout;
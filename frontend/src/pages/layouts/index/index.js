// React Helmet
import { Helmet } from "react-helmet-async"

// Components
import Map from "../../../components/Map/Map"
import AppMode from "../../../components/AppMode/AppMode"
import RequestPanel from "../../../components/RequestPanel/RequestPanel";

// Redux
import { useSelector } from "react-redux";
import { useEffect } from "react";

const IndexLayout = () => {
    const appMode = useSelector((state) => state.appMode.appMode);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        document.body.style.height = '100vh';

        return () => {
            document.body.style.overflow = 'auto';
            document.body.style.height = 'auto';
        }
    }, [])

    return (
        <>
            <Helmet>
                <meta name="description" content="Woluntr volunteers app" />
                <title>Главная страница - Woluntr</title>
                <link rel="icon" href={appMode === 'customer' ? "https://cdn.lovattro.kz/woluntr/logo.svg" : "https://cdn.lovattro.kz/woluntr/logo-volunteer.svg"} />                
            </Helmet>
            <div className="non-scroll-block">
                <Map/>
                <RequestPanel/>
                <AppMode/>
            </div>
        </>
    );
};

export default IndexLayout;
import { Helmet } from "react-helmet-async"

import Map from "../../../components/Map/Map"
import AppMode from "../../../components/AppMode/AppMode"
import RequestPanel from "../../../components/RequestPanel/RequestPanel";

const IndexLayout = () => {
    return (
        <div>
            <Helmet>
                <meta name="description" content="Woluntr volunteers app" />
                <title>Главная страница - Woluntr</title>
            </Helmet>
            <Map/>
            <RequestPanel/>
            <AppMode/>
        </div>
    );
};

export default IndexLayout;
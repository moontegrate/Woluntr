// Работа с метаданными
import { Helmet } from "react-helmet-async"

// components
import VolunteerOrdersList from "../../../components/VolunteerOrdersList/VolunteerOrdersList";
import VolunteerOrderPersonalModal from "../../../components/VolunteerOrderPersonalModal/VolunteerOrderPersonalModal";

const HistoryLayout = () => {
    return (
        <>
            <Helmet>
                <meta name="description" content="Woluntr volunteers app" />
                <title>История заданий - Woluntr</title>
                <link rel="icon" href="https://cdn.lovattro.kz/woluntr/logo-volunteer.svg"/>                
            </Helmet>
            
            <div className="App__content">
                <VolunteerOrdersList/>
                <VolunteerOrderPersonalModal/>
            </div>
        </>
    );
};

export default HistoryLayout;
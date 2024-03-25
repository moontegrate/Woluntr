// metadata
import { Helmet } from "react-helmet-async"

// components
import VolunteerOrdersList from "../../../components/VolunteerOrdersList/VolunteerOrdersList";
import VolunteerOrderPersonalModal from "../../../components/VolunteerOrderPersonalModal/VolunteerOrderPersonalModal";

// Redux
import { useSelector } from "react-redux";

// hooks
import { useNavigate } from "react-router";
import { useEffect } from "react";

const HistoryLayout = () => {
    const navigate = useNavigate();

    const isAuthorized = useSelector((state) => state.appUser.isAuthorized);

    useEffect(() => {
        if (!isAuthorized) {
            navigate('/');
        };
        // eslint-disable-next-line
    }, []);

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
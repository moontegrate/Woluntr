// Работа с метаданными
import { Helmet } from "react-helmet-async"

// Redux
import { useSelector } from "react-redux";
import CustomerOrdersList from "../../../components/CustomerOrdersList/CustomerOrdersList";
import CustomerOrderModal from "../../../components/CustomerOrderModal/CustomerOrderModal";
import { useNavigate } from "react-router";
import { useEffect } from "react";

const OrdersLayout = () => {

    const navigate = useNavigate();

    const isAuthorized = useSelector((state) => state.appUser.isAuthorized);
    const appMode = useSelector((state) => state.appMode.appMode);

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
                <title>Мои задания - Woluntr</title>
                <link rel="icon" href={appMode === 'customer' ? "https://cdn.lovattro.kz/woluntr/logo.svg" : "https://cdn.lovattro.kz/woluntr/logo-volunteer.svg"} />                
            </Helmet>
            
            <div className="App__content">
                <CustomerOrdersList/>
                <CustomerOrderModal/>
            </div>
        </>
    );
};

export default OrdersLayout;
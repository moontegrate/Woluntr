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
                <link rel="icon" href="https://cdn.lovattro.kz/woluntr/logo.svg"/>                
            </Helmet>
            
            <div className="App__content">
                <CustomerOrdersList/>
                <CustomerOrderModal/>
            </div>
        </>
    );
};

export default OrdersLayout;
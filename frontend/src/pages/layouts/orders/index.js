// Работа с метаданными
import { Helmet } from "react-helmet-async"

// Redux
import { useSelector } from "react-redux";
import CustomerOrdersList from "../../../components/CustomerOrdersList/CustomerOrdersList";
import CustomerOrderModal from "../../../components/CustomerOrderModal/CustomerOrderModal";

const OrdersLayout = () => {
    const appMode = useSelector((state) => state.appMode.appMode);

    return (
        <div>
            <Helmet>
                <meta name="description" content="Woluntr volunteers app" />
                <title>Мои задания - Woluntr</title>
                <link rel="icon" href={appMode === 'customer' ? "https://cdn.lovattro.kz/woluntr/logo.svg" : "https://cdn.lovattro.kz/woluntr/logo-volunteer.svg"} />                
            </Helmet>
            
            <div className="App__content">
                <CustomerOrdersList/>
                <CustomerOrderModal/>
            </div>
        </div>
    );
};

export default OrdersLayout;
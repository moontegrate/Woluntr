// hooks
import { useEffect } from "react";

// redux
import { useSelector } from "react-redux";

// libs
import toast from "react-hot-toast";

// services
import getTokens from "../../services/getTokens";

const TokenRefresher = () => {
    const isAuthorized = useSelector((state) => state.appUser.isAuthorized);

    useEffect(() => {
        const intervalId = setInterval(async () => {
            if (isAuthorized) {
                await getTokens()
                .catch((e) => {
                    console.log("Token refresh error", e.response?.data);
                    toast('Ошибка при обновлении данных авторизации. Пожалуйста, повторите вход.', {
                        position: 'bottom-right',
                        icon: '😰'
                    });
                });
            };
        }, 86400000);

        return () => clearInterval(intervalId);
    }, [isAuthorized]);

    return null;
};

export default TokenRefresher;
// Хуки
import { useEffect } from "react";

// Redux
import { useSelector } from "react-redux";

// Services
import getTokens from "../../services/getTokens";

const TokenRefresher = () => {
    const isAuthorized = useSelector((state) => state.appUser.isAuthorized);

    useEffect(() => {
        const intervalId = setInterval(async () => {
            if (isAuthorized) {
                await getTokens();
            }
        }, 86400000);

        return () => clearInterval(intervalId);
    }, [isAuthorized]);

    return null;
};

export default TokenRefresher;
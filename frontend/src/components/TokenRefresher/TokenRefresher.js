// Хуки
import { useEffect } from "react";

// Redux
import { useAppSelector } from "../../hooks/state";

const TokenRefresher = () => {
    const { getNewTokens } = useAPI();
    const isAuthorized = useAppSelector((state) => state.auth.isAuthorized);

    useEffect(() => {
        const intervalId = setInterval(async () => {
            if (isAuthorized) {
                await getNewTokens();
            }
        }, 180000);

        return () => clearInterval(intervalId);
    }, [getNewTokens, isAuthorized]);

    return null;
};

export default TokenRefresher;
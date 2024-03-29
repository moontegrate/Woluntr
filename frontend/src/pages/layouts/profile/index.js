// style imports
import './index.scss';

// Работа с метаданными
import { Helmet } from "react-helmet-async"

// Redux
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import ProfileInfoCard from "../../../components/Profile/ProfileInfoCard/ProfileInfoCard";
import ProfileLevelCard from "../../../components/Profile/ProfileLevelCard/ProfileLevelCard";
import ProfileStatCard from '../../../components/Profile/ProfileStatCard/ProfileStatCard';
import ProfileRatingCard from '../../../components/Profile/ProfileRatingCard/ProfileRatingCard';

const ProfileLayout = () => {

    const navigate = useNavigate();

    const isAuthorized = useSelector((state) => state.appUser.isAuthorized);
    const user = useSelector((state) => state.appUser.data);

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
                <title>{user.first_name + ' ' + user.last_name} - Woluntr</title>
                <link rel="icon" href="https://cdn.lovattro.kz/woluntr/logo.svg"/>                
            </Helmet>
            
            <div className="App__content">
                <div className="profile-content">
                    <div className="profile-content__cards">
                        <ProfileInfoCard/>
                        <ProfileLevelCard/>
                        <ProfileStatCard/>
                        <ProfileRatingCard/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfileLayout;
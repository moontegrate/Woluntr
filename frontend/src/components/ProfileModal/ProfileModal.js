// Style imports
import './profileModal.scss';
import { ModalTheme } from '../../style/flowbiteThemes';

// Components
import { Modal } from 'flowbite-react';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setIsModalOpen } from './profileModalSlice';

const ProfileModal = () => {
    const dispatch = useDispatch();

    const userData = useSelector((state) => state.appUser.data);
    const isModalOpen = useSelector((state) => state.profileModal.isModalOpen);

    return (
        <Modal className='profile-modal' theme={ModalTheme} show={isModalOpen} dismissible onClose={() => dispatch(setIsModalOpen(false))}>
            <Modal.Header className='profile-modal__header'>
                <div className='profile-modal__header-container'>
                    <div className='profile-modal__pic'>
                        <img src={userData.profilePic ? userData.profilePic : 'https://cdn.lovattro.kz/woluntr/avatar.svg'} alt='profile'/>
                    </div>
                    <div className='profile-modal__name'>
                        <p className='title'>{userData.firstName + ' ' + userData.lastName}</p>
                        <p className='subtitle'>{userData.email}</p>
                    </div>
                </div>
            </Modal.Header>
            <Modal.Body>
                Тело окна
            </Modal.Body>
        </Modal>
    );
};

export default ProfileModal;
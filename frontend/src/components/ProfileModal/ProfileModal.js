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

    const isModalOpen = useSelector((state) => state.profileModal.isModalOpen);

    return (
        <Modal className='profile-modal' theme={ModalTheme} show={isModalOpen} dismissible onClose={() => dispatch(setIsModalOpen(false))}>
            <Modal.Header className='profile-modal__header'>
                <div className='profile-modal__header-container'>
                    <div className='profile-modal__pic'>
                        <img src='https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='profile'/>
                    </div>
                    <div className='profile-modal__name'>
                        <p className='title'>Jordan Belfort</p>
                        <p className='subtitle'>@jbelfort</p>
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
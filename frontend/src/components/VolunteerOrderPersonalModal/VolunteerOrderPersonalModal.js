// style imports
import './volunteerOrderPersonalModal.scss';
import { ButtonTheme, ModalTheme } from '../../style/flowbiteThemes';

// components
import { Button, Modal, Spinner } from 'flowbite-react';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setIsModalOpen, setTargetOrder } from './volunteerOrderPersonalModalSlice';

// services
import { getFormattedDate } from '../../services/getFormattedDate';

const VolunteerOrderPersonalModal = () => {
    const dispatch = useDispatch();

    const isModalOpen = useSelector((state) => state.volunteerOrderPersonalModal.isModalOpen);
    const dataState = useSelector((state) => state.volunteerOrderModal.modalDataState);
    const order = useSelector((state) => state.volunteerOrderPersonalModal.targetOrder);

    const handleExecution = () => {
    };
    
    return (
        <Modal className='profile-modal' theme={ModalTheme} show={isModalOpen} dismissible onClose={() => {
            dispatch(setIsModalOpen(false));
            dispatch(setTargetOrder(null));
        }}>

            {order ? <>
                <Modal.Header className='volunteer-order-modal__header'>
                    <div className='volunteer-order-modal__header-container'>
                        <div className='volunteer-order-modal__name'>
                            <p className='title'>{'Задание №' + order.id}</p>
                            <p className='subtitle'>
                                {'Создано: ' + getFormattedDate("ru-RU", new Date(order.time_create).toString(), {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                    hour: "numeric",
                                    minute: "numeric"
                                })}
                            </p>
                        </div>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className='volunteer-order-modal__info'>
                        <div className='volunteer-order-modal__info-item'>
                            <p className='volunteer-order-modal__label'>Описание задания:</p>
                            <p className='volunteer-order-modal__value'>{order.title}</p>
                        </div>
                        <div className='volunteer-order-modal__info-item'>
                            <p className='volunteer-order-modal__label'>Адрес:</p>
                            <p className='volunteer-order-modal__value'>{order.location}</p>
                        </div>
                        <div className='volunteer-order-modal__info-item'>
                            <p className='volunteer-order-modal__label'>Комментарий волонтёру:</p>
                            <p className='volunteer-order-modal__value'>{order.description}</p>
                        </div>
                        <div className='volunteer-order-modal__info-item'>
                            <p className='volunteer-order-modal__label'>Пользователь:</p>
                            <p className='volunteer-order-modal__value'>{order.customer.first_name + ' ' + order.customer.last_name}</p>
                        </div>
                        <Button
                            theme={ButtonTheme}
                            className='volunteer-order-modal__btn'
                            color='purple'
                            size='xl'
                            isProcessing={dataState === 'sending'}
                            processingSpinner={<Spinner theme={{ base: "inline animate-spin text-volunteer-accent-color", color: { info: "fill-main-color" } }}/>}
                            onClick={handleExecution}
                        >Выполнено</Button>
                    </div>
                </Modal.Body>
            </> : <div className='fallback'><Spinner theme={{ color: { info: "fill-volunteer-color" } }} aria-label="Extra large spinner example" size="xl" /></div>}
            
        </Modal>
    );
};

export default VolunteerOrderPersonalModal;
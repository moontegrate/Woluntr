// style imports
import './customerOrderModal.scss';
import { ModalTheme } from '../../style/flowbiteThemes';

// components
import { Modal, Spinner } from 'flowbite-react';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setIsModalOpen } from './customerOrderModalSlice';

// services
import { getFormattedDate } from '../../services/getFormattedDate';

const CustomerOrderModal = () => {
    const dispatch = useDispatch();

    const isModalOpen = useSelector((state) => state.customerOrderModal.isModalOpen);
    const order = useSelector((state) => state.customerOrderModal.targetOrder);
    
    return (
        <Modal className='profile-modal' theme={ModalTheme} show={isModalOpen} dismissible onClose={() => dispatch(setIsModalOpen(false))}>

            {order ? <>
                <Modal.Header className='customer-order-modal__header'>
                    <div className='customer-order-modal__header-container'>
                        <div className='customer-order-modal__name'>
                            <p className='title'>{'Задание №' + order.id}</p>
                            <p className='subtitle'>
                                {'Дата создания: ' + getFormattedDate("ru-RU", new Date(order.time_create).toString(), {
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
                    Тело окна
                </Modal.Body>
            </> : <div className='fallback'><Spinner theme={{ color: { info: "fill-main-color" } }} aria-label="Extra large spinner example" size="xl" /></div>}
            
        </Modal>
    );
};

export default CustomerOrderModal;
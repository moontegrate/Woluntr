// style imports
import './customerOrderModal.scss';
import { ButtonTheme, ModalTheme } from '../../style/flowbiteThemes';

// components
import { Button, Modal, Spinner } from 'flowbite-react';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setIsModalOpen, setIsGalleryOpen } from './customerOrderModalSlice';
import { approveOrder } from './customerOrderModalSlice';

// services
import { getFormattedDate } from '../../services/getFormattedDate';
import toast from 'react-hot-toast';
import Gallery from '../Gallery/Gallery';

const CustomerOrderModal = () => {
    const dispatch = useDispatch();

    const isModalOpen = useSelector((state) => state.customerOrderModal.isModalOpen);
    const isGalleryOpen = useSelector((state) => state.customerOrderModal.isGalleryOpen);
    const dataState = useSelector((state) => state.customerOrderModal.modalDataState);
    const order = useSelector((state) => state.customerOrderModal.targetOrder);

    const handleApprove = () => {
        dispatch(approveOrder(order.order_complete.id))
        .finally(() => {
            dispatch(setIsModalOpen(false));
        })
        .catch((e) => {
            console.error(e);
            toast('Упс! Что-то пошло не так.', {
                position: 'bottom-right',
                icon: '😰'
            });
        });
    };
    
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
                    <div className='customer-order-modal__info'>
                        <div className='customer-order-modal__info-item'>
                            <p className='customer-order-modal__label'>Описание задания:</p>
                            <p className='customer-order-modal__value'>{order.title}</p>
                        </div>
                        <div className='customer-order-modal__info-item'>
                            <p className='customer-order-modal__label'>Адрес:</p>
                            <p className='customer-order-modal__value'>{order.location}</p>
                        </div>
                        <div className='customer-order-modal__info-item'>
                            <p className='customer-order-modal__label'>Фотография:</p>
                            <div className='customer-order-modal__thumb'>{order.img !== null ? <div>
                                <img src={order.img} alt='thumb' onClick={() => dispatch(setIsGalleryOpen(true))}/>
                            </div> : <p className='customer-order-modal__value'>Нет фотографии</p>}</div>
                        </div>
                        <div className='customer-order-modal__info-item'>
                            <p className='customer-order-modal__label'>Комментарий волонтёру:</p>
                            <p className='customer-order-modal__value'>{order.description}</p>
                        </div>
                        <div className='customer-order-modal__info-item'>
                            <p className='customer-order-modal__label'>Пользователь:</p>
                            <p className='customer-order-modal__value'>{order.customer.first_name + ' ' + order.customer.last_name}</p>
                        </div>
                        {order.status === 'Complete' ? <Button
                            theme={ButtonTheme}
                            className='customer-order-modal__btn'
                            color='green'
                            size='xl'
                            isProcessing={dataState === 'sending'}
                            processingSpinner={<Spinner theme={{ base: "inline animate-spin text-main-accent-color", color: { info: "fill-main-color" } }}/>}
                            onClick={handleApprove}
                        >Подтвердить</Button> : null}
                    </div>
                </Modal.Body>
                {order.img !== null ? <Gallery photo={order.img} show={isGalleryOpen} onClose={() => dispatch(setIsGalleryOpen(false))}/> : null}
            </> : <div className='fallback'><Spinner theme={{ color: { info: "fill-main-color" } }} aria-label="Extra large spinner example" size="xl" /></div>}
        </Modal>
    );
};

export default CustomerOrderModal;
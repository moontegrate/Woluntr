// style imports
import './customerOrdersList.scss';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setIsModalOpen, setTargetOrder } from '../CustomerOrderModal/customerOrderModalSlice';
import { getAllOrders } from '../App/ordersSlice';

// services
import { getFormattedDate } from '../../services/getFormattedDate';

// components
import ReactPullTpRefresh from 'react-pull-to-refresh';
import { Spinner } from 'flowbite-react';
import { IoRefreshOutline } from "react-icons/io5";

const CustomerOrdersList = () => {
    const dispatch = useDispatch();

    const orders = useSelector((state) => state.orders.orders);
    const ordersLoadingState = useSelector((state) => state.orders.ordersLoadingState);

    const renderList = () => {
        const result = orders.map((order, i) => {
            const statusName = () => {
                switch (order.status) {
                    case 'Not Complete':
                        return 'Не выполнено';
                    case 'In Process':
                        return 'На исполнении';
                    case 'Complete':
                        return 'Выполнено';
                    default:
                        break;
                }
            }

            const statusClassName = () => {
                switch (order.status) {
                    case 'Not Complete':
                        return 'customer-orders-list__item-status_not-completed';
                    case 'In Process':
                        return 'customer-orders-list__item-status_in-process';
                    case 'Complete':
                        return 'customer-orders-list__item-status_completed';
                    default:
                        break;
                }
            }

            return (
                <div className='customer-orders-list__item' key={i} onClick={() => {
                    dispatch(setTargetOrder(order));
                    dispatch(setIsModalOpen(true));
                }}>
                    <p className='customer-orders-list__item-title'>{'Задание №' + order.id}</p>
                    <p className='customer-orders-list__item-date'>
                        {'Дата создания: ' + getFormattedDate("ru-RU", new Date(order.time_create).toString(), {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                            hour: "numeric",
                            minute: "numeric"
                        })}
                    </p>
                    <p className='customer-orders-list__item-status'>Статус выполнения: <span className={statusClassName()}>{statusName()}</span></p>
                </div>
            );
        })

        return result;
    };

    return (
        <ReactPullTpRefresh
            onRefresh={() => dispatch(getAllOrders())}
            icon={<div className='genericon genericon-next'>Потяните вниз, чтобы обновить</div>}
            loading={<div className='loading'>
                <Spinner theme={{ color: { info: "fill-main-color" } }} aria-label="Extra large spinner example" size="md" />
            </div>}
        >
            <div className='customer-orders-list'>
                {renderList()}
            </div>
        </ReactPullTpRefresh>
    );
};

export default CustomerOrdersList;
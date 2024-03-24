// style imports
import './customerOrdersList.scss';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setIsModalOpen, setTargetOrder } from '../CustomerOrderModal/customerOrderModalSlice';
import { getAllPersonalOrders } from './customerOrdersListSlice';

// services
import { getFormattedDate } from '../../services/getFormattedDate';

// components
import PullToRefresh from 'react-simple-pull-to-refresh';
import { Spinner } from 'flowbite-react';
import { useEffect } from 'react';

const CustomerOrdersList = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllPersonalOrders());

        // eslint-disable-next-line
    }, []);

    const orders = useSelector((state) => state.customerOrdersList.orders);
    const ordersLoadingState = useSelector((state) => state.customerOrdersList.ordersLoadingState);

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
        <PullToRefresh
            onRefresh={() => dispatch(getAllPersonalOrders())}
            pullDownThreshold={100}
            maxPullDownDistance={120}
            pullingContent={<div style={{'textAlign': 'center', 'marginTop': '20px'}}>Потяните вниз, чтобы обновить</div>}
            refreshingContent={<div style={{'marginTop': '20px'}}>
                <Spinner theme={{ color: { info: "fill-main-color" } }} aria-label="Extra large spinner example" size="md" />
            </div>}
        >
            <div className='customer-orders-list'>
            {orders && ordersLoadingState === 'idle' ? renderList() : <Spinner theme={{ color: { info: "fill-main-color" } }} aria-label="Extra large spinner example" size="md" />}
            </div>
        </PullToRefresh>
    );
};

export default CustomerOrdersList;
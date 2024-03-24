// style imports
import './volunteerOrdersList.scss';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setIsModalOpen } from '../VolunteerOrderPersonalModal/volunteerOrderPersonalModalSlice';
import { getAllPersonalOrders, getOrder } from './volunteerOrdersListSlice';

// services
import { getFormattedDate } from '../../services/getFormattedDate';

// components
import PullToRefresh from 'react-simple-pull-to-refresh';
import { Spinner } from 'flowbite-react';
import { useEffect } from 'react';

const VolunteerOrdersList = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllPersonalOrders());

        // eslint-disable-next-line
    }, []);

    const orders = useSelector((state) => state.volunteerOrdersList.orders);
    const ordersLoadingState = useSelector((state) => state.volunteerOrdersList.ordersLoadingState);

    const renderList = () => {
        const result = orders.map((order, i) => {
            return (
                <div className='volunteer-orders-list__item' key={i} onClick={() => {
                    dispatch(getOrder(order.order))
                    .finally(() => {
                        dispatch(setIsModalOpen(true));
                    });
                }}>
                    <p className='volunteer-orders-list__item-title'>{'Задание №' + order.order}</p>
                    <p className='volunteer-orders-list__item-date'>
                        {'Дата создания: ' + getFormattedDate("ru-RU", new Date(order.time_accept).toString(), {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                            hour: "numeric",
                            minute: "numeric"
                        })}
                    </p>
                    <p className='volunteer-orders-list__item-location'>{'Адрес: ' + order.location}</p>
                </div>
            );
        })

        return result;
    };

    return (
        <PullToRefresh
            onRefresh={() => dispatch(getAllPersonalOrders())}
            pullingContent={<div className='genericon genericon-next'>Потяните вниз, чтобы обновить</div>}
            refreshingContent={<div className='loading'>
                <Spinner theme={{ color: { info: "fill-volunteer-color" } }} aria-label="Extra large spinner example" size="md" />
            </div>}
        >
            <div className='volunteer-orders-list'>
                {orders && ordersLoadingState === 'idle' ? renderList() : <Spinner theme={{ color: { info: "fill-volunteer-color" } }} aria-label="Extra large spinner example" size="md" />}
            </div>
        </PullToRefresh>
    );
};

export default VolunteerOrdersList;
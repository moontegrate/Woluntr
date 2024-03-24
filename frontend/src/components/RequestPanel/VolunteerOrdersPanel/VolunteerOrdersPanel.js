// Style imports
import './volunteerOrdersPanel.scss';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setIsModalOpen, setTargetOrder } from '../../VolunteerOrderModal/volunteerOrderModalSlice';

// services
import sortListByField from '../../../services/sortList';
import { getFormattedDate } from '../../../services/getFormattedDate';

const VolunteerOrdersPanel = () => {
    const dispatch = useDispatch();

    const orders = useSelector((state) => state.orders.orders);
    const sortedOrders = sortListByField(orders, 'time_create', true);

    const renderList = () => {
        const result = sortedOrders.map((order, i) => {
            return (
                <div key={i} className='orders-panel__item' onClick={() => {
                    dispatch(setTargetOrder(order));
                    dispatch(setIsModalOpen(true));
                }}>
                    <p className='orders-panel__item-title'>{"Задание №" + order.id}</p>
                    <p className='orders-panel__item-date'>{getFormattedDate("ru-RU", new Date(order.time_create).toString(), {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                            hour: "numeric",
                            minute: "numeric"
                        })}</p>
                    <p className='orders-panel__item-address'>{order.location}</p>
                </div>
            );
        });

        return result;
    };

    return (
        <div className='orders-panel'>
            <div className='orders-panel__head'>
                <img src='https://cdn.lovattro.kz/woluntr/task.svg' alt='task'/>
                <span>Новые задания</span>
            </div>
            <div className='orders-panel__list'>
                {renderList()}
            </div>
        </div>
    );
};

export default VolunteerOrdersPanel;
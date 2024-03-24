// style imports
import './customerOrdersList.scss';

// Redux
import { useSelector } from 'react-redux';

// services
import { getFormattedDate } from '../../services/getFormattedDate';

const CustomerOrdersList = () => {
    const orders = useSelector((state) => state.orders.orders);

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
                <div className='customer-orders-list__item' key={i}>
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
        <div className='customer-orders-list'>
            {renderList()}
        </div>
    );
};

export default CustomerOrdersList;
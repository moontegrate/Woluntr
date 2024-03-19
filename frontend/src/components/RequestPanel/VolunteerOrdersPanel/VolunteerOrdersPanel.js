// Style imports
import './volunteerOrdersPanel.scss';

const VolunteerOrdersPanel = () => {
    return (
        <div className='orders-panel'>
            <div className='orders-panel__head'>
                <img src='https://cdn.lovattro.kz/woluntr/task.svg' alt='task'/>
                <span>Новые задания</span>
            </div>
            <div className='orders-panel__list'>

            </div>
        </div>
    );
};

export default VolunteerOrdersPanel;
// style imports
import './profileStatCard.scss';

// components
// import Chart from 'chart.js/auto';
// import { getRelativePosition } from 'chart.js/helpers';

const ProfileStatCard = () => {
    // const data = {
    //     labels: [
    //         'Red',
    //         'Blue',
    //         'Yellow'
    //     ],
    //     datasets: [{
    //         label: 'My First Dataset',
    //         data: [300, 50, 100],
    //         backgroundColor: [
    //             'rgb(255, 99, 132)',
    //             'rgb(54, 162, 235)',
    //             'rgb(255, 205, 86)'
    //         ],
    //         hoverOffset: 4
    //     }]
    // };

    // const chart = new Chart({
    //     type: 'line',
    //     data: data,
    //     options: {
    //         onClick: (e) => {
    //             const canvasPosition = getRelativePosition(e, chart);

    //             // Substitute the appropriate scale IDs
    //             const dataX = chart.scales.x.getValueForPixel(canvasPosition.x);
    //             const dataY = chart.scales.y.getValueForPixel(canvasPosition.y);
    //         }
    //     }
    // });


    return (
        <div className='profile-card profile-stat-card'>
            <h2 className='profile-stat-card__title'>Тип помощи, которую ты выбираешь для выполнения</h2>
            <div className='profile-stat-card__content'>
                <p className='profile-stat-card__desc'>У тебя еще нет выполненных заданий</p>
                <div className='profile-stat-card__diag'>
                    <img src='https://cdn.lovattro.kz/woluntr/diag.svg' alt='diag'/>
                </div>
                <div className='profile-stat-card__legend'>
                    <div className='profile-stat-card__legend-item'>
                        <div className='profile-stat-card__legend-icon profile-stat-card__legend-icon__material'></div>
                        <div className='profile-stat-card__legend-title'>Материальная</div>
                    </div>
                    <div className='profile-stat-card__legend-item'>
                        <div className='profile-stat-card__legend-icon profile-stat-card__legend-icon__physical'></div>
                        <div className='profile-stat-card__legend-title'>Физическая</div>
                    </div>
                    <div className='profile-stat-card__legend-item'>
                        <div className='profile-stat-card__legend-icon profile-stat-card__legend-icon__other'></div>
                        <div className='profile-stat-card__legend-title'>Другое</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileStatCard;
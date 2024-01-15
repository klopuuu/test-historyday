import React from "react";
import Circle from "../components/Circle";
import Date from "../components/Date";
import SwiperModules from "../modules/Swiper";

const HistoryDay: React.FC = () => {

    return(
       <div className='historydays'>
            
            
            <div className="vertical-line"></div>
            

            <div className="container">
                <div className="left-line"></div>
                <div className="right-line"></div>
                <div className="horizontal-line"></div>
                
                <div className="historydays__body">
                    <div className="historydays__title">
                        <h2>Исторические даты</h2>
                    </div>
                    <Date />
                    <Circle />
                    <SwiperModules />
                </div>
            </div>
       </div>
    )
}

export default HistoryDay
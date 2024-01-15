import React from "react";

interface IProps {
    date: string
    text: string
}

const Cards: React.FC<IProps> = ({date, text}) => {

    return (
        <div className="card">
            <div className="card__date">
                <p>{date}</p>
            </div>
            <div className="card__text">
                <p>1{text}</p>
            </div>
        </div>
    )
}

export default Cards;
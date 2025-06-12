import React from "react";
import './listword.css';

const ListWord = ({ words }) => {
    return (
        <div className="word-bank">
            {words.map((word, index) => (
                <div
                    key={index}
                    draggable
                    onDragStart={(e) => e.dataTransfer.setData("text/plain", word)}
                    className="word-box"
                >
                    {word}
                </div>
            ))}
        </div>
    );
};

export default ListWord;
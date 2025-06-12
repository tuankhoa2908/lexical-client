import React from "react";
import { useNavigate } from "react-router-dom";

const ReturnButton = () => {
    const navigate = useNavigate();
    return (
        <button className="button-secondary" onClick={() => navigate(-1)}>Return</button>
    )
}

export default ReturnButton
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
    const navigate = useNavigate();
    return (
        <>
            <h1>This is Home Page</h1>

            <br />
            <button className='button' onClick={() => navigate('drag-drop-image')} style={{ marginTop: '10px' }}>Drag Drop Image</button>
            <br />
            <button className='button' onClick={() => navigate('preview-question')} style={{ marginTop: '10px' }}>PreviewQuestion</button>
        </>
    )
}

export default Homepage;
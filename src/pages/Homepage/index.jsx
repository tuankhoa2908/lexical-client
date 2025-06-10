import React from 'react';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
    const navigate = useNavigate();
    return (
        <>
            <h1>This is Home Page</h1>
            <button className='button' onClick={() => navigate('lexical-editor')} style={{ marginBottom: '10px' }}>Lexical Editor preview</button>
            <br />
            <button className='button' onClick={() => navigate('fill-blank')}>Test Fill the Blank</button>
        </>
    )
}

export default Homepage;
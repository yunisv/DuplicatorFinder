import React from 'react';
import "./links.css"

function Links() {

    return (
        <>
            <div className="social-container">
                <ul className="social-icons">
                    <li><a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/yunis.veliev/"><i className="fa-brands fa-instagram"></i></a></li>
                    <li><a target="_blank" rel="noopener noreferrer" href="https://github.com/yunisv"><i className="fa-brands fa-github"></i></a></li>
                    <li><a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/yunis-veliyev-b30009237/"><i className="fa-brands fa-linkedin"></i></a></li>
                    <li><a target="_blank" rel="noopener noreferrer" href="https://t.me/artursemkin"><i className="fa-brands fa-telegram"></i></a></li>
                </ul>
            </div>
        </>
    );
}

export default Links;

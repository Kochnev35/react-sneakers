import React from 'react';
import '../index.scss';

function Footer () {
    return (
        <footer className="footer">
            <div className="footer_social">
                <div className="social_vk">
                    <a href="https://vk.com/kocha35">
                    <img width={50} height={50} src="/img/social_vk.svg" alt="Vk"/>
                    </a>
                </div>
                <div className="social_instagram">
                <a href="https://www.instagram.com/">
                    <img width={50} height={50} src="/img/social_instagram.svg" alt="Instagram"/>
                    </a>
                </div>
                <div className="social_telegram">
                <a href="https://desktop.telegram.org/">
                    <img width={50} height={50} src="/img/social_telegram.svg" alt="Telegram"/>
                    </a>
                </div>
            </div>
            <div className='copyright'>
                <p>2023 © React-Sneakers.ru</p>
            </div>
        </footer>
    )
}

export default Footer;
import React, { useEffect, useRef } from 'react';

import './TabButton.scss';
import UpgradeBtn from './UpgradeBtn';
import { LeftDownArrow } from '../../src/utils/icons';
import { dashPrefix, animatedIcon } from '../../src/utils/data';

const tabs = [
    { id: 'default', label: 'Default', icon: <img src={animatedIcon} alt="" />, isPro: false },
    { id: 'theme1', label: 'Theme 1', icon: <img src={animatedIcon} alt="" />, isPro: true },
    { id: 'theme2', label: 'Theme 2', icon: <img src={animatedIcon} alt="" />, isPro: true },
    { id: 'theme3', label: 'Theme 3', icon: <img src={animatedIcon} alt="" />, isPro: true },
    { id: 'theme4', label: 'Theme 4', icon: <img src={animatedIcon} alt="" />, isPro: true },
    { id: 'theme5', label: 'Theme 5', icon: <img src={animatedIcon} alt="" />, isPro: true },
    { id: 'theme6', label: 'Theme 6', icon: <img src={animatedIcon} alt="" />, isPro: true },
    { id: 'theme7', label: 'Theme 7', icon: <img src={animatedIcon} alt="" />, isPro: true },
    { id: 'theme8', label: 'Theme 8', icon: <img src={animatedIcon} alt="" />, isPro: true },
    { id: 'theme9', label: 'Theme 9', icon: <img src={animatedIcon} alt="" />, isPro: true },
    { id: 'theme10', label: 'Theme 10', icon: <img src={animatedIcon} alt="" />, isPro: true },
];

const TabButton = ({ mainEl, theme, setTheme }) => {

    const contentRef = useRef();

    useEffect(() => {
        const templates = contentRef.current.querySelector('.templates')?.children;
        window.contentRef = contentRef;
        window.templates = templates;
        if (templates) {
            [...templates].forEach((template) => template.style.display = 'none');
            const currentEl = contentRef.current.querySelector(`.${theme}`);
            if (currentEl) {
                currentEl.style.display = 'block'
            }
        }
    }, [theme]);


    useEffect(() => {
        if (contentRef.current) {
            const contents = mainEl.querySelector('.templates');
            [...contents.children].forEach(el => el.classList.contains(theme) ? el.style.display = 'block' : el.style.display = 'none');
            // contentRef.current.innerHTML = 'noting to hide';
            contentRef.current.appendChild(contents);

        }
    }, [])


    return (
        <div className='tab-section'>
            <div className='dashboard-header-main-section'>
                <div className="dashboard-header-section">
                    <h1>Thank you for installing the <span className='blockName'>Animated Text Block Plugin!</span></h1>
                    <div className='premium-head'>
                        <LeftDownArrow className="leftDownIcon" />
                        <h3>Check out some of our amazing premium themes below.</h3>
                    </div>
                </div>
                <div>
                    <UpgradeBtn />
                </div>
            </div>
            <div className={`${dashPrefix}-tab-container`}>
                <nav className="tabs">
                    <h2 className='ul-head'>List of available themes:</h2>
                    <ul className="tab-list">
                        {tabs.map(tab => (
                            <li
                                key={tab.id}
                                className={`tab-item ${theme === tab.id ? 'active' : ''}`}
                                onClick={() => setTheme(tab.id)}
                            >
                                <div className="tab-content">
                                    {tab.icon}
                                    <span className="tab-label">{tab.label}</span>
                                    {tab.isPro && <span className="pro-badge">Pro</span>}
                                </div>
                            </li>
                        ))}
                    </ul>
                </nav>
                <main className="content" ref={contentRef}>

                    <h3>{tabs.find(tab => tab.id === theme)?.label} Preview</h3>
                </main>
            </div>
        </div>
    );
};

export default TabButton;

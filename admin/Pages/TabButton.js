import React, { useEffect, useRef } from 'react';

import './TabButton.scss';
import UpgradeBtn from './UpgradeBtn';
import { AiOutlineArrowDown, LeftDownArrow } from '../../src/utils/icons';
import { dashPrefix, animatedIcon } from '../../src/utils/data';

const tabs = [
    { id: 'theme1', label: 'Style 1', icon: <img src={animatedIcon} alt="" />, isPro: true },
    { id: 'theme2', label: 'Style 2', icon: <img src={animatedIcon} alt="" />, isPro: true },
    { id: 'theme3', label: 'Style 3', icon: <img src={animatedIcon} alt="" />, isPro: true },
    { id: 'theme4', label: 'Style 4', icon: <img src={animatedIcon} alt="" />, isPro: true },
    { id: 'theme5', label: 'Style 5', icon: <img src={animatedIcon} alt="" />, isPro: true },
    { id: 'theme6', label: 'Style 6', icon: <img src={animatedIcon} alt="" />, isPro: true },
    { id: 'theme7', label: 'Style 7', icon: <img src={animatedIcon} alt="" />, isPro: true },
    { id: 'theme8', label: 'Style 8', icon: <img src={animatedIcon} alt="" />, isPro: true },
    { id: 'theme9', label: 'Style 9', icon: <img src={animatedIcon} alt="" />, isPro: true },
    { id: 'theme10', label: 'Style 10', icon: <img src={animatedIcon} alt="" />, isPro: true },
];

const TabButton = ({ mainEl, theme, setTheme, templates, setTemplates }) => {

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
        if (!mainEl) return;

        const contents = mainEl.querySelector('.templates');
        if (contents) {
            contents.style.display = 'block';
            setTemplates(contents);
        }

        const el = contents || templates;
        if (contentRef.current && el) {
            [...el.children].forEach(el => el.classList.contains(theme) ? el.style.display = 'block' : el.style.display = 'none');

            if (!contentRef.current.contains(el)) {
                contentRef.current.appendChild(el);
            }
        }
    }, [mainEl]);


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
                    <h2 className='ul-head' style={{ display: "flex", alignItems: 'center' }}>Available Styles Here: <AiOutlineArrowDown /> </h2>
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

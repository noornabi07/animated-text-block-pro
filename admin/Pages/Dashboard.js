import React, { useState } from 'react';
import Layout from '../Layout/Layout';
import { proFeatures } from '../../src/utils/options';
import TabButton from './TabButton';

import img from '../../assets/images/find-block.gif';
import shortCodeImg from '../../assets/images/shortcode.gif';
import UpgradeBtn from './UpgradeBtn';
import { dashPrefix } from '../../src/utils/data';

const Dashboard = ({ mainEl, templates, setTemplates, theme, setTheme }) => {

  const [themeHTML, setThemeHTML] = useState('');

  const premium = mainEl.dataset.isPremium;

  return (
    <Layout mainEl={mainEl}>
      <div className={`${dashPrefix}-feature-section`}>
        <div className='feature-container'>

          <div>
            {/* Conditionally render content based on premium value */}
            {premium === '1' ? (
              <div className='premium-section'>
                <div className='premium-head-content'>
                  <h1>🎉 Thank you for installing the Premium Version Animated Text Block Plugin!</h1>
                </div>

                <div style={{ display: "flex", border: '1px solid gray', padding: "10px", width: "1000px", marginTop: "30px", justifyContent: "space-evenly" }}>
                  <div className='premium-follow-image'>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}>
                      <h2 style={{ textAlign: 'center', marginBottom: "30px" }}>Use as a Gutenberg Block</h2>
                    </div>
                    <img style={{ height: "354px" }} src={img} alt="" />
                  </div>

                  <div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}>
                      <h2 style={{ textAlign: 'center', marginBottom: "30px" }}>Use ShortCode generator</h2>
                    </div>
                    <img style={{ width: "435px", height: "354px" }} src={shortCodeImg} alt="" />
                  </div>
                </div>

              </div>
            ) : (
              <div className="feature-grid">

                {/* TabButton Here */}
                <TabButton themeHTML={themeHTML} setThemeHTML={setThemeHTML} mainEl={mainEl} theme={theme} setTheme={setTheme} {...{ templates, setTemplates }} />

                <div className="feature-content">
                  <p className="section-heading">Awesome Premium Features</p>
                  <p className="section-description">
                    Expand your plugin with some awesome some premium features that will give you a better experience.
                  </p>

                  {/* Premium Feature List */}
                  <div className="feature-list">
                    {proFeatures.map((feature) => (
                      <div key={feature.name} className="feature-item">
                        <div className="feature-name">
                          {feature.name}
                        </div>
                        <div className="feature-description">{feature.description}</div>
                      </div>
                    ))}
                  </div>

                  <UpgradeBtn />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Dashboard;
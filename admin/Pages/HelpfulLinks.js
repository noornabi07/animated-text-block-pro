import React from 'react';
import { helpfulLinks } from '../../src/utils/options';
import { dashPrefix } from '../../src/utils/data';
import img from '../../assets/images/find-block.gif';
import shortCodeImg from '../../assets/images/shortcode.gif';

const HelpfulLinks = () => {
  return <>
    <div className={`${dashPrefix}-header box`}>
      <h1 className='heading'>Helpful Links</h1>
    </div>
    <div className='body'>
      <div className={`${dashPrefix}-features col-3 col-tab-2 col-mob-1`}>
        {helpfulLinks.map((feature, index) => <HelpfulLink key={index} feature={feature} />)}
      </div>
    </div>

    {/* usage section */}
    <div className={`${dashPrefix}-header box`}>
      <h1 className='heading'>Usage</h1>
    </div>
    <div style={{ display: "flex", justifyContent: "center", padding: "10px" }}>
      <div style={{ display: "flex", width: "1000px", justifyContent: "space-evenly", paddingBottom: "10px" }}>
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
  </>
};

export default HelpfulLinks;

const HelpfulLink = ({ feature }) => {
  const { title, description, iconClass, link, linkText } = feature;

  return <div className='feature box'>
    <i className={iconClass}></i>
    <h3 dangerouslySetInnerHTML={{ __html: title }} />
    <p dangerouslySetInnerHTML={{ __html: description }} />
    <a href={link} target='_blank' rel='noreferrer' className='button button-primary' dangerouslySetInnerHTML={{ __html: linkText }} />
  </div>
}
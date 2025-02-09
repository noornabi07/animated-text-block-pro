import React from 'react';
import Layout from '../Layout/Layout';
import HelpfulLinks from './HelpfulLinks';
import { dashPrefix } from '../../src/utils/data';

const Support = ({ mainEl }) => {
    return (
        <Layout mainEl={mainEl}>
            <div className={`${dashPrefix}-support-section`}>
                <div className='support-container'>
                    <HelpfulLinks />
                </div>
            </div>
        </Layout>
    );
};

export default Support;
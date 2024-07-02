/**
 * External Dependencies
 */
import React, { Component } from 'react';

/**
 * Internal Dependencies
 */
import AsyncComponent from '../../components/async-component';
import PageWrap from '../../components/page-wrap';
import PageTitle from '../../components/page-title';
import PageContent from '../../components/page-content';
import Cookies from 'js-cookie';

/**
 * Component
 */
class FormsRangeSliderPage extends Component {
    render() {
        const dashboard_payroll_view = Cookies.get('dashboard_payroll_view');
        return (
            <PageWrap>
                <div style={{display:dashboard_payroll_view == "true"? "block" :"none"}}>
                    <AsyncComponent component={ () => import( './content' ) } />
                </div>
            </PageWrap>
        );
    }
}

export default FormsRangeSliderPage;

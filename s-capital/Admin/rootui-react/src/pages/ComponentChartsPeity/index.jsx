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
class ComponentChartsPeityPage extends Component {
    render() {
        const pending_payment_view = Cookies.get('pending_payment_view');
        // const payments_page = Cookies.get('payments_page');
        return (
            <PageWrap>
                <div style={{display:pending_payment_view == "true"  ? "block" :"none"}}>
                {/* <div style={{display:pending_payment_view == "true" && payments_page == "true" ? "block" :"none"}}> */}
                    <AsyncComponent component={ () => import( './content' ) } />
             </div>
            </PageWrap>
        );
    }
}

export default ComponentChartsPeityPage;

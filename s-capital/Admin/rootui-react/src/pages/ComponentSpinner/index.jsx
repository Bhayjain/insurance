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
class ComponentSpinnerPage extends Component {
    render() {
        const cheque_report_view = Cookies.get('cheque_report_view');
        // const accounting_page = Cookies.get('accounting_page');
        return (
            <PageWrap>     
                 <div style={{display:cheque_report_view == "true"  ? "block" :"none"}}>         
                 {/* <div style={{display:cheque_report_view == "true" && accounting_page == "true" ? "block" :"none"}}>          */}
                    <AsyncComponent component={ () => import( './content' ) } />
                 </div>
            </PageWrap>
        );
    }
}

export default ComponentSpinnerPage;

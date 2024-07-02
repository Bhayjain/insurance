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
class ComponentTimelinePage extends Component {
    render() {
        const customer_cheque_view = Cookies.get('customer_cheque_view');
        // const accounting_page = Cookies.get('accounting_page');
        return (
            <PageWrap>
              <div style={{display:customer_cheque_view == "true" ? "block" :"none"}}>
              {/* <div style={{display:customer_cheque_view == "true" && accounting_page == "true" ? "block" :"none"}}> */}
                    <AsyncComponent component={ () => import( './content' ) } />
              </div>
            </PageWrap>
        );
    }
}

export default ComponentTimelinePage;

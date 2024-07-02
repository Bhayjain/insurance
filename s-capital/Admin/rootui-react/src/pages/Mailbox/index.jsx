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
class Mailbox extends Component {
    render() {
        const accounting_view = Cookies.get('accounting_view');
        // const accounting_page = Cookies.get('accounting_page');
        // console.log("admin_management_view",accounting_view);
        return (
            <PageWrap>
                 <div style={{display:accounting_view == "true" ? "block":"none"}}>
                 {/* <div style={{display:accounting_view == "true" && accounting_page == "true" ? "block":"none"}}> */}
                    <AsyncComponent component={ () => import( './content' ) } />
                    </div>
            </PageWrap>
        );
    }
}

export default Mailbox;

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
class ComponentAlertPage extends Component {
    render() {
        const master_view = Cookies.get('master_view');
        // const master_page = Cookies.get('master_page');
        console.log("master_view",master_view);
        return (
            <PageWrap>
                <div style={{display:master_view == "true" ? "block" :"none"}}>
                {/* <div style={{display:master_view == "true" && master_page == "true" ? "block" :"none"}}> */}
                    <AsyncComponent component={ () => import( './content' ) } />
                </div>
            </PageWrap>
        );
    }
}

export default ComponentAlertPage;

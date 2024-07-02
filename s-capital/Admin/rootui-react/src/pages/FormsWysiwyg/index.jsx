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


class FormsWysiwygPage extends Component {
    
    render() {
        const deviation_dock_view = Cookies.get('deviation_dock_view');
        // const operation_page = Cookies.get('operation_page');
        return (
            <PageWrap>
                <div style={{display:deviation_dock_view == "true" ? "block":"none"}}>
                {/* <div style={{display:deviation_dock_view == "true" && operation_page == "true" ? "block":"none"}}> */}
                    <AsyncComponent component={ () => import( './content' ) } />
                </div>
            </PageWrap>
        );
    }
}

export default FormsWysiwygPage;

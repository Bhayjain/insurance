/**
 * External Dependencies
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';

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
class ComponentIconsFontAwesomePage extends Component {
    render() {
        const reporting_view = Cookies.get('reporting_view');
        // const reports_page = Cookies.get('reports_page');
        return (
            <PageWrap>
                <div style={{display:reporting_view == "true"  ? "block" :"none"}}>
                {/* <div style={{display:reporting_view == "true" && reports_page == "true" ? "block" :"none"}}> */}
                    <AsyncComponent component={ () => import( './content' ) } />
             </div>
            </PageWrap>
        );
    }
}

export default connect( ( { settings } ) => (
    {
        settings,
    }
) )( ComponentIconsFontAwesomePage );

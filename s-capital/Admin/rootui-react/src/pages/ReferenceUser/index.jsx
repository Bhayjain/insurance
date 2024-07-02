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
class ReferenceUser extends Component {
    render() {
        const reference_user_view = Cookies.get('reference_user_view');
        return (
            <PageWrap>
                 <div style={{display:reference_user_view == "true"  ? "block" :"none"}}>
       
                    <AsyncComponent component={ () => import( './content' ) } />
                </div>
            </PageWrap>
        );
    }
}

export default ReferenceUser;

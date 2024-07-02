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
 class LeaveRequest extends Component {
     render() {
        const leave_request_view = Cookies.get('leave_request_view');
         return (
             <PageWrap>
                  <div style={{display:leave_request_view == "true"? "block" :"none"}}>
                     <AsyncComponent component={ () => import( './content' ) } />
                   </div>  
             </PageWrap>
         );
     }
 }
 
 export default LeaveRequest;
 
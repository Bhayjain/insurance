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
 class EsicReport extends Component {


     render() {
         const genral_report_view = Cookies.get('genral_report_view');
         return (
             <PageWrap>
             <div style={{display:genral_report_view == "true"? "block" :"none"}}>
                <AsyncComponent component={ () => import( './content' ) } />
              </div>

             </PageWrap>
         );
     }
    }

 export default EsicReport;

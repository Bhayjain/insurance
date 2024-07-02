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
 class CampaignArchive extends Component {
     render() {
         const campaign_view = Cookies.get('campaign_view');
        //  const book_your_home_page = Cookies.get('book_your_home_page');
        //  console.log("book_your_home_page",book_your_home_page);
         return (
             <PageWrap>
 
                 <div style={{display:campaign_view == "true"? "block" :"none"}}>
                     <AsyncComponent component={ () => import( './content' ) } />
                 </div>
             </PageWrap>
         );
     }
 }
 
 export default CampaignArchive;
 
/**
 * External Dependencies
 */
 import React, { Component, Fragment } from 'react';
 import { connect } from 'react-redux';
 import { Row, Col } from 'reactstrap';

 /**
  * Internal Dependencies
  */

  import './style.scss';
 import Snippet from '../../components/snippet';
 import Icon from '../../components/icon';
 import PageTitle from '../../components/page-title';
 import { Button, Modal, ModalBody, ModalFooter,CustomInput,Label,Spinner,ButtonGroup,Table } from 'reactstrap';
 import dateFormat from 'dateformat';
 import { RangeDatePicker } from 'react-google-flight-datepicker';
 import 'react-google-flight-datepicker/dist/main.css';
 import Cookies from 'js-cookie';

 const device_width =   window.innerWidth;
 var height =   window.innerHeight;
 //  ////console.log("admin_screen.height", height);
 const nav_height = document.querySelector('.rui-navbar-sticky').offsetHeight
 //  ////console.log("admin_nav_height",nav_height);
 var my_height = height - nav_height;
 var gk = (my_height/2)-100;
 //  ////console.log("admin_gk",gk);
 if(device_width < 600){
   var gk = (my_height/2) - 50;
 }
 /**
  * Component
  */
 class Content extends Component {
     constructor( props ) {
         super( props );

         this.state = {
             modalOpen: false,
             current_page:1,
             daily_sales_array: [],
             no_data:"none",
             isLoading:"block",
             total_pages:"",
             total:"",
             startDate:"",
             endDate:"",
             total_no_policy:"",
             total_net_of_policy:"",
             cal_start_date:"",
             cal_end_date:"",
             reporting_control:Cookies.get('reporting_control'),
         };
         setTimeout(() => {
            this.fetch_all_daily_sales_report()
            }, 0)
     }



     fetch_all_daily_sales_report = (startDate,endDate,pageNumber)=>  {

         if (pageNumber == '' || pageNumber == undefined) {
             this.setState({
                 current_page: 1
             })
             var page_no = 1
         } else {
             this.setState({
                 current_page: pageNumber
             })
             var page_no = pageNumber
         }
         if (startDate == "" || startDate == undefined || endDate == "" || endDate == undefined) {
             //console.log("startDate",startDate);
             //console.log("endDate",endDate);
         }
         else{
             //console.log("startDate",startDate);
             //console.log("endDate",endDate);

             const today = new Date(startDate);
             const yyyy = today.getFullYear();
             let mm = today.getMonth() + 1; // Months start at 0!
             let dd = today.getDate();
             if (dd < 10) dd = '0' + dd;
             if (mm < 10) mm = '0' + mm;
             const formattedToday_start = yyyy + '-' + mm + '-' + dd;
             //console.log("formattedToday",formattedToday_start);


             const today_end = new Date(endDate);
             const yyyy_end = today_end.getFullYear();
             let mm_end = today_end.getMonth() + 1; // Months start at 0!
             let dd_end = today_end.getDate();
                 //console.log("datttttttttttttttt",dd_end);
                 //console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",new Date(endDate).getDate());
                 if (dd_end < 10) {
                   var my_date ='0' + dd_end
                 }
                 else{
                   var my_date = dd_end
                 }
                 //console.log("my_date",my_date);
             if (dd_end < 10) dd_end = '0' + dd_end;
             if (mm_end < 10) mm_end = '0' + mm_end;

             const formattedToday_end = yyyy_end + '-' + mm_end + '-' + my_date;
             //console.log("formattedToday**************",formattedToday_end);
             var my_date = [formattedToday_start,formattedToday_end]
             this.setState({
                 date_range_for_export :my_date
             })
         }

         var params={
             page_no:page_no,
             date_range:my_date
         }
         //console.log("Reporttt",params);
         const { settings } = this.props;
          const res = fetch(settings.api_url + "fetch_insurer_wise_report", {
              method: 'POST',
              body: JSON.stringify(params),
              headers: {
                  "Content-type": "application/json; charset=UTF-8",
              }
          }).then((response) => response.json())
              .then(json => {
                  //console.log("fetch Isurer Wise Report ****", json)
                  var data = json;
                  if (data.status == true) {
                      this.setState({
                          daily_sales_array: data.data,
                          no_data:"none",
                          isLoading:"none",
                          total_pages: data.total_pages,
                          total_no_policy: data.total_policy,
                          total_net_of_policy: data.total_net_premium,
                          total_pages: data.total_pages,
                          total:data.total,
                      });
                  }
                  else {
                      this.setState({
                          daily_sales_array: [],
                          no_data:"block",
                          isLoading:"none",
                          total_net_of_policy: "",
                          total_no_policy: "",
                          total_pages: "",

                      });
                  }

                  this.setState({
                    cal_start_date:data.show_date.start_date,
                    cal_end_date:data.show_date.end_date,
                 })
              })
      }
     daily_sales_report = ()=>  {
         const { settings } = this.props;
         //console.log("this.state.date_range_for_export",this.state.date_range_for_export);
         var params={
            date_range:this.state.date_range_for_export
        }

        //console.log("Export Params",params);
          const res = fetch(settings.api_url + "export_insurer_wise_report", {
              method: 'POST',
              body: JSON.stringify(params),
              headers: {
                  "Content-type": "application/json; charset=UTF-8",
              }
          }).then((response) => response.json())
              .then(json => {
                  //console.log("fetch Export Insurer Wise Reportt ****", json)
                  var data = json;
                  if (data.status == true) {

                      window.open(data.path, "_blank");
                  }
                  else {
                    //console.log("kkkkk");
                  }
              })
      }

     render() {
         return (
             <Fragment>
                <PageTitle className="daily_heading">
                 <div className="row">
                  <div className="col-lg-8 col-md-12" style={{display:"inline-flex", width:"100%"}}>
                      <h1 style={{marginTop: "0px"}}>Insurer Business Wise<span className="time_datae" style={{display: this.state.isLoading =="none" ? "initial" :"none"}}> ({this.state.cal_start_date.split("-")[2] + "-" + this.state.cal_start_date.split("-")[1] + "-" +this.state.cal_start_date.split("-")[0] } to {this.state.cal_end_date.split("-")[2] + "-" + this.state.cal_end_date.split("-")[1] + "-" +this.state.cal_end_date.split("-")[0]})</span></h1>
                      {/* <Button style={{color:"#fff",marginLeft: "auto"}} onClick={ this.daily_sales_report }>Export</Button> */}
                 </div>
                  <div className="col-lg-4 col-md-12 top_view" style={{display:"inline-flex", width:"100%"}}>
                      <div className="date_pickerrr">
                         <RangeDatePicker
                                     name="daterange"
                                     startDate={this.state.startDate}
                                     endDate={this.state.endDate}
                                     onChange={(startDate, endDate) => {
                                         this.setState({
                                         startDate: startDate,
                                         endDate: endDate,
                                         daterang: [new Date(startDate).toISOString(), new Date(endDate).toISOString()]
                                         })
                                         this.fetch_all_daily_sales_report(startDate,endDate,this.state.current_page)
                                     }
                                     }
                                     minDate={new Date(1900, 0, 1)}
                                     maxDate={new Date(2100, 0, 1)}
                                     dateFormat="DD-MM-YYYY  "
                                     monthFormat="MM YYYY"
                                     startDatePlaceholder="Start Date"
                                     endDatePlaceholder="End Date"
                                     disabled={false}
                                     className="my-own-class-name nightclass a1"
                                     startWeekDay="monday"
                                     />
                             <Button disabled={this.state.reporting_control == "false" ? 'disabled' : ''} style={{color:"#fff",marginLeft: "12px"}} onClick={ this.daily_sales_report }>Export</Button>
                      </div>
                 </div>
                </div>
              </PageTitle>
              <Spinner color="warning" className="lead_spinner" style={{marginTop: gk, display: this.state.isLoading }} />
              <div className="table_start" style={{display: this.state.isLoading =="none" ? "block" :"none"}}>
              <h3 style={{ display: this.state.no_data, padding: "15px",textAlign:"center",color:" #a4a3a3",width: "100%",marginTop:gk}}>No Data Found</h3>
              {/* <div style={{display: this.state.no_data=="none" ? "block" :"none"}}> */}
              <div className="mycalendar" style={{display: this.state.no_data=="none" ? "block" :"none",height:my_height - 70}}>
                 <div className="table-responsive-lg scroll_1">
                 <Table striped>
                         <thead>
                             <tr>
                                 <th scope="col" className="table_head_new">Insurer</th>
                                 <th scope="col" className="table_head_new" style={{textAlign:"end"}}>No Of Policy</th>
                                 <th scope="col" className="table_head_new" style={{textAlign:"end"}}>NET Premium</th>
                             </tr>
                         </thead>
                         <tbody>
                             {this.state.daily_sales_array.map((value,index)=>{

                                 return(
                                     <tr key={index}>
                                     <th scope="row" className="table_sub_head">{value.insurer_name}</th>
                                     <td className="table_sub_head" style={{textAlign:"end"}}>{value.no_of_policy}</td>
                                     <td className="table_sub_head" style={{textAlign:"end"}}>&#x20b9; {value.net_premium}</td>
                                 </tr>
                                 )
                             })}
                              <tr >
                                     <th scope="row" className="table_sub_head total_new">Grand Total</th>
                                     <td className="table_sub_head total_new" style={{textAlign:"end"}}>{this.state.total_no_policy}</td>
                                     <td className="table_sub_head total_new" style={{textAlign:"end"}}>&#x20b9; {this.state.total_net_of_policy}</td>
                                 </tr>
                         </tbody>
                     </Table>
                 </div>
             </div>
         </div>
     </Fragment>
         );
     }
 }

 export default connect( ( { settings } ) => (
     {
         settings,
     }
 ) )( Content );

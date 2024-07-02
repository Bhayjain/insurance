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
 import Tabs from '../../components/tabs';

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
             startDate_deatiled:"",
             endDate_deatiled:"",
             total_amount_receivable:"",
             total_amount_receivable_new:"",
             total_net_of_policy:"",
             reporting_control:Cookies.get('reporting_control'),
             activeTab3: 'home',
             deatiled_pending_array:[],
             no_data_deatiled:"none",
             isLoading_deatiled:"block",
             cal_start_date:"",
             cal_end_date:"",
             search_user:"",
             search_user_1:"",
         };
         setTimeout(() => {
            this.fetch_all_daily_sales_report()
            }, 0)
         this.toggleTab = this.toggleTab.bind( this );
     }

     toggleTab( num, name ) {
        this.setState( {
            [ `activeTab${ num }` ]: name,
        } );
        if (name=="home") {
            this.fetch_all_daily_sales_report()
        }
        else{
            this.fetch_detailed_pending_payment_report()
        }
    }

     fetch_all_daily_sales_report = (search_sm,startDate,endDate,pageNumber)=>  {

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

         if (search_sm=="" || search_sm == undefined ) {
            var my_sm_search= undefined
          }
          else{
            var my_sm_search= search_sm

            this.setState({
                search_user:my_sm_search,
                
            })
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
                 date_range_for_export :my_date,
                 
             })
         }

         var params={
            //  page_no:page_no,
             date_range:my_date,
             search_by:my_sm_search
         }
         console.log("Reporttt",params);
         const { settings } = this.props;
          const res = fetch(settings.api_url + "fetch_pending_payment_report", {
              method: 'POST',
              body: JSON.stringify(params),
              headers: {
                  "Content-type": "application/json; charset=UTF-8",
              }
          }).then((response) => response.json())
              .then(json => {
                  console.log("fetch Pending Payment Report ****", json)
                  var data = json;
                  if (data.status == true) {
                      this.setState({
                          daily_sales_array: data.data,
                          no_data:"none",
                          isLoading:"none",
                          total_pages: data.total_pages,
                          total_net_of_policy: data.total_policy,
                          total_amount_receivable: data.total_amount_receivable,
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
                          total_amount_receivable: "",
                          total_pages: "",

                      });
                  }
                  this.setState({
                    cal_start_date:data.show_date.start_date,
                    cal_end_date:data.show_date.end_date,
                 })
              })
      }



    //   Fetch Deatiled API
    fetch_detailed_pending_payment_report = (search_sm,startDate,endDate,pageNumber)=>  {

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
                 date_range_for_export_detailed :my_date
             })
         }

         if (search_sm=="" || search_sm == undefined ) {
            var my_sm_search= undefined
          }
          else{
            var my_sm_search= search_sm

            this.setState({
                search_user_1:my_sm_search
            })
          }

         var params={
            //  page_no:page_no,
             date_range:my_date,
             search_by:my_sm_search
         }
         console.log("Detailed Params",params);
         const { settings } = this.props;
          const res = fetch(settings.api_url + "fetch_detailed_pending_payment_report", {
              method: 'POST',
              body: JSON.stringify(params),
              headers: {
                  "Content-type": "application/json; charset=UTF-8",
              }
          }).then((response) => response.json())
              .then(json => {
                  console.log("fetch Detailed Pending Payment Report ****", json)
                  var data = json;
                  if (data.status == true) {
                      this.setState({
                          deatiled_pending_array: data.data,
                          total_amount_receivable_new: data.total_amount_receivable,
                          no_data_deatiled:"none",
                          isLoading_deatiled:"none",
                      });
                  }
                  else {
                      this.setState({
                          deatiled_pending_array: [],
                          total_amount_receivable_new: "",
                          no_data_deatiled:"block",
                          isLoading_deatiled:"none",
                      });
                  }

                  this.setState({
                    cal_start_date:data.show_date.start_date,
                    cal_end_date:data.show_date.end_date,
                 })
              })
      }

      export_detailed_pending_payment_report = ()=>  {
         const { settings } = this.props;
         //console.log("this.state.date_range_for_export",this.state.date_range_for_export);
         if (this.state.search_user_1 == "") {
            var search = undefined
        }else{
            var search = this.state.search_user
        }
         var params={
            date_range:this.state.date_range_for_export_detailed,
            search_by:search
        }

        console.log("Export Params",params);
          const res = fetch(settings.api_url + "export_detailed_pending_payment_report", {
              method: 'POST',
              body: JSON.stringify(params),
              headers: {
                  "Content-type": "application/json; charset=UTF-8",
              }
          }).then((response) => response.json())
              .then(json => {
                  console.log("fetch Deatailedd Pending Payment Reportt ****", json)
                  var data = json;
                  if (data.status == true) {
                      window.open(data.path, "_blank");
                  }
                  else {
                    //console.log("kkkkk");
                  }
              })
      }

     daily_sales_report = ()=>  {
         const { settings } = this.props;
         //console.log("this.state.date_range_for_export",this.state.date_range_for_export);
         if (this.state.search_user == "") {
            var search = undefined
        }else{
            var search = this.state.search_user
        }
         var params={
            date_range:this.state.date_range_for_export,
            search_by:search
        }

        //console.log("Export Params",params);
          const res = fetch(settings.api_url + "export_pending_payment_report", {
              method: 'POST',
              body: JSON.stringify(params),
              headers: {
                  "Content-type": "application/json; charset=UTF-8",
              }
          }).then((response) => response.json())
              .then(json => {
                  //console.log("fetch Pending Payment Reportt ****", json)
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
                  <div className="col-lg-6 col-md-12" style={{display:"inline-flex", width:"100%"}}>
                      <h1 style={{marginTop: "0px"}}>Pending Payment&apos;s<span className="time_datae" style={{display: this.state.isLoading =="none" || this.state.isLoading_deatiled == "none" ? "initial" :"none"}}> ({this.state.cal_start_date.split("-")[2] + "-" + this.state.cal_start_date.split("-")[1] + "-" +this.state.cal_start_date.split("-")[0] } to {this.state.cal_end_date.split("-")[2] + "-" + this.state.cal_end_date.split("-")[1] + "-" +this.state.cal_end_date.split("-")[0]})</span></h1>
                      {/* <Button style={{color:"#fff",marginLeft: "auto"}} onClick={ this.daily_sales_report }>Export</Button> */}
                 </div>
                  <div className="col-lg-6 col-md-12 top_view" style={{display:this.state.activeTab3 == 'home' ? "inline-flex" : "none", width:"100%"}}>
                  <div>
                     <input
                       style={{marginTop:"1px",marginRight:"12px",width:"230px"}}
                       type="text"
                       className="form-control serach_smmm_22"
                       aria-describedby="emailHelp"
                       placeholder="Search by Employee Name"
                       value={this.state.search_user}
                       onChange={(e) => {
                        this.setState({
                          search_user:e.target.value
                        })
                        this.fetch_all_daily_sales_report(e.target.value,this.state.startDate,this.state.endDate,this.state.current_page)
                       }}
                  />
                     </div>
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
                                         this.fetch_all_daily_sales_report(this.state.search_user,startDate,endDate,this.state.current_page)
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
                  <div className="col-lg-6 col-md-12 top_view" style={{display:this.state.activeTab3 == 'profile' ? "inline-flex" : "none", width:"100%"}}>
                  <div>
                     <input
                       style={{marginTop:"1px",marginRight:"12px",width:"230px"}}
                       type="text"
                       className="form-control serach_smmm_22"
                       aria-describedby="emailHelp"
                       placeholder="Search by Employee Name"
                       value={this.state.search_user}
                       onChange={(e) => {
                        this.setState({
                          search_user:e.target.value
                        })
                        this.fetch_detailed_pending_payment_report(e.target.value,this.state.startDate_deatiled,this.state.endDate_deatiled,this.state.current_page)
                       }}
                  />
                     </div>
                      <div className="date_pickerrr">
                         <RangeDatePicker
                                     name="daterange"
                                     startDate={this.state.startDate_deatiled}
                                     endDate={this.state.endDate_deatiled}
                                     onChange={(startDate, endDate) => {
                                         this.setState({
                                            startDate_deatiled: startDate,
                                            endDate_deatiled: endDate,
                                         daterang: [new Date(startDate).toISOString(), new Date(endDate).toISOString()]
                                         })
                                         this.fetch_detailed_pending_payment_report(this.state.search_user_1,startDate,endDate,this.state.current_page)
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
                             <Button disabled={this.state.reporting_control == "false" ? 'disabled' : ''} style={{color:"#fff",marginLeft: "12px"}} onClick={ this.export_detailed_pending_payment_report }>Export</Button>
                      </div>
                 </div>
                </div>
              </PageTitle>

              <Tabs pills className="pending_pending_data">
                        <Tabs.NavItem
                            isActive={ this.state.activeTab3 === 'home' }
                            onClick={ () => {
                                this.setState({
                                    isLoading:"block"
                                })
                                this.toggleTab( 3, 'home' )} }
                            className="summary_data"
                        >
                            Summary
                        </Tabs.NavItem>
                        <Tabs.NavItem
                            isActive={ this.state.activeTab3 === 'profile' }
                            onClick={ () => {
                                this.setState({
                                    isLoading:"block"
                                })
                                this.toggleTab( 3, 'profile' )} }
                            className="summary_data"
                        >
                            Detailed
                        </Tabs.NavItem>
                    </Tabs>
                    <Tabs.Content activeTab={ this.state.activeTab3 }>
                        <Tabs.Pane tabId="home">
                        <Spinner color="warning" className="lead_spinner" style={{marginTop: gk, display: this.state.isLoading }} />
                            <div className="table_start" style={{display: this.state.isLoading =="none" ? "block" :"none"}}>
                            <h3 style={{ display: this.state.no_data, padding: "15px",textAlign:"center",color:" #a4a3a3",width: "100%",marginTop:gk}}>No Data Found</h3>
                            {/* <div style={{display: this.state.no_data=="none" ? "block" :"none"}}> */}
                            <div className="mycalendar" style={{display: this.state.no_data=="none" ? "block" :"none",height:my_height - 132}}>
                                <div className="table-responsive-lg scroll_1">
                                <Table striped>
                                        <thead>
                                            <tr>
                                                <th scope="col" className="table_head_new">Employee Name</th>
                                                <th scope="col" className="table_head_new" style={{textAlign:"end"}}>No Of Policy</th>
                                                <th scope="col" className="table_head_new" style={{textAlign:"end"}}>Receivable Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.daily_sales_array.map((value,index)=>{

                                                return(
                                                    <tr key={index}>
                                                    <th scope="row" className="table_sub_head">{value.name}</th>
                                                    <td className="table_sub_head" style={{textAlign:"end"}}>{value.no_of_policy}</td>
                                                    <td className="table_sub_head" style={{textAlign:"end"}}>&#x20b9; {value.amount_receivable}</td>
                                                </tr>
                                                )
                                            })}
                                            <tr >
                                                    <th scope="row" className="table_sub_head total_new">Grand Total</th>
                                                    <td className="table_sub_head total_new" style={{textAlign:"end"}}>{this.state.total_net_of_policy}</td>
                                                    <td className="table_sub_head total_new" style={{textAlign:"end"}}>&#x20b9; {this.state.total_amount_receivable}</td>
                                                </tr>


                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                            </div>
                          </Tabs.Pane>


                        <Tabs.Pane tabId="profile">
                        <Spinner color="warning" className="lead_spinner" style={{marginTop: gk, display: this.state.isLoading_deatiled }} />
                            <div className="table_start" style={{display: this.state.isLoading_deatiled =="none" ? "block" :"none"}}>
                            <h3 style={{ display: this.state.no_data_deatiled, padding: "15px",textAlign:"center",color:" #a4a3a3",width: "100%",marginTop:gk}}>No Data Found</h3>
                            <div style={{display: this.state.no_data_deatiled=="none" ? "block" :"none"}}>
                                <div className="table-responsive-lg scroll_1">
                                <Table striped>
                                        <thead>
                                            <tr>
                                                <th scope="col" className="table_head_new">Employee Name</th>
                                                <th scope="col" className="table_head_new" style={{textAlign:"end"}}>Policy Number</th>
                                                <th scope="col" className="table_head_new" style={{textAlign:"end"}}>Issue Date</th>
                                                <th scope="col" className="table_head_new" style={{textAlign:"end"}}>Customer Name</th>
                                                <th scope="col" className="table_head_new" style={{textAlign:"end"}}>Insurer</th>
                                                <th scope="col" className="table_head_new" style={{textAlign:"end"}}>Net Premium</th>
                                                <th scope="col" className="table_head_new" style={{textAlign:"end"}}>Gross Premium</th>
                                                <th scope="col" className="table_head_new" style={{textAlign:"end"}}>PO/Discount % </th>
                                                <th scope="col" className="table_head_new" style={{textAlign:"end"}}> Amount Receivable Rs</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.deatiled_pending_array.map((value,index)=>{

                                                return(
                                                    <tr key={index}>
                                                    <th scope="row" className="table_sub_head">{value.sm_name}</th>
                                                    <td className="table_sub_head" style={{textAlign:"end"}}>{value.section_details[0].policy_number}</td>
                                                    <td className="table_sub_head" style={{textAlign:"end"}}> {dateFormat(new Date(value.section_details[0].issue_date.replace("Z", "")), "dd-mm-yyyy")}</td>
                                                    <td className="table_sub_head" style={{textAlign:"end"}}> {value.name}</td>
                                                    <td className="table_sub_head" style={{textAlign:"end"}}>{value.section_details[0].insurer_array_new.label}</td>
                                                    <td className="table_sub_head" style={{textAlign:"end"}}>&#x20b9; {value.section_details[0].net_premium}</td>
                                                    <td className="table_sub_head" style={{textAlign:"end"}}>&#x20b9; {value.section_details[0].gross_premium}</td>
                                                    <td className="table_sub_head" style={{textAlign:"end"}}> {value.section_details[0].po_discount_in_percent} % </td>
                                                    <td className="table_sub_head" style={{textAlign:"end"}}>&#x20b9; {value.section_details[0].amount_receivable}</td>
                                                </tr>
                                                )
                                            })}
                                            <tr >
                                                    <th scope="row" colSpan="8" className="table_sub_head total_new">Grand Total</th>
                                                    <td className="table_sub_head total_new" style={{textAlign:"end"}}>&#x20b9; {this.state.total_amount_receivable_new}</td>
                                                </tr>


                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                            </div>
                          </Tabs.Pane>

                    </Tabs.Content>




             </Fragment>
         );
     }
 }

 export default connect( ( { settings } ) => (
     {
         settings,
     }
 ) )( Content );

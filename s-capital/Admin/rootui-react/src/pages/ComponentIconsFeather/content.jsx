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


import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'


const device_width =   window.innerWidth;
var height =   window.innerHeight;
//  ////////console.log("admin_screen.height", height);
const nav_height = document.querySelector('.rui-navbar-sticky').offsetHeight
//  ////////console.log("admin_nav_height",nav_height);
var my_height = height - nav_height;
var gk = (my_height/2)-100;
//  ////////console.log("admin_gk",gk);
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
            cal_start_date:"",
            cal_end_date:"",
            search_user:"",
            reporting_control:Cookies.get('reporting_control'),
            export_bn_show:false
        };
       
        setTimeout(() => {
            this.fetch_all_daily_sales_report()
            }, 0)
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
                search_user:my_sm_search
            })
          }
        if (startDate == "" || startDate == undefined || endDate == "" || endDate == undefined) {
            //////console.log("startDate",startDate);
            //////console.log("endDate",endDate);
        }
        else{
            //////console.log("startDate",startDate);
            //////console.log("endDate",endDate);

            const today = new Date(startDate);
            const yyyy = today.getFullYear();
            let mm = today.getMonth() + 1; // Months start at 0!
            let dd = today.getDate();
            if (dd < 10) dd = '0' + dd;
            if (mm < 10) mm = '0' + mm;
            const formattedToday_start = yyyy + '-' + mm + '-' + dd;
            //////console.log("formattedToday",formattedToday_start);


            const today_end = new Date(endDate);
            const yyyy_end = today_end.getFullYear();
            let mm_end = today_end.getMonth() + 1; // Months start at 0!
            let dd_end = today_end.getDate();
                //////console.log("datttttttttttttttt",dd_end);
                //////console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",new Date(endDate).getDate());
                if (dd_end < 10) {
                  var my_date ='0' + dd_end
                }
                else{
                  var my_date = dd_end
                }
                //////console.log("my_date",my_date);
            if (dd_end < 10) dd_end = '0' + dd_end;
            if (mm_end < 10) mm_end = '0' + mm_end;

            const formattedToday_end = yyyy_end + '-' + mm_end + '-' + my_date;
            //////console.log("formattedToday**************",formattedToday_end);
            var my_date = [formattedToday_start,formattedToday_end]
            this.setState({
                date_range_for_export :my_date
            })
        }

        var params={
            page_no:page_no,
            date_range:my_date,
            search_by:my_sm_search
        }
         console.log("Reporttt",params);
        const { settings } = this.props;
         const res = fetch(settings.api_url + "fetch_all_daily_sales_report", {
             method: 'POST',
             body: JSON.stringify(params),
             headers: {
                 "Content-type": "application/json; charset=UTF-8",
             }
         }).then((response) => response.json())
             .then(json => {
        console.log("fetch Daily Sales Report ****=======", json)
                 var data = json;
                 if (data.status == true) {
                     this.setState({
                         daily_sales_array: data.data,
                         no_data:"none",
                         isLoading:"none",
                         total_pages: data.total_pages,
                         total:data.total,
                         export_bn_show:false
                     });
                 }
                 else {
                     this.setState({
                         daily_sales_array: [],
                         no_data:"block",
                         isLoading:"none",
                         total_pages:1,
                         export_bn_show:true
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

        if (this.state.search_user == "") {
            var search = undefined
        }else{
            var search = this.state.search_user
        }
        var params={
            date_range:this.state.date_range_for_export,
            search_by:search
        }
        // console.log("params",params);
         const res = fetch(settings.api_url + "export_daily_sales_report", {
             method: 'POST',
             body: JSON.stringify(params),
             headers: {
                 "Content-type": "application/json; charset=UTF-8",
             }
         }).then((response) => response.json())
             .then(json => {
                console.log("fetch Export Sales Reportt ****", json)
                 var data = json;
                 if (data.status == true) {

                     window.open(data.path, "_blank");
                 }
                 else {
                   //////console.log("kkkkk");
                 }
             })
     }

    render() {

        const pageNumbers = [];
      if (this.state.total !== null) {
          for (let i = 1; i <= Math.ceil(this.state.total_pages / 1); i++) {
              pageNumbers.push(i);
          }


          var renderPageNumbers = pageNumbers.map(number => {
              let classes = this.state.current_page === number ? '' : '';

              return (
                  <div key={number} style={{
                      display: 'inline-flex'
                  }}>
                      {/* <span style={{display:this.state.current_page === 1 ? 'none' : 'block'}}> */}

                      <Button color="warning" outline
                      style={{
                          backgroundColor: this.state.current_page === number ? '#8bc240' : 'white', color: this.state.current_page === number ? 'white' : '#8bc240',marginRight:"5px",
                          display: this.state.current_page === number ? "block" : 'none'}}
                          className={classes,"pagination_1"}
                          onClick={() => {
                              this.fetch_all_daily_sales_report(this.state.search_user,this.state.startDate,this.state.endDate,number)
                                  , this.setState({
                                      current_page: number,
                                      spinner_1: 'block'
                                  })
                          }}

                      >{number}</Button>
                      <Button color="warning" outline
                      style={{
                          display: this.state.current_page === number ? this.state.current_page === this.state.total_pages ? "none" : "block" : 'none',
                          backgroundColor: this.state.current_page === number ? '' : '#8bc240', color: this.state.current_page === number ? '#8bc240' : 'white' }}
                          className={classes,"pagination_1"}
                          onClick={() => {
                              this.fetch_all_daily_sales_report(this.state.search_user,this.state.startDate,this.state.endDate,number + 1)
                              if (this.state.current_page === this.state.total_pages) {
                                  this.setState({
                                      current_page: number
                                  })
                              } else {
                                  this.setState({
                                      current_page: number + 1,
                                      spinner_1: 'block'
                                  })
                              }

                          }}

                      >{number + 1}</Button>

                  </div>
              );
          });
      }


        return (
            <Fragment>
               <PageTitle className="daily_heading">
                <div className="row">
                 <div className="col-lg-6 col-md-12" style={{display:"inline-flex", width:"100%"}}>
                     <h1 style={{marginTop: "0px"}}>Daily Sales Report <span className="time_datae" style={{display: this.state.isLoading =="none" ? "initial" :"none"}}> ({this.state.cal_start_date.split("-")[2] + "-" + this.state.cal_start_date.split("-")[1] + "-" +this.state.cal_start_date.split("-")[0] } to {this.state.cal_end_date.split("-")[2] + "-" + this.state.cal_end_date.split("-")[1] + "-" +this.state.cal_end_date.split("-")[0]})</span> </h1>
                     {/* <Button style={{color:"#fff",marginLeft: "auto"}} onClick={ this.daily_sales_report }>Export</Button> */}
                </div>
                 <div className="col-lg-6 col-md-12 top_view" style={{display:"inline-flex", width:"100%"}}>
                     <div>
                     <input
                       style={{marginTop:"1px",marginRight:"12px",width:"230px"}}
                       type="text"
                       className="form-control serach_smmm_22 withhh_new"
                       aria-describedby="emailHelp"
                       placeholder="Search by SM Name"
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
                            <Button disabled={this.state.reporting_control == "false" ? 'disabled' : ''} style={{color:"#fff",marginLeft: "12px", display :  this.state.export_bn_show == true ? "none" : "block" }} onClick={ this.daily_sales_report }>Export</Button>
                     </div>
                </div>
               </div>
             </PageTitle>
             <Spinner color="warning" className="lead_spinner" style={{marginTop: gk, display: this.state.isLoading }} />
            
            
             {/* <SkeletonTheme baseColor="#e6ecf0" highlightColor="#8bc240">    
    <p>
      <Skeleton count={3} />
    </p>
    </SkeletonTheme> */}



              <div className="table_start" style={{display: this.state.isLoading =="none" ? "block" :"none"}}>
             <h3 style={{ display: this.state.no_data, padding: "15px",textAlign:"center",color:" #a4a3a3",width: "100%",marginTop:gk}}>No Data Found</h3>
             <div className="mycalendar" style={{display: this.state.no_data=="none" ? "block" :"none",height:this.state.total_pages==1 ? (my_height - 70) : (my_height - 141) }}>
                <div className="table-responsive-lg scroll_1">
                <Table striped>
                        <thead>
                            <tr>
                                <th scope="col" className="table_head_new">Date</th>
                                <th scope="col" className="table_head_new">Policy Issued By</th>
                                <th scope="col" className="table_head_new">Policy Sourced By (SM)</th>
                                {/* <th scope="col" className="table_head_new">Policy Sorced By (SM)</th> */}
                                <th scope="col" className="table_head_new">Policy Number</th>
                                <th scope="col" className="table_head_new">RTO Cluster</th>
                                <th scope="col" className="table_head_new">Vehicle Number</th>
                                <th scope="col" className="table_head_new">RTO Location</th>
                                <th scope="col" className="table_head_new">Policy Start Date </th>
                                <th scope="col" className="table_head_new">Policy End Date </th>
                                <th scope="col" className="table_head_new">Issue Date </th>
                                <th scope="col" className="table_head_new">Customer Name </th>
                                <th scope="col" className="table_head_new">Fleet or Non Fleet </th>
                                <th scope="col" className="table_head_new">Contact Number </th>
                                {/* <th scope="col" className="table_head_new">Class of Vehicle </th>
                                <th scope="col" className="table_head_new">Sub Class </th> */}
                                <th scope="col" className="table_head_new">Motor/Non Motor </th>
                                <th scope="col" className="table_head_new">Motor Type</th>
                                <th scope="col" className="table_head_new">Sub Motor Type</th>
                                <th scope="col" className="table_head_new">Type of Policy</th>
                                {/* <th scope="col" className="table_head_new">Two Wheeler</th>
                                <th scope="col" className="table_head_new">MISC D</th>
                                <th scope="col" className="table_head_new">Commercial</th> */}
                                {/* <th scope="col" className="table_head_new">GVW/PCV</th> */}
                                {/* <th scope="col" className="table_head_new">Seat Capacity</th> */}
                                {/* <th scope="col" className="table_head_new">GVW</th> */}
                                <th scope="col" className="table_head_new">Type of MIS-D </th>
                                {/* <th scope="col" className="table_head_new">Type of Policy </th> */}
                                <th scope="col" className="table_head_new">Make </th>
                                <th scope="col" className="table_head_new">Model </th>
                                <th scope="col" className="table_head_new">CC/GVW/PCC </th>
                                <th scope="col" className="table_head_new">GVW Category </th>
                                <th scope="col" className="table_head_new">NCB </th>
                                <th scope="col" className="table_head_new">Add On &apos;s </th>
                                <th scope="col" className="table_head_new">Fule Type </th>
                                <th scope="col" className="table_head_new">Insurer </th>
                                <th scope="col" className="table_head_new" style={{textAlign:"end"}}>OD+Addon Premium </th>
                                <th scope="col" className="table_head_new" style={{textAlign:"end"}}>Net Premium </th>
                                <th scope="col" className="table_head_new" style={{textAlign:"end"}}>Gross Premium </th>
                                <th scope="col" className="table_head_new" style={{textAlign:"end"}}>Amount Receivable Rs. </th>
                                <th scope="col" className="table_head_new">PO on  </th>
                                <th scope="col" className="table_head_new">Type of Payout </th>
                                <th scope="col" className="table_head_new">Agent/Telecaller Name </th>
                                {/* <th scope="col" className="table_head_new">Telecaller Name </th>
                                <th scope="col" className="table_head_new">Agent/Dealer Name </th> */}
                                <th scope="col" className="table_head_new">PO % </th>
                                <th scope="col" className="table_head_new" style={{textAlign:"end"}}>PO Amount </th>
                                <th scope="col" className="table_head_new">PO Status </th>
                                <th scope="col" className="table_head_new">Mode of Premium Payment by SC </th>
                                <th scope="col" className="table_head_new">Physical Cheque received </th>
                                <th scope="col" className="table_head_new">Cheque Number </th>
                                <th scope="col" className="table_head_new">Cheque Date </th>
                                <th scope="col" className="table_head_new">Bank Name </th>
                                <th scope="col" className="table_head_new">Cheque No. 1 </th>
                                <th scope="col" className="table_head_new" style={{textAlign:"end"}}>Amount </th>
                                <th scope="col" className="table_head_new">Cheque No. 2 </th>
                                <th scope="col" className="table_head_new" style={{textAlign:"end"}}>Amount </th>
                                <th scope="col" className="table_head_new">Cheque No. 3 </th>
                                <th scope="col" className="table_head_new" style={{textAlign:"end"}}>Amount </th>
                                <th scope="col" className="table_head_new">Remarks </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.daily_sales_array.map((value,index)=>{

                                return(
                                    <tr key={index} >
                                    <th scope="row" className="table_sub_head">{value.added_date.split("-")[2] + "-" + value.added_date.split("-")[1] + "-" +value.added_date.split("-")[0] }</th>
                                    <td className="table_sub_head">{value.policy_issued_by}</td>
                                    <td className="table_sub_head">{value.policy_sourced_by}</td>
                                    <td className="table_sub_head">{value.policy_number}</td>
                                    <td className="table_sub_head">{value.rto_cluster ? value.rto_cluster.label : value.rto_cluster}</td>
                                    <td className="table_sub_head" style={{textTransform:"uppercase"}}>{value.vehicle_number}</td>
                                    <td className="table_sub_head">{value.rto_location}</td>
                                    <td className="table_sub_head">{dateFormat(new Date(value.new_start_date.replace("Z", "")), "dd-mm-yyyy")}</td>
                                    <td className="table_sub_head">{dateFormat(new Date(value.new_end_date.replace("Z", "")), "dd-mm-yyyy")}</td>
                                    <td className="table_sub_head">{dateFormat(new Date(value.issue_date.replace("Z", "")), "dd-mm-yyyy")}</td>
                                    <td className="table_sub_head">{value.customer_name}</td>
                                    <td className="table_sub_head">{value.fleet_type}</td>
                                    <td className="table_sub_head">{value.contact_no}</td>
                                    <td className="table_sub_head">{value.motor_non_motor ? value.motor_non_motor.label :""}</td>
                                    <td className="table_sub_head">{value.type_of_motor ? value.type_of_motor.label :""}</td>
                                    <td className="table_sub_head">
                                        <div style={{display:value.type_of_motor ? (value.type_of_motor.label=="Private car"? "block" :"none"):"none"}}>
                                        {value.private_car_data ? value.private_car_data.label :""}
                                        </div>
                                        <div style={{display:value.type_of_motor ? (value.type_of_motor.label=="Two Wheeler"? "block" :"none"):"none"}}>
                                        {value.two_wheeler ? value.two_wheeler.label :""}
                                        </div>
                                        <div style={{display:value.type_of_motor ? (value.type_of_motor.label=="Commercial"? "block" :"none"):"none"}}>
                                        {value.comercial_data ? value.comercial_data.label :""}
                                        </div>
                                        <div style={{display:value.type_of_motor ? (value.type_of_motor.label=="MISC D"? "block" :"none"):"none"}}>
                                        {value.miscd_data ? value.miscd_data.label :""}
                                        </div>
                                    </td>
                                    {/* <td className="table_sub_head">{value.private_car_data ? value.private_car_data.label :""}</td>
                                    <td className="table_sub_head">{value.two_wheeler ? value.two_wheeler.label :""}</td>
                                    <td className="table_sub_head">{value.miscd_data ? value.miscd_data.label :""}</td>
                                    <td className="table_sub_head">{value.comercial_data ? value.comercial_data.label :""}</td> */}
                                    {/* <td className="table_sub_head">
                                        <div style={{display:value.comercial_data ? (value.comercial_data.label == "PCV" ? "block" :"none"):"none"}}>{value.pvc_type ? value.pvc_type.label :""}</div>
                                        <div style={{display:value.comercial_data ? (value.comercial_data.label == "GCV" ? "block" :"none"):"none"}}>{value.gcv_data}</div>
                                        
                                        </td> */}
                                    {/* <td className="table_sub_head">{value.pvc_capacity}</td> */}
                                    {/* <td className="table_sub_head">{value.gcv_data}</td> */}
                                    {/* <td className="table_sub_head">{value.contact_no}</td>
                                    <td className="table_sub_head">{value.contact_no}</td> */}
                                    <td className="table_sub_head">{value.liabilty_or_comprehensive ?  value.liabilty_or_comprehensive.label : ""}</td>
                                    <td className="table_sub_head">{value.type_of_mis_d}</td>
                                    {/* <td className="table_sub_head">{value.type_of_policy.label}</td> */}
                                    <td className="table_sub_head">{value.make}</td>
                                    <td className="table_sub_head">{value.model}</td>
                                    <td className="table_sub_head">{value.cc_gvw_pcc}</td>
                                    <td className="table_sub_head">{value.gvw_category}</td>
                                    <td className="table_sub_head">{value.ncb_type ? value.ncb_type.label : ""}</td>
                                    <td className="table_sub_head">{value.add_on_type}</td>
                                    <td className="table_sub_head">{value.fuel_type.label}</td>
                                    <td className="table_sub_head">{value.insurer_array_new.label}</td>
                                    <td className="table_sub_head" style={{textAlign:"end"}}>{value.addon_premium}</td>
                                    <td className="table_sub_head" style={{textAlign:"end"}}>{value.net_premium}</td>
                                    <td className="table_sub_head" style={{textAlign:"end"}}>{value.gross_premium}</td>
                                    <td className="table_sub_head" style={{textAlign:"end"}}>&#x20b9;{value.amount_receivable}</td>
                                    <td className="table_sub_head">{value.po_on_type == "od_premium" ? "OD Premium" : "Net Premium"}</td>
                                    <td className="table_sub_head">{value.type_of_payout.label}</td>
                                    <td className="table_sub_head">
                                        <div style={{display:value.agent_or_tellcalling.label == "Agent/Dealer"}}>{value.agent_dealer_name.label}</div>
                                        <div style={{display:value.agent_or_tellcalling.label == "Telecalling"}}>{value.tele_caller_name.label}</div>
                                        </td>
                                    {/* <td className="table_sub_head">{value.tele_caller_name.label}</td>
                                    <td className="table_sub_head">{value.agent_dealer_name.label}</td> */}
                                    <td className="table_sub_head">{value.po_discount_in_percent} %</td>
                                    <td className="table_sub_head" style={{textAlign:"end"}}>&#x20b9;{value.po_discount_amount}</td>
                                    <td className="table_sub_head">{value.po_discount_status}</td>
                                    <td className="table_sub_head">{value.mode_of_premium_payment.label}</td>
                                    <td className="table_sub_head">{value.physical_cheque_received}</td>
                                    <td className="table_sub_head">{value.cheque_no}</td>
                                    <td className="table_sub_head">{value.new_cheque_date ? dateFormat(new Date(value.new_cheque_date.replace("Z", "")), "dd-mm-yyyy"):""}</td>
                                    <td className="table_sub_head">{value.bank_name}</td>
                                    <td className="table_sub_head">{value.cheque_array ? (value.cheque_array[0] ? value.cheque_array[0].cheque_object.label : ""):""}</td>
                                    <td className="table_sub_head" style={{textAlign:"end"}}><span style={{display:value.cheque_array ? (value.cheque_array[0] ? "block" : "none"):"none"}}>&#x20b9;{value.cheque_array ? (value.cheque_array[0] ? value.cheque_array[0].policy_amount : ""):""}</span></td>
                                    <td className="table_sub_head">{value.cheque_array ? (value.cheque_array[1] ? value.cheque_array[1].cheque_object.label : ""):""}</td>
                                    <td className="table_sub_head" style={{textAlign:"end"}}><span style={{display:value.cheque_array ? (value.cheque_array[1] ? "block" : "none"):"none"}}>&#x20b9;{value.cheque_array ? (value.cheque_array[1] ? value.cheque_array[1].policy_amount : ""):""}</span></td>
                                    <td className="table_sub_head">{value.cheque_array ? (value.cheque_array[2] ? value.cheque_array[2].cheque_object.label : ""):""}</td>
                                    <td className="table_sub_head" style={{textAlign:"end"}}><span style={{display:value.cheque_array ? (value.cheque_array[2] ? "block" : "none"):"none"}}>&#x20b9;{value.cheque_array ? (value.cheque_array[2] ? value.cheque_array[2].policy_amount : ""):""}</span></td>
                                    <td className="table_sub_head">{value.policy_remarks}</td>
                                </tr>
                                )
                            })}


                        </tbody>
                    </Table>
                </div>
            </div>

             {/* ********************************* Pagination ***************************************** */}

             <div style={{display:this.state.total_pages==1?"none":'inline-flex',width:"100%",marginTop:"10px",marginBottom:"20px",padding: "1px 8px"}}>
                              <Button color="warning" className="pagination_1"
                              style={{ marginLeft:"auto",marginRight:"5px"}}
                              outline onClick={() => this.fetch_all_daily_sales_report(this.state.search_user,this.state.startDate,this.state.endDate,1)}>first</Button>


                              <Button color="warning" className="pagination_1"
                              style={{marginLeft:"5px",marginRight:"5px",backgroundColor: this.state.current_page == 1 ? '#8bc240' : '',
                              color: this.state.current_page == 1 ? 'white' : '#8bc240',display: this.state.current_page == 1 ? "none" : "block"}} outline
                              onClick={() => {
                                  if (this.state.current_page > 1) {
                                    this.fetch_all_daily_sales_report(this.state.search_user,this.state.startDate,this.state.endDate,this.state.current_page - 1)
                                  } else {
                                    this.fetch_all_daily_sales_report(this.state.search_user,this.state.startDate,this.state.endDate,this.state.current_page)
                                  }
                              }}
                              >Previous</Button>
                                {/*{renderPageNumbers}*/}
                                {renderPageNumbers}

                              <Button color="warning" className="pagination_1"
                              style={{marginLeft:"5px",backgroundColor: this.state.current_page == this.state.total_pages ? '#8bc240' : '',
                              display: this.state.current_page == this.state.total_pages ? "none" : "block",
                              color: this.state.current_page == this.state.total_pages ? 'white' : '#8bc240'}} outline
                              onClick={() => {
                                  if (this.state.current_page < this.state.total_pages) {
                                      this.fetch_all_daily_sales_report(this.state.search_user,this.state.startDate,this.state.endDate,this.state.current_page + 1)
                                  } else {
                                      this.fetch_all_daily_sales_report(this.state.search_user,this.state.startDate,this.state.endDate,this.state.current_page)
                                  }
                              }}
                              >next</Button>
                              <Button color="warning" className="pagination_1"
                              style={{marginLeft:"5px",marginRight:"3px"}}
                              outline onClick={() => this.fetch_all_daily_sales_report(this.state.search_user,this.state.startDate,this.state.endDate,this.state.total_pages)}>last</Button>
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

/**
 * External Dependencies
 */
 import "./style.scss";

 import React, { Component, Fragment } from 'react';
 import { connect } from 'react-redux';
import DatePicker from '../../components/date-time-picker';
import PageTitle from '../../components/page-title';
import Cookies from 'js-cookie';


 /**
  * Internal Dependencies
  */
 import Snippet from '../../components/snippet';
 import MarkdownEditor from '../../components/easy-mde';
 import {
    Badge,Button, Collapse, ListGroup, ListGroupItem,Spinner,Table,ButtonGroup,Input, Modal, ModalBody,Tooltip,UncontrolledTooltip, ModalFooter,Label,CustomInput
  } from 'reactstrap';

 /**
  * Component
  */

  const device_width =   window.innerWidth;
  var height =   window.innerHeight;
  console.log("emp_screen.height", height);
  const nav_height = document.querySelector('.rui-navbar-sticky').offsetHeight
  console.log("emp_nav_height",nav_height);
  var my_height = height - nav_height;
  var gk = (my_height/2)-100;
  console.log("emp_gk",gk);
  if(device_width < 600){
    var gk = (my_height/2) - 50;
  }

 class Content extends Component {
    constructor( props ) {
        super( props );

        this.state = {
            firstVal: '',
            secondVal: '',
            sort_date: new Date(),
            pf_array:[],
            isLoading:"block",
            no_data_message:"none",
            loading:false,
        pf_control : Cookies.get("genral_report_control")

        };
        this.pf_report(this.state.sort_date)
    }

    pf_report = (sort_date)=>  {
        const { settings } = this.props;
            const today = new Date(sort_date);
            const yyyy = today.getFullYear();
            let mm = today.getMonth() + 1; // Months start at 0!
            if (mm < 10) mm = '0' + mm;
            var formattedToday_start = yyyy + '-' + mm ;
            var my_date  =formattedToday_start
            var params = {
                sort_date : my_date
            }
     console.log("params",params);
         const res = fetch(settings.api_url + "api/payroll/pf_report", {
             method: 'POST',
             body: JSON.stringify(params),
             headers: {
                 "Content-type": "application/json; charset=UTF-8",
             }
         }).then((response) => response.json())
             .then(json => {
                 console.log("Fetch PF ***************", json)
                 var data = json;
                 if (data.status == true) {
                     this.setState({
                      pf_array: data.data,
                      isLoading:"none",
                      no_data_message:"none",
                     });
                 }
                 else {
                     this.setState({
                      pf_array: [],
                      isLoading:"none",
                      no_data_message:"block",
                     });
                 }
             })
          }


    export_pf_report = ()=>  {
        this.setState({
            loading:true
        })
        const { settings } = this.props;
        const today = new Date(this.state.sort_date);
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1; // Months start at 0!
        if (mm < 10) mm = '0' + mm;
        var formattedToday_start = yyyy + '-' + mm ;
        var my_date  =formattedToday_start
            var params = {
                sort_date :my_date
            }
     console.log("Export params",params);
         const res = fetch(settings.api_url + "api/payroll/export_pf_report", {
             method: 'POST',
             body: JSON.stringify(params),
             headers: {
                 "Content-type": "application/json; charset=UTF-8",
             }
         }).then((response) => response.json())
             .then(json => {
                 console.log("Exportt PF ***************", json)
                 var data = json;
                 if (data.status == true) {
                    window.open(data.path, "_blank");
                    this.setState({
                        loading:false
                    })
                 }
                 else {
                    this.setState({
                        loading:false
                    })
                 }
             })
          }


     render() {
         return (
             <Fragment>
                 <PageTitle className="payroll_new">
                      <div className="row">
                         <div className="col-lg-8 col-md-4 col-sm-12">
                             <h1 className="heading_top">PF Report</h1>
                         </div>
                         <div className="col-lg-3 col-md-4 col-sm-12">
                         <DatePicker
                           selected={this.state.sort_date}
                           onChange={(val) => {
                               this.setState({
                                   sort_date: val,
                               });
                               this.pf_report(val)

                          }}
                          dateFormat="MM-yyyy"
                          showMonthYearPicker
                          className="rui-datetimepicker form-control w-auto_12 search_1 "
                          placeholder="Select Month"
                        />
                      </div>
                      <div className="col-lg-1 col-md-4 col-sm-12" style={{paddingLeft:"0px", textAlign:"end"}}>
                            <Button  disabled={this.state.pf_control == "false" ? true : false} onClick={()=>this.export_pf_report()}>Export{this.state.loading ? (
                                                                <Spinner />
                                                            ) : ''}</Button>
                         </div>

                      </div>
                  </PageTitle>
                  <div className="test_collapse ">
                  <Spinner color="warning" className="spinner_css_12345666" style={{marginTop:gk,display: this.state.isLoading}}/>
                  <div className="test_collapse" style={{display: this.state.isLoading=="none" ? "flex" :"none"}}>
                     <h3 style={{ display: this.state.no_data_message, padding: "15px",textAlign:"center",color:" #a4a3a3",width: "100%",marginTop:gk}}>No Data Found</h3>
                        <div className="" style={{display: this.state.no_data_message=="none" ? "block" :"none", width:"100%"}}>
                        <div className="table-responsive-lg over_flooo scroll_1" ref={this.containerRef}>
                                   <Table striped>
                                        <thead>
                                            <tr>
                                                <th scope="col" className="border_td">Employee Name</th>
                                                <th scope="col" className="border_td" style={{textAlign:"end"}}>PF Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.pf_array.map((value,index)=>{
                                                return(
                                            <tr key={index}>
                                                <th scope="row" className="border_td">
                                                    <div>{value.emp_name}</div>
                                                </th>
                                                <td className="border_td" style={{textAlign:"end"}}>&#x20b9;{(value.pf_amount).toFixed(2)}</td>
                                            </tr>
                                                )
                                            })}

                                        </tbody>
                                    </Table>
                                  </div>
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

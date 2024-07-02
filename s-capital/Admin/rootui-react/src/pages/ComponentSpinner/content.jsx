/**
 * External Dependencies
 */
 import './style.scss';

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Spinner,Table,Button} from 'reactstrap';
import Input from 'reactstrap/lib/Input';
import PageTitle from '../../components/page-title';
import Select from 'react-select';
import { RangeDatePicker } from 'react-google-flight-datepicker';
import 'react-google-flight-datepicker/dist/main.css';
import dateFormat from 'dateformat';


/**
 * Internal Dependencies
 */
import Snippet from '../../components/snippet';

/**
 * Component
 */
 const device_width =   window.innerWidth;
 var height =   window.innerHeight;
 const nav_height = document.querySelector('.rui-navbar-sticky').offsetHeight
 var my_height = height - nav_height;
 var gk = (my_height/2)-100;
 if(device_width < 600){
   var gk = (my_height/2) - 50;
 }

class Content extends Component {
    constructor(props){
        super(props);
        this.state = {
            insurer_name:"",
            cheque_type:"",
            cheque_report_array:[],
            single_cheque_report_array:[],
            cheque_report_id:"",
            isLoading:"block",
            spinner_1: 'none',
            no_data_found:"none",
            ipad_width:"none",
            ipad_emp_list:"block",
        }
        setTimeout(() => {
          this.fetch_cheque_report()
        }, 0)

    }

    fetch_cheque_report (startDate,endDate,search,cheque_type) {
        const { addToast,settings } = this.props;
        if (search == "") {
          var search_new = undefined
        }
        else{
          var search_new = search
        }
        if (startDate == "" || startDate == undefined || endDate == "" || endDate == undefined) {

        }
        else{

            const today = new Date(startDate);
            const yyyy = today.getFullYear();
            let mm = today.getMonth() + 1; // Months start at 0!
            let dd = today.getDate();
            if (dd < 10) dd = '0' + dd;
            if (mm < 10) mm = '0' + mm;
            const formattedToday_start = yyyy + '-' + mm + '-' + dd;
            ////console.log("formattedToday",formattedToday_start);


            const today_end = new Date(endDate);
            const yyyy_end = today_end.getFullYear();
            let mm_end = today_end.getMonth() + 1; // Months start at 0!
            let dd_end = today_end.getDate();
                ////console.log("datttttttttttttttt",dd_end);
                ////console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",new Date(endDate).getDate());
                if (dd_end < 10) {
                  var my_date ='0' + dd_end
                }
                else{
                  var my_date = dd_end
                }
                ////console.log("my_date",my_date);
            if (dd_end < 10) dd_end = '0' + dd_end;
            if (mm_end < 10) mm_end = '0' + mm_end;

            const formattedToday_end = yyyy_end + '-' + mm_end + '-' + my_date;
            ////console.log("formattedToday**************",formattedToday_end);
            var my_date = [formattedToday_start,formattedToday_end]
            this.setState({
                date_range_for_export :my_date
            })
        }

        if (cheque_type == "") {
          var cheque_type_new = undefined
        }
        else{
          var cheque_type_new = cheque_type
        }

        var params = {
            date_range:my_date,
            search:search_new,
            cheque_type:cheque_type_new,
          }
          //console.log("params=====",params);
          const res = fetch(settings.api_url + "fetch_cheque_report", {
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            }
          }).then((response) => response.json())
            .then(json => {
             console.log("fetch_cheque_report **************************************", json)
              var data = json;
              if (data.status == true) {
                this.setState({
                  cheque_report_array: data.data,
                  cheque_report_id:data.data[0]._id,
                  isLoading:"none",
                  no_data_found:"none",
                });

                if (device_width < 820) {
                }
                else{
                this.fetch_single_cheque_report(data.data[0]._id)
                }

              }
              else {
                this.setState({
                  cheque_report_array: [],
                  isLoading:"none",
                  no_data_found:"block",
                });
              }
            })
        }

        fetch_single_cheque_report = (cheque_id) => {
            const { addToast,settings } = this.props;
            var params = {
                cheque_id: cheque_id,
            }
            //console.log("user_id", params);
           const res = fetch(settings.api_url + "fetch_single_cheque_report", {
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            }
          }).then((response) => response.json())
            .then(json => {
              console.log("fetch_single_cheque_report **************************************", json)
              var data = json;
              console.log("gggggggggg",data.data);

              if (data.status == true) {
                if (device_width < 820) {
                  var ipad_emp_list = "none";
                 }
                 else{
                 var ipad_emp_list = "block"

                 }
                this.setState({
                  single_cheque_report_array: data.data,
                  cheque_report_id:data.data[0]._id,
                  spinner_1: 'none',
                  ipad_width:"block",
                  ipad_emp_list:ipad_emp_list,
                  });
                }
              else {
                this.setState({
                  single_cheque_report_array: [],
                  spinner_1: 'none'
                 });
              }
            })
        }


    render() {

        const customStyles = {
            control: ( css, state ) => {
                return {
                    ...css,
                    borderColor: state.isFocused ? 'rgba(114, 94, 195, 0.6)' : '#8bc240',
                    '&:hover': {
                        borderColor: state.isFocused ? 'rgba(114, 94, 195, 0.6)' : '#8bc240',
                    },
                    boxShadow: state.isFocused ? '0 0 0 0.2rem rgba(114, 94, 195, 0.2)' : '',
                };
            },
            option: ( css, state ) => {
                let bgc = '';

                if ( state.isSelected ) {
                    bgc = '#8bc240';
                } else if ( state.isFocused ) {
                    bgc = 'rgba(114, 94, 195, 0.2)';
                }

                return {
                    ...css,
                    backgroundColor: bgc,
                };
            },
            multiValueLabel: ( css ) => {
                return {
                    ...css,
                    color: '#545b61',
                    backgroundColor: '#8bc240',
                };
            },
        };

        const cheque_array_type = [
            { value: '1', label: 'Post-Paid'},
            { value: '2', label: 'Pre-Paid'},
            { value: '3', label: 'Day End Receipting'},
        ];


        return (
            <Fragment>
                <PageTitle className="che_head">
                    <div className="row">
                    <div className="col-lg-3 col-md-12 display_neww">
                    <h1>Cheque Reports</h1>

                    <div style={{display: device_width < 769 ? this.state.ipad_width : "block",marginLeft:"auto",marginTop:"9px"}}>
                    <Button className="my_new_nnnn" style={{ marginLeft: "5px", height: '28px', backgroundColor: '#007bff', borderColor: '#007bff',textTransform:"capitalize", display: device_width < 769 ? "inline-flex" : "none",paddingTop: "5px"}}
                                    onClick={() => {
                                    this.setState({
                                        ipad_emp_list:"block",
                                        ipad_width:"none"
                                    })
                                    }}>Back</Button>
                     </div>
                    </div>
                    <div className="col-lg-3 col-md-4 i_pad_top">
                    <Input type="text" name="policy_no" id="emailInput1" placeholder="Cheque No"
                      value={this.state.insurer_name}
                      onChange={(e) => {
                       this.setState({
                         insurer_name:e.target.value,
                       })
                       this.fetch_cheque_report(this.state.startDate,this.state.endDate,e.target.value,this.state.cheque_type_new)
                      }}  />
                    </div>
                    <div className="col-lg-3 col-md-4 i_pad_top">
                            <Select
                            value = {this.state.cheque_type}
                            onChange={(e) => {
                                this.setState({
                                cheque_type: e,
                                cheque_type_new: e.label,
                                });
                                this.fetch_cheque_report(this.state.startDate,this.state.endDate,this.state.insurer_name,e.label)
                            }}
                            placeholder="Select..."
                            className="contact_sort"
                            options={ cheque_array_type }
                            styles={ customStyles }
                        />
                    </div>
                    <div className="col-lg-3 col-md-4 i_pad_top date_cheee">
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
                            this.fetch_cheque_report(startDate,endDate,this.state.insurer_name,this.state.cheque_type_new)
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
                    </div>
                    </div>
                </PageTitle>

                <Spinner color="warning" className="spinner_css_12345" style={{marginTop:gk,display: this.state.isLoading}}/>
                <div style={{display: this.state.isLoading=="none" ? "block" :"none"}}>
                <h3 style={{ display: this.state.no_data_found, padding: "15px",textAlign:"center",color:" #a4a3a3",width: "100%",marginTop:gk}}>No Data Found</h3>

                <div style={{display: this.state.no_data_found=="none" ? "block" :"none"}}>
                <div className="cheque_data_new test_collapse">
                    <div className="row cheque_row_nw">
                        <div className="col-lg-5 col-md-12">

                        <div className="height_13 mycalendar test_collapse" style={{height:my_height-69,display: this.state.ipad_emp_list}}>
                            <Table striped className="purchase_table">
                            <thead>
                              <tr>
                                <th scope="col" className="purchase_heading" style={{ border: "none", whiteSpace: "nowrap",padding:"10px 25px" }}>Cheque No</th>
                                <th scope="col" className="purchase_heading" style={{ border: "none", whiteSpace: "nowrap",padding:"10px 25px" }}>Date</th>
                                <th scope="col" className="purchase_heading" style={{ border: "none", whiteSpace: "nowrap",padding:"10px 25px" }}>Insurer</th>
                               </tr>
                            </thead>
                            <tbody>
                              {
                                this.state.cheque_report_array.map((value12, index12) => {
                                  return (
                                    <tr style={{ cursor: 'pointer' }} key={index12} onClick={() => {
                                      this.setState({
                                        spinner_1: 'block'
                                      })
                                      setTimeout(() => {
                                        this.fetch_single_cheque_report(value12._id)
                                      }, 0)
                                    }}
                                    >
                                      <td className="strip_paded" style={{ borderLeft: value12._id == this.state.cheque_report_id ? "5px solid  #8bc240" : " 0px", verticalAlign: "middle",padding:"10px 25px",whiteSpace: "nowrap" }} >{value12.cheque_no}</td>
                                      <td className="strip_paded" style={{verticalAlign: "middle",padding:"10px 25px",whiteSpace: "nowrap" }} >{dateFormat(new Date(value12.date.replace("Z", "")), "dd-mm-yyyy")}</td>
                                      <td className="strip_paded" style={{verticalAlign: "middle",padding:"10px 25px" }} >{value12.company_name}</td>
                                     </tr>
                                  )
                                })
                              }

                            </tbody>
                          </Table>
                           </div>


                       </div>
                        <div className="col-lg-7 col-md-12 padd_bothh" style={{display: device_width < 769 ? this.state.ipad_width : "block"}}>
                        <Spinner color="warning" className="employee_spinner_1" style={{ marginTop: gk, display: this.state.spinner_1 }} />
                        <div style={{display:this.state.spinner_1=="none" ? "block":"none"}}>

                    <div>

                    {this.state.single_cheque_report_array.map((value,index)=>{
                        return(
                            <div key={index} className="padding_class">
                                    <div className="chequeeeee_data">
                                    <h3>Cheque No:{" "}{value.cheque_no} </h3>
                                    {/* <Button color="success" disabled={this.state.accounting_control == "false" ? 'disabled' : ''} style={{display:value.cheque_type=="Post-Paid" ? "none":"inline-flex"}} onClick={() => { this.edit_cheque(value) }}>Edit</Button>
                                    <Button color="danger" disabled={this.state.accounting_control == "false" ? 'disabled' : ''} style={{display:value.cheque_type=="Pre-Paid" ? "none":"inline-flex"}} onClick={() => { this.AlertDeleteSingle(value) }}>Delete</Button> */}
                                    </div>
                                <div className="row">
                                <div className="col-lg-6 col-md-6 col-sm-12" style={{ display: "inline-flex" }}>
                                    <div className="mobile desi" style={{ width: "130px", whiteSpace: "nowrap" }}>Company Name</div>:
                                    <span style={{ marginLeft: "11px" }}>{value.company_name}</span>
                                </div>

                                <div className="col-lg-6 col-md-6 col-sm-12" style={{ display: "inline-flex" }}>
                                    <div className="mobile desi use_amountt" style={{ width: "45px", whiteSpace: "nowrap" }}>Date</div>:
                                    <span className="for_new_data" style={{ marginLeft: "11px" }}>{dateFormat(new Date(value.date.replace("Z", "")), "dd-mm-yyyy") }</span>
                                </div>


                                <div className="col-lg-6 col-md-6 col-sm-12" style={{ display: "inline-flex" }}>
                                    <div className="mobile desi amount_widthh" style={{ width: "130px", whiteSpace: "nowrap" }}>Amount</div>:
                                    <span style={{ marginLeft: "11px" }}>&#x20b9; {value.amount }</span>
                                </div>


                                {/* <div className="col-lg-4 col-md-6 col-sm-12" style={{ display:value.cheque_type=="Post-Paid" ? "none": "inline-flex"}}>
                                    <div className="mobile desi use_amountt" style={{ width: "120px", whiteSpace: "nowrap" }}>Used Amount</div>:
                                    <span style={{ marginLeft: "11px" }}>&#x20b9; {value.used_amount }</span>
                                </div>

                                <div className="col-lg-4 col-md-6 col-sm-12" style={{ display:value.cheque_type=="Post-Paid" ? "none": "inline-flex" }}>
                                    <div className="mobile desi" style={{ width: "120px", whiteSpace: "nowrap" }}>Balanced Amount</div>:
                                    <span style={{ marginLeft: "11px" }}>&#x20b9; {value.balance_amount }</span>
                                </div> */}

                                <div className="col-lg-12 col-md-12 col-sm-12" style={{ display:value.policy_detail_array == "" || value.policy_detail_array == undefined ? "none": "block",marginTop:"40px" }}>
                                    <h3 className="policy_for_ch" style={{marginBottom:"10px"}}>Policies for the Cheque</h3>

                                    <div className="table-responsive-lg">
                                    <Table bordered>
                                    <thead>
                                        <tr>
                                            <th scope="col" style={{padding:"10px 25px",verticalAlign: "middle"}}>Customer Name</th>
                                            <th scope="col" style={{padding:"10px 25px",verticalAlign: "middle"}}>Policy Number</th>
                                            <th scope="col" style={{padding:"10px 25px",verticalAlign: "middle",textAlign:"end"}}>Gross Premium</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {value.policy_detail_array ? value.policy_detail_array.map((v,i)=>{
                                            return(
                                                <tr key={i}>
                                                <td style={{padding:"5px 25px",verticalAlign: "middle"}}>{v.customer_name} </td>
                                                <td style={{padding:"5px 25px",verticalAlign: "middle"}}>{v.policy_number}</td>
                                                <td style={{padding:"5px 25px",verticalAlign: "middle",textAlign:"end"}}>&#x20b9;{v.policy_amount}</td>
                                            </tr>
                                                    )
                                                }):null}

                                     </tbody>
                                 </Table>
                                </div>
                                </div>

                                </div>

                            </div>
                        )
                    })}

                             </div>

                       </div>
                       </div>
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

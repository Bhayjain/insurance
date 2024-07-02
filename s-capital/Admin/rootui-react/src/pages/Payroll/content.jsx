/**
 * External Dependencies
 */
 import "./style.scss";

 import React, { Component, Fragment } from 'react';
 import { connect } from 'react-redux';
 import html2pdf from 'html2pdf.js';
 /**
  * Internal Dependencies
  */
 import Snippet from '../../components/snippet';
 import MarkdownEditor from '../../components/easy-mde';
 import PageTitle from '../../components/page-title';
 import {
    Badge,Button, Collapse, ListGroup, ListGroupItem,Spinner,Table,ButtonGroup,Input, Modal, ModalBody,Tooltip,UncontrolledTooltip, ModalFooter,Label,CustomInput
  } from 'reactstrap';
  import {
    addToast as actionAddToast,
  } from '../../actions';
  import Cookies from 'js-cookie';
  import Icon from '../../components/icon';
//   import DatePicker from 'react-datepicker';
  import DatePicker from '../../components/date-time-picker';

  import projectLogo from '../../../../common-assets/images/logo_new_data.jpg'
// import 'react-datepicker/dist/react-datepicker.css';


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
    constructor(props){
        super(props);
        this.containerRef = React.createRef();
        this.state = {
            isLoading:"block",
            no_data_message:"none",
            over_all_pending_payments:"",
            monthly_salary_array:[],
            TrueAmountPaid:false,
            all_pending_payments:false,
            amount_paid_button:"Amount Paid",
            hide_add_payment:"show",
            button_submit:false,
            payroll_control : Cookies.get('payroll_control'),
            ShowAttendanceModel:false,
            ShowAttendanceModelFalse:false,
            show_date_for_attendance:new Date(),
            month_array:new Array(30).fill({}),
            showPaySlip : false,
            loading : false,
            sort_date:new Date(),
            sort_date_current : new Date()
        }

        setTimeout(() => {
            this.monthly_salary_calculation(undefined , this.state.sort_date )
            this.fetch_company_details()
          }, 10)
          this.ShowAttendanceModel = this.ShowAttendanceModel.bind(this);
          this.ShowAttendanceModelFalse = this.ShowAttendanceModelFalse.bind(this);

    }


    numberToWords(number) {
        const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
        const teens = ['Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
        const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

        function convertLessThanThousand(num) {
          if (num === 0) return '';
          if (num < 10) return units[num];
          if (num < 20) return teens[num - 11];
          return tens[Math.floor(num / 10)] + ' ' + units[num % 10];
        }

        function convert(num) {
          if (num === 0) return 'Zero';

          const billions = Math.floor(num / 1000000000);
          const millions = Math.floor((num % 1000000000) / 1000000);
          const thousands = Math.floor((num % 1000000) / 1000);
          const remainder = num % 1000;

          let result = '';

          if (billions > 0) {
            result += convertLessThanThousand(billions) + ' Billion ';
          }

          if (millions > 0) {
            result += convertLessThanThousand(millions) + ' Million ';
          }

          if (thousands > 0) {
            result += convertLessThanThousand(thousands) + ' Thousand ';
          }

          result += convertLessThanThousand(remainder);

          return result.trim();
        }

        return convert(number);
      }

    fetch_company_details = () => {
        const {  addToast,settings } = this.props;

        const res = fetch (settings.api_url + 'fetch_company_details',{
            method: 'POST',
            headers: {"Content-type" : "application/json; charset=UTF-8"}
        })
        .then((response) => response.json())
        .then(json => {console.log("Fetch Company Details",{response:json})

            var data = json ;

            if(data.status === true){
                this.setState({
                    fetch_company_details: data.data,
                })
            }
            else{
                this.setState({
                    fetch_company_details: [],
                })
            }
        });
    }


    ChangeAmountPaid=()=> {
        this.setState( ( prevState ) => ( {
            TrueAmountPaid: ! prevState.TrueAmountPaid,
            all_pending_payments:false
        } ) );

        console.log(this.state.TrueAmountPaid);
    }


    monthly_salary_calculation = (search,sort_date)=>  {
        const { settings } = this.props;
            if (search == "" || search == undefined) {
                var search_new = undefined
            }else{
                var search_new = search
            }
            const today = new Date(sort_date);
            const yyyy = today.getFullYear();
            let mm = today.getMonth() + 1; // Months start at 0!
            if (mm < 10) mm = '0' + mm;
            var formattedToday_start = yyyy + '-' + mm ;
            var my_date  =formattedToday_start

            const todaysort_date_current = new Date(this.state.sort_date_current);
            const yyyysort_date_current = todaysort_date_current.getFullYear();
            let mmsort_date_current = todaysort_date_current.getMonth() + 1; // Months start at 0!
            if (mmsort_date_current < 10) mmsort_date_current = '0' + mmsort_date_current;
            var formattedToday_startsort_date_current = yyyysort_date_current + '-' + mmsort_date_current ;
            var my_datesort_date_current  =formattedToday_startsort_date_current

            console.log("my_datesort_date_current",my_datesort_date_current);

            if (my_date == my_datesort_date_current) {
                console.log("true");
                var is_current_month = true
            }else{
                console.log("false");
                var is_current_month = false
            }


            var params = {
                search:search_new,
                is_current_month:is_current_month,
                sort_date : my_date
            }
            console.log("params",params);
         const res = fetch(settings.api_url + "api/payroll/monthly_salary_calculation", {
             method: 'POST',
             body: JSON.stringify(params),
             headers: {
                 "Content-type": "application/json; charset=UTF-8",
             }
         }).then((response) => response.json())
             .then(json => {
                 console.log("Fetch Monthly Salary ***************", json)
                 var data = json;
                 if (data.status == true) {
                    var monthly_salary_array = data.data
                    for (let i = 0; i < monthly_salary_array.length; i++) {
                        var payable_amount=  monthly_salary_array[i].payable_amount
                        // console.log(payable_amount);
                        monthly_salary_array[i].paid_amount =  payable_amount.toFixed(2);
                    }
                    console.log(monthly_salary_array);
                     this.setState({
                      monthly_salary_array: monthly_salary_array,
                      over_all_pending_payments: data.overall_dues,
                      isLoading:"none",
                      no_data_message:"none",
                     });
                 }
                 else {
                     this.setState({
                      monthly_salary_array: [],
                      over_all_pending_payments:"",
                      isLoading:"none",
                      no_data_message:"block",
                     });
                 }
             })
          }


          pay_emp_payments=(data,payment_type)=> {
              var data_new = data
              for (let i = 0; i < data_new.length; i++) {
                  delete data_new[i].button_submit
                  delete data_new[i].error_message
                  delete data_new[i].hide_add_payment
              }
              console.log(data_new);
            const {
                addToast,settings
            } = this.props;
            var params = {
                data:data_new,
                payment_type:payment_type
            }
            console.log("params************",params);
              const res = fetch(settings.api_url + "api/payroll/pay_emp_payments", {
                  method: 'POST',
                  body: JSON.stringify(params),
                  headers: {
                      "Content-type": "application/json; charset=UTF-8",
                  }
              }).then((response) => response.json())
                  .then(json => {
                      console.log("Payment Employee **************************************", { params: params, response: json })
                      var data = json;
                      if (data.status == true) {
                          addToast({
                              title: 'Book Your Insurance',
                              content: data["message"],
                              time: new Date(),
                              duration: 1000,
                          });
                          this.monthly_salary_calculation(undefined , this.state.sort_date )
                      }
                      else {
                          addToast({
                              title: 'Book Your Insurance',
                              content: data["message"],
                              time: new Date(),
                              duration: 1000,
                          });
                      }
                  })
              }


        //   download_payslip_admin_panel=(data)=> {
        //       var data_new = data
        //       for (let i = 0; i < data_new.length; i++) {
        //           delete data_new[i].button_submit
        //           delete data_new[i].error_message
        //           delete data_new[i].hide_add_payment
        //       }
        //       console.log(data_new);
        //     const {
        //         addToast,settings
        //     } = this.props;
        //     var params = {
        //         data:data_new,
        //     }
        //     console.log("params************",params);
        //       const res = fetch(settings.api_url + "api/payroll/download_payslip_admin_panel", {
        //           method: 'POST',
        //           body: JSON.stringify(params),
        //           headers: {
        //               "Content-type": "application/json; charset=UTF-8",
        //           }
        //       }).then((response) => response.json())
        //           .then(json => {
        //               console.log("Download Payslip **************************************", json )
        //               window.open(data.path, "_blank");
        //           })
        //       }

        download_payslip_admin_panel = async (data) => {
            this.setState({
                loading  :true
            })
            console.log("kkkkkkkkkkkkkkk");
            try {
                const { settings } = this.props;
                      var data_new = data
              for (let i = 0; i < data_new.length; i++) {
                  delete data_new[i].button_submit
                  delete data_new[i].error_message
                  delete data_new[i].hide_add_payment
              }
                    console.log(data_new);
                    var params = {
                        data:data_new,
                    }
                    console.log("params************",params);

                const response = await fetch(settings.api_url + "api/payroll/download_payslip_admin_panel", {
                    method: 'POST',
                    body: JSON.stringify(params),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    }
                });

                const json = await response.json();
                console.log("Download Payslip **************************************", json);
                    this.setState({
                        loading : false
                    })
                   window.open(json.path, "_blank");
            } catch (error) {
                console.error("Error downloading payslip:", error);
            }
        };



          all_pending_payments(data) {
            const {
                addToast,settings
            } = this.props;
            var params = {
                data:data,
            }
            console.log("params************",params);
              const res = fetch(settings.api_url + "api/payroll/pay_emp_payments", {
                  method: 'POST',
                  body: JSON.stringify(params),
                  headers: {
                      "Content-type": "application/json; charset=UTF-8",
                  }
              }).then((response) => response.json())
                  .then(json => {
                      console.log("Payment Employee **************************************", { params: params, response: json })
                      var data = json;
                      if (data.status == true) {
                          addToast({
                              title: 'Book Your Insurance',
                              content: data["message"],
                              time: new Date(),
                              duration: 1000,
                          });
                          this.monthly_salary_calculation(undefined , this.state.sort_date )
                      }
                      else {
                          addToast({
                              title: 'Book Your Insurance',
                              content: data["message"],
                              time: new Date(),
                              duration: 1000,
                          });
                      }
                  })
              }

              paid_amount=(val,index,payable_amount)=>{

                    console.log(val,index);
                    var monthly_salary_array = this.state.monthly_salary_array
                    monthly_salary_array[index].paid_amount = Number(val)
                    if (monthly_salary_array[index].paid_amount > payable_amount) {
                        monthly_salary_array[index].error_message = "Amount is Not Greater than Payable Amount"
                        monthly_salary_array[index].button_submit = true
                    }else{
                        monthly_salary_array[index].error_message = ""
                        monthly_salary_array[index].button_submit = false
                    }


                    this.setState({
                        monthly_salary_array:monthly_salary_array
                    })
              }

              hide_add_pay=(index)=>{

                var monthly_salary_array = this.state.monthly_salary_array
                monthly_salary_array[index].hide_add_payment = "hide"
                this.setState({
                    monthly_salary_array:monthly_salary_array
                })
              }




              handleDateChange = (date) => {
                this.setState({
                  selectedDate: date,
                });
              };



              componentDidMount() {
                // Cookies.remove("ShowAttendanceCookies")
                console.log("ShowAttendanceCookies########################################",Cookies.get("ShowAttendanceCookies"));
                // Add an event listener to the document for clicks
                document.addEventListener('click', this.handleClickOutside);
              }

              componentWillUnmount() {
                // Remove the event listener when the component unmounts
                document.removeEventListener('click', this.handleClickOutside);
              }

              handleClickOutside = (event) => {
                // Check if the click event target is outside of the component's container
                if (this.containerRef.current && !this.containerRef.current.contains(event.target)) {
                  // Call your desired functionality here
                  this.yourFunction();
                }
              };

              yourFunction = () => {
                // Implement the functionality you want to call when clicking outside
                console.log('Clicked outside the component');
                var monthly_salary_array = this.state.monthly_salary_array
                for (let i = 0; i < monthly_salary_array.length; i++) {
                    monthly_salary_array[i].hide_add_payment = ""
                }

                this.setState({
                    monthly_salary_array:monthly_salary_array
                })
              };


              ShowAttendanceModel() {
                this.setState( ( prevState ) => ( {
                       ShowAttendanceModel: true,
                } ) );
            }
              ShowAttendanceModelFalse() {
                this.setState( ( prevState ) => ( {
                    ShowAttendanceModel: false,
                } ) );
            }


            showAttendanceModel=(val)=>{
                console.log(val);
                Cookies.set( 'ShowAttendanceCookies', [val]);
                location.hash = "/show-attendance"

                // const { settings } = this.props;
                // const today = new Date(month);
                //  const yyyy = today.getFullYear();
                //  let mm = today.getMonth() + 1; // Months start at 0!
                //  let dd = today.getDate();
                //  if (dd < 10) dd = '0' + dd;
                //  if (mm < 10) mm = '0' + mm;
                //  var formattedToday_start = yyyy + '-' + mm ;
                //  var my_date  =formattedToday_start
                //  this.setState({
                //      export_date:my_date
                //  })

                // var params = {
                //  sorting_date:formattedToday_start
                //  }
                // console.log("params muster",params);
                //  const res = fetch(settings.api_url + "api/payroll/dashboard_master_roll_report", {
                //      method: 'POST',
                //      body: JSON.stringify(params),
                //      headers: {
                //          "Content-type": "application/json; charset=UTF-8",
                //      }
                //  }).then((response) => response.json())
                //      .then(json => {
                //          //console.log("Fetch Attendance Muster Roll ***************", json)
                //          var data = json;
                //          if (data.status == true) {
                //              var attendance_muster_roll_array = data.data
                //              for (let i = 0; i < attendance_muster_roll_array.length; i++) {
                //                  var month_array = attendance_muster_roll_array[i].month_array
                //                 for (let j = 0; j < month_array.length; j++) {
                //                    if (month_array[j].marked == "A") {
                //                      month_array[j].backgroundColor = "#ef5164"
                //                      month_array[j].color = "#fff"
                //                   }else if (month_array[j].marked == "HD") {
                //                      month_array[j].backgroundColor = "#fdbf21"
                //                      month_array[j].color = "#fff"
                //                   }else if (month_array[j].marked == "P") {
                //                      month_array[j].backgroundColor = "#2fc787"
                //                      month_array[j].color = "#fff"
                //                   }else if (month_array[j].marked == "H") {
                //                      month_array[j].backgroundColor = "#007bff"
                //                      month_array[j].color = "#fff"
                //                   }

                //                 }


                //              }
                //              this.setState({
                //                  attendance_muster_roll_array:data.data
                //              });
                //          }
                //          else {
                //              this.setState({
                //                  attendance_muster_roll_array:[]
                //              });
                //          }
                //      })
            }

            handleDownload = async () => {
                const element = document.getElementById('content');

                // Use html2pdf library to convert the element to PDF
                html2pdf(element);
              };


              downloadPDF = () => {
                // Set showPaySlip to true
                // document.body.style.overflowY="hidden"
                // this.setState({
                //     showPaySlip: true
                // }, () => {
                //     // The callback function will be executed after the state is updated
                //     // Use setTimeout to wait for a short period before generating the PDF
                //     setTimeout(() => {
                //         // Get the element to be converted to PDF
                //         const element = document.getElementById('content');
                //         document.body.style.overflowY="unset"
                //         // Customize the PDF options, including the filename
                //         const options = { filename: this.state.userName +'_payslip.pdf' };

                //         // Use html2pdf library to convert the element to PDF with the specified options
                //         html2pdf(element, options);

                //         // Set showPaySlip back to false after generating the PDF
                //         this.setState({
                //             showPaySlip: false
                //         });
                //     }, 100);
                // });
            };


            intToEnglish = (number) => {
                var NS = [
                  { value: 10000000, str: "Crore" },
                  { value: 100000, str: "Lakh" },
                  { value: 1000, str: "Thousand" },
                  { value: 100, str: "Hundred" },
                  { value: 90, str: "Ninety" },
                  { value: 80, str: "Eighty" },
                  { value: 70, str: "Seventy" },
                  { value: 60, str: "Sixty" },
                  { value: 50, str: "Fifty" },
                  { value: 40, str: "Forty" },
                  { value: 30, str: "Thirty" },
                  { value: 20, str: "Twenty" },
                  { value: 19, str: "Nineteen" },
                  { value: 18, str: "Eighteen" },
                  { value: 17, str: "Seventeen" },
                  { value: 16, str: "Sixteen" },
                  { value: 15, str: "Fifteen" },
                  { value: 14, str: "Fourteen" },
                  { value: 13, str: "Thirteen" },
                  { value: 12, str: "Twelve" },
                  { value: 11, str: "Eleven" },
                  { value: 10, str: "Ten" },
                  { value: 9, str: "Nine" },
                  { value: 8, str: "Eight" },
                  { value: 7, str: "Seven" },
                  { value: 6, str: "Six" },
                  { value: 5, str: "Five" },
                  { value: 4, str: "Four" },
                  { value: 3, str: "Three" },
                  { value: 2, str: "Two" },
                  { value: 1, str: "One" }
                ];

                var result = '';
                for (var n of NS) {
                  if (number >= n.value) {
                    if (number <= 99) {
                      result += n.str;
                      number -= n.value;
                      if (number > 0) result += ' ';
                    } else {
                      var t = Math.floor(number / n.value);
                      var d = number % n.value;
                      if (d > 0) {
                        return this.intToEnglish(t) + ' ' + n.str + ' ' + this.intToEnglish(d);
                      } else {
                        return this.intToEnglish(t) + ' ' + n.str;
                      }
                    }
                  }
                }
                return result;
              };

     render() {

        //  this.hide_add_pay()
         return (
             <Fragment>







                  <PageTitle className="payroll_new">
                      <div className="row">
                         <div className="col-lg-7 col-md-3 col-sm-12">
                             <h1 className="heading_top">Payroll</h1>
                         </div>
                         <div className="col-lg-3 col-md-3 col-sm-12">
                             <input
                                type="text"
                                className="form-control "
                                aria-describedby="emailHelp"
                                placeholder="Search Employee"
                                value={this.state.search_emp}
                                onChange={(e) => {
                                  this.setState({
                                    search_emp:e.target.value,
                                  })
                                  this.monthly_salary_calculation(e.target.value,this.state.sort_date)
                                }}
                               />
                         </div>
                         <div className="col-lg-2 col-md-3 col-sm-12 payrollDate">
                         <DatePicker
                           selected={this.state.sort_date}
                           onChange={(val) => {
                               this.setState({
                                   sort_date: val,
                               });
                               this.monthly_salary_calculation( this.state.search_emp,val)

                          }}
                          dateFormat="MM-yyyy"
                          showMonthYearPicker
                          className="rui-datetimepicker form-control w-auto_12 search_1 "
                          calendarClassName="tren-pembayaran__wrapper__datepicker"
                          placeholder="Select Month"
                      />
                         </div>

                      </div>
                  </PageTitle>


                  <div className="test_collapse ">
                  <Spinner color="warning" className="spinner_css_12345666" style={{marginTop:gk,display: this.state.isLoading}}/>
                  <div className="test_collapse" style={{display: this.state.isLoading=="none" ? "flex" :"none"}}>
                     <h3 style={{ display: this.state.no_data_message, padding: "15px",textAlign:"center",color:" #a4a3a3",width: "100%",marginTop:gk}}>No Data Found</h3>
                        <div className="heading_opeartion" style={{display: this.state.no_data_message=="none" ? "block" :"none", width:"100%"}}>
                            <div className="mycalendar test_collapse padd_ing_new ">

                                <div className="overal_paid">
                                    <div className="row">
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                        <h3 className="overa_all_bal_bal">Overall Balance</h3>
                                        <p className="overa_all_bal font_size"><span>(-)</span> &#x20b9;{this.state.over_all_pending_payments}</p>
                                        <span className="font_style">Total Pending</span>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-12 test_collapse" style={{textAlign:"end",alignSelf:"center"}}>

                                        <div className="test_collapse" style={{display:this.state.TrueAmountPaid == true ? "block" : "none"}}>
                                            <div className="test_collapse">
                                                <CustomInput type="checkbox"
                                                    label="Process All Payments"
                                                    className=""
                                                    checked={this.state.all_pending_payments== true ? true : false} id="formCheckbox12"
                                                    onClick={(e) => {
                                                    this.setState({
                                                        all_pending_payments: e.target.checked
                                                    })
                                                }}
                                                />
                                             </div>

                                         </div>
                                         <div style={{display:"inline-flex"}}>
                                         <button disabled={this.state.payroll_control =="false" ? true : false} className={this.state.TrueAmountPaid == true ? "cancel_paid btn sumbit_new test_collapse" : "amount_paid btn sumbit_new test_collapse"} onClick={()=>this.ChangeAmountPaid()} >{this.state.TrueAmountPaid == true ? "Cancel" : "Make Payment"}</button>
                                          <Button style={{marginLeft:"10px",display:this.state.TrueAmountPaid == true ? "inline-flex" : "none"}} color="primary" className="sumbit_new test_collapse" disabled={this.state.all_pending_payments ==false || this.state.payroll_control =="false" ? 'disabled' : ''}
                                          onClick={()=>{this.pay_emp_payments(this.state.monthly_salary_array,"multiple")}}
                                          >Submit</Button>
                                    </div>
                                    </div>
                                    {/* <div className="col-lg-12 col-md-12 col-sm-12">
                                        <p className="overa_all_bal font_size"><span>(-)</span> &#x20b9;{this.state.over_all_pending_payments}</p>
                                        <span className="font_style">Total Pending</span>
                                    </div> */}
                                    {/* <div className="col-lg-6 col-md-6 col-sm-12 test_collapse" style={{textAlign:"end"}}>
                                        <button className={this.state.TrueAmountPaid == true ? "cancel_paid btn sumbit_new test_collapse" : "amount_paid btn sumbit_new test_collapse"} onClick={()=>this.ChangeAmountPaid()} >{this.state.TrueAmountPaid == true ? "Cancel" : "Make Payment"}</button>
                                        <div className="test_collapse" style={{display:this.state.TrueAmountPaid == true ? "inline-flex" : "none"}}>
                                            <div className="test_collapse" style={{marginTop:"3px" , marginRight:"10px",marginLeft:"10px"}}>
                                                <CustomInput type="checkbox"
                                                    label="Process All Payments"
                                                    className=""
                                                    checked={this.state.all_pending_payments== true ? true : false} id="formCheckbox12"
                                                    onClick={(e) => {
                                                    this.setState({
                                                        all_pending_payments: e.target.checked
                                                    })
                                                }}
                                                />
                                        </div>
                                          <Button color="primary" className="sumbit_new test_collapse" disabled={this.state.all_pending_payments ==false || this.state.payroll_control =="false" ? 'disabled' : ''}
                                          onClick={()=>{this.pay_emp_payments(this.state.monthly_salary_array,"multiple")}}
                                          >Submit</Button>
                                         </div>
                                    </div> */}
                                    </div>
                                </div>


                                <div className="overal_paid_table mycalendar" >
                                    <div>
                                     <h3 className="overa_all_bal">Employee List</h3>
                                     {/* <DatePicker
                                        selected={this.state.selectedDate}
                                        onChange={this.handleDateChange}
                                        dateFormat="dd MMM yyyy | EEE"
                                    /> */}
                                   </div>

                                   <div className="table-responsive-lg over_flooo scroll_1" ref={this.containerRef}>
                                   <Table striped>
                                        <thead>
                                            <tr>
                                                <th scope="col" className="border_none">Employee Name</th>
                                                <th scope="col" className="border_none" style={{textAlign:"end"}}>Already Paid Amount</th>
                                                <th scope="col" className="border_none" style={{textAlign:"end"}}>Pending Dues</th>
                                                <th scope="col" className="border_none" style={{textAlign:"end"}}>Net Salary</th>
                                                <th scope="col" className="border_none" style={{textAlign:"end"}}>Deductions</th>
                                                <th scope="col" className="border_none" style={{textAlign:"end"}}>Additionals</th>
                                                <th scope="col" className="border_none" style={{textAlign:"end"}}>Salary Payable</th>
                                                <th scope="col" className="border_none" style={{textAlign:"center"}}>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.monthly_salary_array.map((value,index)=>{
                                                return(
                                            <tr key={index}>
                                                <th scope="row" className="border_td">
                                                    <div>{value.emp_name}</div>
                                                    <div className="from_to_end">
                                                        {value.payment_from_date < 10 ? "0"+value.payment_from_date : value.payment_from_date}-{value.payment_month < 10 ? "0"+value.payment_month : value.payment_month}-{ value.payment_year}{" "}to { " "}
                                                        {value.payment_till_date < 10 ? "0"+value.payment_till_date : value.payment_till_date}-{value.payment_month < 10 ? "0"+value.payment_month : value.payment_month}-{ value.payment_year}{" "}
                                                    </div>
                                                </th>
                                                <td className="border_td" style={{textAlign:"end"}}>
                                                     <div className="net_salary_hover">
                                                        &#x20b9;{(value.already_paid_amount).toFixed(2)}<Icon style={{display : value.already_paid_breakdown.length == 0 ? "none" : "inline-flex"}} className="alert_icon" name="alert-circle" />
                                                        <div className="from_to_end">{value.already_paid_date}</div>
                                                        <span className="net_salry_new" style={{display:value.already_paid_breakdown.length == 0 ? "none" : "block"}}>
                                                         {value.already_paid_breakdown.map((v1,index1)=>{
                                                            return(
                                                                <div className="show_net_tool_tip" key={index1}>
                                                                    <div className="displayInlineNew">
                                                                        <div style={{marginRight:"10px"}}>{v1.component_name}</div>
                                                                        <div className="amountNewww" > &#x20b9;{(v1.amount)} </div>
                                                                   </div>
                                                                </div>
                                                            )
                                                        })}
                                                        </span>
                                                    </div>
                                                    </td>
                                                <td className="border_td" style={{textAlign:"end"}}>
                                                    <div className="net_salary_hover">
                                                        &#x20b9;{(value.pending_dues).toFixed(2)}<Icon style={{display : value.pending_dues_breakdown == "" ? "none" : "inline-flex"}} className="alert_icon" name="alert-circle" />
                                                        <span className="net_salry_new" style={{display:value.pending_dues_breakdown == "" ? "none" : "block"}}>
                                                        <div className="show_net_tool_tip">
                                                                       Pending Due Date : {value.pending_dues_breakdown == "" ? "" : value.pending_dues_breakdown.split("-")[2] + "-" + value.pending_dues_breakdown.split("-")[1] + "-" + value.pending_dues_breakdown.split("-")[0] }
                                                         </div>
                                                        </span>
                                                    </div>
                                                    </td>
                                                <td className="border_td" style={{textAlign:"end"}}>
                                                     <div className="net_salary_hover">
                                                        &#x20b9;{(value.net_salary).toFixed(2)}<Icon style={{display : value.net_salary_breakdown.length == 0 ? "none" : "inline-flex"}} className="alert_icon" name="alert-circle" />
                                                        <span className="net_salry_new" style={{display:value.net_salary_breakdown.length == 0 ? "none" : "block"}}>
                                                         {value.net_salary_breakdown.map((v1,index1)=>{
                                                            return(
                                                                <div className="show_net_tool_tip" key={index1}>
                                                                    <div className="displayInlineNew">
                                                                        <div style={{marginRight:"10px"}}>{v1.component_name}</div>
                                                                        <div className="amountNewww" > &#x20b9;{(v1.amount).toFixed(2)} </div>
                                                                   </div>
                                                                </div>
                                                            )
                                                        })}
                                                        </span>
                                                    </div>
                                                    </td>
                                                <td className="border_td" style={{textAlign:"end"}}>
                                                    {/* &#x20b9;{(value.total_deduction).toFixed(2)} */}
                                                    <div className="net_salary_hover">
                                                        &#x20b9;{(value.total_deduction).toFixed(2)}<Icon style={{display : value.deduction_breakdown.length == 0 ? "none" : "inline-flex"}} className="alert_icon" name="alert-circle" />
                                                        <span className="net_salry_new" style={{display:value.deduction_breakdown.length == 0 ? "none" : "block"}}>
                                                         {value.deduction_breakdown.map((v1,index1)=>{
                                                            return(
                                                                // <div className="show_net_tool_tip" key={index1}>
                                                                //         {v1.component_name} : &#x20b9;{(v1.amount).toFixed(2)}
                                                                // </div>
                                                                <div className="show_net_tool_tip" key={index1}>
                                                                <div className="displayInlineNew">
                                                                    <div style={{marginRight:"10px"}}>{v1.component_name}</div>
                                                                    <div className="amountNewww" > &#x20b9;{(v1.amount).toFixed(2)} </div>
                                                               </div>
                                                            </div>
                                                            )
                                                        })}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="border_td" style={{textAlign:"end"}}>
                                                     <div className="net_salary_hover">
                                                        &#x20b9;{(value.total_additional).toFixed(2)}<Icon style={{display : value.additional_breakdown.length == 0 ? "none" : "inline-flex"}} className="alert_icon" name="alert-circle" />
                                                        <span className="net_salry_new" style={{display:value.additional_breakdown.length == 0 ? "none" : "block"}}>
                                                         {value.additional_breakdown.map((v1,index1)=>{
                                                            return(
                                                                <div className="show_net_tool_tip" key={index1}>
                                                                    <div className="displayInlineNew">
                                                                        <div style={{marginRight:"10px"}}>{v1.component_name}</div>
                                                                        <div className="amountNewww" > &#x20b9;{(v1.amount).toFixed(2)} </div>
                                                                   </div>
                                                                </div>
                                                            )
                                                        })}
                                                        </span>
                                                    </div>
                                                    </td>
                                                <td className="border_td" style={{textAlign:"end"}}>&#x20b9;{(value.payable_amount).toFixed(2)}</td>

                                                <td className="border_td test_collapse">
                                                    <div className="total_btn_group test_collapse">
                                                        <div>
                                                         <Input style={{display:value.hide_add_payment == "hide" ? "block" :"none"}} className="paid_new_amount test_collapse" type="number" placeholder="Payable Amount" value={value.paid_amount} onChange={(e)=>{this.paid_amount(e.target.value,index,value.payable_amount)}} />
                                                              <p style={{display:value.error_message == undefined ? "none" : "block"}} className="error_message_new">{value.error_message}</p>
                                                         </div>
                                                        <button  className="sumbit_new btn test_collapse" disabled={ this.state.payroll_control =="false" ? 'disabled' : ''} style={{marginRight:"10px",backgroundColor:"#4E4FEB",borderColor:"#4E4FEB",color:"#fff",display:value.hide_add_payment == "hide" ? "none" :"inline-flex"}} onClick={()=>{this.hide_add_pay(index)}} >Add Payment</button>
                                                        <button  className="sumbit_new btn test_collapse" disabled={ this.state.payroll_control =="false" || value.button_submit==true ?  'disabled' : ''} style={{marginRight:"10px",backgroundColor:"#2fc787",borderColor:"#2fc787",color:"#fff",display:value.hide_add_payment == "hide" ? "inline-flex" :"none"}} onClick={()=>{this.pay_emp_payments([value],"single")}} >Submit</button>
                                                        <button  className="sumbit_new btn" disabled={ this.state.payroll_control =="false" ? 'disabled' : ''} style={{marginRight:"10px",backgroundColor:"#279EFF",borderColor:"#279EFF",color:"#fff"}} onClick={()=>{
                                                            this.setState({
                                                                // ShowAttendanceModel:true,
                                                                // staff_name:value.emp_name
                                                            })
                                                            this.showAttendanceModel(value)
                                                        }}>Show attandance</button>
                                                        <button  className="sumbit_new btn" disabled={ this.state.payroll_control =="false" ? 'disabled' : ''} style={{backgroundColor:"#1D5D9B",borderColor:"#1D5D9B",color:"#fff"}} onClick={()=>{
                                                            this.setState({
                                                                userName:value.emp_name,
                                                                loading:true,
                                                                id_new : value.emp_id
                                                            })
                                                            this.download_payslip_admin_panel([value])}}>payslip download
                                                            {this.state.loading &&  this.state.id_new == value.emp_id ? (
                                                                <Spinner />
                                                            ) : ''}
                                                            </button>
                                                    </div>
                                                </td>
                                            </tr>
                                                )
                                            })}

                                        </tbody>
                                    </Table>
                                  </div>
                                </div>

                            </div>



                      {/* *********************** Engegment Model ****************************************** */}
                      <Modal
                         isOpen={ this.state.ShowAttendanceModel }
                         toggle={ this.ShowAttendanceModel }
                         className={ this.props.className,"show_attenedance_model modal-dialog-centered" }
                         fade
                     >
                         <div className="modal-header">
                             <h5 className="modal-title h2">Attendance Chart</h5>
                             <Button className="close" color="" onClick={ this.ShowAttendanceModelFalse }>
                                 <Icon name="x" />
                             </Button>
                         </div>
                         <ModalBody>
                            <div className="form rui-sign-form rui-sign-form-cloud">
                            <div className="">
                                     <div className="row" style={{marginBottom:"25px"}}>
                                       <div className="col-lg-8 col-md-8">
                                        <h3>{this.state.staff_name}</h3>
                                       </div>
                                       <div className="col-lg-4 col-md-4" style={{textAlign:"end"}}>
                                       <DatePicker
                                            selected={this.state.show_date_for_attendance}
                                            onChange={(val) => {
                                                this.setState({
                                                    show_date_for_attendance: val,
                                                });
                                                //console.log(val);
                                                this.showAttendanceModel(val)
                                            }}
                                            dateFormat="MM-yyyy"
                                            showMonthYearPicker
                                            className="rui-datetimepicker form-control w-auto_12 search_1 "
                                            calendarClassName="tren-pembayaran__wrapper__datepicker"
                                            placeholder="Select Month"
                                        />

                                       </div>
                                     </div>
                                    <div className="row show_in_line">
                                    <div className="col-lg-2 col-md-2">
                                        <div className="heading_top_newww"><Label>Present</Label></div>
                                        <div className="heading_bottom">{this.state.present_staff}</div>
                                    </div>
                                    <div className="line_attendance_summery"></div>
                                    <div className="col-lg-2 col-md-2">
                                        <div className="heading_top_newww"><Label>Absent</Label></div>
                                        <div className="heading_bottom">{this.state.absent_staff}</div>
                                    </div>
                                    <div className="line_attendance_summery"></div>
                                    <div className="col-lg-2 col-md-2">
                                        <div className="heading_top_newww"><Label>Half Day</Label></div>
                                        <div className="heading_bottom">{this.state.halfday_staff}</div>
                                    </div>
                                    <div className="line_attendance_summery"></div>
                                    <div className="col-lg-2 col-md-2">
                                        <div className="heading_top_newww"><Label>Overtime</Label></div>
                                        <div className="heading_bottom">{this.state.halfday_staff}</div>
                                    </div>
                                    <div className="line_attendance_summery"></div>
                                    <div className="col-lg-2 col-md-2">
                                        <div className="heading_top_newww"><Label>Paid Leave</Label></div>
                                        <div className="heading_bottom">{this.state.leave_staff}</div>
                                    </div>
                                    <div className="line_attendance_summery"></div>
                                    <div className="col-lg-2 col-md-2">
                                        <div className="heading_top_newww"><Label>Uppaid leave</Label></div>
                                        <div className="heading_bottom">{this.state.sick_leave_staff}</div>
                                    </div>
                                </div>

                                <div className="muster_data_show">
                                    <div className="table-responsive-lg scroll_1 test_collapse">
                                         <Table  bordered>
                                            <thead>
                                                 <tr>
                                                    <th scope="col" className="MUSTER_ROLL_TABLE DAYS_BACK" >
                                                         <div> DAYS</div>
                                                     </th>
                                                    {this.state.month_array.map((_,index)=>{
                                                                        return(
                                                                            <th scope="col" className="MUSTER_ROLL_TABLE" style={{backgroundColor :"#2fc787",color : "#fff" }} key={index}>
                                                                            <div className="date_muster">
                                                                                <p>S</p>
                                                                                {/* <p>{value.date}</p> */}
                                                                            </div>
                                                                        </th>
                                                                        )
                                                                    })}
                                                                </tr>
                                                                <tr>
                                                                    <th scope="col" className="MUSTER_ROLL_TABLE DAYS_BACK" >
                                                                        <div>
                                                                            {/* DATE */}
                                                                        </div>
                                                                    </th>
                                                                    {this.state.month_array.map((_,index)=>{
                                                                        return(
                                                                            <th scope="col" className="MUSTER_ROLL_TABLE" style={{backgroundColor :"#2fc787",color : "#fff" }} key={index}>
                                                                            <div className="date_muster">
                                                                                <p>1</p>
                                                                            </div>
                                                                        </th>
                                                                        )
                                                                    })}
                                                                </tr>
                                                                <tr>
                                                                    <th scope="col" className="MUSTER_ROLL_TABLE DAYS_BACK" >
                                                                        <div>

                                                                        </div>
                                                                    </th>
                                                                    {this.state.month_array.map((_,index)=>{
                                                                        return(
                                                                            <th scope="col" className="MUSTER_ROLL_TABLE" style={{backgroundColor :"#2fc787",color : "#fff" }} key={index}>
                                                                            <div className="date_muster">
                                                                                <p>P</p>
                                                                            </div>
                                                                        </th>
                                                                        )
                                                                    })}
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <th scope="row" className="MUSTER_ROLL_TABLE DAYS_BACK">
                                                                        <div>
                                                                            WH
                                                                        </div>
                                                                    </th>
                                                                    {this.state.month_array.map((_,index)=>{
                                                                        return(
                                                                            <th scope="col" className="MUSTER_ROLL_TABLE" style={{backgroundColor :"#2fc787",color : "#fff"}} key={index}>
                                                                            <div className="date_muster">
                                                                                <p>08:30</p>
                                                                            </div>
                                                                        </th>
                                                                        )
                                                                    })}
                                                                </tr>
                                                            </tbody>
                                                        </Table>
                                                    </div>
                                                </div>
                            </div>
                            </div>
                         </ModalBody>
                         <ModalFooter>
                             <Button color="secondary" style={{textTransform:"capitalize"}} onClick={ this.ShowAttendanceModelFalse }>Close</Button>
                             { ' ' }
                         </ModalFooter>
                     </Modal>



{/* *******************  SHOW Pay Slip ***************************************** */}
                     {/* {this.state.showPaySlip ?

                        <div id="content">
                        <div className="paddTopNew">
                        <div className="row">
                                <div className="col-lg-6 col-md-6">
                                    <div className="imgLogo">
                                        <img className="ProjectLogo" src={projectLogo} alt="logo" />
                                    </div>
                                    <div className="officeDetails">
                                        <p>Book Your Insurance,  9175560792, 9423115728,  bookyourinsurance@gmail.com</p>
                                    </div>
                                    <div className="employeeDetails">
                                      <div className="titlePaid">EMPLOYEE INFORMATION</div>
                                      <div className="empInfoDiv">
                                          <p className="empNameData">{this.state.userName}</p>
                                          <p>Indo Rama Colony No 2, MIDC Area Butibori Nagpur</p>
                                          <p>9517532582</p>
                                      </div>
                                    </div>

                                </div>
                                <div className="col-lg-6 col-md-6">
                                   <h1 className="PayslipTitle">PAYSLIP</h1>
                                   <div className="paidDate">
                                       <div className="all_Data">
                                        <div className="titlePaid">PAY DATE</div>
                                        <div className="SUBtitlePaid">06-10-2023</div>
                                        </div>
                                       <div className="all_Data">
                                        <div className="titlePaid">PAY TYPE</div>
                                        <div className="SUBtitlePaid">Weekly</div>
                                        </div>
                                       <div className="all_Data">
                                        <div className="titlePaid">PERIOD</div>
                                        <div className="SUBtitlePaid">WK22</div>
                                        </div>
                                   </div>
                                </div>
                          </div>
                          <div className="table-responsive-lg " style={{marginTop:"30px"}}>
                                   <Table bordered>
                                        <thead className="thead-light">
                                            <tr>
                                                <th scope="col" className="border_none fontTablesize">Earning</th>
                                                <th scope="col" className="border_none fontTablesize" style={{textAlign:"end"}}>Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="border_td fontTablesizeTd">Basic</td>
                                                <td className="border_td fontTablesizeTd" style={{textAlign:"end"}}>&#x20b9;5000</td>
                                            </tr>
                                            <tr>
                                                <td className="border_td fontTablesizeTd">Bonus</td>
                                                <td className="border_td fontTablesizeTd" style={{textAlign:"end"}}>&#x20b9;10000</td>
                                            </tr>
                                            <tr>
                                                <td className="border_td fontTablesizeTd">Overtime Pay</td>
                                                <td className="border_td fontTablesizeTd" style={{textAlign:"end"}}>&#x20b9;5000</td>
                                            </tr>
                                            <tr>
                                                <td className="border_td fontTablesizeTd">Holiday Pay</td>
                                                <td className="border_td fontTablesizeTd" style={{textAlign:"end"}}>&#x20b9;2000</td>
                                            </tr>
                                            <tr>
                                                <td className="border_td fontTablesizeTd">Expenses</td>
                                                <td className="border_td fontTablesizeTd" style={{textAlign:"end"}}>&#x20b9;3000</td>
                                            </tr>
                                        </tbody>
                                        <thead className="thead-light">
                                            <tr>
                                                <th scope="col" className="border_none fontTablesize">Gross Pay</th>
                                                <th scope="col" className="border_none fontTablesize" style={{textAlign:"end"}}>&#x20b9;25000</th>
                                            </tr>
                                        </thead>
                                        <thead className="thead-light">
                                            <tr>
                                                <th scope="col" className="border_none fontTablesize">Deducation</th>
                                                <th scope="col" className="border_none fontTablesize" style={{textAlign:"end"}}>Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="border_td fontTablesizeTd">TD</td>
                                                <td className="border_td fontTablesizeTd" style={{textAlign:"end"}}>-&#x20b9;200</td>
                                            </tr>
                                            <tr>
                                                <td className="border_td fontTablesizeTd">PF</td>
                                                <td className="border_td fontTablesizeTd" style={{textAlign:"end"}}>-&#x20b9;2000</td>
                                            </tr>
                                            <tr>
                                                <td className="border_td fontTablesizeTd">Insurance</td>
                                                <td className="border_td fontTablesizeTd" style={{textAlign:"end"}}>-&#x20b9;500</td>
                                            </tr>
                                            <tr>
                                                <td className="border_td fontTablesizeTd">Loan</td>
                                                <td className="border_td fontTablesizeTd" style={{textAlign:"end"}}>-&#x20b9;300</td>
                                            </tr>
                                        </tbody>
                                        <thead className="thead-light">
                                            <tr>
                                                <th scope="col" className="border_none fontTablesize">Net Pay</th>
                                                <th scope="col" className="border_none fontTablesize" style={{textAlign:"end"}}>&#x20b9;22000</th>
                                            </tr>
                                        </thead>
                                    </Table>
                                  </div>

                                  <div className="showAnountInNumber">
                                        <p>22000</p>
                                        <p>{this.intToEnglish(22000)}</p>
                                  </div>
                                  <div className="signatureeeEmloyee" style={{marginTop:"20px"}}>
                                        <div className="row">
                                            <div className="col-lg-4 col-md-4 signatureDetails">
                                                <div>Employer Signature</div>
                                                <hr/>
                                            </div>
                                            <div className="col-lg-4 col-md-4 "></div>
                                            <div className="col-lg-4 col-md-4 signatureDetails">
                                            <div>Employee Signature</div>
                                                <hr/>
                                            </div>
                                        </div>
                                  </div>
                                  <div className="showAnountInNumber">
                                        <p>This is system generated payslip</p>
                                  </div>
                                  <div className="showAnountText">
                                        <p>Book Your Insurance,  9175560792, 9423115728,  bookyourinsurance@gmail.com</p>
                                  </div>
                        </div>
                        </div>


                    :""
                     } */}



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
 ), { addToast: actionAddToast } )( Content );

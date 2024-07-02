/**
 * External Dependencies
 */
import './style.scss'
 import React, { Component, Fragment } from 'react';
 import { connect } from 'react-redux';

 /**
  * Internal Dependencies
  */
 import Snippet from '../../components/snippet';
 import MarkdownEditor from '../../components/easy-mde';
 import PageTitle from '../../components/page-title';
import Tabs from '../../components/tabs';
// import Button from 'reactstrap/lib/Button';
import Icon from '../../components/icon';
import { Table, Modal, ModalBody, ModalFooter, Button, Label,Spinner,CustomInput,Input,Collapse, UncontrolledCollapse, Card, CardBody, CardText} from 'reactstrap';
import {
    addToast as actionAddToast,
} from '../../actions';
import Select from 'react-select';
import DatePicker from "../../components/date-time-picker";
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import dateFormat from 'dateformat';
import { el } from 'date-fns/locale';
import Cookies from 'js-cookie';
import pdf_img from '../../images/pdf.png'

 /**
  * Component
  */

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

 const admin_data = JSON.parse(Cookies.get('admin_data'));
 console.log(admin_data);

 class Content extends Component {
    constructor( props ) {
        super( props );

        this.state = {
             Loansmodal:false,
             MakePaymentmodal:false,
             activeTab2: 'home',
             employee_typeahead:[],
             selectedOptions:[],
             heading_for_loans :"Add Loans",
             button_for_loans : "Save",
             error_meesage_loans:"",
             borderNew:false,
             repay_model:"",
             one_time_date:new Date(),
             total_months:"",
             loan_id:"",
             total_months_year:new Date(),
             manually_date:new Date(),
             loans_array:[],
             single_loans_array:[],
             isLoading:"block",
             no_data_message:"none",
             spinner_1:"none",
             emp_name:"",
             loan_amount_single:"",
             repay_model_single:"",
             start_from_month_single:"",
             manual_till_date_single:"",
             one_time_pay_date_single:"",
             show_message:"",
             payment_ledger:[],
             edited_logs:[],
             paid_by_emp_list:[],
             balance_amount_loan:"",
             amount_to_paid:"",
             error_meesage_mark_loan:"",
             remark_mark_paid:"",
             loan_amount_message:"",
             heading_for_repay_model:"",
             paid_amount_loan:"",
             invalid_data:false,
             ipad_width:"none",
             ipad_emp_list:"block",
             button_loan:"Save",
             heading_loan:"Add Loan",
             admin_id:admin_data[0]._id,
             admin_name:admin_data[0].name,
             activeAccordion: 0,
             AlertDeleteSingle: false,
             loans_control : Cookies.get("loans_control")

        };

        setTimeout(() => {
            this.fetch_emp_for_loans();
         }, 0)
        this.Loansmodal = this.Loansmodal.bind(this);
        this.MakePaymentmodal = this.MakePaymentmodal.bind(this);
        this.AlertDeleteSingle = this.AlertDeleteSingle.bind( this );
        this.toggleTab = this.toggleTab.bind( this );
    }

    AlertDeleteSingle() {
        this.setState( ( prevState ) => ( {
            AlertDeleteSingle: ! prevState.AlertDeleteSingle,
        } ) );
    }
    toggleTab( num, name ) {
        this.setState( {
            [ `activeTab${ num }` ]: name,
        } );
        setTimeout(() => {
            this.fetch_emp_for_loans();
         }, 0)
    }


    fetch_manager_typeahead= (value) =>{
        console.log("All Addd");
        const {
            addToast,settings
        } = this.props;
        var params={
            manager_name:value
        }
        console.log("kkkkkk",params);
          const res = fetch(settings.api_url + "fetch_manager_typeahead", {
              method: 'POST',
              body: JSON.stringify(params),
              headers: {
                  "Content-type": "application/json; charset=UTF-8",
              }
          }).then((response) => response.json())
              .then(json => {
                  console.log("Manager Response **************************************", { response: json })
                  var data = json;
                  if (data.status == true) {
                    var lenth_of_type = data.data
                    // for (let i = 0; i < lenth_of_type.length; i++) {
                    //     var new_12={
                    //         value:lenth_of_type[i]._id,
                    //         label:lenth_of_type[i].name,
                    //     }

                    //     manager_typeahead.push(new_12)
                    // }

                    var lenth_of_type = data.data;
                    var employee_Object = lenth_of_type.map(item => {
                        var kkk ={
                            value:item._id,
                            label:item.name
                        }
                        return (kkk)
                    });
                    console.log("employee_Object", employee_Object);
                    this.setState({
                        employee_typeahead: employee_Object,
                        employee_array_fro_id: data.data,
                    })

                    // this.setState({
                    //     manager_typeahead:manager_typeahead
                    // })



                  }
                  else {
                  }
              })
      }

      handleSelection = (selectedOptions) => {
        console.log("selectedOptions**************************",selectedOptions);
        this.setState({ selectedOptions });
      };

    Loansmodal() {
        this.setState( ( prevState ) => ( {
               Loansmodal: ! prevState.Loansmodal,
               heading_for_loans :"Add Loans",
               button_for_loans : "Save",
               employee_typeahead:[],
               selectedOptions:[],
               error_meesage_loans:"",
               loan_amount:"",
               borderNew:false,
               repay_model:"",
               one_time_date:new Date(),
               total_months:"",
               total_months_year:new Date(),
               manually_date:new Date(),
               button_loan:"Save",
               heading_loan:"Add Loan",
        } ) );
    }



    switch_function_for_loans=()=>{

        if(this.state.button_for_loans == "Save"){
          this.add_loans();
        }
        else{
          this.edit_loans();
        }

      }

      fetch_emp_for_loans=()=>{
        const { addToast,settings } = this.props;
            if (this.state.activeTab2 == "home") {
                var status ="ongoing"
            }else{
                var status ="completed"
            }
            var params={
                status:status
            }
            console.log("params",params);
            const res = fetch(settings.api_url + "api/loans/fetch_emp_for_loans", {
                method: 'POST',
                body: JSON.stringify(params),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            }).then((response) => response.json())
                .then(json => {
                    console.log("Fetch Loans ***************", json)
                    var data = json;
                    if (data.status == true) {
                        this.setState({
                            loans_array:data.data,
                            loan_id:data.data[0].loan_id,
                            emp_name:data.data[0].emp_name,
                            isLoading:"none",
                            no_data_message:"none"
                        });
                        if (device_width < 820) {
                           }
                           else{
                            this.fetch_loan_details(data.data[0].loan_id)
                           }

                    }
                    else {
                        this.setState({
                            loans_array:[],
                            isLoading:"none",
                            no_data_message:"block"
                        });
                    }
                })
      }


      fetch_loan_details=(loan_id)=>{
        const { addToast,settings } = this.props;
            var params={
                loan_id:loan_id
            }
            console.log("Single Params",params);
            const res = fetch(settings.api_url + "api/loans/fetch_loan_details", {
                method: 'POST',
                body: JSON.stringify(params),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            }).then((response) => response.json())
                .then(json => {
                    console.log("Fetch Single Emp Loans ***************", json)
                    var data = json;
                    if (data.status == true) {

                        if (data.data[0].repay_model == "one_time") {
                            var repay_model= "One Time"
                            var heading_for_repay_model ="Payment Date"
                        }else if (data.data[0].repay_model == "monthly") {
                            var repay_model= "Monthly"
                            var heading_for_repay_model ="Deduction From"
                        }else if (data.data[0].repay_model == "manually") {
                            var repay_model= "Manually"
                            var heading_for_repay_model ="Till Date"
                        }

                        if (data.data[0].start_from_month == null || data.data[0].start_from_month == "") {
                            var now_1 = ""
                        }else{
                            var now_1 = new Date(data.data[0].start_from_month)
                            var now = now_1;
                            var start_from_month = dateFormat(now, "mmmm yyyy")
                        }
                        if (data.data[0].one_time_pay_date == null || data.data[0].one_time_pay_date == "" ) {
                            var one_time_pay_date = ""
                        }else{
                            var data_new = data.data[0].one_time_pay_date
                            var one_time_pay_date = data_new.split("-")[2] + "-" + data_new.split("-")[1] + "-" + data_new.split("-")[0]
                        }
                        if (data.data[0].manual_till_date == null || data.data[0].manual_till_date == "") {
                            var manual_till_date = ""
                        }else{
                            var manual_till_date = data.data[0].manual_till_date.split("-")[2] + "-" + data.data[0].manual_till_date.split("-")[1] + "-" + data.data[0].manual_till_date.split("-")[0]
                        }

                        if (device_width < 820) {
                            var ipad_emp_list = "none";
                           }
                           else{
                           var ipad_emp_list = "block"
                           }

                           var edited_logs = data.data[0].edited_logs
                           for (let i = 0; i < edited_logs.length; i++) {
                               var dateTime = edited_logs[i].date_time;
                               var new_date = this.formatDate(dateTime);
                               edited_logs[i].date_time_new = new_date
                           }


                        this.setState({
                            single_loans_array:data.data,
                            loan_id:data.data[0].loan_id,
                            loan_amount_single:data.data[0].loan_amount,
                            loan_date:data.data[0].added_date,
                            repay_model_single:repay_model,
                            start_from_month_single:start_from_month,
                            manual_till_date_single:manual_till_date,
                            one_time_pay_date_single:one_time_pay_date,
                            total_months_single:data.data[0].total_months,
                            show_message:data.data[0].show_message,
                            payment_ledger:data.data[0].payment_ledger,
                            edited_logs:edited_logs,
                            paid_by_emp_list:data.data[0].paid_by_emp_list,
                            balance_amount_loan:data.data[0].balance_amount,
                            paid_amount_loan:data.data[0].paid_amount,
                            heading_for_repay_model:heading_for_repay_model,
                            spinner_1:"none",
                            no_data_message:"none",
                            ipad_width:"block",
                            ipad_emp_list:ipad_emp_list,
                        });
                    }
                    else {
                        this.setState({
                            loans_array:[],
                            spinner_1:"none",
                            no_data_message:"block"
                        });
                    }
                })
      }


      formatDate(date) {
        // //console.log("date",new Date(date));
                var date = new Date(date);
                var year = date.getFullYear();
               var  month = date.getMonth()+1;
               var dt = date.getDate();

                 if (dt < 10) {
                 dt = '0' + dt;
                 }
                 if (month < 10) {
                 month = '0' + month;
                 }

                //  //console.log(dt+'-' + month + '-'+year);
                 var new_date_1 = dt+'-' + month + '-'+year

                 var today = date;
                 let options_1 = {
                     hour: "2-digit", minute: "2-digit"
                 };

                 var time_new =today.toLocaleTimeString("en-us", options_1)

                 var nre_time =new_date_1+" "+ time_new


                return nre_time;
              }

      switch_functionality=()=>{
        if (this.state.button_loan == "Save") {
            this.add_loans()
        }else{
            this.edit_loans()
        }
      }

      add_loans=()=>{
        const { addToast,settings } = this.props;

        if (this.state.selectedOptions == "" || this.state.selectedOptions == undefined || this.state.loan_amount == "" || this.state.loan_amount == undefined || this.state.repay_model == "" || this.state.repay_model == undefined ) {
            this.setState({
                error_meesage_loans:"Please fill all the fields",
                borderNew:true
            })
        }else{

            if (this.state.selectedOptions == "") {
                var emp = ""
            }else{
                var emp = this.state.selectedOptions[0]
            }

            if (this.state.repay_model == "one_time") {
                const today = new Date(this.state.one_time_date);
                const yyyy = today.getFullYear();
                let mm = today.getMonth() + 1; // Months start at 0!
                let dd = today.getDate();
                if (dd < 10) dd = '0' + dd;
                if (mm < 10) mm = '0' + mm;
                var formattedToday_start = yyyy + '-' + mm + '-' + dd;
                var one_time_pay_date = formattedToday_start
                var manual_till_date = undefined
                var start_from_month = undefined
                var total_months = undefined
            }else if (this.state.repay_model == "monthly") {
                const today = new Date(this.state.total_months_year);
                const yyyy = today.getFullYear();
                let mm = today.getMonth() + 1; // Months start at 0!
                let dd = today.getDate();
                if (dd < 10) dd = '0' + dd;
                if (mm < 10) mm = '0' + mm;
                var formattedToday_start = yyyy + '-' + mm ;
                var one_time_pay_date = undefined
                var manual_till_date = undefined
                var start_from_month = formattedToday_start
                var total_months = this.state.total_months
            }
            else if (this.state.repay_model == "manually") {
                const today = new Date(this.state.manually_date);
                const yyyy = today.getFullYear();
                let mm = today.getMonth() + 1; // Months start at 0!
                let dd = today.getDate();
                if (dd < 10) dd = '0' + dd;
                if (mm < 10) mm = '0' + mm;
                var formattedToday_start = yyyy + '-' + mm + '-' + dd;
                var one_time_pay_date = undefined
                var manual_till_date = formattedToday_start
                var start_from_month = undefined
                var total_months = undefined
            }

            var params ={
                emp:emp,
                loan_amount:Number(this.state.loan_amount),
                repay_model:this.state.repay_model,
                total_months:total_months,
                start_from_month:start_from_month,
                manual_till_date:manual_till_date,
                one_time_pay_date:one_time_pay_date,
            }
            console.log("params add loans",params);
            const res = fetch(settings.api_url + "api/loans/add_loans", {
                method: 'POST',
                body: JSON.stringify(params),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            }).then((response) => response.json())
                .then(json => {
                    console.log("Add Loans ***************", json)
                    var data = json;
                    if (data.status == true) {
                        this.setState({
                            button_loan:"Save",
                             heading_loan:"Add Loan",
                            employee_typeahead:[],
                            selectedOptions:[],
                            error_meesage_loans:"",
                            loan_amount:"",
                            borderNew:false,
                            repay_model:"",
                            one_time_date:new Date(),
                            total_months:"",
                            total_months_year:new Date(),
                            manually_date:new Date(),
                            Loansmodal:false
                        });
                        addToast({
                            title: 'Book Your Insurance',
                            content: data["message"],
                            time: new Date(),
                            duration: 2000,
                        });

                        this.fetch_emp_for_loans()
                    }
                    else {
                        this.setState({
                            error_meesage_loans:data["message"],
                            Loansmodal:true
                        });
                        addToast({
                            title: 'Book Your Insurance',
                            content: data["message"],
                            time: new Date(),
                            duration: 2000,
                        });
                    }
                })
        }
      }

      edit_loans=()=>{
        const { addToast,settings } = this.props;

        if (this.state.selectedOptions == "" || this.state.selectedOptions == undefined || this.state.loan_amount == "" || this.state.loan_amount == undefined || this.state.repay_model == "" || this.state.repay_model == undefined ) {
            this.setState({
                error_meesage_loans:"Please fill all the fields",
                borderNew:true
            })
        }else{

            if (this.state.selectedOptions == "") {
                var emp = ""
            }else{
                var emp = this.state.selectedOptions[0]
            }

            if (this.state.repay_model == "one_time") {
                const today = new Date(this.state.one_time_date);
                const yyyy = today.getFullYear();
                let mm = today.getMonth() + 1; // Months start at 0!
                let dd = today.getDate();
                if (dd < 10) dd = '0' + dd;
                if (mm < 10) mm = '0' + mm;
                var formattedToday_start = yyyy + '-' + mm + '-' + dd;
                var one_time_pay_date = formattedToday_start
                var manual_till_date = undefined
                var start_from_month = undefined
                var total_months = undefined
            }else if (this.state.repay_model == "monthly") {
                const today = new Date(this.state.total_months_year);
                const yyyy = today.getFullYear();
                let mm = today.getMonth() + 1; // Months start at 0!
                let dd = today.getDate();
                if (dd < 10) dd = '0' + dd;
                if (mm < 10) mm = '0' + mm;
                var formattedToday_start = yyyy + '-' + mm ;
                var one_time_pay_date = undefined
                var manual_till_date = undefined
                var start_from_month = formattedToday_start
                var total_months = this.state.total_months
            }
            else if (this.state.repay_model == "manually") {
                const today = new Date(this.state.manually_date);
                const yyyy = today.getFullYear();
                let mm = today.getMonth() + 1; // Months start at 0!
                let dd = today.getDate();
                if (dd < 10) dd = '0' + dd;
                if (mm < 10) mm = '0' + mm;
                var formattedToday_start = yyyy + '-' + mm + '-' + dd;
                var one_time_pay_date = undefined
                var manual_till_date = formattedToday_start
                var start_from_month = undefined
                var total_months = undefined
            }

            var edited_by={
                value:this.state.admin_id,
                label:this.state.admin_name,
            }

            var params ={
                emp:emp,
                loan_amount:Number(this.state.loan_amount),
                repay_model:this.state.repay_model,
                total_months:total_months,
                start_from_month:start_from_month,
                manual_till_date:manual_till_date,
                one_time_pay_date:one_time_pay_date,
                loan_id:this.state.loan_id,
                edited_by:edited_by,
            }
            console.log("params Edit loans",params);
            const res = fetch(settings.api_url + "api/loans/update_loan", {
                method: 'POST',
                body: JSON.stringify(params),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            }).then((response) => response.json())
                .then(json => {
                    console.log("Edit Loans ***************", json)
                    var data = json;
                    if (data.status == true) {
                        this.setState({
                            button_loan:"Save",
                             heading_loan:"Add Loan",
                            employee_typeahead:[],
                            selectedOptions:[],
                            error_meesage_loans:"",
                            loan_amount:"",
                            borderNew:false,
                            repay_model:"",
                            one_time_date:new Date(),
                            total_months:"",
                            total_months_year:new Date(),
                            manually_date:new Date(),
                            Loansmodal:false
                        });
                        addToast({
                            title: 'Book Your Insurance',
                            content: data["message"],
                            time: new Date(),
                            duration: 2000,
                        });

                        this.fetch_loan_details(this.state.loan_id)
                    }
                    else {
                        this.setState({
                            error_meesage_loans:data["message"],
                            Loansmodal:true
                        });
                        addToast({
                            title: 'Book Your Insurance',
                            content: data["message"],
                            time: new Date(),
                            duration: 2000,
                        });
                    }
                })
        }
      }

      MakePaymentmodal() {
        this.setState( ( prevState ) => ( {
               MakePaymentmodal: ! prevState.MakePaymentmodal,
               remark_mark_paid:"",
               amount_to_paid:"",
               error_meesage_mark_loan:"",
               loan_amount_message:"",
               borderNew:false,
               invalid_data:false,
        } ) );
    }



    mark_paid_loan_amount=()=>{
        const { addToast,settings } = this.props;

        if (this.state.amount_to_paid == "" || this.state.amount_to_paid == undefined) {
            this.setState({
                error_meesage_mark_loan:"Please fill Amount to be Paid",
                borderNew:true
            })
        }else{

            var params ={
                paying_amount:Number(this.state.amount_to_paid),
                remark:this.state.remark_mark_paid,
                loan_id:this.state.loan_id,
            }
            console.log("params mark paid",params);
            const res = fetch(settings.api_url + "api/loans/mark_paid_loan_amount", {
                method: 'POST',
                body: JSON.stringify(params),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            }).then((response) => response.json())
                .then(json => {
                    console.log("Mark Paid Loans Amount ***************", json)
                    var data = json;
                    if (data.status == true) {
                        this.setState({
                            remark_mark_paid:"",
                            amount_to_paid:"",
                            error_meesage_mark_loan:"",
                            loan_amount_message:"",
                            borderNew:false,
                            invalid_data:false,
                            MakePaymentmodal:false
                        });
                        addToast({
                            title: 'Book Your Insurance',
                            content: data["message"],
                            time: new Date(),
                            duration: 2000,
                        });

                        if (params.paying_amount == this.state.balance_amount_loan) {
                            console.log("All Pending Payemnt Done");
                            this.fetch_emp_for_loans()
                        }else{

                            this.fetch_loan_details(this.state.loan_id)
                        }
                    }
                    else {
                        this.setState({
                            error_meesage_mark_loan:data["message"],
                            MakePaymentmodal:true
                        });
                        addToast({
                            title: 'Book Your Insurance',
                            content: data["message"],
                            time: new Date(),
                            duration: 2000,
                        });
                    }
                })
        }
      }

      amount_paid_loan=(loan_amount, balance_amount)=>{
          if (loan_amount > balance_amount) {
              this.setState({
                  loan_amount_message:"Paid Amount is not greater than Balance Amount",
                  invalid_data:true
              })
          }else{
            this.setState({
                loan_amount_message:"",
                invalid_data:false
            })
          }

      }

      forEdit=(value)=>{
        console.log("Loan Edit",value);
        var empDetails = [
            {
            value: this.state.emp_id,
            label: this.state.emp_name
           }
        ]
        this.setState({
            Loansmodal:true,
            button_loan:"Update",
            heading_loan:"Edit Loan",
            selectedOptions:empDetails,
            loan_id:value[0].loan_id,
            loan_amount:value[0].loan_amount,
            repay_model:value[0].repay_model,
            one_time_date:new Date(value[0].one_time_pay_date),
            total_months:value[0].total_months,
            total_months_year:new Date(value[0].start_from_month),
            manually_date:new Date(value[0].manual_till_date),
        })
      }


      approve_disapprove_loan_payments=(allowance_id)=>{
        const { settings,addToast } = this.props;
        var params = {
            loan_id:this.state.loan_id,
            loan_payment_id:this.state.loan_payment_id,
            status:this.state.approve_status
        }
        console.log("params",params);
        const res = fetch(settings.api_url + "api/loans/approve_disapprove_loan_payments", {
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        }).then((response) => response.json())
            .then(json => {
                console.log("Approve or Disaaprove Loan Payments ***************", json)
                var data = json;
                if (data.status == true) {
                    addToast({
                        title: 'Book Your Insurance',
                        content: data["message"],
                        time: new Date(),
                        duration: 1000,
                    });
                    this.setState({
                        AlertDeleteSingle:false,
                    });

                    this.fetch_loan_details(this.state.loan_id)
                }
                else {
                    addToast({
                        title: 'Book Your Insurance',
                        content: data["message"],
                        time: new Date(),
                        duration: 1000,
                    });
                    this.setState({
                        AlertDeleteSingle:false,
                    });
                }
            })
         }

     render() {
        const {
            activeAccordion,
        } = this.state;
         return (
             <Fragment>
                 <PageTitle className="loan_page">
                     <div className="row">
                         <div className="col-lg-8 col-md-8">
                            <h1>Loans</h1>
                         </div>
                         <div className="col-lg-4 col-md-4" style={{textAlign:"end"}}>
                            <Button disabled={this.state.loans_control == "false" ? true : false} className="button_new" color="warning" style={{color:"#fff"}} onClick={this.Loansmodal}>Add Loans</Button>
                         </div>
                     </div>

                 </PageTitle>
                 <div>
                 <Tabs pills className="loans_tabs">
                        <Tabs.NavItem
                            isActive={ this.state.activeTab2 === 'home' }
                            onClick={ () => this.toggleTab( 2, 'home' ) }
                            className="onging_loans"
                        >
                            Ongoing Loans
                        </Tabs.NavItem>
                        <Tabs.NavItem
                            isActive={ this.state.activeTab2 === 'profile' }
                            onClick={ () => this.toggleTab( 2, 'profile' ) }
                            className="complete_loans"
                        >
                            Completed Loans
                        </Tabs.NavItem>
                    </Tabs>
                    <Tabs.Content activeTab={ this.state.activeTab2 }>
                        <Tabs.Pane tabId="home">
                         <Spinner color="warning" className="spinner_css_12345666" style={{ marginTop: gk, display: this.state.isLoading }} />
                            <div className="test_collapse" style={{display: this.state.isLoading == "none" ? "block" : "none"}}>
                            <h3 style={{ display: this.state.no_data_message, padding: "15px",textAlign:"center",color:" #a4a3a3",width: "100%",marginTop:gk}}>No Data Found</h3>
                               <div style={{display: this.state.no_data_message=="none" ? "block" :"none"}}>
                                  <div className="row test_collapse">
                                     <div className="col-lg-4 col-md-12 test_collapse" style={{paddingRight:"0px",display: this.state.ipad_emp_list}}>
                                       <div className="mycalendar_loans height_sales" style={{height:my_height-106}}>
                                          <div className="">
                                            <Table striped>
                                            <thead>
                                                <tr>
                                                    <th scope="col" className="padding_data_loans">Employee Name</th>
                                                    <th scope="col" className="padding_data_loans">Amount</th>
                                                    <th scope="col" className="padding_data_loans">Date</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.loans_array.map((value,index)=>{
                                                    return(
                                                    <tr key={index} style={{cursor:"pointer"}} onClick={()=>{
                                                        this.setState({
                                                            loan_id:value.loan_id,
                                                            emp_name:value.emp_name,
                                                            emp_id:value.emp_id,
                                                            loan_amount:value.loan_amount,
                                                            spinner_1:"block"
                                                        })
                                                        setTimeout(() => {
                                                            this.fetch_loan_details(value.loan_id)
                                                        }, 0)
                                                    }}>
                                                        <th scope="row" style={{borderLeft : value.loan_id == this.state.loan_id ? "5px solid #8bc240" : ""}} className="padding_data_loans">{value.emp_name}</th>
                                                        <th scope="row" className="padding_data_loans">&#x20b9;{value.loan_amount}</th>
                                                        <th scope="row" className="padding_data_loans" style={{whiteSpace:"nowrap"}}>{value.loan_date ? dateFormat(new Date(value.loan_date.replace("Z", "")), "dd-mm-yyyy"):""}</th>
                                                    </tr>
                                                    )
                                                })}

                                            </tbody>
                                        </Table>
                                    </div>
                                  </div>
                               </div>
                               <div className="col-lg-8 col-md-12 test_collapse i_pad_view" style={{paddingLeft:"0px",display: device_width < 769 ? this.state.ipad_width : "block"}}>
                                    <Spinner color="warning" className="left_section" style={{marginTop:gk,display: this.state.spinner_1}}/>
                                        <div className="test_collapse"  style={{display: this.state.spinner_1=="none" ? "block" :"none"}}>
                                            <div className="mycalendar_loans" style={{height:my_height-106}}>

                                                <div className="test_collapse mark_paid_button">
                                                    <h3>{this.state.emp_name}</h3>
                                                    <div className="marGinLeftNew">
                                                    <Button disabled={this.state.loans_control == "false" ? true : false} color="primary" onClick={()=>{this.forEdit(this.state.single_loans_array)}}>Edit</Button></div>
                                                    <div className="" style={{display: device_width < 769 ? this.state.ipad_width : "block"}}>
                                                        <Button color="info" className="backk_btnnn" style={{ textTransform:"capitalize", display: device_width < 769 ? "inline-flex" : "none"}}
                                                            onClick={() => {
                                                            this.setState({
                                                                ipad_emp_list:"block",
                                                                ipad_width:"none"
                                                            })
                                                            }}>Back</Button>
                                                        </div>
                                                    {/* <Button className="button_new" color="success">Mark Paid</Button> */}
                                                </div>

                                                <div className="test_collapse row" style={{padding:"12px 18px"}}>
                                                   <div className="col-lg-4 col-md-4">
                                                        <div className="heading_top_newww">Date</div>
                                                        <div className="heading_bottom_loans">{this.state.loan_date ? dateFormat(new Date(this.state.loan_date.replace("Z", "")), "dd-mm-yyyy"):""}</div>
                                                   </div>
                                                   <div className="col-lg-4 col-md-4">
                                                        <div className="heading_top_newww">Loan Amount</div>
                                                        <div className="heading_bottom_loans">&#x20b9;{this.state.loan_amount_single}</div>
                                                   </div>
                                                   <div className="col-lg-4 col-md-4">
                                                        <div className="heading_top_newww">Repay Model</div>
                                                        <div className="heading_bottom_loans">{this.state.repay_model_single }</div>
                                                   </div>
                                                   <div className="col-lg-4 col-md-4 mt-20" >
                                                        <div className="heading_top_newww">Paid Amount</div>
                                                        <div className="heading_bottom_loans">&#x20b9;{Number(this.state.paid_amount_loan).toFixed(0) }</div>
                                                   </div>
                                                   <div className="col-lg-4 col-md-4 mt-20" style={{display:this.state.balance_amount_loan == "" && this.state.balance_amount_loan == undefined ? "none" : "block"}}>
                                                        <div className="heading_top_newww">Balance Amount</div>
                                                        <div className="heading_bottom_loans">&#x20b9;{this.state.balance_amount_loan }</div>
                                                   </div>
                                                   <div className="col-lg-4 col-md-4 mt-20" style={{display:this.state.repay_model_single == "Monthly" && this.state.total_months_single != null ? "block" : "none"}}>
                                                        <div className="heading_top_newww">Total Month</div>
                                                        <div className="heading_bottom_loans">{this.state.total_months_single }</div>
                                                   </div>
                                                   <div className="col-lg-4 col-md-4 mt-20">
                                                        <div className="heading_top_newww">{this.state.heading_for_repay_model}</div>
                                                        <div className="heading_bottom_loans" style={{display:this.state.repay_model_single == "One Time" && this.state.one_time_pay_date_single !== null ? "block" : "none"}}>{this.state.one_time_pay_date_single }</div>
                                                        <div className="heading_bottom_loans" style={{display:this.state.repay_model_single == "Manually" && this.state.manual_till_date_single !== null ? "block" : "none"}}>{this.state.manual_till_date_single }</div>
                                                        <div className="heading_bottom_loans" style={{display:this.state.repay_model_single == "Monthly" && this.state.start_from_month_single !== null ? "block" : "none"}}>{this.state.start_from_month_single }</div>
                                                   </div>
                                                </div>

                                                <div className="test_collapse" style={{display:this.state.edited_logs == "" || this.state.edited_logs == undefined ? "none" : "block",marginTop:"18px" ,padding: "12px 16px",marginBottom:"-25px"}}>
                                                <div className="accordion-group">
                                                            { /* eslint-disable-next-line jsx-a11y/anchor-is-valid */ }
                                                            <a
                                                                href="#"
                                                                style={{fontSize:"18px"}}
                                                                className="collapse-link"
                                                                onClick={ ( e ) => {
                                                                    e.preventDefault();
                                                                    this.setState( {
                                                                        activeAccordion: activeAccordion === 1 ? 0 : 1,
                                                                    } );
                                                                } }
                                                            >
                                                                <div className="headingEdit">
                                                                    Edited Logs
                                                                    <div>
                                                                        <Icon name="chevron-down" style={{display : activeAccordion ===1 ? "none" : "block" }} />
                                                                        <Icon name="chevron-up" style={{display : activeAccordion ===1 ? "block" : "none" }} />
                                                                    </div>
                                                                </div>
                                                            </a>
                                                            <Collapse isOpen={ 1 === activeAccordion }>
                                                                <div className="collapse-content new-content-edited">
                                                                <div className="table-responsive-lg  scroll_1">
                                                                    <Table striped>
                                                                        <thead>
                                                                            <tr>
                                                                            <th scope="col" className="border_none">Edited By</th>

                                                                                <th scope="col" className="border_none">Date</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {this.state.edited_logs.map((value,index)=>{
                                                                                return(
                                                                            <tr key={index}>
                                                                                <th scope="row" className="border_td">{value.edited_by ? value.edited_by.label :""}</th>
                                                                                <td className="border_td">{value.date_time_new} </td>

                                                                            </tr>
                                                                                )
                                                                            })}

                                                                        </tbody>
                                                                    </Table>
                                                                    </div>
                                                                 </div>
                                                            </Collapse>
                                                        </div>
                                                </div>



                                                <div className="test_collapse" style={{display:this.state.paid_by_emp_list == "" || this.state.paid_by_emp_list == undefined ? "none" : "block",marginTop:"18px" ,padding: "12px 16px",marginBottom:"-25px"}}>
                                                <div className="accordion-group">
                                                            { /* eslint-disable-next-line jsx-a11y/anchor-is-valid */ }
                                                            <a
                                                                href="#"
                                                                style={{fontSize:"18px"}}
                                                                className="collapse-link"
                                                                onClick={ ( e ) => {
                                                                    e.preventDefault();
                                                                    this.setState( {
                                                                        activeAccordion: activeAccordion === 2 ? 0 : 2,
                                                                    } );
                                                                } }
                                                            >
                                                                <div className="headingEdit">
                                                                    Payment Done By Employee
                                                                    <div>
                                                                        <Icon name="chevron-down" style={{display : activeAccordion ===2 ? "none" : "block" }} />
                                                                        <Icon name="chevron-up" style={{display : activeAccordion ===2 ? "block" : "none" }} />
                                                                    </div>
                                                                </div>
                                                            </a>
                                                            <Collapse isOpen={ 2 === activeAccordion }>
                                                                <div className="collapse-content new-content-edited">
                                                                <div className="table-responsive-lg  scroll_1">
                                                                    <Table striped>
                                                                        <thead>
                                                                            <tr>
                                                                                <th scope="col" className="border_none">Date</th>
                                                                                <th scope="col" className="border_none">Employee Name</th>
                                                                                <th scope="col" className="border_none">Remark</th>
                                                                                <th scope="col" className="border_none" style={{textAlign:"end"}}>Amount</th>
                                                                                <th scope="col" className="border_none">Bills</th>
                                                                                <th scope="col" className="border_none">Action</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {this.state.paid_by_emp_list.map((value,index)=>{
                                                                                return(
                                                                            <tr key={index}>
                                                                                <th scope="row" className="border_td" style={{whiteSpace:"nowrap"}}>{dateFormat(new Date(value.payment_date.replace("Z", "")), "dd-mm-yyyy")}</th>
                                                                                <td className="border_td">{value.added_by ? value.added_by.label :""}</td>
                                                                                <td className="border_td">{value.remark}</td>
                                                                                <td className="border_td" style={{textAlign:"end"}}>&#x20b9;{value.paying_amount}</td>
                                                                                <td className="border_td">
                                                                                <div className="billImageNew">
                                                                                    {value.bill_image ?   value.bill_image.map((v1,i1)=>{
                                                                                    return(
                                                                                        <div key={i1}>
                                                                                        <span style={{display:v1.file_type=="image" ? "block" :"none"}}>
                                                                                        <a rel="noreferrer" href={v1.image_link} target="_blank">
                                                                                            <img src={v1.image_link} alt="img" className="image_pdf" style={{borderRadius:"5px",height:"30px", width:"30px"}}/></a>
                                                                                        </span>

                                                                                        <span style={{display:v1.file_type!="image" ? "block" :"none"}}>
                                                                                        <a rel="noreferrer" href={v1.image_link} target="_blank">
                                                                                        <img src={pdf_img} aria-hidden="true" alt="pdf image" className="image_pdf" style={{height:"30px", width:"30px"}}/></a>
                                                                                        </span>
                                                                                        </div>
                                                                                    )
                                                                                    }):""}
                                                                                   </div>
                                                                                </td>
                                                                                <td className="border_td">
                                                                                <div className="btnApproveNew" style={{display:"inline-flex"}}>
                                                                                        <Button color="success" disabled={this.state.loans_control == "false" ? true : false} outline className="approve_or_decline"  style={{marginRight:"10px",backgroundColor : value.status == "approved" ? "#28a745" : "",color: value.status == "approved" ? "#fff" : ""}} onClick={()=>{
                                                                                        this.setState({
                                                                                            loan_payment_id:value._id,
                                                                                            AlertDeleteSingle:true,
                                                                                            approve_status:"approved",
                                                                                            leave_status_new:"Approved",
                                                                                        })
                                                                                    }}>Approve</Button>
                                                                                    <Button color="danger" disabled={this.state.loans_control == "false" ? true : false} outline  style={{backgroundColor : value.status == "disapproved" ? "#28a745" : "",color: value.status == "disapproved" ? "#fff" : ""}} className="approve_or_decline" onClick={()=>{
                                                                                        this.setState({
                                                                                            loan_payment_id:value._id,
                                                                                            AlertDeleteSingle:true,
                                                                                            approve_status:"disapproved",
                                                                                            leave_status_new:"Disapproved",
                                                                                        })
                                                                                    }}>Disapprove</Button>
                                                                                        </div>
                                                                                </td>

                                                                            </tr>
                                                                                )
                                                                            })}

                                                                        </tbody>
                                                                    </Table>
                                                                    </div>
                                                                  </div>
                                                            </Collapse>
                                                        </div>
                                                </div>

                                                <div className="test_collapse" style={{marginTop:"18px",padding: "12px 16px"}}>

                                                   <div className="accordion-group">
                                                    { /* eslint-disable-next-line jsx-a11y/anchor-is-valid */ }
                                                    <a
                                                        href="#"
                                                        style={{fontSize:"18px"}}
                                                        className="collapse-link"
                                                        onClick={ ( e ) => {
                                                            e.preventDefault();
                                                            this.setState( {
                                                                activeAccordion: activeAccordion === 3 ? 0 : 3,
                                                            } );
                                                        } }
                                                    >
                                                       <div className="headingEdit">
                                                       Payment Ledger
                                                                    <div>
                                                                        <Icon name="chevron-down" style={{display : activeAccordion ===3 ? "none" : "block" }} />
                                                                        <Icon name="chevron-up" style={{display : activeAccordion ===3 ? "block" : "none" }} />
                                                                    </div>
                                                                </div>
                                                    </a>
                                                    <Collapse isOpen={ 3 === activeAccordion }>
                                                        <div className="collapse-content new-content-edited">
                                                        <div className="test_collapse mark_paid_button">
                                                            <h3>Payment Ledger</h3>
                                                            <Button disabled={this.state.loans_control == "false" ? true : false} className="button_new" style={{display : this.state.repay_model_single == "Monthly" ? "none" : "inline-flex"}} color="success" onClick={()=>{
                                                                this.setState({
                                                                    MakePaymentmodal:true
                                                                })
                                                            }}>Mark Paid</Button>
                                                        </div>
                                                            <h3 style={{padding:"0px 18px", display: this.state.show_message == "" ? "none" : "block",color:" #a4a3a3",width: "100%",marginTop:"5px"}}>{this.state.show_message}</h3>
                                                        <div className="table-responsive-lg  scroll_1" style={{display: this.state.payment_ledger == "" && this.state.show_message != "" ?"none" : "block"}}>
                                                        <Table striped>
                                                            <thead>
                                                                <tr>
                                                                    <th scope="col" className="border_none">Date</th>
                                                                    <th scope="col" className="border_none">Remark</th>
                                                                    <th scope="col" className="border_none" style={{textAlign:"end"}}>Paid Amount</th>
                                                                    <th scope="col" className="border_none" style={{textAlign:"end"}}>Balance</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {this.state.payment_ledger.map((value,index)=>{
                                                                    return(
                                                                <tr key={index}>
                                                                    <th scope="row" className="border_td" style={{whiteSpace:"nowrap"}}>{dateFormat(new Date(value.payment_date.replace("Z", "")), "dd-mm-yyyy")}</th>
                                                                    <td className="border_td">{value.remark}</td>
                                                                    <td className="border_td" style={{textAlign:"end"}}>&#x20b9;{Number(value.paid_amount).toFixed(2)}</td>
                                                                    <td className="border_td" style={{textAlign:"end"}}>&#x20b9;{Number(value.balance_amount).toFixed(2)}</td>

                                                                </tr>
                                                                    )
                                                                })}

                                                            </tbody>
                                                        </Table>

                                                        </div>                                                      </div>
                                                    </Collapse>
                                                </div>


                                                </div>


                                                {/* <div>

                                                </div> */}
                                            </div>
                                        </div>
                                  </div>
                               </div>
                             </div>
                           </div>
                        </Tabs.Pane>
                        <Tabs.Pane tabId="profile">
                        <Spinner color="warning" className="spinner_css_12345666" style={{ marginTop: gk, display: this.state.isLoading }} />
                            <div className="test_collapse" style={{display: this.state.isLoading == "none" ? "block" : "none"}}>
                            <h3 style={{ display: this.state.no_data_message, padding: "15px",textAlign:"center",color:" #a4a3a3",width: "100%",marginTop:gk}}>No Data Found</h3>
                               <div style={{display: this.state.no_data_message=="none" ? "block" :"none"}}>

                               <div className="row test_collapse">
                                     <div className="col-lg-4 col-md-12 test_collapse" style={{paddingRight:"0px",display: this.state.ipad_emp_list}}>
                                       <div className="mycalendar_loans height_sales" style={{height:my_height-100}}>
                                          <div className="">
                                            <Table striped>
                                            <thead>
                                                <tr>
                                                    <th scope="col" className="padding_data_loans">Employee Name</th>
                                                    <th scope="col" className="padding_data_loans">Amount</th>
                                                    <th scope="col" className="padding_data_loans">Date</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.loans_array.map((value,index)=>{
                                                    return(
                                                    <tr key={index} style={{cursor:"pointer"}} onClick={()=>{
                                                        this.setState({
                                                            loan_id:value.loan_id,
                                                            emp_name:value.emp_name,
                                                            spinner_1:"block"
                                                        })
                                                        setTimeout(() => {
                                                            this.fetch_loan_details(value.loan_id)
                                                        }, 0)
                                                    }}>
                                                        <th scope="row" style={{borderLeft : value.loan_id == this.state.loan_id ? "5px solid #8bc240" : ""}} className="padding_data_loans">{value.emp_name}</th>
                                                        <th scope="row" className="padding_data_loans">&#x20b9;{value.loan_amount}</th>
                                                        <th scope="row" className="padding_data_loans" style={{whiteSpace:"nowrap"}}>{value.loan_date ? dateFormat(new Date(value.loan_date.replace("Z", "")), "dd-mm-yyyy"):""}</th>
                                                    </tr>
                                                    )
                                                })}

                                            </tbody>
                                        </Table>
                                    </div>
                                  </div>
                               </div>
                               <div className="col-lg-8 col-md-12 test_collapse i_pad_view" style={{paddingLeft:"0px",display: device_width < 769 ? this.state.ipad_width : "block"}}>
                                    <Spinner color="warning" className="left_section" style={{marginTop:gk,display: this.state.spinner_1}}/>
                                        <div className="test_collapse"  style={{display: this.state.spinner_1=="none" ? "block" :"none"}}>
                                            <div className="mycalendar_loans" style={{height:my_height-100}}>

                                                <div className="test_collapse mark_paid_button">
                                                    <h3>{this.state.emp_name}</h3>
                                                    <div className="" style={{display: device_width < 769 ? this.state.ipad_width : "block"}}>
                                                        <Button color="info" className="backk_btnnn" style={{ textTransform:"capitalize", display: device_width < 769 ? "inline-flex" : "none"}}
                                                            onClick={() => {
                                                            this.setState({
                                                                ipad_emp_list:"block",
                                                                ipad_width:"none"
                                                            })
                                                            }}>Back</Button>
                                                        </div>
                                                    {/* <Button className="button_new" color="success">Mark Paid</Button> */}
                                                </div>

                                                <div className="test_collapse row" style={{padding:"12px 18px"}}>
                                                   <div className="col-lg-4 col-md-4">
                                                        <div className="heading_top_newww">Date</div>
                                                        <div className="heading_bottom_loans" style={{whiteSpace:"nowrap"}}>{this.state.loan_date ? dateFormat(new Date(this.state.loan_date.replace("Z", "")), "dd-mm-yyyy"):""}</div>
                                                   </div>
                                                   <div className="col-lg-4 col-md-4">
                                                        <div className="heading_top_newww">Loan Amount</div>
                                                        <div className="heading_bottom_loans">&#x20b9;{this.state.loan_amount_single}</div>
                                                   </div>
                                                   <div className="col-lg-4 col-md-4">
                                                        <div className="heading_top_newww">Repay Model</div>
                                                        <div className="heading_bottom_loans">{this.state.repay_model_single }</div>
                                                   </div>
                                                   <div className="col-lg-4 col-md-4 mt-20" style={{display:this.state.paid_amount_loan == "" || this.state.paid_amount_loan == undefined ? "none" : "block"}}>
                                                        <div className="heading_top_newww">Paid Amount</div>
                                                        <div className="heading_bottom_loans">&#x20b9;{this.state.paid_amount_loan }</div>
                                                   </div>

                                                   <div className="col-lg-4 col-md-4 mt-20" style={{display:this.state.repay_model_single == "Monthly" && this.state.total_months_single != null ? "block" : "none"}}>
                                                        <div className="heading_top_newww">Total Month</div>
                                                        <div className="heading_bottom_loans">{this.state.total_months_single }</div>
                                                   </div>
                                                   <div className="col-lg-4 col-md-4 mt-20">
                                                        <div className="heading_top_newww">{this.state.heading_for_repay_model}</div>
                                                        <div className="heading_bottom_loans" style={{display:this.state.repay_model_single == "One Time" && this.state.one_time_pay_date_single !== null ? "block" : "none"}}>{this.state.one_time_pay_date_single }</div>
                                                        <div className="heading_bottom_loans" style={{display:this.state.repay_model_single == "Manually" && this.state.manual_till_date_single !== null ? "block" : "none"}}>{this.state.manual_till_date_single }</div>
                                                        <div className="heading_bottom_loans" style={{display:this.state.repay_model_single == "Monthly" && this.state.start_from_month_single !== null ? "block" : "none"}}>{this.state.start_from_month_single }</div>
                                                   </div>
                                                </div>






                                                <div className="test_collapse" style={{display:this.state.edited_logs == "" || this.state.edited_logs == undefined ? "none" : "block",marginTop:"18px" ,padding: "12px 16px",marginBottom:"-25px"}}>
                                                <div className="accordion-group">
                                                            { /* eslint-disable-next-line jsx-a11y/anchor-is-valid */ }
                                                            <a
                                                                href="#"
                                                                style={{fontSize:"18px"}}
                                                                className="collapse-link"
                                                                onClick={ ( e ) => {
                                                                    e.preventDefault();
                                                                    this.setState( {
                                                                        activeAccordion: activeAccordion === 1 ? 0 : 1,
                                                                    } );
                                                                } }
                                                            >
                                                                <div className="headingEdit">
                                                                    Edited Logs
                                                                    <div>
                                                                        <Icon name="chevron-down" style={{display : activeAccordion ===1 ? "none" : "block" }} />
                                                                        <Icon name="chevron-up" style={{display : activeAccordion ===1 ? "block" : "none" }} />
                                                                    </div>
                                                                </div>
                                                            </a>
                                                            <Collapse isOpen={ 1 === activeAccordion }>
                                                                <div className="collapse-content new-content-edited">
                                                                <div className="table-responsive-lg  scroll_1">
                                                                    <Table striped>
                                                                        <thead>
                                                                            <tr>
                                                                                <th scope="col" className="border_none">Date</th>
                                                                                <th scope="col" className="border_none">Edited By</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {this.state.edited_logs.map((value,index)=>{
                                                                                return(
                                                                            <tr key={index}>
                                                                                <th scope="row" className="border_td" style={{whiteSpace:"nowrap"}}>{dateFormat(new Date(value.date_time.replace("Z", "")), "dd-mm-yyyy")}</th>
                                                                                <td className="border_td">{value.edited_by ? value.edited_by.label :""}</td>

                                                                            </tr>
                                                                                )
                                                                            })}

                                                                        </tbody>
                                                                    </Table>
                                                                    </div>                                                                </div>
                                                            </Collapse>
                                                        </div>
                                                </div>



                                                <div className="test_collapse" style={{display:this.state.paid_by_emp_list == "" || this.state.paid_by_emp_list == undefined ? "none" : "block",marginTop:"18px" ,padding: "12px 16px",marginBottom:"-25px"}}>
                                                <div className="accordion-group">
                                                            { /* eslint-disable-next-line jsx-a11y/anchor-is-valid */ }
                                                            <a
                                                                href="#"
                                                                style={{fontSize:"18px"}}
                                                                className="collapse-link"
                                                                onClick={ ( e ) => {
                                                                    e.preventDefault();
                                                                    this.setState( {
                                                                        activeAccordion: activeAccordion === 2 ? 0 : 2,
                                                                    } );
                                                                } }
                                                            >
                                                                <div className="headingEdit">
                                                                    Payment Done By Employee
                                                                    <div>
                                                                        <Icon name="chevron-down" style={{display : activeAccordion ===2 ? "none" : "block" }} />
                                                                        <Icon name="chevron-up" style={{display : activeAccordion ===2 ? "block" : "none" }} />
                                                                    </div>
                                                                </div>
                                                            </a>
                                                            <Collapse isOpen={ 2 === activeAccordion }>
                                                                <div className="collapse-content new-content-edited">
                                                                <div className="table-responsive-lg  scroll_1">
                                                                    <Table striped>
                                                                        <thead>
                                                                            <tr>
                                                                                <th scope="col" className="border_none">Date</th>
                                                                                <th scope="col" className="border_none">Employee Name</th>
                                                                                <th scope="col" className="border_none">Remark</th>
                                                                                <th scope="col" className="border_none" style={{textAlign:"end"}}>Amount</th>
                                                                                <th scope="col" className="border_none">Bills</th>
                                                                                <th scope="col" className="border_none">Action</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {this.state.paid_by_emp_list.map((value,index)=>{
                                                                                return(
                                                                            <tr key={index}>
                                                                                <th scope="row" className="border_td" style={{whiteSpace:"nowrap"}}>{dateFormat(new Date(value.payment_date.replace("Z", "")), "dd-mm-yyyy")}</th>
                                                                                <td className="border_td">{value.added_by ? value.added_by.label :""}</td>
                                                                                <td className="border_td">{value.remark}</td>
                                                                                <td className="border_td" style={{textAlign:"end"}}>&#x20b9;{value.paying_amount}</td>
                                                                                <td className="border_td">
                                                                                <div className="billImageNew">
                                                                                    {value.bill_image ?   value.bill_image.map((v1,i1)=>{
                                                                                    return(
                                                                                        <div key={i1}>
                                                                                        <span style={{display:v1.file_type=="image" ? "block" :"none"}}>
                                                                                        <a rel="noreferrer" href={v1.image_link} target="_blank">
                                                                                            <img src={v1.image_link} alt="img" className="image_pdf" style={{borderRadius:"5px",height:"30px", width:"30px"}}/></a>
                                                                                        </span>

                                                                                        <span style={{display:v1.file_type!="image" ? "block" :"none"}}>
                                                                                        <a rel="noreferrer" href={v1.image_link} target="_blank">
                                                                                        <img src={pdf_img} aria-hidden="true" alt="pdf image" className="image_pdf" style={{height:"30px", width:"30px"}}/></a>
                                                                                        </span>
                                                                                        </div>
                                                                                    )
                                                                                    }):""}
                                                                                   </div>
                                                                                </td>
                                                                                <td className="border_td">
                                                                                <div className="btnApproveNew" style={{display:"inline-flex"}}>
                                                                                        <Button disabled={this.state.loans_control == "false" ? true : false} color="success" outline className="approve_or_decline"  style={{marginRight:"10px",backgroundColor : value.status == "approved" ? "#28a745" : "",color: value.status == "approved" ? "#fff" : ""}} >Approve</Button>
                                                                                    <Button disabled={this.state.loans_control == "false" ? true : false} color="danger" outline  style={{backgroundColor : value.status == "disapproved" ? "#28a745" : "",color: value.status == "disapproved" ? "#fff" : ""}} className="approve_or_decline" >Disapprove</Button>
                                                                                        </div>
                                                                                </td>

                                                                            </tr>
                                                                                )
                                                                            })}

                                                                        </tbody>
                                                                    </Table>
                                                                    </div>
                                                                  </div>
                                                            </Collapse>
                                                        </div>
                                                </div>




                                                <div className="test_collapse" style={{marginTop:"18px",padding: "12px 16px"}}>

                                                   <div className="accordion-group">
                                                    { /* eslint-disable-next-line jsx-a11y/anchor-is-valid */ }
                                                    <a
                                                        href="#"
                                                        style={{fontSize:"18px"}}
                                                        className="collapse-link"
                                                        onClick={ ( e ) => {
                                                            e.preventDefault();
                                                            this.setState( {
                                                                activeAccordion: activeAccordion === 3 ? 0 : 3,
                                                            } );
                                                        } }
                                                    >
                                                       <div className="headingEdit">
                                                       Payment Ledger
                                                                    <div>
                                                                        <Icon name="chevron-down" style={{display : activeAccordion ===3 ? "none" : "block" }} />
                                                                        <Icon name="chevron-up" style={{display : activeAccordion ===3 ? "block" : "none" }} />
                                                                    </div>
                                                                </div>
                                                    </a>
                                                    <Collapse isOpen={ 3 === activeAccordion }>
                                                        <div className="collapse-content new-content-edited">
                                                        <div className="test_collapse mark_paid_button" >
                                                                <h3>Payment Ledger</h3>
                                                            </div>
                                                                <h3 style={{padding:"0px 18px", display: this.state.show_message == "" ? "none" : "block",color:" #a4a3a3",width: "100%",marginTop:"5px"}}>{this.state.show_message}</h3>
                                                            <div className="table-responsive-lg  scroll_1" style={{display: this.state.payment_ledger == "" && this.state.show_message != "" ?"none" : "block"}}>
                                                            <Table striped>
                                                                <thead>
                                                                    <tr>
                                                                        <th scope="col" className="border_none">Date</th>
                                                                        <th scope="col" className="border_none">Remark</th>
                                                                        <th scope="col" className="border_none" style={{textAlign:"end"}}>Paid Amount</th>
                                                                        <th scope="col" className="border_none" style={{textAlign:"end"}}>Balance</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {this.state.payment_ledger.map((value,index)=>{
                                                                        return(
                                                                    <tr key={index}>
                                                                        <th scope="row" className="border_td" style={{whiteSpace:"nowrap"}}>{dateFormat(new Date(value.payment_date.replace("Z", "")), "dd-mm-yyyy")}</th>
                                                                        <td className="border_td">{value.remark}</td>
                                                                        <td className="border_td" style={{textAlign:"end"}}>&#x20b9;{Number(value.paid_amount).toFixed(2)}</td>
                                                                        <td className="border_td" style={{textAlign:"end"}}>&#x20b9;{Number(value.balance_amount).toFixed(2)}</td>

                                                                    </tr>
                                                                        )
                                                                    })}

                                                                </tbody>
                                                            </Table>

                                                            </div>                                                        </div>
                                                    </Collapse>
                                                </div>


                                                </div>
                                            </div>
                                        </div>
                                  </div>
                               </div>

                               </div>
                           </div>
                        </Tabs.Pane>
                    </Tabs.Content>
                 </div>


                   {/* *********************** Engegment Model ****************************************** */}
                   <Modal
                         isOpen={ this.state.Loansmodal }
                         toggle={ this.Loansmodal }
                         className={ this.props.className,"loans_model modal-dialog-centered" }
                         fade
                     >
                         <div className="modal-header">
                             <h5 className="modal-title h2">{this.state.heading_loan}</h5>
                             <Button className="close" color="" onClick={ this.Loansmodal }>
                                 <Icon name="x" />
                             </Button>
                         </div>
                         <ModalBody>
                         <div className="form rui-sign-form rui-sign-form-cloud">
                             <div className="row vertical-gap sm-gap justify-content-flex-start">
                             <div className="col-lg-6 col-md-6 ">
                               <Label className="llllllll_label" htmlFor="inputText">Employee<span className="start_mark_new">*</span></Label>
                                <Typeahead
                                    id="basic-typeahead-multiple"
                                    onChange={this.handleSelection}
                                    onInputChange={this.fetch_manager_typeahead}
                                    options={this.state.employee_typeahead} // Replace [...] with your array of options
                                    selected={this.state.selectedOptions}
                                    placeholder="Select Employee"
                                    invalid={this.state.borderNew && this.state.selectedOptions == "" ? true :false}
                                    className={this.state.borderNew && this.state.selectedOptions == "" ?"manager_select_new" :""}
                                    />
                               </div>
                               <div className="col-lg-6 col-md-6 ">
                               <Label className="llllllll_label" htmlFor="inputText">Loan Amount<span className="start_mark_new">*</span></Label>
                                    <Input value={this.state.loan_amount}
                                    invalid={this.state.borderNew && this.state.loan_amount == "" ? true :false}
                                        type="number"
                                        placeholder="Loan Amount"
                                        onChange={(e) => {
                                            this.setState({
                                            loan_amount:e.target.value,
                                            error_meesage_loans:""
                                            })
                                         }} />
                               </div>
                               <div className="col-lg-6 col-md-6 ">
                               <Label className="llllllll_label" htmlFor="inputText">Repay Model<span className="start_mark_new">*</span></Label>
                                    <div style={{display:"inline-flex",width:"100%"}}>
                                        <CustomInput checked={this.state.repay_model == "one_time" ? true :false} type="radio" invalid={this.state.borderNew && this.state.repay_model == "" ? true :false} id="formRadio1" name="formRadio" label="One Time" onClick={()=>{this.setState({repay_model:"one_time"})}} />
                                        <div style={{marginLeft:"22px"}}>
                                        <CustomInput checked={this.state.repay_model == "monthly" ? true :false} type="radio" invalid={this.state.borderNew && this.state.repay_model == "" ? true :false} id="formRadio2" name="formRadio" label="Monthly" onClick={()=>{this.setState({repay_model:"monthly"})}}/>
                                        </div>
                                        <div style={{marginLeft:"22px"}}>
                                        <CustomInput checked={this.state.repay_model == "manually" ? true :false} type="radio" invalid={this.state.borderNew && this.state.repay_model == "" ? true :false} id="formRadio3" name="formRadio" label="Manually" onClick={()=>{this.setState({repay_model:"manually"})}}/>
                                        </div>
                                    </div>
                                    <div className="mt-15" style={{display:this.state.repay_model == "" ? "none" : "block"}}>
                                        <div style={{display:this.state.repay_model == "one_time" ? "grid" : "none"}}>
                                        <Label className="llllllll_label" htmlFor="inputText">Payment Date</Label>
                                            <DatePicker
                                                value={this.state.one_time_date}
                                                selected={this.state.one_time_date}
                                                onChange={(val) => {
                                                this.setState({
                                                    one_time_date: val,
                                                    error_meesage_loans:""
                                                });
                                                }}
                                                dateFormat="dd-MM-yyyy"
                                                className="rui-datetimepicker form-control d-flex new_widht"
                                            />
                                        </div>
                                        <div style={{display:this.state.repay_model == "monthly" ? "inline-flex" : "none"}}>
                                          <div style={{marginRight:"10px"}}>
                                          <Label className="llllllll_label" htmlFor="inputText">Total Months</Label>
                                          <Input value={this.state.total_months}
                                            type="number"
                                            placeholder="Total Month"
                                            onChange={(e) => {
                                                this.setState({
                                                total_months:e.target.value,
                                                error_meesage_loans:""
                                                })
                                            }} />
                                          </div>
                                          <div>
                                          <Label className="llllllll_label" htmlFor="inputText">Deduction From</Label>
                                            <DatePicker
                                                selected={this.state.total_months_year}
                                                onChange={(val) => {
                                                    this.setState({
                                                        total_months_year: val,
                                                        error_meesage_loans:""
                                                    });
                                                    console.log(val);
                                                }}
                                                dateFormat="MM-yyyy"
                                                showMonthYearPicker
                                                className="rui-datetimepicker form-control w-auto_12 search_1 "
                                                calendarClassName="tren-pembayaran__wrapper__datepicker"
                                                placeholder="Select Month"
                                            />
                                          </div>
                                        </div>
                                        <div style={{display:this.state.repay_model == "manually" ? "grid" : "none"}}>
                                        <Label className="llllllll_label" htmlFor="inputText">Till Date</Label>
                                            <DatePicker
                                                value={this.state.manually_date}
                                                selected={this.state.manually_date}
                                                onChange={(val) => {
                                                this.setState({
                                                    manually_date: val,
                                                    error_meesage_loans:""
                                                });
                                                }}
                                                dateFormat="dd-MM-yyyy"
                                                className="rui-datetimepicker form-control d-flex new_widht"
                                            />
                                        </div>
                                    </div>
                               </div>



                                 <div className="col-lg-12 col-md-12" style={{display:this.state.error_meesage_loans=="" ? "none" :"block"}}>
                                     <p className="false_message_new">{this.state.error_meesage_loans}</p>
                                 </div>


                                 </div>
                             </div>
                         </ModalBody>
                         <ModalFooter>
                             <Button color="secondary" style={{textTransform:"capitalize"}} onClick={ this.Loansmodal }>Close</Button>
                             { ' ' }
                             <Button color="brand" style={{backgroundColor:"#8bc240" ,borderColor:"#8bc240",textTransform:"capitalize"}} onClick={ this.switch_functionality}>{this.state.button_loan}</Button>
                         </ModalFooter>
                     </Modal>



                   {/* *********************** Mark Paid Model ****************************************** */}
                   <Modal
                         isOpen={ this.state.MakePaymentmodal }
                         toggle={ this.MakePaymentmodal }
                         className={ this.props.className," modal-dialog-centered" }
                         fade
                     >
                         <div className="modal-header">
                             <h5 className="modal-title h2">Mark Paid</h5>
                             <Button className="close" color="" onClick={ this.MakePaymentmodal }>
                                 <Icon name="x" />
                             </Button>
                         </div>
                         <ModalBody>
                         <div className="form rui-sign-form rui-sign-form-cloud">
                             <div className="row vertical-gap sm-gap justify-content-flex-start">
                             <div className="col-lg-12 col-md-12 ">
                                 <h3 style={{marginBottom:"0px"}}>Balance Amount :  &#x20b9;{this.state.balance_amount_loan}</h3>
                             </div>
                             <div className="col-lg-6 col-md-6 ">
                              <Label className="llllllll_label" htmlFor="inputText">Amount to be Paid<span className="start_mark_new">*</span></Label>
                                 <Input value={this.state.amount_to_paid}
                                 invalid={(this.state.borderNew && this.state.amount_to_paid == "") || this.state.invalid_data == true ? true :false}
                                        type="number"
                                        placeholder="Amount to be Paid"
                                        onChange={(e) => {
                                            this.setState({
                                            amount_to_paid:e.target.value,
                                            error_meesage_mark_loan:""
                                            })
                                      this.amount_paid_loan(e.target.value, this.state.balance_amount_loan)
                                     }} />
                                 <div  style={{display:this.state.loan_amount_message == "" ? "none" : "block", color:"red",fontSize:"10px"}}>{this.state.loan_amount_message}</div>
                               </div>
                               <div className="col-lg-12 col-md-12 ">
                               <Label className="llllllll_label" htmlFor="inputText">Remark</Label>
                                    <Input value={this.state.remark_mark_paid}
                                        type="textarea"
                                        placeholder="Remark"
                                        onChange={(e) => {
                                            this.setState({
                                            remark_mark_paid:e.target.value,
                                            error_meesage_mark_loan:""
                                            })
                                         }} />
                               </div>



                                 <div className="col-lg-12 col-md-12" style={{display:this.state.error_meesage_mark_loan=="" ? "none" :"block"}}>
                                     <p className="false_message_new">{this.state.error_meesage_mark_loan}</p>
                                 </div>


                                 </div>
                             </div>
                         </ModalBody>
                         <ModalFooter>
                             <Button color="secondary" style={{textTransform:"capitalize"}} onClick={ this.MakePaymentmodal }>Close</Button>
                             { ' ' }
                             <Button disabled={this.state.invalid_data == true ? true : false} color="brand" style={{backgroundColor:"#8bc240" ,borderColor:"#8bc240",textTransform:"capitalize"}} onClick={ this.mark_paid_loan_amount}>Save</Button>
                         </ModalFooter>
                     </Modal>


                     <Modal
                    style={{ width: '350px', height: 'auto', justifyContent: 'center', textAlign: 'center', alignItem: 'center', marginTop: '200px' }}
                    isOpen={this.state.AlertDeleteSingle}
                    toggle={this.AlertDeleteSingle}
                    className={this.props.className, "del_model"}
                    fade
                >
                    <ModalBody style={{padding:"20px"}}>
                        <div style={{ width: '100%', height: '20px' }}>
                            <Button className="close" style={{ float: 'right' }} color="" onClick={this.AlertDeleteSingle}>
                                <Icon name="x" />
                            </Button>
                        </div>
                        <div style={{ width: '100%'}}>
                          <p style={{marginBottom:"10px"}}>Are you sure you want to {this.state.leave_status_new}?</p>
                        </div>

                        <div style={{ height: '40px', width: '100%'}}>

                            <Button color="secondary"
                                style={{ marginRight: "20px",color:"#fff"}} onClick={this.AlertDeleteSingle}
                            >no</Button>
                            {'             '}
                            {/* <Button color="secondary"  onClick={this.AlertDeleteSingle}>no</Button> */}
                            <Button color="warning" disabled={this.state.policy_dock_control == "false" || this.state.amountNew == true ? 'disabled' : ''} style={{color:"#fff"}} onClick={() => {
                                    this.approve_disapprove_loan_payments()

                                }}>yes</Button>
                        </div>

                    </ModalBody>
                </Modal>
             </Fragment>
         );
     }
 }

 export default connect( ( { settings } ) => (
     {
         settings,
     }
 ), { addToast: actionAddToast } )( Content );

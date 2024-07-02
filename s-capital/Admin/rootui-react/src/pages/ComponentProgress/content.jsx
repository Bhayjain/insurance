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
 import { Button, Modal, ModalBody, ModalFooter,CustomInput,Label,Spinner,ButtonGroup,Table,Input } from 'reactstrap';
 import dateFormat from 'dateformat';
 import { RangeDatePicker } from 'react-google-flight-datepicker';
 import 'react-google-flight-datepicker/dist/main.css';
 import Cookies from 'js-cookie';
 import Tabs from '../../components/tabs';
 import DatePicker from '../../components/date-time-picker';
 import Select from 'react-select';
 import pdf_img from '../../images/pdf.png'
 import { addToast as actionAddToast } from '../../actions';

 const device_width =   window.innerWidth;
 var height =   window.innerHeight;
 //  //////console.log("admin_screen.height", height);
 const nav_height = document.querySelector('.rui-navbar-sticky').offsetHeight
 //  //////console.log("admin_nav_height",nav_height);
 var my_height = height - nav_height;
 var gk = (my_height/2)-100;
 //  //////console.log("admin_gk",gk);
 if(device_width < 600){
   var gk = (my_height/2) - 50;
 }
 /**
  * Component
  */

  const admin_data = JSON.parse(Cookies.get('admin_data'));
//console.log("admin_data===========",admin_data);


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
             pending_payment_control:Cookies.get('pending_payment_control'),
             activeTab3: 'home',
             deatiled_pending_array:[],
             single_pending_array:[],
             no_data_deatiled:"none",
             isLoading_deatiled:"block",
             secondVal:new Date(),
             cheque_date:new Date(),
             amount_received:"",
             received_from_amount:"",
             ipad_width:"none",
            ipad_emp_list:"block",
            pending_spinner:"none",
            show_erorre:"none",
            attachment_data:[],
            document_data:[],
            payout_details_array:[],
            policy_new_array:[],
            checked_policy:false,
            check_payout:false,
            total_policy_amount:0,
            policy_dis_array:[],
            user_name:admin_data[0].name,
            user_id:admin_data[0]._id,
            category_user_array:[],
         };
         this.fetch_detailed_pending_payment_report()
         this.toggle = this.toggle.bind( this );
     }

     toggle() {
        this.setState( ( prevState ) => ( {
            modalOpen: ! prevState.modalOpen,
            show_erorre:"none",
            mode_of_payment:"",
            cheque_no:"",
            cheque_amount_received:"",
            cheque_date:"",
            bank_name:"",
            document_data:"",
        } ) );
    }


    //   Fetch Deatiled API
    fetch_detailed_pending_payment_report = (sm_telli_direct_data,startDate,endDate,pageNumber)=>  {

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

         if (sm_telli_direct_data == "" || sm_telli_direct_data == undefined) {
            var sm_telli_direct_data = undefined
          }
          else{
              var sm_telli_direct_data = sm_telli_direct_data.value
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


             const today_end = new Date(endDate);
             const yyyy_end = today_end.getFullYear();
             let mm_end = today_end.getMonth() + 1; // Months start at 0!
             let dd_end = today_end.getDate();
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
             var my_date = [formattedToday_start,formattedToday_end]
             this.setState({
                 date_range_for_export_detailed :my_date
             })
         }

         var params={
             date_range:my_date,
             sort_by:sm_telli_direct_data,
         }
         console.log("Detailed Params",params);
         const { settings } = this.props;
        //   const res = fetch(settings.api_url + "fetch_detailed_pending_payment_report", {
          const res = fetch(settings.api_url + "fetch_user_for_payment_details", {
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
                          pending_spinner:"none",
                          policy_new_array:data.data[0].policy_array,
                          checked_policy:false,
                          check_payout:false,
                          amount_received:"",
                          total_policy_amount:0,
                      });

                      if (device_width < 820) {
                    }
                    else{
                        this.fetch_policy_for_payout_details(data.data[0].policy_array,data.data[0]._id)
                        // this.get_single_pending_payment(data.data[0]._id)
                    }


                  }
                  else {
                      this.setState({
                          deatiled_pending_array: [],
                          total_amount_receivable_new: "",
                          no_data_deatiled:"block",
                          isLoading_deatiled:"none",
                          pending_spinner:"none",
                          policy_new_array:[],
                          checked_policy:false,
                          check_payout:false,
                          total_policy_amount:0,
                          amount_received:""
                      });
                  }
              })
      }


      fetch_policy_for_payout_details = (policy_array,user_id)=>  {
        const { settings } = this.props;
        var params={
           policy_array:policy_array,
           user_id:user_id
       }

       console.log("Single Params",params);
         const res = fetch(settings.api_url + "fetch_policy_for_payout_details", {
             method: 'POST',
             body: JSON.stringify(params),
             headers: {
                 "Content-type": "application/json; charset=UTF-8",
             }
         }).then((response) => response.json())
             .then(json => {
                 console.log("fetch Single Data ****", json)
                 var data = json;
                 if (data.status == true) {
                   if (device_width < 820) {
                       var ipad_emp_list = "none";
                      }
                      else{
                      var ipad_emp_list = "block"
                      }

                      console.log();
                     this.setState({
                       payout_details_array:data.data,
                       policy_dock_id:data.data[0]._id,
                       policy_dock_id_new:data.data[0]._id,
                       user_id_new:data.data[0].user_id,
                       checked_policy:false,
                       check_payout:false,
                       amount_received:"",
                       total_policy_amount:0,

                       // amount_received:data.data[0].section_details[0].po_discount_amount,
                       ipad_width:"block",
                       ipad_emp_list:ipad_emp_list,
                       pending_spinner:"none",
                     })

                 }
                 else {
                   ////console.log("WRONG************");
                   this.setState({
                       payout_details_array:[],
                    //    policy_new_array:[],
                       pending_spinner:"none",
                       checked_policy:false,
                       check_payout:false,
                       total_policy_amount:0,
                       amount_received:""
                     })
                 }
             })
     }


      export_detailed_pending_payment_report = ()=>  {
         const { settings } = this.props;
         var params={
            date_range:this.state.date_range_for_export_detailed
        }

        //console.log("Export Params",params);
          const res = fetch(settings.api_url + "export_detailed_pending_payment_report", {
              method: 'POST',
              body: JSON.stringify(params),
              headers: {
                  "Content-type": "application/json; charset=UTF-8",
              }
          }).then((response) => response.json())
              .then(json => {
                  //console.log("fetch Deatailedd Pending Payment Reportt ****", json)
                  var data = json;
                  if (data.status == true) {
                      window.open(data.path, "_blank");
                  }
                  else {
                    ////console.log("kkkkk");
                  }
              })
      }


      fileToDataUri_flat = (image) => {
        return new Promise((res) => {
          const reader = new FileReader();
          const { type, name, size } = image;
          reader.addEventListener('load', () => {
            res({
              document_image: reader.result,
              document_type: reader.result.split(';')[0].split('/')[1],
            })
          });
          reader.readAsDataURL(image);
        })
      }


      delete_building_map_image_temp(t) {
        //console.log("attachment_data*****************",this.state.attachment_data);
        var document_data = this.state.document_data.filter(n => n !== t);
        //console.log("document_data",document_data);
        this.setState({
            document_data: document_data,
        })
        // //console.log(document_data);

      }


      handleChangeFile_Quotationn = async (event) => {
        //console.log("KKKKKKKKKKKKKKKKKKKKKKkk",event.target.files)
        var my_file =event.target.files

        if (event.target.files && event.target.files.length > 0) {
            const newImagesPromises = []
            for (let i = 0; i < event.target.files.length; i++) {
              newImagesPromises.push(this.fileToDataUri_flat(event.target.files[i]))
            }
            const newImages = await Promise.all(newImagesPromises)
            //console.log("newImages",newImages);
            // setImages([...images, ...newImages])
            this.setState({
              document_data: newImages,
              attachment_data:my_file
            })


            // setTimeout(() => { console.log("this is the first message", this.state.document_data) }, 1000);
            // setTimeout(() => { console.log("this is the attachment_data************", this.state.attachment_data) }, 1000);
          }



       }


      show_validation_data =(files)=>{
          //console.log("files=============",files);
        if (this.state.amount_received == "" || this.state.amount_received == undefined || this.state.mode_of_payment == "" || this.state.mode_of_payment == undefined) {
            this.setState({
                show_erorre:"Please Fill All the Feilds"
            })
        }
        else if (this.state.mode_of_payment_label=="Cheque to SC") {
            if (this.state.cheque_no == "" || this.state.cheque_no == undefined || this.state.cheque_amount_received == "" || this.state.cheque_amount_received == undefined
            || this.state.bank_name == ""|| this.state.bank_name == undefined) {
                this.setState({
                    show_erorre:"Please Add Cheque Details"
                })
            }

            else{
                this.paid_pending_payment_policy(files)
            }

        }
        else {
            this.paid_pending_payment_policy(files)
        }
      }



      paid_pending_payment_policy = (files) => {
        const { settings, addToast } = this.props;
        var fd = new FormData();

        var pending_payout_array = this.state.policy_new_array

        console.log("policy_new_array**********************",pending_payout_array);
        var pending_payout_array_lenth = pending_payout_array.length
        console.log("pending_payout_array_lenth*****",pending_payout_array_lenth);

        if (this.state.mode_of_payment_label=="Cheque to SC") {
            var cheque_payment_details=[
                {
                    cheque_no:this.state.cheque_no,
                    cheque_amount_received:this.state.cheque_amount_received,
                    cheque_date:this.state.cheque_date.toISOString(),
                    bank_name:this.state.bank_name,

                }
            ]

        }else{
            var cheque_payment_details=[]
        }
        //console.log("cheque_payment_details",cheque_payment_details);
        //console.log("mode_of_payment",this.state.mode_of_payment);
        var paid_by={
            value:this.state.user_id,
            label:this.state.user_name
        }
      for (let i = 0; i < files.length; i++) {
          fd.append('file',files[i]);
      }

            fd.append('policy_dock_id', JSON.stringify(this.state.policy_dis_array));
            fd.append('date', this.state.secondVal.toISOString());
            fd.append('mode_of_payment', JSON.stringify(this.state.mode_of_payment));
            fd.append('cheque_payment_details', JSON.stringify(cheque_payment_details));
            fd.append('amount', this.state.amount_received);
            fd.append('sm_id', this.state.policy_dock_id_new);
            fd.append('total_policy_length', pending_payout_array_lenth);
            fd.append('paid_by',  JSON.stringify(paid_by));



        // headers: {'Content-Type': undefined}
           console.log(...fd, "paid_pending_payment_policy")

            const res = fetch(settings.api_url + "paid_pending_payment_policy", {
                method: 'POST',
                body: fd
            })
                .then((response) => response.json())
                .then(json => {
                  //console.log("Pending Payment Response**************************************", {response: json })
                  var data = json;
                  if (data.status == true) {
                    addToast({
                      title: 'Ask my Policy',
                      content: data["message"],
                      duration: 1000,
                    });

                    this.setState({
                      file_array:[],
                      modalOpen:false,
                      show_erorre:"none",
                      amount_received:"",
                      payout_details_array:[]
                    })
                    this.fetch_detailed_pending_payment_report()
                  }
                  else {
                    this.setState({
                        modalOpen:true,
                       show_erorre:data["message"],
                       amount_received:""
                      })
                    addToast({
                      title: 'Ask my Policy',
                      content: data["message"],
                      duration: 1000,
                    });
                  }


                })


    }


    toggleCheckbox=(e,value,index)=>{
        //console.log("e.target.checked",e.target.checked);
        ////console.log("value========",value);
        //////console.log("index",index);
        var policy_amount_new=0
        var my_array=[]
        var check_array = []




        if (e.target.checked==true) {
                policy_amount_new = +value.receving_amount_for_paid_payment

                var total_amount = this.state.total_policy_amount+policy_amount_new
                console.log("total_amount========",total_amount);
                var my_new_array=value._id

                // var check_true_false = e.target.checked
                // check_array.push(check_true_false)
                // console.log("check_array***************************",check_array);


                // var my_new_array={customer_name:value.name,policy_number:value.section_details[0].policy_number, policy_id: value._id, po_discount_amount: Number(value.section_details[0].po_discount_amount)}

                var tttt = this.state.policy_dis_array
                tttt.push(my_new_array)

                console.log("tttt***************",tttt);
             this.setState({
                total_policy_amount: total_amount,
                cheque_amount: total_amount,
                total_amount_of_cheque: total_amount,
                policy_dis_array: tttt,
                amount_received:total_amount,
                company_profit:e.target.checked,
                check_payout:e.target.checked,

             })


        }else{
            policy_amount_new = +value.receving_amount_for_paid_payment
               var total_amount = this.state.total_policy_amount-policy_amount_new

            var my_new_array=value._id
            //console.log("my_new_array*************",my_new_array);

            this.delete_cheque_new(my_new_array)

            this.setState({
               total_policy_amount: total_amount,
               cheque_amount: total_amount,
               total_amount_of_cheque: total_amount,
               amount_received:total_amount,
               company_profit:e.target.checked,
            //    check_payout:e.target.checked
            //    policy_array: tttt
            })
        }
        // setTimeout(() => { //////console.log("this is the first message", this.state.policy_array) }, 1000);

    }
    delete_cheque_new=(value)=>{
        // console.log("VALUE",value);
                var search_term = value;
                // var array = ['A', 'B', 'C']; // Test
                var policy_dis_array = this.state.policy_dis_array
                   //console.log("policy_dis_array*****************************=============",policy_dis_array);
                var array = policy_dis_array

                for (var i=array.length-1; i>=0; i--) {
                    if (array[i] === search_term) {
                        array.splice(i, 1);
                        // break;       //<-- Uncomment  if only the first term has to be removed

                    }
                }

                // console.log("Newwwwwwwwwwww",array);
                if (array.length == 0 || array == undefined) {
                //    console.log("trueeeeeeeeeee");
                   var check_payout = false
                }else{
                    // console.log("falseeeeeeeeeeee");
                    var check_payout = true
                }



            this.setState({
                policy_dis_array:array,
                check_payout:check_payout
            })
   }

   fetch_catgory_wise_users = (user_type)=>  {
    const { settings } = this.props;
    var params={
        user_type:user_type
   }

     //console.log("Params",params);
     const res = fetch(settings.api_url + "fetch_catgory_wise_users", {
         method: 'POST',
         body: JSON.stringify(params),
         headers: {
             "Content-type": "application/json; charset=UTF-8",
         }
     }).then((response) => response.json())
         .then(json => {
             //console.log("SM & Tellicaller Response ****", json)
             var data = json;
             if (data.status == true) {
                 this.setState({
                   category_user_array:data.data,
                 })

             }
             else {
               ////console.log("WRONG************");
               this.setState({
                category_user_array:[],
                 })
             }
         })
 }





     render() {

        const mode_of_payemnt =[
            {value:"1",label:"Cash"},
            {value:"2",label:"Online to SC"},
            {value:"3",label:"Cheque to SC"}
        ]

        const agent_or_tellcalling = [
            { value: '1', label: 'SM' },
            { value: '2', label: 'Direct' },
            { value: '3', label: 'Telecaller' },
        ];


        var category_user_array = this.state.category_user_array.map(item => {
            return {
                value: item._id,
                label: item.name,
            }
        });


        const customStyles = {
            control: ( css, state ) => {
                return {
                    ...css,
                    borderColor: state.isFocused ? 'rgba(114, 94, 195, 0.6)' : '#eaecf0',
                    '&:hover': {
                        borderColor: state.isFocused ? 'rgba(114, 94, 195, 0.6)' : '#eaecf0',
                    },
                    boxShadow: state.isFocused ? '0 0 0 0.2rem rgba(114, 94, 195, 0.2)' : '',
                };
            },
            option: ( css, state ) => {
                let bgc = '';

                if ( state.isSelected ) {
                    bgc = '#725ec3';
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
                    backgroundColor: '#eeeeef',
                };
            },
        };
         return (
             <Fragment>
                <PageTitle className="daily_heading">
                 <div className="row">
                  <div className="col-lg-6 col-md-12" style={{display:"inline-flex", width:"100%"}}>
                      <h1 style={{marginTop: "0px"}}>Pending Payment&apos;s </h1>
                 </div>
                 <div className="col-lg-2 col-md-4 top_view" style={{width:"100%"}}>

                                   <Select
                                        value = {this.state.agent_or_tellcalling}
                                        onChange={(e) => {
                                            this.setState({
                                                agent_or_tellcalling: e,
                                            });

                                            this.fetch_catgory_wise_users(e.label)
                                        }}
                                        placeholder="Select..."
                                        className="contact_sort"
                                        options={ agent_or_tellcalling }
                                        styles={ customStyles }
                                    />


                             </div>

                            <div className="col-lg-2 col-md-4 top_view">

                                <Select
                                    value = {this.state.sm_telli_direct_data}
                                    onChange={(e) => {
                                        this.setState({
                                            sm_telli_direct_data: e,
                                        });
                                     this.fetch_detailed_pending_payment_report(e,this.state.startDate,this.state.endDate,this.state.po_discount_status,this.state.current_page)
                                    }}
                                    placeholder="Select..."
                                    className="contact_sort"
                                    options={ category_user_array }
                                    styles={ customStyles }
                                />
                                </div>

                  <div className="col-lg-2 col-md-4 for_ipad_new top_view" style={{display: "inline-flex", width:"100%"}}>

                      <div className=" date_pickerrr_neww  left_new" style={{width:"100%"}}>
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
                                         this.fetch_detailed_pending_payment_report(this.state.sm_telli_direct_data,startDate,endDate,this.state.current_page)
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
                             {/* <Button color="warning"  disabled={this.state.pending_payment_control == "false" ? 'disabled' : ''} style={{color:"#fff",marginLeft: "12px",whiteSpace: "nowrap",textTransform: "capitalize"}} onClick={ this.toggle }>Add Payment</Button> */}
                      </div>
                 </div>
                </div>
              </PageTitle>

                        <Spinner color="warning" className="lead_spinner" style={{marginTop: gk, display: this.state.isLoading_deatiled }} />
                            <div className="table_start" style={{display: this.state.isLoading_deatiled =="none" ? "block" :"none"}}>
                            <h3 style={{ display: this.state.no_data_deatiled, padding: "15px",textAlign:"center",color:" #a4a3a3",width: "100%",marginTop:gk}}>No Data Found</h3>
                            <div style={{display: this.state.no_data_deatiled=="none" ? "block" :"none"}}>
                            <div className="row scroll_stop" >
                             <div className="col-lg-3 col-md-12 col-sm-12 mycalendar height_sales" style={{height:my_height-69,display: this.state.ipad_emp_list,paddingRight: "0px"}}>
                             <div className="">
                                <div className="table-responsive-lg">
                                <Table striped>
                                        <thead>
                                            <tr>
                                                <th scope="col" className="table_head_new1">Name</th>
                                                <th scope="col" className="table_head_new1">Type</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.deatiled_pending_array.map((value,index)=>{

                                                return(
                                                    <tr key={index} style={{cursor:"pointer"}} onClick={() => {
                                                        this.setState({
                                                            pending_spinner: 'block',
                                                            checked_policy:false,
                                                            check_payout:false,
                                                            amount_received:"",
                                                            total_policy_amount:0,
                                                            payout_details_array:[]
                                                        })
                                                             setTimeout(() => {
                                                            //   this.get_single_pending_payment(value._id)
                                                              this.fetch_policy_for_payout_details(value.policy_array,value._id)
                                                          }, 0)
                                                      }}>
                                                    <th scope="row" style={{borderLeft:this.state.user_id_new == value._id ? "5px solid #8bc240" :""}} className="table_sub_head1">{value.name}</th>
                                                    <td className="table_sub_head1">{value.for_app_type ? value.for_app_type.label:""}</td>
                                                </tr>
                                                )
                                            })}


                                        </tbody>
                                    </Table>
                                </div>
                             </div>
                            </div>

                            <div className="col-lg-9 col-md-12 col-sm-12" style={{display: device_width < 769 ? this.state.ipad_width : "block",paddingLeft:"0px"}}>
                                <Spinner color="warning" className="agent_spinner agent_spinner_color" style={{ marginTop: gk, display: this.state.pending_spinner }} />
                                <div className="test_collapse pad_in_dar" style={{display:this.state.pending_spinner=="none" ? "block" : "none"}}>
                                <div className="client_name row">
                                                     <div className="col-lg-8 col-md-8">
                                                    {/* <h3>Customer Name : {value.name}</h3> */}
                                                    </div>
                                                    <div className="col-lg-4 col-md-4">
                                                        <Button color="warning"  disabled={this.state.pending_payment_control == "false" || this.state.check_payout == false ? 'disabled' : ''} style={{color:"#fff",marginLeft: "auto",whiteSpace: "nowrap",textTransform: "capitalize"}} onClick={ this.toggle }>Paid Payment</Button>
                                                            <Button className="" style={{ marginLeft: "5px",  backgroundColor: '#007bff', borderColor: '#007bff',textTransform:"capitalize", display: device_width < 769 ? "inline-flex" : "none"}}
                                                                            onClick={() => {
                                                                            this.setState({
                                                                                ipad_emp_list:"block",
                                                                                ipad_width:"none"
                                                                            })
                                                                            }}>Back</Button>
                                                           </div>
                                                </div>

                                    {/* {this.state.single_pending_array.map((value,index)=>{
                                        return(
                                            <div key={index}>
                                                    <div className="client_name row">
                                                     <div className="col-lg-8 col-md-8">
                                                    <h3>Customer Name : {value.name}</h3>
                                                    </div>
                                                    <div className="col-lg-4 col-md-4">
                                                        <Button color="warning"  disabled={this.state.pending_payment_control == "false" ? 'disabled' : ''} style={{color:"#fff",marginLeft: "auto",whiteSpace: "nowrap",textTransform: "capitalize"}} onClick={ this.toggle }>Paid Payment</Button>
                                                            <Button className="" style={{ marginLeft: "5px",  backgroundColor: '#007bff', borderColor: '#007bff',textTransform:"capitalize", display: device_width < 769 ? "inline-flex" : "none"}}
                                                                            onClick={() => {
                                                                            this.setState({
                                                                                ipad_emp_list:"block",
                                                                                ipad_width:"none"
                                                                            })
                                                                            }}>Back</Button>
                                                           </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-4 col-md-6 col-sm-12" style={{display:"inline-flex"}}>
                                                       <div className="width_of_data_new_1 issudee">Issue Date	</div>:
                                                        <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{dateFormat(new Date(value.section_details[0].issue_date.replace("Z", "")), "dd-mm-yyyy")}</span>
                                                     </div>
                                                    <div className="col-lg-4 col-md-6 col-sm-12" style={{display:"inline-flex"}}>
                                                       <div className="width_of_data_new_1 amount_rece">Insurer</div>:
                                                        <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{value.section_details[0].insurer_array_new.label}</span>
                                                     </div>
                                                    <div className="col-lg-4 col-md-6 col-sm-12" style={{display:"inline-flex"}}>
                                                       <div className="width_of_data_new11 issudee">Net Premium	</div>:
                                                        <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>&#x20b9; {value.section_details[0].net_premium}</span>
                                                     </div>
                                                    <div className="col-lg-4 col-md-6 col-sm-12" style={{display:"inline-flex"}}>
                                                       <div className="width_of_data_new_1 amount_rece">Gross Premium	</div>:
                                                        <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>&#x20b9; {value.section_details[0].gross_premium}</span>
                                                     </div>
                                                    <div className="col-lg-4 col-md-6 col-sm-12" style={{display:"inline-flex"}}>
                                                       <div className="width_of_data_new_1">PO %	</div>:
                                                        <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>{Number(value.section_details[0].po_discount_in_percent).toFixed()} % </span>
                                                     </div>
                                                    <div className="col-lg-4 col-md-6 col-sm-12" style={{display:"inline-flex"}}>
                                                       <div className="width_of_data_new11">Amount Receivable Rs</div>:
                                                        <span className="data_of_data" style={{ marginLeft: "10px" ,textTransform: "capitalize"}}>&#x20b9; {value.section_details[0].amount_receivable}</span>
                                                     </div>
                                                </div>
                                            </div>
                                        )
                                    })} */}


                        <div className="table-responsive-lg scroll_1">
                         <Table striped>
                             <thead>
                              <tr>
                                <th scope="col" className="table_head_new"></th>
                                <th scope="col" className="table_head_new">Sourced By (Agent/Telecaller)</th>
                                <th scope="col" className="table_head_new">Policy Number</th>
                                <th scope="col" className="table_head_new">Vehicle Number</th>
                                {/* <th scope="col" className="table_head_new">RTO Location</th>
                                <th scope="col" className="table_head_new">Policy Start Date </th>
                                <th scope="col" className="table_head_new">Policy End Date </th> */}
                                <th scope="col" className="table_head_new">Issue Date </th>
                                <th scope="col" className="table_head_new">Customer Name </th>
                                {/* <th scope="col" className="table_head_new">Fleet or Non Fleet </th>
                                <th scope="col" className="table_head_new">Contact Number </th> */}
                                <th scope="col" className="table_head_new">Motor/Non Motor </th>
                                <th scope="col" className="table_head_new">Motor Type</th>
                                <th scope="col" className="table_head_new">Sub Motor Type</th>
                                {/* <th scope="col" className="table_head_new">GVW/PCV</th>
                                <th scope="col" className="table_head_new">Seat Capacity</th> */}
                                {/* <th scope="col" className="table_head_new">GVW</th> */}
                                {/* <th scope="col" className="table_head_new">Type of MIS-D </th> */}
                                <th scope="col" className="table_head_new">Make </th>
                                <th scope="col" className="table_head_new">Model </th>
                                <th scope="col" className="table_head_new">CC/GVW/PCC </th>
                                {/* <th scope="col" className="table_head_new">NCB </th>
                                <th scope="col" className="table_head_new">Add On &apos;s </th>
                                <th scope="col" className="table_head_new">Fule Type </th> */}
                                <th scope="col" className="table_head_new">Insurer </th>
                                <th scope="col" className="table_head_new">OD+Addon Premium </th>
                                <th scope="col" className="table_head_new" style={{textAlign:"end"}}>Net Premium </th>
                                <th scope="col" className="table_head_new" style={{textAlign:"end"}}>Gross Premium </th>
                                {/* <th scope="col" className="table_head_new" style={{textAlign:"end"}}>Amount Receivable Rs. </th> */}
                                <th scope="col" className="table_head_new">PO on  </th>
                                {/* <th scope="col" className="table_head_new">Type of Payout </th> */}
                                <th scope="col" className="table_head_new">Agent/Telecaller Name </th>
                                {/* <th scope="col" className="table_head_new">Telecaller Name </th>
                                <th scope="col" className="table_head_new">Agent/Dealer Name </th> */}
                                <th scope="col" className="table_head_new">PO % </th>
                                <th scope="col" className="table_head_new" style={{textAlign:"end"}}>PO Amount </th>
                                <th scope="col" className="table_head_new" style={{textAlign:"end"}}> Receivable Amount</th>
                                <th scope="col" className="table_head_new">PO Status </th>
                                <th scope="col" className="table_head_new">Mode of Premium Payment by SC </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.payout_details_array.map((value,index)=>{

                                return(
                                    <tr key={index} >
                                    <th scope="row" className="table_sub_head">
                                        <div>
                                        <CustomInput type="checkbox"   id={"formCheckbox1" + index}
                                                    onChange={(e) => {
                                                        this.setState({
                                                            checked_policy:e.target.checked
                                                        })
                                                        this.toggleCheckbox(e,value,index)}}
                                                    />
                                        </div>
                                    </th>
                                    <td className="table_sub_head">{value.sourced_by.label}</td>
                                    <td className="table_sub_head">{value.section_details[0].policy_number}</td>
                                    <td className="table_sub_head" style={{textTransform:"uppercase"}}>{value.section_details[0].vehicle_number}</td>
                                    {/* <td className="table_sub_head">{value.section_details[0].rto_locationr}</td> */}
                                    {/* <td className="table_sub_head">{dateFormat(new Date(value.section_details[0].new_start_date.replace("Z", "")), "dd-mm-yyyy")}</td> */}
                                    {/* <td className="table_sub_head">{dateFormat(new Date(value.section_details[0].new_end_date.replace("Z", "")), "dd-mm-yyyy")}</td> */}
                                    <td className="table_sub_head">{dateFormat(new Date(value.section_details[0].issue_date.replace("Z", "")), "dd-mm-yyyy")}</td>
                                    <td className="table_sub_head">{value.section_details[0].customer_name}</td>
                                    {/* <td className="table_sub_head">{value.section_details[0].fleet_type}</td>
                                    <td className="table_sub_head">{value.section_details[0].contact_no}</td> */}
                                    <td className="table_sub_head">{value.section_details[0].motor_non_motor ? value.section_details[0].motor_non_motor.label :""}</td>
                                    <td className="table_sub_head">{value.section_details[0].type_of_motor ? value.section_details[0].type_of_motor.label :""}</td>
                                    <td className="table_sub_head" style={{display:value.section_details[0].motor_non_motor.label == "Non Motor" ? "table-cell" :"none"}}></td>
                                    <td className="table_sub_head" style={{display:value.section_details[0].private_car_data == "" || value.section_details[0].private_car_data == undefined ? "none" :"table-cell"}}>{value.section_details[0].private_car_data ? value.section_details[0].private_car_data.label :""}</td>
                                    <td className="table_sub_head" style={{display:value.section_details[0].two_wheeler == "" || value.section_details[0].two_wheeler == undefined ? "none" :"table-cell"}}>{value.section_details[0].two_wheeler ? value.section_details[0].two_wheeler.label :""}</td>
                                    <td className="table_sub_head" style={{display:value.section_details[0].miscd_data == "" || value.section_details[0].miscd_data == undefined ? "none" :"table-cell"}}>{value.section_details[0].miscd_data ? value.section_details[0].miscd_data.label :""}</td>
                                    <td className="table_sub_head" style={{display:value.section_details[0].comercial_data == "" || value.section_details[0].comercial_data == undefined ? "none" :"table-cell"}}>{value.section_details[0].comercial_data ? value.section_details[0].comercial_data.label :""}</td>
                                    {/* <td className="table_sub_head">
                                        <div style={{display:value.section_details[0].comercial_data ? (value.section_details[0].comercial_data.label=="PCV" ? "block" :"none"):"none" }}>{value.section_details[0].pvc_type ? value.section_details[0].pvc_type.label :""}</div>
                                        <div style={{display:value.section_details[0].comercial_data ? (value.section_details[0].comercial_data.label=="GCV" ? "block" :"none"):"none" }}>{value.section_details[0].gcv_data }</div>
                                        </td>
                                    <td className="table_sub_head">{value.section_details[0].pvc_capacity}</td> */}
                                    {/* <td className="table_sub_head">{value.section_details[0].gcv_data}</td> */}
                                    {/* <td className="table_sub_head">{value.section_details[0].type_of_mis_d}</td> */}
                                    <td className="table_sub_head">{value.section_details[0].make}</td>
                                    <td className="table_sub_head">{value.section_details[0].model}</td>
                                    <td className="table_sub_head">{value.section_details[0].cc_gvw_pcc}</td>
                                    {/* <td className="table_sub_head">{value.section_details[0].ncb_type ? value.section_details[0].ncb_type.label : ""}</td> */}
                                    {/* <td className="table_sub_head">{value.section_details[0].add_on_type}</td>
                                    <td className="table_sub_head">{value.section_details[0].fuel_type.label}</td> */}
                                    <td className="table_sub_head">{value.section_details[0].insurer_array_new.label}</td>
                                    <td className="table_sub_head">{value.section_details[0].addon_premium}</td>
                                    <td className="table_sub_head" style={{textAlign:"end"}}>{value.section_details[0].net_premium}</td>
                                    <td className="table_sub_head" style={{textAlign:"end"}}>{value.section_details[0].gross_premium}</td>
                                    {/* <td className="table_sub_head" style={{textAlign:"end"}}>&#x20b9;{value.section_details[0].amount_receivable}</td> */}
                                    <td className="table_sub_head">{value.section_details[0].po_on_type == "od_premium" ? "OD Premium" : "Net Premium"}</td>
                                    {/* <td className="table_sub_head">{value.section_details[0].type_of_payout.label}</td> */}
                                    <td className="table_sub_head">
                                        <div style={{display:value.section_details[0].agent_or_tellcalling.label == "Agent/Dealer" ? "block" :"none"}}>{value.section_details[0].agent_dealer_name.label}</div>
                                        <div style={{display:value.section_details[0].agent_or_tellcalling.label == "Telecalling" ? "block" :"none"}}>{value.section_details[0].tele_caller_name.label}</div>
                                        </td>
                                    {/* <td className="table_sub_head">{value.section_details[0].tele_caller_name.label}</td>
                                    <td className="table_sub_head">{value.section_details[0].agent_dealer_name.label}</td> */}
                                    <td className="table_sub_head">{value.section_details[0].po_discount_in_percent} %</td>
                                    <td className="table_sub_head" style={{textAlign:"end"}}>&#x20b9;{value.section_details[0].po_discount_amount}</td>
                                    <td className="table_sub_head" style={{textAlign:"end"}}>&#x20b9;{value.receving_amount_for_paid_payment}</td>
                                    <td className="table_sub_head">{value.section_details[0].po_discount_status}</td>
                                    <td className="table_sub_head">{value.section_details[0].mode_of_premium_payment.label}</td>
                                </tr>
                                )
                            })}


                        </tbody>
                    </Table>
                </div>

                                </div>
                            </div>
                            </div>
                            </div>
                            </div>


                <Modal
                        isOpen={ this.state.modalOpen }
                        toggle={ this.toggle }
                        className={ this.props.className,"modal-dialog-centered model_widrg" }
                        fade
                    >
                        <div className="modal-header">
                            <h5 className="modal-title h2">Paid Payment</h5>
                            <Button className="close" color="" onClick={ this.toggle }>
                                <Icon name="x" />
                            </Button>
                        </div>
                        <ModalBody>
                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <div>
                                    <Label className="upload_file_1">Date</Label>
                                        <DatePicker
                                        selected={ this.state.secondVal }
                                        onChange={ ( val ) => {
                                            this.setState( {
                                                secondVal: val,
                                            } );
                                        } }
                                        placeholder="Select date"
                                        dateFormat="dd-MM-yyyy"
                                        className="rui-datetimepicker form-control w-auto"
                                    />
                                    </div>
                                </div>

                             <div className="col-lg-6 col-md-6 col-sm-12 top_diff">
                                   <Label className="upload_file_1">Mode of Payment</Label>
                                  <Select
                                        value = {this.state.mode_of_payment}
                                        onChange={(e) => {
                                            this.setState({
                                                mode_of_payment: e,
                                                mode_of_payment_label:e.label,
                                                show_erorre:"none"
                                            });
                                        }}
                                        placeholder="Select..."
                                        className="contact_sort"
                                        options={ mode_of_payemnt }
                                        styles={ customStyles }
                                    />
                               </div>

                             <div className="col-lg-12 col-md-12 col-sm-12" style={{display:this.state.mode_of_payment_label=="Cheque to SC" ?"block" :"none"}}>
                                 <div className="row">
                                 <div className="col-lg-6 col-md-6 mar_top_new">
                                   <Label className="ballllllll" for="emailInput1">Cheque No<span className="start_mark">*</span></Label>
                                   <Input type="text" name="policy_no" id="emailInput1" placeholder="Short answer text"
                                   value={this.state.cheque_no}
                                   onChange={(e) => {
                                    this.setState({
                                      cheque_no:e.target.value,
                                      show_erorre:"none"
                                    })
                                   }}  />
                                   </div>


                                   <div className="col-lg-6 col-md-6 mar_top_new">
                                   <Label className="ballllllll" for="emailInput1">Cheque Amount<span className="start_mark">*</span></Label>
                                   <Input type="number" name="policy_no" id="emailInput1" placeholder="Short answer text"
                                   value={this.state.cheque_amount_received}
                                   onChange={(e) => {
                                    this.setState({
                                      cheque_amount_received:e.target.value,
                                      show_erorre:"none"
                                    })
                                   }}  />

                                   <p style={{display:this.state.setError=="block" ? "block" : "none",color:"#f597a2",fontSize:"80%",marginTop:"3px",marginBottom:"0px"}}>Cheque Amount should not be greater than Policy Amount</p>
                                   </div>


                                   <div className="col-lg-6 col-md-6 mar_top_new">
                                   <Label className="ballllllll" for="emailInput1">Cheque Date<span className="start_mark">*</span></Label>
                                   <DatePicker
                                       selected={this.state.cheque_date}
                                       onChange={(val) => {
                                           this.setState({
                                            cheque_date: val,
                                           });
                                       }}
                                       placeholder="Select date"
                                       dateFormat="dd-MM-yyyy"
                                       className="rui-datetimepicker form-control "
                                   />
                                   </div>

                                   <div className="col-lg-6 col-md-6 mar_top_new">
                                   <Label className="ballllllll" for="emailInput1">Bank Name<span className="start_mark">*</span></Label>
                                   <Input type="text" name="policy_no" id="emailInput1" placeholder="Short answer text"
                                   value={this.state.bank_name}
                                   onChange={(e) => {
                                    this.setState({
                                      bank_name:e.target.value,
                                      show_erorre:"none"
                                    })
                                   }} />
                                   </div>
                               </div>


                               </div>
                                <div className="col-lg-6 col-md-6 col-sm-12 mar_top_new">
                                <Label className="upload_file_1">Receiving Amount</Label>
                                   <input type="number"
                                        disabled
                                        className="form-control"
                                        placeholder="Amount"
                                        value={this.state.amount_received}
                                        onChange={(e) => {
                                            this.setState({
                                                amount_received: e.target.value,
                                                show_erorre:"none"
                                            });
                                        }}
                                    />

                                </div>
                                {/* <div className="col-lg-6 col-md-6 col-sm-12 mar_top_new">
                                <Label className="upload_file_1">Received From</Label>
                                   <input type="text"
                                        className="form-control"
                                        placeholder="Received From"
                                        value={this.state.received_from_amount}
                                        onChange={(e) => {
                                            this.setState({
                                                received_from_amount: e.target.value,
                                                show_erorre:"none"
                                            });
                                        }}
                                    />
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12 mar_top_new">
                                <Label className="upload_file_1">Received To</Label>
                                   <input type="text"
                                        className="form-control"
                                        placeholder="Received To"
                                        value={this.state.received_to_amount}
                                        onChange={(e) => {
                                            this.setState({
                                                received_to_amount: e.target.value,
                                                show_erorre:"none"
                                            });
                                        }}
                                    />
                                </div> */}
                                <div className="col-lg-6 col-md-6 col-sm-12 mar_top_new">
                                <Label className="upload_file_1">Attachment</Label>
                                <div>
                                <input id="inputGroupFile01" type="file"  className="no_input_file" disabled={this.state.policy_dock_control == "false" ? 'disabled' : ''} multiple onChange={this.handleChangeFile_Quotationn} style={{display:"none"}} />
                                         <label className="lord_lable" htmlFor="inputGroupFile01">
                                          {/* <Icon name="upload-cloud" className="upadee_filesss"/> */}
                                          <div className="file_name"></div>
                                          <div className="choose align-self-center">Choose file</div>
                                         </label>

                                </div>
                                <div className="attachment_data_array">
                                        {this.state.document_data ? this.state.document_data.map((value,index)=>{
                                            return(
                                                <div key={index} className="m_bottom">
                                                     <button type="button" className="btn btn-danger btn-uniform btn-sm mnt-10 mnb-10 p-0 delte_image" onClick={()=>{
                                                          this.delete_building_map_image_temp(value)
                                                         }}
                                                            style={{ display: "grid" }}
                                                        >
                                                            <Icon name="x" />
                                                        </button>


                                                    <span style={{display: value.document_type=="pdf" ? "block" :"none"}}>
                                                     <img width="50" src={pdf_img} alt='' style={{ marginRight: "20px", height: "62px",marginBottom:"11px"}} />
                                                    </span>
                                                    <span style={{display: value.document_type !="pdf" ? "block" :"none"}}>
                                                     <img width="50" src={value.document_image} alt='' style={{ marginRight: "20px", height: "62px",marginBottom:"11px"}} />
                                                    </span>
                                                </div>
                                            )
                                        }):[]}
                                    </div>
                                </div>


                                <div className="col-lg-12" style={{display:this.state.show_erorre== "none" ? "none" :"block"}}>
                                <p className="erorre_new_mess">{this.state.show_erorre}</p>
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={ this.toggle }>Close</Button>
                            { ' ' }
                            <Button color="warning" onClick={()=> this.show_validation_data(this.state.attachment_data) } style={{color:"#fff"}}>Yes</Button>
                        </ModalFooter>
                    </Modal>

             </Fragment>
         );
     }
 }

 export default connect( ( { settings } ) => (
     {
         settings,
     }
 ),{ addToast: actionAddToast } )( Content );

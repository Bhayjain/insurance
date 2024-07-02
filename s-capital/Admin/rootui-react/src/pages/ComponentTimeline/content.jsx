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
 import {
    addToast as actionAddToast,
  } from '../../actions';

  import pdf_img from '../../images/pdf.png'


 const device_width =   window.innerWidth;
 var height =   window.innerHeight;
 //  //////console.log("admin_screen.height", height);
 const nav_height = document.querySelector('.rui-navbar-sticky').offsetHeight
 //  //////console.log("admin_nav_height",nav_height);
 var my_height = height - nav_height;
 var gk = (my_height/2)-100;
 //  //co//////console.logadmin_gk",gk);
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
             attachment_data: [],
             document_data: [],
             no_data:"none",
             isLoading:"block",
             total_pages:"",
             total:"",
             startDate:"",
             endDate:"",
             total_net_premium:"",
             total_payout_amount:"",
             total_policy:"",
             cal_start_date:"",
             cal_end_date:"",
             customer_cheque_control_new:Cookies.get('customer_cheque_control_new'),
             add_to_deviation_model: false,
             imageUrls: [],
             contacts_control : Cookies.get("contacts_control")

         };
         this.add_to_deviation_model = this.add_to_deviation_model.bind( this );
         setTimeout(() => {
            this.fetch_all_daily_sales_report()
            }, 0)
     }
     add_to_deviation_model() {
        this.setState( ( prevState ) => ( {
            add_to_deviation_model: ! prevState.add_to_deviation_model,
            document_data:[],
            attachment_data:[]
        } ) );
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
          }
         if (startDate == "" || startDate == undefined || endDate == "" || endDate == undefined) {
             ////console.log("startDate",startDate);
             ////console.log("endDate",endDate);
         }
         else{
             ////console.log("startDate",startDate);
             ////console.log("endDate",endDate);

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
              date_range:my_date,
              cheque_no:my_sm_search
         }
         console.log("Reporttt",params);
         const { settings } = this.props;
          const res = fetch(settings.api_url + "fetch_customer_cheque", {
              method: 'POST',
              body: JSON.stringify(params),
              headers: {
                  "Content-type": "application/json; charset=UTF-8",
              }
          }).then((response) => response.json())
              .then(json => {
                  console.log("fetch_customer_cheque ****", json)
                  var data = json;
                  if (data.status == true) {
                      this.setState({
                          daily_sales_array: data.data,
                          no_data:"none",
                          isLoading:"none",
                          total_pages: data.total_pages,
                          total_payout_amount: data.total_payout_amount,
                          total_policy: data.total_policy,
                          total_pages: data.total_pages,
                          total:data.total,
                      });
                  }
                  else {
                      this.setState({
                          daily_sales_array: [],
                          no_data:"block",
                          isLoading:"none",
                          total_payout_amount: "",
                          total_policy: "",
                          total_pages: "",

                      });
                  }


              })
      }


    //   bounce_clear_customer_cheque = (policy_dock_id)=>  {
    //     const { settings,addToast } = this.props;
    //     var params = {
    //         policy_id:policy_dock_id,
    //       customer_cheque_status:this.state.customer_cheque_status,
    //     }
    //      console.log("Params Dtaa",params);
    //      const res = fetch(settings.api_url + "bounce_clear_customer_cheque", {
    //          method: 'POST',
    //          body: JSON.stringify(params),
    //          headers: {
    //              "Content-type": "application/json; charset=UTF-8",
    //          }
    //      }).then((response) => response.json())
    //          .then(json => {
    //              console.log("Addd bounce_clear_customer_cheque ****", json)
    //              var data = json;
    //              if (data.status == true) {
    //                  this.setState({
    //                      add_to_deviation_model:false,
    //                  });
    //                      addToast({
    //                          title: 'Ask my Policy',
    //                          content: data["message"],
    //                          duration: 1000,
    //                        });

    //                        this.fetch_all_daily_sales_report()
    //              }
    //              else {
    //                  this.setState({
    //                     add_to_deviation_model:false,
    //                  });
    //                  addToast({
    //                   title: 'Ask my Policy',
    //                   content: data["message"],
    //                   duration: 1000,
    //                 });
    //              }
    //          })
    //  }


       //   generateImageUrls = () => {
    //     const { attachment_data } = this.state;
    //     const imageUrls = attachment_data.map((file) => URL.createObjectURL(file));
    //     console.log("imageUrls",imageUrls);
    //     this.setState({ imageUrls });
    //   };



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
        var document_data = this.state.document_data.filter(n => n !== t);
        this.setState({
            document_data: document_data,
        })

      }


      handleChangeFile_Quotationn = async (event) => {
        var my_file =event.target.files

        if (event.target.files && event.target.files.length > 0) {
            const newImagesPromises = []
            for (let i = 0; i < event.target.files.length; i++) {
              newImagesPromises.push(this.fileToDataUri_flat(event.target.files[i]))
            }
            const newImages = await Promise.all(newImagesPromises)
            this.setState({
              document_data: newImages,
              attachment_data:my_file
            })
          }
      }





      bounce_clear_customer_cheque = (policy_dock_id,files) => {
        const { settings, addToast } = this.props;
        var fd = new FormData();
            for (let i = 0; i < files.length; i++) {
                fd.append('file',files[i]);
            }

            fd.append('policy_id', policy_dock_id);
            fd.append('customer_cheque_status', this.state.customer_cheque_status);



        // headers: {'Content-Type': undefined}
           console.log(...fd, "bounce_clear_customer_cheque")

            const res = fetch(settings.api_url + "bounce_clear_customer_cheque", {
                method: 'POST',
                body: fd
            })
                .then((response) => response.json())
                .then(json => {
                  console.log("Bounced Report**************************************", {response: json })
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
                      attachment_data:[],
                      document_data:[],
                      add_to_deviation_model:false,

                    })
                    this.fetch_all_daily_sales_report()
                  }
                  else {
                    this.setState({
                        modalOpen:true,
                       show_erorre:data["message"],
                       amount_received:"",
                       add_to_deviation_model:false,
                      })
                    addToast({
                      title: 'Ask my Policy',
                      content: data["message"],
                      duration: 1000,
                    });
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
                  <div className="col-lg-6 col-md-6" style={{display:"inline-flex", width:"100%"}}>
                      <h1 style={{marginTop: "0px"}}>Customer Cheque</h1>
                      {/* <Button style={{color:"#fff",marginLeft: "auto"}} onClick={ this.daily_sales_report }>Export</Button> */}
                 </div>
                  <div className="col-lg-6 col-md-6" style={{display:"inline-flex", width:"100%"}}>
                  <input
                       style={{marginTop:"1px",marginRight:"12px"}}
                       type="text"
                       className="form-control serach_smmm_22"
                       aria-describedby="emailHelp"
                       placeholder="Search by cheque no"
                       value={this.state.search_user}
                       onChange={(e) => {
                        this.setState({
                          search_user:e.target.value
                        })
                        this.fetch_all_daily_sales_report(e.target.value,this.state.startDate,this.state.endDate,this.state.current_page)
                       }}
                  />
                      <div className="date_pickerrr date_pickerrr_neww">
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
                             {/* <Button disabled={this.state.reporting_control_new == "false" ? 'disabled' : ''} style={{color:"#fff",marginLeft: "12px"}} onClick={ this.daily_sales_report }>Export</Button> */}
                      </div>
                 </div>
                </div>
              </PageTitle>

              <Spinner color="warning" className="lead_spinner" style={{marginTop: gk, display: this.state.isLoading }} />
              <div className="table_start test_collapse" style={{display: this.state.isLoading =="none" ? "block" :"none"}}>
              <h3 style={{ display: this.state.no_data, padding: "15px",textAlign:"center",color:" #a4a3a3",width: "100%",marginTop:gk}}>No Data Found</h3>
              <div style={{display: this.state.no_data=="none" ? "block" :"none"}}>
                <div className="mycalendar" style={{height:this.state.total_pages==1 ? my_height-70 :my_height-134}}>
                 <div className="table-responsive-lg scroll_1 test_collapse">
                 <Table striped>
                         <thead>
                             <tr>
                                 <th scope="col" className="table_head_new" >Policy No</th>
                                 <th scope="col" className="table_head_new">Policy Sourced By (SM)</th>
                                 <th scope="col" className="table_head_new">Policy Issued By</th>
                                 <th scope="col" className="table_head_new">Customer Names</th>
                                 <th scope="col" className="table_head_new" >Cheque No</th>
                                 <th scope="col" className="table_head_new" >Cheque Date</th>
                                 <th scope="col" className="table_head_new" >Bank Name</th>
                                 <th scope="col" className="table_head_new" style={{textAlign:"end"}}> Amount</th>
                                 <th scope="col" className="table_head_new" > Status</th>
                                 <th scope="col" className="table_head_new" > Action</th>
                             </tr>
                         </thead>
                         <tbody>
                             {this.state.daily_sales_array.map((value,index)=>{

                                 return(
                                     <tr key={index}>
                                     <td className="table_sub_head" >{value.section_details[0].policy_number}</td>
                                     <td className="table_sub_head" >{value.sourced_by ?value.sourced_by.label:"" }</td>
                                     <td className="table_sub_head" >{value.policy_issued_by ?value.policy_issued_by.label:"" }</td>
                                     <th scope="row" className="table_sub_head">{value.section_details[0].customer_name}</th>
                                     <td className="table_sub_head" >{value.section_details[0].cheque_no}</td>
                                     <td className="table_sub_head" >{value.section_details[0].new_cheque_date ? dateFormat(new Date(value.section_details[0].new_cheque_date.replace("Z", "")), "dd-mm-yyyy"):""}</td>
                                     <td className="table_sub_head" >{value.section_details[0].bank_name}</td>
                                     <td className="table_sub_head" style={{textAlign:"end"}}>&#x20b9; {value.section_details[0].cheque_amount_received}</td>
                                     <td className="table_sub_head" >{value.section_details[0].customer_cheque_status}</td>
                                     <td className="table_sub_head">
                                         <div style={{display:value.section_details[0].customer_cheque_status == "" ? "block" :"none"}}>
                                         <Button color="success" disabled={this.state.customer_cheque_control_new == "false" ? 'disabled' : '' || this.state.contacts_control == "false" ? true : false} style={{marginRight:"10px"}} className="cleareddd"  onClick={()=>{
                                          this.setState({
                                              add_to_deviation_model:true,
                                              policy_dock_id:value._id,
                                              customer_cheque_status:"cleared",
                                              customer_cheque_status_new:"Clear",
                                             })
                                       }}>Make Clear</Button>
                                         <Button color="danger" disabled={
                                          (this.state.customer_cheque_control_new == "false" ? 'disabled' : '') ||
                                          (this.state.contacts_control == "false" ? true : false)
                                        } className="cleareddd"
                                         onClick={()=>{
                                          this.setState({
                                            add_to_deviation_model:true,
                                            policy_dock_id:value._id,
                                            customer_cheque_status:"bounced",
                                            customer_cheque_status_new:"Bounce",
                                           })
                                        }}>Report Bounce</Button>
                                        </div>
                                     </td>
                                 </tr>
                                 )
                             })}



                         </tbody>
                     </Table>
                 </div>
          </div>


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
              </div>

              <Modal
                        isOpen={ this.state.add_to_deviation_model }
                        toggle={ this.add_to_deviation_model }
                        className={ this.props.className,"modal-dialog-centered" }
                        fade
                    >
                        <div className="modal-header">
                            <h5 className="modal-title h2">Make Cheque as {this.state.customer_cheque_status_new}</h5>
                            <Button className="close" color="" onClick={ this.add_to_deviation_model }>
                                <Icon name="x" />
                            </Button>
                        </div>
                        <ModalBody style={{paddingBottom: "2px"}}>
                        <p >Are you sure you want to make this Cheque as {this.state.customer_cheque_status_new} ?</p>
                        <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 mar_top_new">
                                <Label className="upload_file_1">Attachment</Label>
                                <div>
                                <input id="inputGroupFile01" type="file"  className="no_input_file" disabled={this.state.customer_cheque_control_new == "false" ? 'disabled' : ''} multiple onChange={this.handleChangeFile_Quotationn} style={{display:"none"}} />
                                         <label className="lord_lable_new" htmlFor="inputGroupFile01">
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
                        </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={ this.add_to_deviation_model }>Close</Button>
                            { ' ' }
                            <Button color="warning" style={{color:"#fff"}} onClick={() => {
                                    this.bounce_clear_customer_cheque(this.state.policy_dock_id,this.state.attachment_data)
                                }}>Yes</Button>
                        </ModalFooter>
                    </Modal>

            {/* <Modal
                    // style={{ width: '370px', height: 'auto', justifyContent: 'center', textAlign: 'center', alignItem: 'center', marginTop: '200px' }}
                    isOpen={this.state.add_to_deviation_model}
                    toggle={this.add_to_deviation_model}
                    className={this.props.className, "del_model"}
                    fade
                >
                    <ModalBody>
                        <div style={{ width: '100%', height: '20px' }}>
                            <Button className="close" style={{ float: 'right' }} color="" onClick={this.add_to_deviation_model}>
                                <Icon name="x" />
                            </Button>
                        </div>
                        <div style={{ width: '100%', height: '70px' }}>
                            <p >Are you sure you want to make this Cheque as {this.state.customer_cheque_status_new} ?</p>

                        </div>
                        <div style={{ height: '35px', width: '100%' }}>
                            <Button color="secondary" style={{marginRight: "20px"}}  onClick={this.add_to_deviation_model}>no</Button>
                            {' '} {' '}
                            <Button color="warning" disabled={this.state.policy_dock_control_new == "false" ? 'disabled' : ''}
                                style={{ color:"#fff"}}
                                onClick={() => {
                                    this.bounce_clear_customer_cheque(this.state.policy_dock_id)

                                }}
                            >yes</Button>

                        </div>

                    </ModalBody>
                </Modal> */}


             </Fragment>
         );
     }
 }

 export default connect( ( { settings } ) => (
     {
         settings,
     }
 ) , { addToast: actionAddToast })( Content );

/**
 * External Dependencies
 */

 import './style.scss';

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {Spinner, Row, Col, Button, CustomInput, Label, Input, FormFeedback,Progress, Modal, ModalBody, ModalFooter,Table } from 'reactstrap';

/**
 * Internal Dependencies
 */
import Snippet from '../../components/snippet';

// import { io } from "socket.io-client";
import Cookies from 'js-cookie';
import Icon from '../../components/icon';
import PageTitle from '../../components/page-title';
import * as XLSX from "xlsx";
import Select from 'react-select';

import {
  addToast as actionAddToast,
} from '../../actions';

import excel_file from '../../images/xls-file.png'
import dateFormat from 'dateformat';

import socket from '../Socket';




// // var api_url = "http://192.168.29.31:4090/"
// // var api_url = "http://173.249.5.10:3005/"
// var api_url = "https://api.bookyourinsurance.com:4092/"
// // var api_url = "https://demoapi.bookyourinsurance.com:4050/"




const sayali = window.innerWidth;
var height = window.innerHeight;
var width23 = window.innerWidth;
console.log(" screen.height", height);
const nav_height = document.querySelector('.rui-navbar-sticky').offsetHeight
console.log("nav_height", nav_height);
var my_height = height - nav_height;
var dev_height = my_height - 160;
var gk = (my_height / 2);
var pp = my_height - gk
console.log("my_height", my_height);
if (height < 600) {
    const sayali = window.innerWidth;
    var height = window.innerHeight;
    console.log(" screen.height", height);
    const nav_height = document.querySelector('.rui-navbar-sticky').offsetHeight
    console.log("nav_height", nav_height);
    var my_height = height - nav_height;
    var dev_height = my_height - 218;
    console.log("mobileeeeeeee", dev_height);
}

// var socket = io(api_url, {transport : ['WebSocket']});
 ////////console.log("socket*************",socket);
 const admin_data = JSON.parse(Cookies.get('admin_data'));
//console.log("admin_data===========",admin_data);

function toMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);
  
    return date.toLocaleString('en-US', {
      month: 'long',
    });
  }

/**
 * Component
 */
class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
          excel_name:"",
          excel_data_array:[],
          excel_header_array:[],
          excel_drop_array:[],
          please_feild:"",
          borderNew:false,
          rowCount:0,
          AlertDelete:false,
          array_of_excel:[],
          isLoading:"block",
          no_data_message:"none",
          array_of_single_excel:[],
          no_data_single:"none",
          spinner_1:"none"
        };
        this.fetch_excel_data()
        this.AlertDelete = this.AlertDelete.bind( this );

      }
      
      AlertDelete() {
        this.setState((prevState) => ({
          AlertDelete: !prevState.AlertDelete,
        }));
      }

      openNavExcel() {
        console.log("kkkkkkkkkkkk", sayali);
        if (sayali < 600) {
            document.getElementById("mySidenavExcel").style.width = "100%";

        }
        else {
          console.log("Elseeeeee");
            document.getElementById("mySidenavExcel").style.width = "550px";
        }

      
        // document.getElementById("mySidenav").style.width = "375px";
        document.getElementById("mySidenavExcel").style.boxShadow = "rgb(177, 174, 174) 10px 0px 12px 12px";
    }

    closeNav() {
      
      document.getElementById("mySidenavExcel").style.width = "0";
      document.getElementById("mySidenavExcel").style.boxShadow = " none";
  }



  fileToDataUri_flat = (image) => {
    console.log("image",image);
    return new Promise((res) => {
      const reader = new FileReader();
      const { type, name, size } = image;
      reader.addEventListener('load', () => {
        res({
          file: reader.result.split(";base64,")[1],
          excel_name:image.name,
          extension_type:image.type
        })
      });
      reader.readAsDataURL(image);
    })
  }
   handleFileUpload= async (event) => {
    //  console.log("event(((((((((((((((((((((((((",event);
        const file = event.target.files[0];
        const reader = new FileReader();


        if (event.target.files && event.target.files.length > 0) {
          const newImagesPromises = []
          for (let i = 0; i < event.target.files.length; i++) {
            newImagesPromises.push(this.fileToDataUri_flat(event.target.files[i]))
          }
          const newImages = await Promise.all(newImagesPromises)
          this.setState({
            excel_data_array: newImages,
            excel_name:newImages[0].excel_name,
            extension_type:newImages[0].extension_type,
            file:newImages[0].file
          })
          setTimeout(() => { console.log("this is the first message", this.state.excel_data_array) }, 1000);
        }
        reader.onload = (e) => {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0]; // Assuming only one sheet in the Excel file
          const worksheet = workbook.Sheets[sheetName];

      //     const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      //     const rowCount = jsonData.length;

      // console.log('Number of rows:', rowCount);

      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      let rowCount = 0;
      const columnA = jsonData.map((row) => row[0]);
      for (let i = 0; i < columnA.length; i++) {
        if (columnA[i] !== undefined) {
          rowCount++;
        }
      }

      console.log('Number of rows:', rowCount-1);


          const headers = [];
          const headers_drop = [];
    
          const range = XLSX.utils.decode_range(worksheet['!ref']);
          const C = range.s.c; // Start Column
          const R = range.s.r; // Start Row
    
          for (let col = C; col <= range.e.c; col++) {
            const cellAddress = XLSX.utils.encode_cell({ r: R, c: col });
            const cell = worksheet[cellAddress];
            headers.push({excel_key:cell.v , new_header_excel_key:"" });
            headers_drop.push(cell.v);
           
          }
          var not_requried="Not Required"
          headers_drop.push(not_requried);
    
          console.log(headers_drop); // Display the column headings
          console.log(headers); // Display the column headings

          this.setState({
            excel_header_array:headers,
            excel_drop_array:headers_drop,
            rowCount:rowCount-1
          })
        };
    
        reader.readAsArrayBuffer(file);
      };


      add_haeding_in_excel=(e,val,index)=>{
        console.log("val_index", e);
        console.log("val_index", val, index);
        var array = this.state.excel_header_array;
        array[index].new_header_excel_key = e

        console.log("array***************",array);
        this.setState({
          excel_header_array:array,
          selectedOption:e
        })
      }


      save_excel=()=>{
        if (this.state.excel_name == "" || this.state.excel_name == undefined) {
          this.setState({
            please_feild:"Please Select the Excel File",
            borderNew:true
          })
        }else{
          var array = this.state.excel_header_array;
          for (var i = 0; i < array.length; i++) {
             if (array[i].new_header_excel_key.label == "Not Required") {
                 array.splice(i, 1)
             }else{
               console.log("alll Good");
             }
          }
          console.log("array*******************",array);
          var params = {
            file:this.state.file,
            excel_name:this.state.excel_name,
            extension_type:this.state.extension_type,
            total_record:this.state.rowCount,
            array:array
        } 
          console.log("params of excel",params);
          const { settings,addToast } = this.props;
          const res = fetch(settings.api_url + "import_excel_header", {
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            }
          }).then((response) => response.json())
            .then(json => {
              console.log("import_excel_header **************************************", json)
              var data = json;
              if (data.status == true) {
                this.setState({
                  please_feild:"",
                  borderNew:false
                 });
                 addToast({
                  title: 'Add Excel',
                  content: data.message,
                  time: new Date(),
                  duration: 1000,
              });
              this.fetch_excel_data()
              this.excel_uploaded_record()
              this.closeNav()
              }
              else {
                this.setState({
                  please_feild:"",
                  borderNew:false
                });
                addToast({
                  title: 'Add Excel',
                  content: data.message,
                  time: new Date(),
                  duration: 1000,
              });
               console.log("fetch_emp wrong");
              }
            })
        } 
      }

      delete_excel = (id) => {
         const { settings, addToast, } = this.props;
         var params = {
          excel_id: id
         }
         console.log("delete_excel_id", params);
         const res = fetch(settings.api_url + "delete_excel", {
           method: 'POST',
           body: JSON.stringify(params),
           headers: {
             "Content-type": "application/json; charset=UTF-8",
           }
         }).then((response) => response.json())
           .then(json => {
            console.log("Delete Excel Response**************************************", { params: params, response: json })
             var data = json;
             if (data.status == true) {
               this.setState((prevState) => ({
                 AlertDelete: !prevState.AlertDelete,
               }));
               this.fetch_excel_data();
               addToast({
                 title: 'Delete Excel',
                 content: data["message"],
                 // time: new Date(),
                 duration: 1000,
               });
             }
             else {
              //  //console.log("something wrong");
             }
           })
       }

       fetch_excel_data = () => {
         const { settings, addToast, } = this.props;
         const res = fetch(settings.api_url + "fetch_excel_data", {
           method: 'POST',
          //  body: JSON.stringify(params),
           headers: {
             "Content-type": "application/json; charset=UTF-8",
           }
         }).then((response) => response.json())
           .then(json => {
             console.log("Fetch Excel Response**************************************", { json })
             var data = json;
             if (data.status == true) {
                
                
              this.setState({
                array_of_excel:data.data,
                isLoading:"none",
                no_data_message:"none"
              })
              this.fecth_single_excel_data(data.data[0]._id)
             }
             else {
              this.setState({
                array_of_excel:[],
                isLoading:"none",
                no_data_message:"block"
              })
             }
           })
       }

       fecth_single_excel_data = (excel_id) => {
         const { settings, addToast, } = this.props;
         var params = {
          excel_id: excel_id
         }
         console.log("Singhle_Excel",params);
         const res = fetch(settings.api_url + "fecth_single_excel_data", {
           method: 'POST',
           body: JSON.stringify(params),
           headers: {
             "Content-type": "application/json; charset=UTF-8",
           }
         }).then((response) => response.json())
           .then(json => {
             console.log("Fetch Singh Excel Response**************************************", { json })
             var data = json;
             if (data.status == true) {
               console.log(data.data);
                var array_of_single_excel = data.data 
                for (let j = 0; j < array_of_single_excel.length; j++) {
                 var date = array_of_single_excel[j].date;
                 var new_date = this.formatDate(date);
                 //console.log("new_date=======================",new_date);
                 array_of_single_excel[j].date_new = new_date
              }


                  this.setState({
                    array_of_single_excel:array_of_single_excel,
                    excel_id:data.data[0].excel_id,
                    no_data_single:"none",
                    spinner_1:"none"
                  })
             }
                else {
                  this.setState({
                    array_of_single_excel:[],
                    no_data_single:"block",
                    spinner_1:"none"
                  })
                }
           })
       }

      //   formatDate = (date) => {
      //     console.log("date*************",date);
      //   const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
      //   return new Date(date).toLocaleDateString('en-GB', options);
      // };

       formatDate = (dateString) => {
        const formattedDate = dateString.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$1-$2-$3');
        return formattedDate;
      };
      


      //  formatDate(date) {
      //   console.log("date",new Date(date));
      //           var date = new Date(date);
      //           var year = date.getFullYear();
      //          var  month = date.getMonth()+1;
      //          var dt = date.getDate();

      //            if (dt < 10) {
      //            dt = '0' + dt;
      //            }
      //            if (month < 10) {
      //            month = '0' + month;
      //            }

      //           //  //console.log(dt+'-' + month + '-'+year);
      //            var new_date_1 = dt+'-' + month + '-'+year

      //            console.log("new_date_1",new_date_1);

      //           //  var today = date;
      //           //  let options_1 = {
      //           //      hour: "2-digit", minute: "2-digit"
      //           //  };

      //           //  //console.log("lllllllllllllllllllllllllllll",today.toLocaleTimeString("en-us", options_1));
      //                               // var time_new =today.toLocaleTimeString("en-us", options_1)
      //                               // //console.log("mt______________________________________________*********************",time_new);
      //                               // //console.log("mt______________________________________________",new_date_1);

      //                               var nre_time = new_date_1


      //           return nre_time;
      //         }

       excel_record(excel_id){
        var conv_param = {
          excel_id:excel_id,
         }
         console.log("params of socket",conv_param);
           socket.emit('excel_record', conv_param);
             socket.on('excel_record_response', (data)=>{
               console.log('inside excel_record_response =============',data);
                if(data.data.status==true){
                var new_map = this.state.array_of_excel
                for (let i = 0; i < new_map.length; i++) {
                  if (new_map[i]._id == data.data.excel_id) {
                    new_map[i].total_record = data.data.total_record
                    new_map[i].inserted_record = data.data.inserted_record
                    new_map[i].percentage = data.data.percentage
                  }
                  
                }
                this.setState({
                  array_of_excel:new_map
                })

                }
                else{
                 
                }
          })
    }

    componentDidMount() {
      this.excel_uploaded_record()
      this.timerId = setInterval(() => this.excel_uploaded_record(), 100)
    }
  
    componentWillUnmount() {
      clearInterval(this.timerId)
    }
       excel_uploaded_record(){
           socket.emit('excel_uploaded_record');
             socket.on('excel_uploaded_record_response', (data)=>{
               console.log('inside excel_uploaded_record_response =============&&&&&&&',data);
                if(data.data.status==true){
                  var data = data.data.excel_id_array
                  for (let i = 0; i < data.length; i++) {
                   
                    this.excel_record(data[i])
                  }
                }
                else{
                  clearInterval(this.timerId)
                }
          })
    }

      

    render() {

    const { options, selectedOption } = this.state;


    
    //   var heading_of_excel = this.state.excel_drop_array.map(item => {
    //     return {
    //         value: item,
    //         label: item,
    //     }
    // });

    var heading_of_excel=[
      {value:"first_name", label:"first_name"},
      {value: "last_name", label: "last_name"},
      {value: "gender" ,   label: "gender"} ,
      {value: "country" ,  label: "country" },
      {value: "age" ,      label: "age"} ,
      {value: "date" ,     label: "date" }
    ]
   

    

    const filteredOptions = heading_of_excel.filter(
      (heading_of_excel) => heading_of_excel.value !== (selectedOption && selectedOption.value)
    );
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
        return (
            <Fragment>

              <PageTitle className = "excel_haeding">
              <div className="row">
                <div className="col-lg-6 col-md-8 col-sm-12">
                  <h1 style={{marginTop:"-1px"}}>Excel Sheet</h1>
                </div>
                <div className="col-lg-6 col-md-8 col-sm-12" style={{textAlign:"end",textTransform: "capitalize"}}>
                  <Button color="warning" style={{color:"#fff"}} onClick={this.openNavExcel}>Add Excel</Button>
                </div>
               </div>
              </PageTitle>

              <div className="row_excell_file">
                <div className="row">
                  <div className="col-lg-3 col-md-12 col-sm-12 heading_opeartion height_sales" style={{paddingRight:"0px"}}>
                      <div className="mycalendar" style={{height:my_height-67}}>
                          <div className="new_border_box_opearrrr_neww">
                            {this.state.array_of_excel.map((value,index)=>{
                              return(
                              <div aria-hidden="true" key={index} className="row test_collapse" 
                                        style={{border:value._id == this.state.excel_id ? "2px solid #8bc240" : "",cursor:"pointer"}}
                                        onClick={() => {
                                          this.setState({
                                          spinner_1: 'block'
                                          })
                                          setTimeout(() => {
                                          this.fecth_single_excel_data(value._id)
                                          }, 0)
                                      }}>
                                        <div className="col-lg-12 col-md-6 pad_no">
                                         <div style={{width:"100%",display:"inline-flex"}}>
                                            <div>
                                              <img src={excel_file} alt="excel_file" className="exc_fileee"/>
                                            </div>
                                            <div className="show_data_of_excell"> 
                                              <div className="trash_excel">
                                              <p className= "excel_file_nam marquee" style={{width:"100px"}}><span>{value.excel_name}</span></p>
                                              <Icon name="trash" className="dustbin_excel" aria-hidden="true" onClick={()=>{
                                                this.setState({
                                                  AlertDelete:true,
                                                  excel_id:value._id
                                                })
                                              }} />
                                              </div>
                                              <p className="date_showww" ><span>{dateFormat(new Date(value.date.replace("Z", "")), "dd-mm-yyyy")}</span></p>
                                              <div style={{display:value.show==true ? "none" :"block"}}>
                                                 <Progress animated color="success" value={value.percentage} className="progress_barr"  />
                                                 <p className="range_of_excel">{value.inserted_record}/{value.total_record} Contact</p>
                                              </div>
                                              <div style={{display:value.show==true ? "block" :"none"}}>
                                                 <Progress striped color="success" value="10" className="progress_barr"  />
                                                 <p className="range_of_excel" style={{textAlign:"end"}}>10/{value.total_record} Contact</p>
                                              </div>
                                              {/* <p className="range_of_excel">50/100 Contact</p> */}
                                            </div>
                                       </div>
                                    </div>
                                </div>
                              )
                            })}
                             
                             {/* <div aria-hidden="true" className="row test_collapse" style={{border: " 2px solid #8bc240",cursor:"pointer"}} >
                                 
                                        <div className="col-lg-12 col-md-6 pad_no">
                                         <div style={{width:"100%",display:"inline-flex"}}>
                                            <div>
                                              <img src={excel_file} alt="excel" className="excel_file_without_pro"/>
                                            </div>
                                            <div className="show_data_of_excell"> 
                                              <div className="trash_excel">
                                              <p className= "excel_file_nam marquee"><span>DSR.xls</span></p>
                                              <Icon name="trash" className="dustbin_excel" aria-hidden="true" onClick={()=>{
                                                this.setState({
                                                  AlertDelete:true,
                                                  excel_id:"12"
                                                })
                                              }} />
                                              </div>
                                              <p className="date_showww" ><span>10-07-2023</span></p>
                                              <p className="range_of_excel_pro">100000 Contact</p>
                                            </div>
                                       </div>
                                  </div>
                              </div> */}


                          </div>
                      </div>
                  </div>
                  <div className="col-lg-9 col-md-12 col-sm-12 test_collapse" style={{paddingLeft:"0px"}}>
                  <Spinner color="warning" className="employee_spinner_1" style={{ marginTop: (gk-80), display: this.state.spinner_1 }} />
                    <div style={{display: this.state.spinner_1=="none" ? "block":"none"}}>
                       <h3 style={{ display: this.state.no_data_single, padding: "15px",textAlign:"center",color:" #a4a3a3",width: "100%",marginTop:(gk-80)}}>No Data Found</h3>
                        <div style={{display: this.state.no_data_single=="none" ? "block" :"none"}}>
                          <div className="test_collapse mycalendar"  style={{height:my_height-67}}>
                             <div className="table-responsive-lg scroll_1">
                                <Table striped>
                                    <thead>
                                        <tr>
                                            <th className="table_data" scope="col">Date</th>
                                            <th className="table_data" scope="col">First Name</th>
                                            <th className="table_data" scope="col">Last Name</th>
                                            <th className="table_data" scope="col">Gender</th>
                                            <th className="table_data" scope="col">Country</th>
                                            <th className="table_data" scope="col">Age</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                      {this.state.array_of_single_excel.map((value,index)=>{
                                        return(
                                          <tr key={index}>
                                            <td className="table_data">{value.date_new}</td>
                                            <td className="table_data">{value.first_name}</td>
                                            <td className="table_data">{value.last_name}</td>
                                            <td className="table_data">{value.gender}</td>
                                            <td className="table_data">{value.country}</td>
                                            <td className="table_data">{value.age}</td>
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
              </div> 




{/* ******************************   Upload Excel File Model ***************************************** */}
              <div className="task_list2Excel" id="mySidenavExcel">
              <div className="mycalendar" style={{ height: my_height }}>
                <div className="please" style={{ padding: "6px 14px" }}>
                    <span className="rui-mailbox-item-title h4 task_heading22">Add Excel</span>
                    <Icon name="x" style={{ width: "18px", height: "18px", strokeWidth: "3.5" }} className="closebtn" onClick={this.closeNav} />
                 </div>

                 <div className="show_data mycalendar" style={{padding: "6px 14px",height: my_height-104}}>
                    <div className="row">
                      <div className="col-lg-6 col-md-6">
                        <Label style={{marginBottom:"0px"}}>Upload Excel File</Label>
                        <input id="inputGroupFile01" type="file"  className="no_input_file"  onChange={this.handleFileUpload} style={{display:"none"}} />
                                 <label className={this.state.borderNew && this.state.excel_name == "" ?  "form-control is-invalid lord_lable" : "form-control lord_lable"} style={{paddingRight: "0px",paddingLeft:"1px"}}  htmlFor="inputGroupFile01">
                                   {/* <Icon name="upload-cloud" className="upadee_filesss"/> */}
                                  <div className="file_name_newww">{this.state.excel_name}</div>
                                  <div className="choose align-self-center">Choose file</div>
                              </label>
                              {this.state.borderNew ?  <p style={{color:"#f75b6d",marginBottom:"0px",marginTop:"-11px"}}>{this.state.please_feild} </p>:""}
                         </div>
                      <div className="col-lg-12 col-md-12">
                        {this.state.excel_header_array.map((val,index)=>{
                          return(
                            <div className="row" key={index} style={{marginTop:"14px"}}>
                            <div className="col-lg-6 col-md-6 excel_name">
                              <p>{val.excel_key}</p>
                            </div>
                            <div className="col-lg-6 col-md-6">
                            <Select
                               value = {val.new_header_excel_key}
                               onChange={(e) => {
                                   //////console.log(e, "Val.....")
                                   this.setState({
                                       new_header_excel_key: e,
                                   });

                                  this.add_haeding_in_excel(e,val,index)
                               }}
                                className="contact_sort"
                                placeholder="Select..."
                                options={ heading_of_excel }
                                // isOptionDisabled={this.isOptionDisabled}
                                // isOptionDisabled={option => option === selectedOption}
                                styles={ customStyles }
                               />
                            </div>
                            </div>
                          )
                        })}
                       </div>
                    </div>
                 </div>
                 </div>
                 
                  <div className="excel_save_button">
                 <Button style={{marginRight:"9px"}} onClick={this.closeNav}>Close</Button>
                 <Button color="warning" style={{color:"#fff"}} onClick={()=>this.save_excel()}>Save</Button>
                  </div>
              </div>




              <Modal
                style={{ width: '347px', maxHeight: '37%', justifyContent: 'center', textAlign: 'center', alignItem: 'center', marginTop: '200px' }}
                isOpen={this.state.AlertDelete}
                toggle={this.AlertDelete}
                className={this.props.className}
                fade
              >
                <ModalBody>
                  <div style={{ width: '100%', height: '20px' }}>
                    <Button className="close" style={{ float: 'right' }} color="" onClick={this.AlertDelete}>
                      <Icon name="x" />
                    </Button>
                  </div>
                  <div style={{ width: '100%', height: '50px' }}>
                    <h5 >Are you sure you want to Delete ?</h5>
                  </div>
                  <div style={{ height: '50px', width: '100%' }}>
                    
                    <Button color="secondary" style={{ marginRight: "20px",textTransform:"capitalize"}} onClick={this.AlertDelete}>no</Button>
                    {'             '}
                    <Button color="brand"
                      style={{ background: "#8bc240",textTransform:"capitalize", borderColor: "#8bc240" }}
                      onClick={() => {
                        this.delete_excel(this.state.excel_id)

                      }}
                    >yes</Button>
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

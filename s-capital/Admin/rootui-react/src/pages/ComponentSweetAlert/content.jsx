/**
 * Styles
 */
import './style.scss';

/**
 * External Dependencies
 */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import SweetAlert from 'sweetalert2-react';
import PageTitle from '../../components/page-title';
import { Input,Button, Modal, ModalBody, ModalFooter,CustomInput,Label,Spinner,ButtonGroup,Table } from 'reactstrap';
import Icon from '../../components/icon';
import Select from 'react-select';
import {
    addToast as actionAddToast,
} from '../../actions';
import Cookies from 'js-cookie';

/**
 * Internal Dependencies
 */
import Snippet from '../../components/snippet';

/**
 * Component
 */

 const device_width =   window.innerWidth;
 var height =   window.innerHeight;
 ////////console.log("admin_screen.height", height);
 const nav_height = document.querySelector('.rui-navbar-sticky').offsetHeight
 ////////console.log("admin_nav_height",nav_height);
 var my_height = height - nav_height;
 var gk = (my_height/2)-100;
 ////////console.log("admin_gk",gk);
 if(device_width < 600){
   var gk = (my_height/2) - 50;
 }


class Content extends Component {
    constructor( props ) {
        super( props );

        this.state = {
            showSuccess: false,
            showError: false,
            showWarning: false,
            showInfo: false,
            modalOpen: false,
            heading:"Add Salary",
            button_salary:"Save",
            component_name:"",
            amount:"",
            percent:"",
            deducation:false,
            bonus:false,
            PF:false,
            ESIC:false,
            PTEC:false,
            interval:"",
            message_error:"",
            template_name:"",
            sub_salary_structure_array:[],
            salary_structure_array:[],
            salary_array_new:[],
            single_salary_array:[],
            isLoading:"block",
            no_data_message:"none",
            spinner_1: 'none',
            ipad_width:"none",
            ipad_emp_list:"block",
            AlertDelete: false,
            loading: false,
            master_control_12 : Cookies.get('master_control'),

        };
        this.fetch_all_salary_structure()
        this.toggle = this.toggle.bind( this );
        this.AlertDelete = this.AlertDelete.bind( this );

    }


    toggle() {
        this.setState((prevState) => ({
            modalOpen: !prevState.modalOpen,
            heading:"Add Salary",
            button_salary:"Save",
            component_name:"",
            amount:"",
            percent:"",
            deducation:false,
            bonus:false,
            loading:false,
            PF:false,
            ESIC:false,
            PTEC:false,
            interval:"",
            message_error:"",
            template_name:"",
            salary_structure_array:[]
        }));
    }

    AlertDelete() {
        this.setState( ( prevState ) => ( {
            AlertDelete: ! prevState.AlertDelete,
        } ) );
    }

    switch_function=()=>{
        if (this.state.button_salary == "Save") {
            console.log("Save");
            this.add_salary_structure()
        }else{
            this.update_salary_structure()
        }
    }
// *************  Add Salary Feilds
    add_fields_salary(index) {
        if (this.state.component_name == ""   || this.state.interval == "") {
            setTimeout(() => { console.log("SALARY ARRAY False", this.state.salary_structure_array) }, 1000);
            this.setState({
                message_error:"Please Enter all the feilds"
            })
        }
        else {
            this.setState({ salary_structure_array: [...this.state.salary_structure_array, { component_name: this.state.component_name, amount: Number(this.state.amount), percent:Number(this.state.percent) , deducation:this.state.deducation, interval: this.state.interval, bonus : this.state.bonus,PF : this.state.PF,ESIC : this.state.ESIC, PTEC:this.state.PTEC}], component_name: "", amount: "" , percent: "" , deducation: false , interval: "" ,message_error:"",bonus : false, PF:false,
            ESIC:false,PTEC:false})
            setTimeout(() => { console.log("SALARY ARRAY", this.state.salary_structure_array) }, 1000);
        }
    }

    sub_add_feild=(interval)=>{
        var array = this.state.sub_salary_structure_array
        var salary = {
            component_name:this.state.component_name,
            amount: Number(this.state.amount),
            percent:Number(this.state.percent) ,
            deducation:this.state.deducation,
            interval: this.state.interval,
            bonus: this.state.bonus
        }
        array.push(salary)
        console.log(array);
        this.setState({
            sub_salary_structure_array:array
        })
    }

// ******************* Delete Salary Feilds

    delete_fields_salary(t) {
        var salary_structure = this.state.salary_structure_array.filter(n => n !== t);
        this.setState({
            salary_structure_array: salary_structure,
        })
        console.log(salary_structure,"Delete_________");
    }


    send_component_name = (value, index) => {
        var mmm = this.state.salary_structure_array;
        mmm[index].component_name = value
        this.setState({
          salary_structure_array: mmm
        })
        console.log("sssssss", this.state.salary_structure_array);
      }

      send_interval = (value, index) => {
        var mmm = this.state.salary_structure_array;
        mmm[index].interval = value
        this.setState({
          salary_structure_array: mmm
        })
        console.log("sssssss", this.state.salary_structure_array);
      }

      send_deducation = (value, index) => {
        var mmm = this.state.salary_structure_array;
        mmm[index].deducation = value
        if (value == false) {
            mmm[index].PF = false
            mmm[index].ESIC = false
            mmm[index].PTEC = false
        }
        this.setState({
          salary_structure_array: mmm
        })
        console.log("sssssss", this.state.salary_structure_array);
      }
      send_PF = (value, index) => {
        var mmm = this.state.salary_structure_array;
        mmm[index].PF = value
        this.setState({
          salary_structure_array: mmm
        })
        console.log("PF", this.state.salary_structure_array);
      }
      send_ESIC = (value, index) => {
        var mmm = this.state.salary_structure_array;

        mmm[index].ESIC = value
        this.setState({
          salary_structure_array: mmm
        })
        console.log("ESIC", this.state.salary_structure_array);
      }
      send_PTEC = (value, index) => {
        var mmm = this.state.salary_structure_array;
        mmm[index].PTEC = value

        console.log("mmm",mmm);
        console.log("value",value);
        console.log("index",index);
        this.setState({
          salary_structure_array: mmm
        })
        console.log("PTEC", this.state.salary_structure_array);
      }


      send_bonus = (value, index) => {
        var mmm = this.state.salary_structure_array;
        mmm[index].bonus = value
        this.setState({
          salary_structure_array: mmm
        })
        console.log("BONUS@@@@@@", this.state.salary_structure_array);
      }

    send_amount = (value, index) => {
        var mmm = this.state.salary_structure_array;
        mmm[index].amount = Number(value)
        this.setState({
          salary_structure_array: mmm
        })
        console.log("sssssss", this.state.salary_structure_array);
      }


      send_percent = (value, index) => {
        var mmm = this.state.salary_structure_array;
        mmm[index].percent = Number(value)
        this.setState({
          salary_structure_array: mmm
        })
        console.log("sssssss", this.state.salary_structure_array);
      }


      add_salary_structure(){
          const {addToast, settings} = this.props;
          this.setState({
            loading:true
          })
        if (this.state.component_name == ""   || this.state.interval == "") {
            var salary_structure_array = this.state.salary_structure_array;

        }
        else {
            var salary_structure_array = this.state.salary_structure_array;
            salary_structure_array.push({ component_name: this.state.component_name, amount: Number(this.state.amount), percent:Number(this.state.percent) , deducation:this.state.deducation, interval: this.state.interval , bonus : this.state.bonus, PF : this.state.PF , ESIC : this.state.ESIC, PTEC:this.state.PTEC});
        }

        if (this.state.template_name == "" || this.state.template_name == undefined) {
            this.setState({
                message_error:"Please Enter Template Name",
                loading:false
            })
        }else{
        var params = {
            template_name : this.state.template_name,
            components:salary_structure_array,
        }
        console.log("Add Salary Params*****************", params);
                var data = null;
                const res = fetch(settings.api_url + "api/payroll/add_salary_structure", {
                    method: 'POST',
                    body: JSON.stringify(params),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    }
                }).then((response) => response.json())
                    .then(json => {
                        console.log("Add Salary Structure*******************",json);
                        data = json;
                        if(data.status==true){
                          addToast({
                              title: 'Book Your Insurance',
                              content: data.message,
                              time: new Date(),
                              duration: 1000,
                          });
                          this.setState( ( prevState ) => ( {
                            modalOpen: ! prevState.modalOpen,
                            heading:"Add Salary",
                            button_salary:"Save",
                            component_name:"",
                            amount:"",
                            percent:"",
                            deducation:false,
                            loading:false,
                            bonus:false,
                            PF:false,
                            ESIC:false,
                            PTEC:false,
                            interval:"",
                            message_error:"",
                            template_name:"",
                            salary_structure_array:[]
                        } ) );
                        this.fetch_all_salary_structure()

                        }
                        else{
                            this.setState({
                                modalOpen:true,
                                loading:false,
                                message_error:data.message
                            })
                        }

                    })
                  }
      }

      for_edit=(value)=>{
          console.log("value***********",value);
          this.setState({
              modalOpen:true,
              heading:"Edit Salary",
              button_salary:"Update",
              salary_id:value._id,
              template_name:value.template_name,
              salary_structure_array:value.components,
              component_name:"",
              amount:"",
              percent:"",
              deducation:false,
              loading:false,
              PF:false,
              ESIC:false,
              PTEC:false,
              interval:"",
          })
      }


      update_salary_structure(){
         const {addToast, settings} = this.props;
            this.setState({
                loading:true
            })
         if (this.state.component_name == ""   || this.state.interval == "") {
            var salary_structure_array = this.state.salary_structure_array;

        }
        else {
            var salary_structure_array = this.state.salary_structure_array;
            salary_structure_array.push({ component_name: this.state.component_name, amount: Number(this.state.amount), percent:Number(this.state.percent) , deducation:this.state.deducation, interval: this.state.interval, bonus : this.state.bonus, PF : this.state.PF , ESIC : this.state.ESIC, PTEC:this.state.PTEC});
        }
        if (this.state.template_name == "" || this.state.template_name == undefined) {
            this.setState({
                message_error:"Please Enter Template Name",
                loading:false
            })
        }else{
        var params = {
            structure_id : this.state.salary_id,
            template_name : this.state.template_name,
            components: salary_structure_array,
        }
      console.log("Edit Salary Params*****************", params);
              var data = null;
              const res = fetch(settings.api_url + "api/payroll/update_salary_structure", {
                  method: 'POST',
                  body: JSON.stringify(params),
                  headers: {
                      "Content-type": "application/json; charset=UTF-8",
                  }
              }).then((response) => response.json())
                  .then(json => {
                      console.log("Update Salary Structure*******************",json);
                      data = json;
                      if(data.status==true){
                        addToast({
                            title: 'Book Your Insurance',
                            content: data.message,
                            time: new Date(),
                            duration: 1000,
                        });
                        this.setState( ( prevState ) => ( {
                            modalOpen: ! prevState.modalOpen,
                            heading:"Add Salary",
                            button_salary:"Save",
                            component_name:"",
                            amount:"",
                            percent:"",
                            deducation:false,
                            bonus:false,
                            loading:false,
                            PF:false,
                            ESIC:false,
                            PTEC:false,
                            interval:"",
                            message_error:"",
                            template_name:"",
                            salary_structure_array:[]
                      } ) );

                      this.fetch_single_salary_structure(this.state.salary_id)

                      }
                      else{
                          this.setState({
                              modalOpen:true,
                              loading:false,
                              message_error:data.message
                          })
                      }

                  })
                }
    }


    delete_salary_structure(structure_id){
        const { addToast, settings} = this.props;
            this.setState({
                loading:true
            })
            var params = {
                structure_id:structure_id
            }
            console.log(params,"params");
            var data;
            const res = fetch(settings.api_url + "api/payroll/delete_salary_structure", {
                method: 'POST',
                body: JSON.stringify(params),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            }).then((response) => response.json())
                .then(json => {
                    console.log("Delete Structure***********************",json)
                    data = json;
                    this.setState({ delete:data["status"] });
                    if(data["status"]==true){
                        addToast({
                            title: 'Book Your Insurance',
                            content: data["message"],
                            time: new Date(),
                            duration: 1000,
                        });
                        this.setState({
                            AlertDelete:false,
                            loading:false,
                        })
                        this.fetch_all_salary_structure();
                    }else{
                        addToast({
                            title: 'Book Your Insurance',
                            content: data["message"],
                            time: new Date(),
                            duration: 1000,
                        });
                        this.setState({
                            AlertDelete:false,
                            loading:false
                        })

                    }
                })

    }

      fetch_all_salary_structure = ()=>  {
        const { settings } = this.props;
         const res = fetch(settings.api_url + "api/payroll/fetch_all_salary_structure", {
             method: 'POST',
             headers: {
                 "Content-type": "application/json; charset=UTF-8",
             }
         }).then((response) => response.json())
             .then(json => {
                 console.log("Fetch Salary ***************", json)
                 var data = json;
                 if (data.status == true) {
                    var salary_array_new = data.data
                    for (let j = 0; j < salary_array_new.length; j++) {
                     var date = salary_array_new[j].added_date;
                     var new_date = this.formatDate(date);
                     var data_data = salary_array_new[j].added_date.split("-")[2].split("T")[0] + "-" + salary_array_new[j].added_date.split("-")[1] + "-" + salary_array_new[j].added_date.split("-")[0]
                     salary_array_new[j].date_show =data_data
                     salary_array_new[j].start_time_new = new_date
                  }
                     this.setState({
                      salary_array_new: salary_array_new,
                      isLoading:"none",
                      no_data_message:"none"
                     });
                     if (device_width < 769) {
                        }
                        else{
                        this.fetch_single_salary_structure(data.data[0]._id)
                        }
                 }
                 else {
                     this.setState({
                      salary_array_new: [],
                      isLoading:"none",
                      no_data_message:"block"
                     });
                 }
             })
          }

    fetch_single_salary_structure = (structure_id) => {
            const { addToast,settings } = this.props;
            var params = {
                structure_id: structure_id,
            }
            console.log("structure_id", params);
            const res = fetch(settings.api_url + "api/payroll/fetch_single_salary_structure", {
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            }
          }).then((response) => response.json())
            .then(json => {
              console.log("Fetch Single Salary Data **************************************", json)
              var data = json;

              if (data.status == true) {
                if (device_width < 769) {
                  var ipad_emp_list = "none";
                 }
                 else{
                 var ipad_emp_list = "block"

                 }
                this.setState({
                  single_salary_array: data.data,
                  salary_id:data.data[0]._id,
                  spinner_1: 'none',
                  ipad_width:"block",
                  ipad_emp_list:ipad_emp_list,
                  });
                }
              else {
                this.setState({
                  single_salary_array: [],
                  spinner_1: 'none'
                 });
              }
            })
        }

        formatDate(date) {
            // //// console.log("date",new Date(date));
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

                    //  //// console.log(dt+'-' + month + '-'+year);
                     var new_date_1 = dt+'-' + month + '-'+year

                     var today = date;
                     let options_1 = {
                         hour: "2-digit", minute: "2-digit"
                     };

                    //  // console.log("lllllllllllllllllllllllllllll",today.toLocaleTimeString("en-us", options_1));
                                        var time_new =today.toLocaleTimeString("en-us", options_1)
                                        // // console.log("mt______________________________________________*********************",time_new);
                                        // // console.log("mt______________________________________________",new_date_1);

                                        var nre_time = time_new


                    return nre_time;
                  }

    render() {
        const obj_delivered = [
            {value : "1", label: 'Hourly'},
            {value : "2", label: 'Daily'},
            {value : "3", label: 'Monthly'},
            {value : "4", label: 'Quartly'},
            {value : "5", label: 'Half Yearly'},
            {value : "6", label: 'Yearly'},
        ]

        const { settings } = this.props;
        const customStyles = {
            control: (css, state) => {
                return {
                    ...css,
                    borderColor: state.isFocused ? 'rgba(114, 94, 195, 0.6)' : '#eaecf0',
                    '&:hover': {
                        borderColor: state.isFocused ? 'rgba(114, 94, 195, 0.6)' : '#eaecf0',
                    },
                    boxShadow: state.isFocused ? '0 0 0 0.2rem rgba(114, 94, 195, 0.2)' : '',
                };
            },
            option: (css, state) => {
                let bgc = '';

                if (state.isSelected) {
                    bgc = '#725ec3';
                } else if (state.isFocused) {
                    bgc = 'rgba(114, 94, 195, 0.2)';
                }

                return {
                    ...css,
                    backgroundColor: bgc,
                };
            },
            multiValueLabel: (css) => {
                return {
                    ...css,
                    color: '#545b61',
                    backgroundColor: '#eeeeef',
                };
            },
        }

        return (
            <Fragment>
                <PageTitle className="salary_page">
                    <div className="button_salary">
                    <h1>Salary Structure</h1>
                    <Button disabled={ this.state.master_control_12 =="false" ? 'disabled' : ''} color="warning" style={{color:"#fff",textTransform:"capitalize"}} onClick={this.toggle}>Add Salary</Button>
                    </div>
                </PageTitle>

               <Spinner color="warning" className="spinner_css_123456" style={{marginTop:gk,display: this.state.isLoading}}/>
               <div className="salary_show" style={{display: this.state.isLoading=="none" ? "block" :"none"}}>
                     <h3 style={{ display: this.state.no_data_message, padding: "15px",textAlign:"center",color:" #a4a3a3",width: "100%",marginTop:gk}}>No Data Found</h3>
                     <div className="" style={{display: this.state.no_data_message=="none" ? "block" :"none"}}>

                            <div className="row mar_gin">
                                <div className="col-lg-3 col-md-12 col-sm-12" style={{paddingRight:"0px"}}>
                                    <div className="height_13 mycalendar test_collapse" style={{height:my_height-57,display: this.state.ipad_emp_list}}>
                                    <Table striped className="">
                                    <thead>
                                    <tr>
                                        <th scope="col"  style={{ border: "none",padding:"10px 25px" }}>Template Name</th>
                                        <th scope="col"  style={{ border: "none",padding:"10px 25px" }}>Date</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.salary_array_new.map((value, index) => {
                                        return (
                                            <tr style={{ cursor: 'pointer' }} key={index} onClick={() => {
                                            this.setState({
                                                spinner_1: 'block',
                                                salary_id:value._id
                                            })
                                            setTimeout(() => {
                                                this.fetch_single_salary_structure(value._id)
                                            }, 10)
                                            }}
                                            >
                                            <td style={{ borderLeft: value._id == this.state.salary_id ? "5px solid  #8bc240" : " 0px", verticalAlign: "middle",padding:"10px 25px" }} >{value.template_name}</td>
                                            <td style={{ verticalAlign: "middle",padding:"10px 25px",whiteSpace:"nowrap" }} >
                                                <div>{value.date_show}</div>
                                                <div className="show_time_new">{value.start_time_new}</div>
                                            </td>
                                            </tr>
                                        )
                                        })
                                    }
                                    </tbody>
                                </Table>
                                </div>
                                </div>

                                <div className="col-lg-9 col-md-12 col-sm-12 " style={{display: device_width < 769 ? this.state.ipad_width : "block",paddingLeft:"0px"}}>
                                    <Spinner color="warning" className="employee_spinner_12" style={{ marginTop: gk, display: this.state.spinner_1 }} />
                                    <div  className="test_collapse mycalendar" style={{display:this.state.spinner_1=="none" ? "block":"none",height:my_height-57}}>

                                        {
                                            this.state.single_salary_array.map((value,index)=>{
                                                return(
                                                    <div className="show_single_data test_collapse" key={index}>
                                                        <div className="row padding_row_new">
                                                            <div className="col-lg-6 col-md-6">
                                                                <h3 style={{marginTop:"0px"}}>{value.template_name}</h3>
                                                           </div>
                                                            <div className="col-lg-6 col-md-6 button_div">
                                                            <Button disabled={this.state.master_control_12 =="false" ? 'disabled' : ''}  className="btn" color="success"
                                                                style={{marginRight:'10px',padding: '5px 6px',justifyContent:'center',textAlign:'center',textTransform:"capitalize" }}
                                                                onClick={() => {
                                                                    this.for_edit(value)
                                                                }}
                                                                >Update
                                                             </Button>
                                                            <Button  disabled={this.state.master_control_12 =="false" ? 'disabled' : ''} className="btn " color="danger"
                                                                style={{verticalAlign:"middle",padding: '5px 6px',justifyContent:'center',textAlign:'center',textTransform:"capitalize"}}
                                                                onClick={()=>{
                                                                this.setState({
                                                                AlertDelete:true,
                                                                salary_id:value._id
                                                                })}} > Delete
                                                             </Button>
                                                               <Button className="" style={{ marginLeft: "10px",  backgroundColor: '#007bff', borderColor: '#007bff',textTransform:"capitalize", display: device_width < 769 ? "inline-flex" : "none",verticalAlign:"middle",padding: '5px 6px',justifyContent:'center',textAlign:'center'}}
                                                                onClick={() => {
                                                                this.setState({
                                                                    ipad_emp_list:"block",
                                                                    ipad_width:"none"
                                                                })
                                                                }}>Back</Button>
                                                           </div>
                                                        </div>

                                                        <div className="inside_structure padding_row_new">
                                                                <h4 className="heading_data">Salary Structure</h4>
                                                            <Table striped bordered className="">
                                                                <thead>
                                                                <tr>
                                                                    <th scope="col"  style={{padding:"10px 25px" }}>Component Name</th>
                                                                    <th scope="col"  style={{padding:"10px 25px" }}>Amount</th>
                                                                    <th scope="col"  style={{padding:"10px 25px" }}>Percent</th>
                                                                    <th scope="col"  style={{padding:"10px 25px" }}>Interval</th>
                                                                    <th scope="col"  style={{padding:"10px 25px" }}>Deduction</th>
                                                                    <th scope="col"  style={{padding:"10px 25px" }}>PF</th>
                                                                    <th scope="col"  style={{padding:"10px 25px" }}>ESIC</th>
                                                                    <th scope="col"  style={{padding:"10px 25px" }}>PTEC</th>
                                                                    <th scope="col"  style={{padding:"10px 25px" }}>Bonus</th>
                                                                </tr>
                                                                </thead>
                                                                <tbody>
                                                                {
                                                                    value.components.map((value1, index1) => {
                                                                    return (
                                                                        <tr key={index1}>
                                                                            <td style={{verticalAlign: "middle",padding:"10px 25px" }} >{value1.component_name}</td>
                                                                            <td style={{verticalAlign: "middle",padding:"10px 25px",whiteSpace:"nowrap" }}>&#x20b9;{value1.amount}</td>
                                                                            <td style={{verticalAlign: "middle",padding:"10px 25px",whiteSpace:"nowrap" }}>{value1.percent}%</td>
                                                                            <td style={{verticalAlign: "middle",padding:"10px 25px",whiteSpace:"nowrap" }}>{value1.interval.label}</td>
                                                                            <td style={{verticalAlign: "middle",padding:"10px 25px",whiteSpace:"nowrap" }}>{value1.deducation == false ? "No" : "Yes"}</td>
                                                                            <td style={{verticalAlign: "middle",padding:"10px 25px",whiteSpace:"nowrap" }}>{value1.PF == true ? "Yes" : "No"}</td>
                                                                            <td style={{verticalAlign: "middle",padding:"10px 25px",whiteSpace:"nowrap" }}>{value1.ESIC == true ? "Yes" : "No"}</td>
                                                                            <td style={{verticalAlign: "middle",padding:"10px 25px",whiteSpace:"nowrap" }}>{value1.PTEC == true ? "Yes" : "No"}</td>
                                                                            <td style={{verticalAlign: "middle",padding:"10px 25px",whiteSpace:"nowrap" }}>{value1.bonus == false ? "No" : "Yes"}</td>
                                                                        </tr>
                                                                    )
                                                                    })
                                                                }
                                                                </tbody>
                                                            </Table>
                                                       </div>
                                                    </div>
                                                )
                                            })
                                        }

                                    </div>
                            </div>
                            </div>

                     </div>
                </div>






















                          <Modal
                            isOpen={this.state.modalOpen}
                            toggle={this.toggle}
                            className={this.props.className, "modal-dialog-centered material_model"}
                            fade
                            >
                            <div className="modal-header">
                                <h5 className="modal-title h2">{this.state.heading}</h5>
                                <Button className="close" color="" onClick={this.toggle}>
                                    <Icon name="x" />
                                </Button>
                            </div>
                            <ModalBody>
                            <div className="row">
                                    <div className="col-lg-3 col-md-4">
                                    <Label className="label_999">Template Name<span className="start_new_mark">*</span></Label>
                                        <Input type="text"
                                          className="form-control"
                                          placeholder="Template Name"
                                          value={this.state.template_name}
                                          onChange={(e) => { this.setState({ template_name: e.target.value }) }} />
                                    </div>
                             </div>
        {/* **************************   Dynamic Component *********************************************** */}
        <div className="top_down">
                      {this.state.salary_structure_array.map((value,index)=>{
                          return(
                            <div className="showinLineSalary list_data" key={index}>
                                    <div className="showsubdata">
                                    <Label className="label_999" style={{display: index==0 ? "inline-block" : "none"}}>Component Name<span className="start_new_mark">*</span></Label>
                                          <Input type="text"
                                          className={"margin_top form-control"}
                                          placeholder="Component Name"
                                          value={value.component_name}
                                          onChange={(e) => {this.send_component_name(e.target.value,index) }} />
                                    </div>
                                    <div className="showsubdata">
                                    <Label className="label_999" style={{display: index==0 ? "inline-block" : "none"}}>Amount<span className="start_new_mark">*</span></Label>
                                          <Input type="number"
                                          className={"margin_top form-control"}
                                          placeholder="Amount"
                                          value={value.amount}
                                          onChange={(e) => { this.send_amount(e.target.value,index) }} />
                                    </div>
                                    <div className="showsubdata">
                                    <Label className="label_999" style={{display: index==0 ? "inline-block" : "none"}}>Percent<span className="start_new_mark">*</span></Label>
                                          <Input type="number"
                                          className={"margin_top form-control"}
                                          placeholder="Percent"
                                          value={value.percent}
                                          onChange={(e) => {this.send_percent(e.target.value,index)}} />
                                    </div>
                                    <div className="showsubdata">
                                    <Label className="label_999 " style={{display: index==0 ? "inline-block" : "none"}}>Interval<span className="start_new_mark">*</span></Label>
                                    <Select
                                       value={value.interval}
                                       options={obj_delivered}
                                       styles={customStyles}
                                       onChange={(e) => { this.send_interval(e,index) }}
                                       className={"margin_top contact_sort"}
                                    />
                                    </div>
                                    <div className="showsubdataChecl">
                                    <Label className="label_999" style={{display: index==0 ? "inline-block" : "none"}}>Deduction</Label>
                                     <CustomInput type="checkbox"
                                        className={"margin_top large_checkkkk"}
                                        disabled = {value.bonus== true  ? true : false}
                                        checked={value.deducation== true ? true : false} id={"formCheckbox12"+index}
                                        onClick={(e) => {
                                            this.send_deducation(e.target.checked,index)
                                       }}
                                     />
                                    </div>
                                    <div className="showsubdataChecl pfdiv">
                                    <Label className="label_999" style={{display: index==0 ? "inline-block" : "none"}}>PF</Label>
                                     <CustomInput type="checkbox"
                                        className={"margin_top large_checkkkk"}
                                        disabled = {value.deducation == true && value.ESIC== false && value.PTEC ==false ? '' : 'disabled'}
                                        checked={value.PF== true  && value.deducation == true ? true : false} id={"formCheckboxPF12"+index}
                                        onClick={(e) => {
                                            this.send_PF(e.target.checked,index)
                                       }}
                                     />
                                    </div>
                                    <div className="showsubdataChecl">
                                    <Label className="label_999" style={{display: index==0 ? "inline-block" : "none"}}>ESIC</Label>
                                     <CustomInput type="checkbox"
                                        className={"margin_top large_checkkkk"}
                                        disabled = {value.deducation == true && value.PF== false && value.PTEC == false ? '' : 'disabled'}
                                        checked={value.ESIC== true && value.deducation == true ? true : false} id={"formCheckboxESIC12"+index}
                                        onClick={(e) => {
                                            this.send_ESIC(e.target.checked,index)
                                       }}
                                     />
                                    </div>
                                    <div className="showsubdataChecl">
                                    <Label className="label_999" style={{display: index==0 ? "inline-block" : "none"}}>PTEC</Label>
                                     <CustomInput type="checkbox"
                                        className={"margin_top large_checkkkk"}
                                        disabled = {value.deducation == true && value.PF== false && value.ESIC == false ? '' : 'disabled'}
                                        checked={value.PTEC== true && value.deducation == true ? true : false} id={"formCheckboxPTEC12"+index}
                                        onClick={(e) => {
                                            this.send_PTEC(e.target.checked,index)
                                       }}
                                     />
                                    </div>

                                    <div className="showsubdataChecl">
                                    <Label className="label_999" style={{display: index==0 ? "inline-block" : "none"}}>Bonus</Label>
                                     <CustomInput type="checkbox"
                                        className={"margin_top large_checkkkk"}
                                        disabled = {value.deducation== true  ? true : false}
                                        checked={value.bonus== true ? true : false} id={"formCheckboxBonus12"+index}
                                        onClick={(e) => {
                                            this.send_bonus(e.target.checked,index)
                                       }}
                                     />
                                    </div>
                                    <div className="showsubdataButton min_icon_new" style={{marginTop:index==0 ? "25px" : ""}}>
                                    <button type="button" className="btn btn-brand btn-uniform margin_top_add btn-round btn-sm delete_btn"
                                        style={{background:"#32bfc8",borderColor:"#32bfc8"}}
                                         onClick={() => this.delete_fields_salary(value)}>
                                         <Icon name="x" style={{marginRight:"1px"}} stroke-width="2.5"/>
                                      </button>
                                    </div>
                                </div>
                                  )
                                })}
        {/* **************************   Static Component *********************************************** */}
                                <div className=" showinLineSalary list_data">
                                    <div className="showsubdata">
                                    <Label className="label_999" style={{display:this.state.salary_structure_array.length >= 1 ? "none":"inline-block"}}>Component Name<span className="start_new_mark">*</span></Label>
                                          <Input type="text"
                                          className="form-control"
                                          placeholder="Component Name"
                                          value={this.state.component_name}
                                          onChange={(e) => { this.setState({ component_name: e.target.value,message_error:"" }) }} />
                                    </div>
                                    <div className="showsubdata">
                                    <Label className="label_999" style={{display:this.state.salary_structure_array.length >= 1 ? "none":"inline-block"}}>Amount<span className="start_new_mark">*</span></Label>
                                          <Input type="number"
                                          className="form-control"
                                          placeholder="Amount"
                                          value={this.state.amount}
                                          onChange={(e) => { this.setState({ amount: e.target.value,message_error:"" }) }} />
                                    </div>
                                    <div className="showsubdata">
                                    <Label className="label_999" style={{display:this.state.salary_structure_array.length >= 1 ? "none":"inline-block"}}>Percent<span className="start_new_mark">*</span></Label>
                                          <Input type="number"
                                          className="form-control"
                                          placeholder="Percent"
                                          value={this.state.percent}
                                          onChange={(e) => { this.setState({ percent: e.target.value,message_error:"" }) }} />
                                    </div>
                                    <div className="showsubdata">
                                    <Label className="label_999" style={{display:this.state.salary_structure_array.length >= 1 ? "none":"inline-block"}}>Interval<span className="start_new_mark">*</span></Label>
                                    <Select
                                       value={this.state.interval}
                                       options={obj_delivered}
                                       styles={customStyles}
                                       onChange={(e) => {
                                           this.setState({ interval: e,message_error:"" })
                                        //    this.sub_add_feild(e)
                                         }}
                                         className="contact_sort"
                                    />
                                    </div>
                                    <div className="showsubdataChecl">
                                    <Label className="label_999" style={{display:this.state.salary_structure_array.length >= 1 ? "none":"inline-block"}}>Deduction</Label>
                                     <CustomInput type="checkbox"
                                        className="large_checkkkk"
                                        disabled = {this.state.bonus== true  ? true : false}
                                        checked={this.state.deducation== true ? true : false} id="formCheckbox12"
                                        onClick={(e) => {
                                            console.log(e.target.checked);
                                            if (e.target.checked == false) {
                                                this.setState({
                                                    PF:false,
                                                    ESIC:false,
                                                    PTEC:false,
                                                })
                                            }
                                         this.setState({
                                            deducation: e.target.checked
                                        })
                                       }}
                                     />
                                    </div>

                                        <div className="showsubdataChecl pfdiv" >
                                        <Label className="label_999" style={{display:this.state.salary_structure_array.length >= 1 ? "none":"inline-block"}}>PF</Label>
                                         <CustomInput type="checkbox"
                                            className="large_checkkkk"
                                            disabled = {this.state.deducation == true && this.state.ESIC== false && this.state.PTEC == false ? '' : 'disabled'}
                                            checked={this.state.PF== true && this.state.deducation == true ? true : false} id="formCheckboxPF12"
                                            onClick={(e) => {
                                             this.setState({
                                                PF: e.target.checked
                                            })
                                           }}
                                         />
                                        </div>
                                        <div className="showsubdataChecl">
                                        <Label className="label_999" style={{display:this.state.salary_structure_array.length >= 1 ? "none":"inline-block"}}>ESIC</Label>
                                         <CustomInput type="checkbox"
                                            className="large_checkkkk"
                                            disabled = {this.state.deducation == true && this.state.PF== false && this.state.PTEC == false ? '' : 'disabled'}
                                            checked={this.state.ESIC== true && this.state.deducation == true  ? true : false} id="formCheckboxESIC12"
                                            onClick={(e) => {
                                             this.setState({
                                                ESIC: e.target.checked
                                            })
                                           }}
                                         />
                                        </div>
                                        <div className="showsubdataChecl">
                                        <Label className="label_999" style={{display:this.state.salary_structure_array.length >= 1 ? "none":"inline-block"}}>PTEC</Label>
                                         <CustomInput type="checkbox"
                                            className="large_checkkkk"
                                            disabled = {this.state.deducation == true && this.state.PF== false && this.state.ESIC == false ? '' : 'disabled'}
                                            checked={this.state.PTEC== true && this.state.deducation == true  ? true : false} id="formCheckboxPTEC12"
                                            onClick={(e) => {
                                             this.setState({
                                                PTEC: e.target.checked
                                            })
                                           }}
                                         />
                                        </div>

                                    <div className="showsubdataChecl">
                                    <Label className="label_999" style={{display:this.state.salary_structure_array.length >= 1 ? "none":"inline-block"}}>Bonus</Label>
                                     <CustomInput type="checkbox"
                                        className="large_checkkkk"
                                        disabled = {this.state.deducation== true  ? true : false}
                                        checked={this.state.bonus== true ? true : false} id="formCheckboxBnus12"
                                        onClick={(e) => {
                                         this.setState({
                                            bonus: e.target.checked
                                        })
                                       }}
                                     />
                                    </div>
                                    <div className="showsubdataButton plus_icon_new">
                                    <button type="button" className="btn btn-brand margin_top_add btn-uniform "
                                      style={{background:"#32bfc8",borderColor:"#32bfc8"}}
                                        onClick={() => this.add_fields_salary(this.state.salary_structure_array.length + 1)}>
                                         <Icon name="plus" stroke-width="2.5" />
                                          </button>
                                    </div>


                                </div>
                                <div className="">
                                        <p className="message_error">{this.state.message_error}</p>
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="secondary" onClick={this.toggle}>Close</Button>
                                {' '}
                                <Button color="warning" disabled={this.state.loading || this.state.master_control_12 =="false" ? 'disabled' : ''} style={{color:"#fff"}} onClick={this.switch_function}>{this.state.button_salary}
                                { this.state.loading ? (
                                    <Spinner />
                                ) : '' }
                                </Button>
                            </ModalFooter>
                        </Modal>


                        <Modal
                        style={{ width: '350px', height: 'auto', justifyContent: 'center', textAlign: 'center', alignItem: 'center', marginTop: '200px' }}
                        isOpen={this.state.AlertDelete}
                        toggle={this.AlertDelete}
                        className={this.props.className, "del_model"}
                        fade
                    >
                    <ModalBody>
                        <div style={{ width: '100%', height: '20px' }}>
                            <Button className="close" style={{ float: 'right' }} color="" onClick={this.AlertDelete}>
                                <Icon name="x" />
                            </Button>
                        </div>
                        <div style={{ width: '100%', height: '50px' }}>
                            <p >Are you sure you want to Delete ?</p>

                        </div>
                        <div style={{ height: '50px', width: '100%' }}>
                        <Button color="secondary" style={{marginRight: "20px",textTransform:"capitalize"}} onClick={this.AlertDelete}>no</Button> {'             '}
                            <Button disabled={this.state.loading ||  this.state.master_control_12 =="false" ? 'disabled' : ''} color="warning"
                                style={{ textTransform:"capitalize",color:"#fff" }}
                                onClick={() => {
                                    this.delete_salary_structure(this.state.salary_id)
                                }}
                            >yes{this.state.loading ? (
                                <Spinner />
                            ) : ''}</Button>


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
) , { addToast: actionAddToast })( Content );

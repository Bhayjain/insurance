
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import './style.scss';
import Select from 'react-select';
import { Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap";
import { Badge, Button, Table, Spinner,CustomInput,Label } from 'reactstrap';
import PageTitle from '../../components/page-title';
import Snippet from '../../components/snippet';
import {
    addToast as actionAddToast,
} from '../../actions';
import Cookies from 'js-cookie';
import Icon from '../../components/icon';
import Tabs from '../../components/tabs';
import Dropzone from '../../components/dropzone';

const device_width =   window.innerWidth;
var height =   window.innerHeight;
//console.log("admin_screen.height", height);
const nav_height = document.querySelector('.rui-navbar-sticky').offsetHeight
//console.log("admin_nav_height",nav_height);
var my_height = height - nav_height;
var gk = (my_height/2);
//console.log("admin_gk",gk);
if(device_width < 600){
  var gk = (my_height/2) - 50;
}

import Dropdown from '../../components/bs-dropdown';

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
       car_brand_array: [],
       car_brand:'',
       car_brand_id:'',
       button_for_car: "Add Car Brand",
       button_for_bike: "Add Bike Brand",
       isLoading: "block",
       no_data:"none",
       master_control_12:Cookies.get('master_control'),
       show_erroe_data:"none",
       activeTab2: 'home',
       modalOn_for_car:false,
       modalOn_for_bike:false,
       isLoading_for_bike:"none",
       no_data_for_bike:"none",
       bike_brand_array:[],
       car_brand_single_array: [],
       isLoading_single:"none",
       ipad_width:"none",
       ipad_emp_list:"block",




       car_brand_array: [],
       car_brand:'',
       car_brand_id:'',
       button_for_car_model: "Save Car Model",
       button_for_bike_model: "Save Bike Model",
       heading_for_bike: "Add Bike Model",
       heading_for_car:"Add Car Model",
       isLoading: "block",
       no_data:"none",
       master_control_12:Cookies.get('master_control'),
       show_erroe_data:"none",
       activeTab2: 'home',
       modalOn_for_car_model:false,
       modalOn_for_bike_model:false,
       isLoading_for_bike:"none",
       no_data_for_bike:"none",
       bike_brand_array:[],
       add_rto_model:false,
       add_rto_model_for_bike:false,
       car_model_array:[],
       checkedBoxes: [],
       delete_type:"",
       car_model_id:"",
       status_bike:0,
       bike_model_array:[],
       checkedBoxes_bike: [],
       delete_type_bike:"",
       bike_model_id:"",
       file_array: [],
       search_car_model:"",
       search_bike_model:"",
       bike_brand_single_array:[],
       ipad_width_bike:"none",
       ipad_emp_list_bike:"block",
    };

    this.fetch_all_car_brand();
    this.add_car_brand = this.add_car_brand.bind(this);
    this.button_Call_for_car = this.button_Call_for_car.bind(this);
    this.button_Call_for_bike = this.button_Call_for_bike.bind(this);
    this.deleter_for_car = this.deleter_for_car.bind(this);
    this.deleter_for_bike = this.deleter_for_bike.bind(this);
    this.delete_car_brand = this.delete_car_brand.bind(this);
    this.update_car_brand = this.update_car_brand.bind(this);
    this.toggleTab = this.toggleTab.bind( this );
}

toggleTab( num, name ) {
    this.setState( {
        [ `activeTab${ num }` ]: name,
    } );
    //console.log("name",name);
    if (name == "profile") {
        this.setState({
       isLoading_for_bike: 'block'
      })
        setTimeout(() => {
         this.fetch_all_bike_brand()
     }, 600)
    }
    else{
     this.setState({
    isLoading: 'block'
    })
    setTimeout(() => {
     this.fetch_all_car_brand()
     }, 600)
    }
}

button_Call_for_car() {
    if (this.state.button_for_car == "Add Car Brand") {
        this.add_car_brand();
    }
    else {
        this.update_car_brand();
    }
}
button_Call_for_bike() {
    if (this.state.button_for_bike == "Add Bike Brand") {
        this.add_bike_brand();
    }
    else {
        this.update_bike_brand();
    }
}


add_rto_model=() =>{
    //console.log("car_brand_id",this.state.car_brand_id);
    this.setState((preState) => ({
        add_rto_model: !preState.add_rto_model,
        button_for_car_model: "Save Car Model",
        car_model_data:"",
        car_brand_data: '',
        heading_for_car:"Add Car Model",
        status:0,
    }));
}
add_rto_model_for_bike=()=> {
    this.setState((preState) => ({
        add_rto_model_for_bike: !preState.add_rto_model_for_bike,
        button_for_bike_model: "Save Bike Model",
        bike_model_data:"",
        bike_brand_data: '',
        heading_for_bike:"Add Bike Model",
        status_bike:0,
    }));
}

button_Call_for_car_model=()=> {
    if (this.state.button_for_car_model == "Save Car Model") {
        this.add_car_model();
    }
    else {
        this.update_car_model();
    }
}
button_Call_for_bike_model=() =>{
    if (this.state.button_for_bike_model == "Save Bike Model") {
        this.add_bike_model();
    }
    else {
        this.update_bike_model();
    }
}

deleter_for_car() {
       this.setState((preState) => ({
           modalOn_for_car: !preState.modalOn_for_car,
       }));
   }
deleter_for_bike() {
       this.setState((preState) => ({
           modalOn_for_bike: !preState.modalOn_for_bike,
       }));
   }

deleter_for_car_model=()=> {
    //console.log("hgvhgvhgvhg");
    this.setState((preState) => ({
        modalOn_for_car_model: !preState.modalOn_for_car_model,
    }));
}
deleter_for_bike_model=()=>{
    this.setState((preState) => ({
        modalOn_for_bike_model: !preState.modalOn_for_bike_model,
    }));
}
   radioHandler = (status) => {
    //console.log("status",status);
  this.setState({ status });
};

///////////////////////////////////////////////////***************** fetch All Car Brand**************************////////////////////////////////



fetch_all_car_brand = (search_car_brand)=>  {
 var params={
       search: search_car_brand
        }
   //console.log("Car Brand params",params);
   const { settings } = this.props;
    const res = fetch(settings.api_url + "fetch_all_car_brand", {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        }
    }).then((response) => response.json())
        .then(json => {
            //console.log("fetch Car Brand ****", json)
            var data = json;
            if (data.status == true) {
                this.setState({
                    car_brand_array: data.data,
                    isLoading:"none",
                    no_data:"none",
                    total_pages:data.total_pages,
                    total: data.total,
                });
                if (device_width < 769) {
                    //console.log("display lisit none");
                   }
                   else{
                    this.fetch_single_car_brand(data.data[0]._id)
                   }

            }
            else {
                this.setState({
                    car_brand_array: [],
                    no_data:"block",
                    isLoading:"none",

                });
                //console.log("something wrong");
            }
        })
}
fetch_single_car_brand = (car_brand_id)=>  {
 var params={
       brand_id: car_brand_id
        }
   //console.log("Single Car Brand params",params);
   const { settings } = this.props;
    const res = fetch(settings.api_url + "fetch_single_car_brand", {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        }
    }).then((response) => response.json())
        .then(json => {
            //console.log("fetch Single Car Brand Response ****", json)
            var data = json;
            if (data.status == true) {
                if (device_width < 769) {
                    var ipad_emp_list = "none";
                    //console.log("display lisit none", ipad_emp_list);
                   }
                   else{
                   var ipad_emp_list = "block"
                   //console.log("display lisit");

                   }
                var select_data = {
                    "value":data.data[0]._id,
                    "label":data.data[0].brand
                }
                if (data.data[0].model_data.length==0) {
                    var model_data=[]
                }
                else{
                    var model_data=data.data[0].model_data
                }
                //console.log("model_data",model_data);
                this.setState({
                    car_brand_single_array: data.data,
                    car_brand_id:data.data[0]._id,
                    car_model_array:model_data,
                    brand_data:select_data,
                    isLoading_single:"none",
                    ipad_width:"block",
                    ipad_emp_list:ipad_emp_list
                });
            }
            else {
                this.setState({
                    car_brand_single_array: [],
                    isLoading_single:"none",

                });
                //console.log("something wrong");
            }
        })
}


///////////////////////////////////////////////////***************** ADD CAR BRAND***************************////////////////////////////////

add_car_brand() {
      const {
          addToast,settings
      } = this.props;

      var params = {
        brand: this.state.car_brand,
      }
      //console.log("Add Car Brand Params", params);
      if (params.brand == "" || params.brand == undefined) {
          alert("Please Fill all fields")
      }
      else {
          const res = fetch(settings.api_url + "add_car_brand", {
              method: 'POST',
              body: JSON.stringify(params),
              headers: {
                  "Content-type": "application/json; charset=UTF-8",
              }
          }).then((response) => response.json())
              .then(json => {
                  //console.log("Add Car Brand **************************************", { params: params, response: json })
                  var data = json;
                  if (data.status == true) {
                      addToast({
                          title: 'Add my policy',
                          content: data["message"],
                          time: new Date(),
                          duration: 1000,
                      });
                      this.setState({
                        car_brand: '',
                      });
                      this.fetch_all_car_brand();
                  }
                  else {
                      addToast({
                          title: 'Add my policy',
                          content: data["message"],
                          time: new Date(),
                          duration: 1000,
                      });
                      //console.log("something wrong");
                  }
              })
      }

  }

////////////////////////////////////////**************** DELETE CAR BRAND **************************/////////////////////////////

delete_car_brand(car_brand_id) {
      const {
          addToast,settings
      } = this.props;

      var params = {
        brand_id: car_brand_id,
      }
      //console.log("params delete", params);
      const res = fetch(settings.api_url + "delete_car_brand", {
          method: 'POST',
          body: JSON.stringify(params),
          headers: {
              "Content-type": "application/json; charset=UTF-8",
          }
      }).then((response) => response.json())
          .then(json => {
              //console.log("Delete Car Brand ********", { params: params, response: json })
              var data = json;
                this.setState({ delete:data["status"] });
              if (data.status == true) {
                  addToast({
                      title: 'Add my policy',
                      content: data["message"],
                      time: new Date(),
                      duration: 1000,
                  });
                  this.setState({
                    modalOn_for_car:false
                  })
                  this.fetch_all_car_brand();
              }
              else {
                  addToast({
                      title: 'Add my policy',
                      content: data["message"],
                      time: new Date(),
                      duration: 1000,
                  });
                  this.setState({
                    modalOn_for_car:false
                  })
                  //console.log("something wrong");
              }
          })
  }

  ///////////////////////////////////********************EDIT CAR BRAND FUNCTIONALITY *******************************////////////////////////

  for_edit_car_brand(value) {
      this.setState({
          button_for_car: "Update Car Brand",
          car_brand: value.brand,
          car_brand_id: value._id,
      })
  }

  update_car_brand() {
      const {
          addToast,settings
      } = this.props;

      var params = {
        brand_id: this.state.car_brand_id,
        brand:this.state.car_brand,
      }
      //console.log("Car brand edittttttttttt", params);
      if (params.brand == "" || params.brand == undefined) {
        alert("Please Fill all fields")
    }
    else { const res = fetch(settings.api_url + "update_car_brand", {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        }
    }).then((response) => response.json())
        .then(json => {
            //console.log("Edit Car Brand *************", { params: params, response: json })
            var data = json;
            if (data.status == true) {
                addToast({
                    title: 'Add my policy',
                    content: data["message"],
                    time: new Date(),
                    duration: 1000,
                });

                this.setState({
                    button_for_car: "Add Car Brand",
                    car_brand: ''
                });
                this.fetch_all_car_brand();
            }
            else {
                addToast({
                    title: 'Add my policy',
                    content: data["message"],
                    time: new Date(),
                    duration: 1000,
                });
                this.setState({
                    button_for_car: "Add Car Brand",
                    car_brand: ''
                });
                //console.log("something wrong");
            }
        })}

  }




  ///////////////////////////////////////////////////***************** ADD CAR Model***************************////////////////////////////////

add_car_model() {
    const {
        addToast,settings
    } = this.props;
    var params = {
        model:this.state.car_model_data,
        brand_id:this.state.car_brand_id,
        brand_data:this.state.brand_data
    }
    //console.log("Add Car Model Params", params);
    if (params.model == "" || params.model == undefined ) {
        alert("Please Fill all fields")
    }
    else {
        const res = fetch(settings.api_url + "add_car_model", {
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        }).then((response) => response.json())
            .then(json => {
                //console.log("Add Car Model **************************************", { params: params, response: json })
                var data = json;
                if (data.status == true) {
                    addToast({
                        title: 'Add my policy',
                        content: data["message"],
                        time: new Date(),
                        duration: 1000,
                    });
                    this.setState({
                      add_rto_model:false,
                      button_for_car_model: "Save Car Model",
                      car_model_data:"",
                      car_brand_data: '',
                      heading_for_car:"Add Car Model"
                    });
                    this.fetch_single_car_brand(this.state.car_brand_id)
                }
                else {
                    addToast({
                        title: 'Add my policy',
                        content: data["message"],
                        time: new Date(),
                        duration: 3000,
                    });
                    this.setState({
                        add_rto_model:false,
                        button_for_car_model: "Save Car Model",
                        car_model_data:"",
                        car_brand_data: '',
                        heading_for_car:"Add Car Model"
                      });
                    //console.log("something wrong");
                }
            })
    }

  }

////////////////////////////////////////**************** DELETE CAR MODEL **************************/////////////////////////////
toggleCheckbox = (e, item,multiple) => {
    //console.log("e.target.checked",e.target.checked);
    //console.log("arrmultiplearr",multiple);
  //   //console.log("item",item);

if(e.target.checked) {
    let arr = this.state.checkedBoxes;
    arr.push(item._id);
    //console.log("arr++++++++++",arr);
    this.setState({
    checkedBoxes: arr,
    delete_type:multiple
    })
} else {
    let items = this.state.checkedBoxes.splice(this.state.checkedBoxes.indexOf(item._id), 1);
    //console.log("items",items);
    this.setState = {
        checkedBoxes: items
    }
}

//console.log(this.state.checkedBoxes);

}

delete_car_model(car_model_id) {
      const {
          addToast,settings
      } = this.props;
        if (this.state.delete_type=="single") {
            var params = {
                model_id:car_model_id,
                delete_type:"single"
            }
        }
        else{
            var params = {
                model_id:this.state.checkedBoxes,
                delete_type:"multiple"
            }
        }
      //console.log("params delete", params);
      const res = fetch(settings.api_url + "delete_car_model", {
          method: 'POST',
          body: JSON.stringify(params),
          headers: {
              "Content-type": "application/json; charset=UTF-8",
          }
      }).then((response) => response.json())
          .then(json => {
              //console.log("Delete Car Model ********", { params: params, response: json })
              var data = json;
                this.setState({ delete:data["status"] });
              if (data.status == true) {
                  addToast({
                      title: 'Add my policy',
                      content: data["message"],
                      time: new Date(),
                      duration: 1000,
                  });
                  this.setState({
                    modalOn_for_car_model:false,
                    delete_type:""
                  })
                  this.fetch_single_car_brand(this.state.car_brand_id)
                //   this.fetch_all_car_brand();
                // this.fetch_all_car_model()
              }
              else {
                  addToast({
                      title: 'Add my policy',
                      content: data["message"],
                      time: new Date(),
                      duration: 1000,
                  });
                  this.setState({
                    modalOn_for_car_model:false
                  })
                  //console.log("something wrong");
              }
          })
  }

  ///////////////////////////////////********************EDIT CAR Model FUNCTIONALITY *******************************////////////////////////

  for_edit_car_model(value) {
    this.setState({
        add_rto_model:true,
        button_for_car_model: "Update Car Model",
        heading_for_car: "Edit Car Model",
        car_brand_data: value.brand_data,
        car_model_id: value._id,
        car_model_data: value.model,
        status:1
    })
  }

  update_car_model() {
    const {
        addToast,settings
    } = this.props;
    var brand_id = this.state.car_brand_data
    if (brand_id=="" || brand_id==undefined) {
        var brand_id_data = ""
    }
    else{
        var brand_id_data = brand_id.value
    }
    //console.log("brand_id_data",brand_id_data);
    var params = {
        model:this.state.car_model_data,
        model_id:this.state.car_model_id,
        brand_id:brand_id_data,
        brand_data:brand_id
    }

    //console.log("Car Model Edit Params", params);
    if (params.model == "" || params.model == undefined) {
      alert("Please Fill all fields")
  }
  else { const res = fetch(settings.api_url + "update_car_model", {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
          "Content-type": "application/json; charset=UTF-8",
      }
  }).then((response) => response.json())
      .then(json => {
          //console.log("Edit Car Model *************", { params: params, response: json })
          var data = json;
          if (data.status == true) {
              addToast({
                  title: 'Add my policy',
                  content: data["message"],
                  time: new Date(),
                  duration: 1000,
              });

              this.setState({
                  add_rto_model:false,
                  button_for_car_model: "Save Car Model",
                  car_model_data:"",
                  car_brand_data: '',
                  heading_for_car:"Add Car Model"
                });
                this.fetch_single_car_brand(this.state.car_brand_id)
                // this.fetch_all_car_model()
            //   this.fetch_all_rto();
          }
          else {
              addToast({
                  title: 'Add my policy',
                  content: data["message"],
                  time: new Date(),
                  duration: 1000,
              });

              //console.log("something wrong");
          }
      })}

  }
  add_car_model_excel = () => {
    const { settings, addToast } = this.props;
    var fd = new FormData();
    var data = this.state.file_array[0];
    //console.log("data", data);

    if (this.state.file_array[0] == undefined) {
        //console.log("undefined");
    }
    else {
        var nameArr = this.state.file_array[0].type.split('/');
        //console.log("nameArr",nameArr);
    }
       //console.log("nameArr_____________",nameArr);

        fd.append('file_name', data);


         //console.log(...fd, "Add Car Model Excel Data")
        const res = fetch(settings.api_url + "add_car_model_excel", {
        method: 'POST',
        body: fd
    })
        .then((response) => response.json())
        .then(json => {
            //console.log("Car Model Execl Data Response", json);
            if (json.status == true) {
                this.fetch_single_car_brand(this.state.car_brand_id)
              addToast({
                  title: 'Add my policy',
                  content: data["message"],
                  time: new Date(),
                  duration: 1000,
              });
                this.setState({
                  add_rto_model:false,
                })


            } else {
                //console.log("something went wrong");
                this.fetch_single_car_brand(this.state.car_brand_id)
            }

        })
}







//   **********************************************************************************************************************************************************************************************************************************************************************************************
///////////////////////////////////////////////////***************** fetch All Car Brand**************************////////////////////////////////



fetch_all_bike_brand = (search_bike_brand)=>  {
        var params={
          search: search_bike_brand
         }
         //console.log("Bike Brand Param",params);
       const { settings } = this.props;
        const res = fetch(settings.api_url + "fetch_all_bike_brand", {
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        }).then((response) => response.json())
            .then(json => {
                //console.log("fetch Bike Brand ****", json)
                var data = json;
                if (data.status == true) {
                    this.setState({
                        bike_brand_array: data.data,
                        isLoading_for_bike:"none",
                        no_data_for_bike:"none",
                    });
                    if (device_width < 769) {
                        //console.log("display lisit none");
                      }
                     else{
                        this.fetch_single_bike_brand(data.data[0]._id)
                       }
                }
                else {
                    this.setState({
                        bike_brand_array: [],
                        isLoading_for_bike:"none",
                        no_data_for_bike:"block",

                    });
                    //console.log("something wrong");
                }
            })
    }

    fetch_single_bike_brand = (bike_brand_id)=>  {
        var params={
              brand_id: bike_brand_id
               }
          //console.log("Single Bike Brand params",params);
          const { settings } = this.props;
           const res = fetch(settings.api_url + "fetch_single_bike_brand", {
               method: 'POST',
               body: JSON.stringify(params),
               headers: {
                   "Content-type": "application/json; charset=UTF-8",
               }
           }).then((response) => response.json())
               .then(json => {
                   //console.log("fetch Single Car Brand Response ****", json)
                   var data = json;
                   if (data.status == true) {
                    if (device_width < 769) {
                        var ipad_emp_list_bike = "none";
                        //console.log("display lisit none", ipad_emp_list_bike);
                       }
                       else{
                       var ipad_emp_list_bike = "block"
                       //console.log("display lisit");

                       }
                       var select_data = {
                           "value":data.data[0]._id,
                           "label":data.data[0].brand
                       }
                       if (data.data[0].model_data.length==0) {
                           var model_data=[]
                       }
                       else{
                           var model_data=data.data[0].model_data
                       }
                       //console.log("model_data",model_data);
                       this.setState({
                           bike_brand_single_array: data.data,
                           bike_brand_id:data.data[0]._id,
                           bike_model_array:model_data,
                           brand_data_bike:select_data,
                           isLoading_single_bike:"none",
                           ipad_width_bike:"block",
                           ipad_emp_list_bike:ipad_emp_list_bike
                       });
                   }
                   else {
                       this.setState({
                           bike_brand_single_array: [],
                           isLoading_single_bike:"none",

                       });
                       //console.log("something wrong");
                   }
               })
       }

    ///////////////////////////////////////////////////***************** ADD Bike BRAND***************************////////////////////////////////

    add_bike_brand() {
    const {
        addToast,settings
    } = this.props;

    var params = {
      brand: this.state.bike_brand,
    }
    //console.log("Add Bike Brand Params", params);
    if (params.brand == "" || params.brand == undefined) {
        alert("Please Fill all fields")
    }
    else {
        const res = fetch(settings.api_url + "add_bike_brand", {
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        }).then((response) => response.json())
            .then(json => {
                //console.log("Add Bike Brand **************************************", { params: params, response: json })
                var data = json;
                if (data.status == true) {
                    addToast({
                        title: 'Add my policy',
                        content: data["message"],
                        time: new Date(),
                        duration: 1000,
                    });
                    this.setState({
                        button_for_bike: "Add Bike Brand",
                        bike_brand: ''
                    });
                    this.fetch_all_bike_brand();
                }
                else {
                    this.setState({
                        button_for_bike: "Add Bike Brand",
                        bike_brand: ''
                    });
                    addToast({
                        title: 'Add my policy',
                        content: data["message"],
                        time: new Date(),
                        duration: 1000,
                    });
                    //console.log("something wrong");
                }
            })
    }

}

  ///////////////////////////////////********************EDIT CAR BRAND FUNCTIONALITY *******************************////////////////////////

  for_edit_bike_brand(value) {
    this.setState({
        button_for_bike: "Update Bike Brand",
        bike_brand: value.brand,
        bike_brand_id: value._id,
    })
}

update_bike_brand() {
    const {
        addToast,settings
    } = this.props;

    var params = {
      brand_id: this.state.bike_brand_id,
      brand:this.state.bike_brand,
    }
    //console.log("Bike brand edittttttttttt", params);
    if (params.brand == "" || params.brand == undefined) {
      alert("Please Fill all fields")
  }
  else { const res = fetch(settings.api_url + "update_bike_brand", {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
          "Content-type": "application/json; charset=UTF-8",
      }
  }).then((response) => response.json())
      .then(json => {
          //console.log("Edit Bike Brand *************", { params: params, response: json })
          var data = json;
          if (data.status == true) {
              addToast({
                  title: 'Add my policy',
                  content: data["message"],
                  time: new Date(),
                  duration: 1000,
              });

              this.setState({
                  button_for_bike: "Add Bike Brand",
                  bike_brand: ''
              });
              this.fetch_all_bike_brand();
            //   this.fetch_single_bike_brand(this.state.bike_brand_id)
          }
          else {
              addToast({
                  title: 'Add my policy',
                  content: data["message"],
                  time: new Date(),
                  duration: 1000,
              });
              this.setState({
                  button_for_bike: "Add Bike Brand",
                  bike_brand: ''
              });
              //console.log("something wrong");
          }
      })}

}


////////////////////////////////////////**************** DELETE BIKE BRAND **************************/////////////////////////////

delete_bike_brand(bike_brand_id) {
    const {
        addToast,settings
    } = this.props;

    var params = {
      brand_id: bike_brand_id,
    }
    //console.log("params delete", params);
    const res = fetch(settings.api_url + "delete_bike_brand", {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        }
    }).then((response) => response.json())
        .then(json => {
            //console.log("Delete Bike Brand ********", { params: params, response: json })
            var data = json;
              this.setState({ delete:data["status"] });
            if (data.status == true) {
                addToast({
                    title: 'Add my policy',
                    content: data["message"],
                    time: new Date(),
                    duration: 1000,
                });
                this.setState({
                  modalOn_for_bike:false
                })
                this.fetch_all_bike_brand();
            }
            else {
                addToast({
                    title: 'Add my policy',
                    content: data["message"],
                    time: new Date(),
                    duration: 1000,
                });
                this.setState({
                  modalOn_for_bike:false
                })
                //console.log("something wrong");
            }
        })
}




 ///////////////////////////////////////////////////***************** ADD Bike Model***************************////////////////////////////////

 add_bike_model() {
    const {
        addToast,settings
    } = this.props;
    var params = {
        model:this.state.bike_model_data,
        brand_id:this.state.bike_brand_id,
        brand_data:this.state.brand_data_bike
    }
    //console.log("Add Bike Model Params", params);
    if (params.model == "" || params.model == undefined ) {
        alert("Please Fill all fields")
    }
    else {
        const res = fetch(settings.api_url + "add_bike_model", {
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        }).then((response) => response.json())
            .then(json => {
                //console.log("Add Car Bike **************************************", { params: params, response: json })
                var data = json;
                if (data.status == true) {
                    addToast({
                        title: 'Add my policy',
                        content: data["message"],
                        time: new Date(),
                        duration: 1000,
                    });
                    this.setState({
                      add_rto_model_for_bike:false,
                      button_for_bike_model: "Save Bike Model",
                      bike_model_data:"",
                      bike_brand_data: '',
                      heading_for_bike:"Add Bike Model"
                    });
                    this.fetch_single_bike_brand(this.state.bike_brand_id)
                }
                else {
                    addToast({
                        title: 'Add my policy',
                        content: data["message"],
                        time: new Date(),
                        duration: 3000,
                    });
                    this.setState({
                        add_rto_model_for_bike:false,
                        button_for_bike_model: "Save Bike Model",
                        bike_model_data:"",
                        bike_brand_data: '',
                        heading_for_bike:"Add Bike Model"
                      });
                    //console.log("something wrong");
                }
            })
    }

  }

////////////////////////////////////////**************** DELETE CAR Model **************************/////////////////////////////

delete_bike_model(bike_model_id) {
      const {
          addToast,settings
      } = this.props;
        if (this.state.delete_type_bike=="single") {
            var params = {
                model_id:bike_model_id,
                delete_type:"single"
            }
        }
        else{
            var params = {
                model_id:this.state.checkedBoxes_bike,
                delete_type:"multiple"
            }
        }
      //console.log("params bike delete", params);
      const res = fetch(settings.api_url + "delete_bike_model", {
          method: 'POST',
          body: JSON.stringify(params),
          headers: {
              "Content-type": "application/json; charset=UTF-8",
          }
      }).then((response) => response.json())
          .then(json => {
              //console.log("Delete Bike Model ********", { params: params, response: json })
              var data = json;
                this.setState({ delete:data["status"] });
              if (data.status == true) {
                  addToast({
                      title: 'Add my policy',
                      content: data["message"],
                      time: new Date(),
                      duration: 1000,
                  });
                  this.setState({
                    modalOn_for_bike_model:false,
                    delete_type_bike:""
                  })
                  this.fetch_single_bike_brand(this.state.bike_brand_id)
              }
              else {
                  addToast({
                      title: 'Add my policy',
                      content: data["message"],
                      time: new Date(),
                      duration: 1000,
                  });
                  this.setState({
                    modalOn_for_bike:false
                  })
                  //console.log("something wrong");
              }
          })
  }

  ///////////////////////////////////********************EDIT CAR BRAND FUNCTIONALITY *******************************////////////////////////

  for_edit_bike_model(value) {
    this.setState({
        add_rto_model_for_bike:true,
        button_for_bike_model: "Update Bike Model",
        heading_for_bike: "Edit Bike Model",
        brand_data_bike: value.brand_data,
        bike_model_id: value._id,
        bike_model_data: value.model,
        status_bike:1
    })
  }

  update_bike_model() {
    const {
        addToast,settings
    } = this.props;
    var params = {
        model:this.state.bike_model_data,
        model_id:this.state.bike_model_id,
        brand_id:this.state.bike_brand_id,
        brand_data:this.state.brand_data_bike
    }

    //console.log("Bike Model Edit Params", params);
    if (params.model == "" || params.model == undefined) {
      alert("Please Fill all fields")
  }
  else { const res = fetch(settings.api_url + "update_bike_model", {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
          "Content-type": "application/json; charset=UTF-8",
      }
  }).then((response) => response.json())
      .then(json => {
          //console.log("Edit Bike Model *************", { params: params, response: json })
          var data = json;
          if (data.status == true) {
              addToast({
                  title: 'Add my policy',
                  content: data["message"],
                  time: new Date(),
                  duration: 1000,
              });

              this.setState({
                  add_rto_model_for_bike:false,
                  button_for_bike_model: "Save Bike Model",
                  bike_model_data:"",
                  bike_brand_data: '',
                  heading_for_bike:"Add Bike Model"
                });
                this.fetch_single_bike_brand(this.state.bike_brand_id)
          }
          else {
              addToast({
                  title: 'Add my policy',
                  content: data["message"],
                  time: new Date(),
                  duration: 1000,
              });

              //console.log("something wrong");
          }
      })}

  }

  radioHandler_bike = (status_bike) => {
    //console.log("status_bike",status_bike);
    this.setState({ status_bike });
};

add_bike_model_excel = () => {
    const { settings, addToast } = this.props;
    var fd = new FormData();
    var data = this.state.file_array[0];
    //console.log("data", data);

    if (this.state.file_array[0] == undefined) {
        //console.log("undefined");
    } else {

        var nameArr = this.state.file_array[0].type.split('/');
        //console.log("nameArr",nameArr);
    }
       //console.log("nameArr_____________",nameArr);

        fd.append('file_name', data);


         //console.log(...fd, "Add Bike Model Excel Data")
        const res = fetch(settings.api_url + "add_bike_model_excel", {
        method: 'POST',
        body: fd
    })
        .then((response) => response.json())
        .then(json => {
            //console.log("Bike MODEL Execl Data Response", json);
            if (json.status == true) {
                this.fetch_single_bike_brand(this.state.bike_brand_id)
            //   this.fetch_all_bike_model();
              addToast({
                  title: 'Add my policy',
                  content: data["message"],
                  time: new Date(),
                  duration: 1000,
              });
                this.setState({
                add_rto_model_for_bike:false,
                })


            } else {
                //console.log("something went wrong");
                // this.fetch_all_bike_model();
                this.fetch_single_bike_brand(this.state.bike_brand_id)
            }

        })
}


toggleCheckbox_bike = (e, item,multiple) => {
      //console.log("e.target.checked",e.target.checked);
      //console.log("arrmultiplearr",multiple);
    //   //console.log("item",item);

  if(e.target.checked) {
      let arr = this.state.checkedBoxes_bike;
      arr.push(item._id);
      //console.log("arr++++++++++",arr);
      this.setState({
      checkedBoxes_bike: arr,
      delete_type_bike:multiple
      })
  } else {
      let items = this.state.checkedBoxes_bike.splice(this.state.checkedBoxes_bike.indexOf(item._id), 1);
      //console.log("items",items);
      this.setState = {
          checkedBoxes_bike: items
      }
  }

  //console.log(this.state.checkedBoxes_bike);

}






    render() {
        var car_brand_array = this.state.car_brand_array.map(item => {
            return {
                value: item._id,
                label: item.brand
            }
        })
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
                let col=''

                if (state.isSelected) {
                    bgc = '#8bc240';
                    col="#fff"
                } else if (state.isFocused) {
                    bgc = '#8bc240';
                    col="#fff"
                }

                return {
                    ...css,
                    backgroundColor: bgc,
                    color:col
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
        const { settings } = this.props;
        return (
            <Fragment>
            <Spinner color="info" className="spinner_spinner spinner_color" style={{marginTop:gk,display:this.state.isLoading}}/>
            <Spinner color="info" className="spinner_spinner spinner_color" style={{marginTop:gk,display:this.state.isLoading_for_bike}}/>
            <div className="test_collapse">

            <div style={{display:this.state.activeTab2 === 'home' ? "block" :"none"}}>
            <PageTitle className="my_title" >
              <div className="my_classs">
                 <h1 className="heading_sne11111" style={{whiteSpace:"nowrap"}}>Car Brand</h1>
                 <input type="text"
                        style={{marginLeft:"15px"}}
                        className="form-control task_entry task_entry_1222"
                        placeholder="Search Car Brand"
                        value={this.state.search_car_brand}
                        onChange={(e) => {
                            this.setState({
                                search_car_brand: e.target.value,
                            });
                            this.fetch_all_car_brand(e.target.value)
                        }}
                    />
                    <div className="bulbul">
                    <input type="text"
                        className="form-control task_entry "
                        placeholder="Add Car Brand"
                        value={this.state.car_brand}
                        onChange={(e) => {
                            this.setState({
                                car_brand: e.target.value,
                            });
                        }}
                    />
              </div>
                 <button type="button" className="button_a" style={{whiteSpace:"nowrap",height:"37px"}} disabled={this.state.master_control_12 =="false" || this.state.show_erroe_data=="block" ? 'disabled' : ''} onClick={this.button_Call_for_car}> {this.state.button_for_car}</button>
              </div>
            </PageTitle>
            </div>
            <div style={{display:this.state.activeTab2 === 'profile' ? "block" :"none"}}>
            <PageTitle className="my_title" >
              <div className="my_classs">
                 <h1 className="heading_sne11111" style={{whiteSpace:"nowrap"}}>Bike Brand</h1>
                 <input type="text"
                        style={{marginLeft:"15px"}}
                        className="form-control task_entry task_entry_1222"
                        placeholder="Search Bike Brand"
                        value={this.state.search_bike_brand}
                        onChange={(e) => {
                            this.setState({
                                search_bike_brand: e.target.value,
                            });
                            this.fetch_all_bike_brand(e.target.value)
                        }}
                    />
                    <div className="bulbul">
                    <input type="text"
                        className="form-control task_entry "
                        placeholder="Bike Brand"
                        value={this.state.bike_brand}
                        onChange={(e) => {
                            this.setState({
                                bike_brand: e.target.value,
                            });
                        }}
                    />
                        </div>
                 <button type="button" className="button_a" style={{whiteSpace:"nowrap",height:"37px"}} disabled={this.state.master_control_12 =="false" || this.state.show_erroe_data=="block" ? 'disabled' : ''} onClick={this.button_Call_for_bike}> {this.state.button_for_bike}</button>
              </div>
            </PageTitle>
            </div>

                 <Tabs pills className="brand_ull">
                        <Tabs.NavItem
                            isActive={ this.state.activeTab2 === 'home' }
                            onClick={ () => this.toggleTab( 2, 'home' ) }
                            className="brand_car"
                        >
                            Car Brand
                        </Tabs.NavItem>
                        <Tabs.NavItem
                            isActive={ this.state.activeTab2 === 'profile' }
                            onClick={ () => this.toggleTab( 2, 'profile' ) }
                            className="brand_car"
                        >
                            Bike Brand
                        </Tabs.NavItem>
                 </Tabs>
                    <Tabs.Content activeTab={ this.state.activeTab2 }>
                        <Tabs.Pane tabId="home">
                  <h3 style={{ display: this.state.no_data, padding: "15px",textAlign:"center",color:" #a4a3a3",marginTop:gk }}>No Data Found</h3>
                  <div style={{display:this.state.isLoading=="none" ? "block":"none"}}>
                  <div style={{display:this.state.no_data=="none" ? "block":"none"}}>
                 <div className="row my_mobile_row">
                     <div className="col-lg-4 col-md-12 col-sm-12" style={{paddingRight:"0px"}}>
                    <div className="height_13 mycalendar" style={{height:my_height-109,display: this.state.ipad_emp_list}}>
                     <div className="table-responsive-lg table_res " >
                    <Table striped>
                        <thead>
                            <tr>
                                <th scope="col" className="table_head" style={{padding:"15px 25px"}}>Car Brand Name</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                          this.state.car_brand_array.map((value, index) => {
                                    return (
                            <tr key={index} style={{cursor:"pointer"}} onClick={() => {
                                this.setState({
                                  isLoading_single: 'block'
                                })
                                setTimeout(() => {
                                  this.fetch_single_car_brand(value._id)
                                }, 600)
                              }}>
                                <th className="" scope="row" style={{ borderLeft: value._id == this.state.car_brand_id ? "10px solid  #8bc240" : " 0px", verticalAlign: "middle",padding:"10px 25px" }}>{value.brand}</th>
                            </tr>
                          )
                            })
                        }
                        </tbody>
                    </Table>
                    </div>
                </div>
            </div>
                     <div className="col-lg-8 col-md-12 col-sm-12 test_collapse my_padding_data" style={{paddingLeft:"0px",display: device_width < 769 ? this.state.ipad_width : "block"}}>
                     <Spinner color="warning" className="employee_spinner_1" style={{ marginTop: (gk-100), display: this.state.isLoading_single }} />
                       <div className="test_collapse" style={{display: this.state.isLoading_single=="none" ? "block" :"none"}}>
                           {this.state.car_brand_single_array.map((value,index)=>{
                               return(
                               <div key={index}>
                                <div className="name_title" style={{display:"inline-flex",width:"100%",marginTop:"14px",padding:" 2px 20px"}}>
                                <h2 style={{whiteSpace:"nowrap"}}>{value.brand}</h2>
                                <div className="my_btn" style={{marginLeft:"auto"}}>
                                <Button type="button" className="button_delete" style={{whiteSpace:"nowrap",display:this.state.delete_type=="multiple" ? "inline-flex" :"none",marginLeft: "auto",marginRight:"10px"}} disabled={this.state.master_control_12 =="false"  ? 'disabled' : ''} onClick={() => {
                             this.setState({ modalOn_for_car_model: true})
                           }}> Delete All</Button>
                                <Button disabled={this.state.master_control_12 == "false" ? 'disabled' : ''} className="button_sne4_1" color="info"   onClick={() => {
                                          //console.log("Register__________ ", value);
                                          this.setState({
                                            car_brand_id: value._id
                                          });
                                          this.add_rto_model();
                                      }}>Add Car Model</Button>{' '}
                                <Button disabled={this.state.master_control_12 == "false" ? 'disabled' : ''} className="button_sne4_1" color="success"   onClick={() => {
                                          //console.log("Register__________ ", value);
                                          this.for_edit_car_brand(value);
                                      }}>Edit</Button>{' '}
                                 <Button disabled={this.state.master_control_12 =="false" ? 'disabled' : ''} className="button_sne5" color="danger"
                                  onClick={() => {this.setState({ modalOn_for_car: true, car_brand_id: value._id }) }}
                                 >Delete</Button>
                                 <Button className="back_btn" style={{ marginLeft: "5px", height: 'min-content', backgroundColor: '#007bff', borderColor: '#007bff',textTransform:"capitalize", display: device_width < 769 ? "inline-flex" : "none",padding: "5px 6px"}}
                                    onClick={() => {
                                    this.setState({
                                        ipad_emp_list:"block",
                                        ipad_width:"none"
                                    })
                                    }}>Back</Button>
                                    </div>
                                </div>
                              </div>
                               )
                           })}


                        <div className="table-responsive-lg" style={{display:this.state.car_model_array=="" ? "none" :"block"}}>
                        <Table striped>
                        <thead>

                            <tr>
                                <th scope="col" className="table_head" style={{padding:"15px 25px",borderTop: "none"}}>Car Model Name</th>
                                <th scope="col" className="table_head1" style={{padding:"15px 25px",borderTop: "none"}}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                         this.state.car_model_array.map((value, index) => {
                                    return (
                            <tr key={index}>
                                <th className="stipped_inner_padding" scope="row">
                                <div style={{display: "inline-flex"}}>
                                <CustomInput
                                type="checkbox"
                                className="accc_ssss"
                                id={index}
                                onChange={(e) => this.toggleCheckbox(e, value,"multiple")}
                                />
                                    {value.model}</div></th>
                                <td className="white_space stipped_inner_padding">
                                    <Button disabled={this.state.master_control_12 == "false" ? 'disabled' : ''} className="button_sne4_1" color="success"   onClick={() => {
                                          //console.log("Car Model__________ ", value);
                                          this.for_edit_car_model(value);
                                      }}>Edit Model</Button>{' '}
                                    <Button disabled={this.state.master_control_12 =="false" ? 'disabled' : ''} className="button_sne5_data" color="danger"
                                    onClick={() => {this.setState({ modalOn_for_car_model: true, car_model_id: value._id,delete_type:"single"}) }}
                                     >Delete Model</Button>
                                </td>
                            </tr>
                          )
                            })
                        }
                        </tbody>
                    </Table>
                    </div>



                      </div>

                     </div>
                </div>


                {/* ********************************************************** ADD CAR MODEL *************************************************************** */}

                <Modal
                        isOpen={ this.state.add_rto_model }
                        toggle={ this.add_rto_model }
                        className={ this.props.className,"addd_rtoo" }
                        fade
                    >
                        <div className="modal-header">
                            <h5 className="modal-title h2">{this.state.heading_for_car}</h5>
                            <Button className="close" color="" onClick={ this.add_rto_model }>
                                <Icon name="x" />
                            </Button>
                        </div>
                        <ModalBody>
                        <div className="row">
                               <div className="col-lg-4 col-md-4 col-sm-12">
                               <CustomInput type="radio" id="formRadio1" name="formRadio" label="Input Feild" checked={this.state.status === 1} onClick={(e) => this.radioHandler(1)} />
                               </div>
                               <div className="col-lg-4 col-md-4 col-sm-12 my_checkboxx" >
                               <div style={{display:this.state.heading_for_car=="Edit Car Model" ? "none" :"block"}}>
                               <CustomInput type="radio" id="formRadio2" name="formRadio" label="Choose File" checked={this.state.status === 2} onClick={(e) => this.radioHandler(2)} />
                                </div>
                                </div>
                               <div className="col-lg-6 col-md-6 col-sm-12" style={{marginBottom:"14px",marginTop:"14px",display:this.state.status == 1 ? "block" :"none"}}>
                                   <div style={{display:this.state.status == 1 ? "block" :"none"}}>
                                   <Label className="upload_file_1">Car Model</Label>
                                   <input type="text"
                                        className="form-control"
                                        placeholder="Car Model"
                                        value={this.state.car_model_data}
                                        onChange={(e) => {
                                            this.setState({
                                                car_model_data: e.target.value,
                                            });
                                        }}
                                    />
                                   </div>
                               </div>

                               <div className="col-lg-5 col-md-5 col-sm-12" style={{marginBottom:"14px",marginTop:"14px",display:this.state.status == 2 ? "block" :"none"}}>
                                   <div style={{display:this.state.status == 2 ? "block" :"none"}}>
                                   <Label className="upload_file_1">Upload File</Label>
                                   <div className="heavy">
                                     <Dropzone  onChange={(files) => {
                                        this.setState({
                                            file_array: files
                                           })
                                          //console.log(files);
                                    }} />

                                </div>
                                   </div>
                               </div>
                           </div>
                         </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={ this.add_rto_model }>Close</Button>
                            { ' ' }
                            <Button color="warning" style={{color:"#fff",display:this.state.status == 1 ? "inline-flex" :"none"}} onClick={ this.button_Call_for_car_model }>{this.state.button_for_car_model}</Button>
                            <Button color="warning" style={{color:"#fff",display:this.state.status == 2 ? "inline-flex" :"none"}} onClick={ this.add_car_model_excel }>Save file</Button>
                        </ModalFooter>
                    </Modal>


                    {/* ********************************************************** DELETE CAR MODEL *************************************************************** */}
                    <Modal className={this.props.className, "sssss"}
                   isOpen={this.state.modalOn_for_car_model}
                   toggle={this.deleter_for_car_model} fade>
                   <ModalHeader>
                   <div style={{width:"100%" , height :"20px" , marginLeft : "133px"}}>
                   <Button className="close_button" style={{float:"right"}} onClick={this.deleter_for_car_model}>
                   <Icon name="x" />
                   </Button>
                   </div>
                   </ModalHeader>
                   <ModalBody>
                       <p className="paragraph">Are you sure you want to Delete?</p>
                   </ModalBody>
                   <ModalFooter>
                   <div style={{ height: '50px', width: '100%', marginTop:"-30px" }}>

                       <Button color="brand no_btn"
                           style={{ marginRight: "20px"}}
                           onClick={() => {
                               this.delete_car_model(this.state.car_model_id)
                           }}
                       >yes</Button>
                       {'             '}
                       <Button color="secondary" onClick={this.deleter_for_car_model}>no</Button>
                   </div>


                   </ModalFooter>
               </Modal>






                    <Modal className={this.props.className, "sssss"}
                   isOpen={this.state.modalOn_for_car}
                   toggle={this.deleter_for_car} fade>
                   <ModalHeader>
                   <div style={{width:"100%" , height :"20px" , marginLeft : "133px"}}>
                   <Button className="close_button" style={{float:"right"}} onClick={this.deleter_for_car}>
                   <Icon name="x" />
                   </Button>
                   </div>
                   </ModalHeader>
                   <ModalBody>
                       <p className="paragraph">Are you sure you want to Delete?</p>
                   </ModalBody>
                   <ModalFooter>
                   <div style={{ height: '50px', width: '100%', marginTop:"-30px" }}>

                       <Button color="brand no_btn"
                           style={{ marginRight: "20px"}}
                           onClick={() => {
                               this.delete_car_brand(this.state.car_brand_id)
                           }}
                       >yes</Button>
                       {'             '}
                       <Button color="secondary" onClick={this.deleter_for_car}>no</Button>
                   </div>


                   </ModalFooter>
               </Modal>


              <div className="" id="" />  </div></div>
             </Tabs.Pane>
             <Tabs.Pane tabId="profile">

             {/* <h3 style={{ display: this.state.no_data, padding: "15px",textAlign:"center",color:" #a4a3a3",marginTop:gk }}>No Data Found</h3> */}
             <h3 style={{ display: this.state.no_data_for_bike, padding: "15px",textAlign:"center",color:" #a4a3a3",marginTop:gk }}>No Data Found</h3>
                  <div style={{display:this.state.isLoading_for_bike=="none" ? "block":"none"}}>
                  <div style={{display:this.state.no_data_for_bike=="none" ? "block":"none"}}>
                 <div className="row my_mobile_row_for_bikee">
                     <div className="col-lg-4 col-md-12 col-sm-12" style={{paddingRight:"0px"}}>
                    <div className="height_13 mycalendar" style={{height:my_height-109,display: this.state.ipad_emp_list_bike}}>
                     <div className="table-responsive-lg table_res " >
                    <Table striped>
                        <thead>
                            <tr>
                                <th scope="col" className="table_head" style={{padding:"15px 25px"}}>Bike Brand Name</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                          this.state.bike_brand_array.map((value, index) => {
                                    return (
                            <tr key={index} style={{cursor:"pointer"}} onClick={() => {
                                this.setState({
                                  isLoading_single_bike: 'block'
                                })
                                setTimeout(() => {
                                  this.fetch_single_bike_brand(value._id)
                                }, 600)
                              }}>
                                <th className="" scope="row" style={{ borderLeft: value._id == this.state.bike_brand_id ? "10px solid  #8bc240" : " 0px", verticalAlign: "middle",padding:"10px 25px" }}>{value.brand}</th>
                            </tr>
                          )
                            })
                        }
                        </tbody>
                    </Table>
                    </div>
                </div>
            </div>
                     <div className="col-lg-8 col-md-12 col-sm-12 test_collapse my_padding_data" style={{paddingLeft:"0px",display: device_width < 769 ? this.state.ipad_width_bike : "block"}}>
                     <Spinner color="warning" className="employee_spinner_1" style={{ marginTop: (gk-100), display: this.state.isLoading_single_bike }} />
                       <div className="test_collapse" style={{display: this.state.isLoading_single_bike=="none" ? "block" :"none"}}>
                           {this.state.bike_brand_single_array.map((value,index)=>{
                               return(
                               <div key={index}>
                                <div className="name_title" style={{display:"inline-flex",width:"100%",marginTop:"14px",padding:" 2px 20px"}}>
                                <h2 style={{whiteSpace:"nowrap"}}>{value.brand}</h2>
                                <div className="my_btn" style={{marginLeft:"auto"}}>
                                <Button type="button" className="button_delete" style={{whiteSpace:"nowrap",display:this.state.delete_type_bike=="multiple" ? "inline-flex" :"none",marginLeft: "auto",marginRight:"10px"}} disabled={this.state.master_control_12 =="false"  ? 'disabled' : ''} onClick={() => {
                             this.setState({ modalOn_for_bike_model: true})
                           }}> Delete All</Button>
                                <Button disabled={this.state.master_control_12 == "false" ? 'disabled' : ''} className="button_sne4_1" color="info"   onClick={() => {
                                          //console.log("Bike_model__________ ", value);
                                          this.setState({
                                            bike_brand_id: value._id
                                          });
                                          this.add_rto_model_for_bike();
                                      }}>Add Bike Model</Button>{' '}
                                {/* <Button disabled={this.state.master_control_12 == "false" ? 'disabled' : ''} className="button_sne4_1" color="success"   onClick={() => {
                                          //console.log("Register__________ ", value);
                                          this.for_edit_car_brand(value);
                                      }}>Edit</Button>{' '}
                                 <Button disabled={this.state.master_control_12 =="false" ? 'disabled' : ''} className="button_sne5" color="danger"
                                  onClick={() => {this.setState({ modalOn_for_car: true, bike_brand_id: value._id }) }}
                                 >Delete</Button> */}


                                    <Button disabled={this.state.master_control_12 == "false" ? 'disabled' : ''} className="button_sne4_1" color="success"   onClick={() => {
                                   //console.log("Bike Brand__________ ", value);
                                    this.for_edit_bike_brand(value);
                                   }}>Edit</Button>{' '}
                                   <Button disabled={this.state.master_control_12 =="false" ? 'disabled' : ''} className="button_sne5" color="danger"
                                   onClick={() => {this.setState({ modalOn_for_bike: true, bike_brand_id: value._id }) }}
                                  >Delete</Button>
                                  <Button className="back_btn" style={{ marginLeft: "5px", height: 'min-content', backgroundColor: '#007bff', borderColor: '#007bff',textTransform:"capitalize", display: device_width < 769 ? "inline-flex" : "none",padding: "5px 6px"}}
                                    onClick={() => {
                                    this.setState({
                                        ipad_emp_list_bike:"block",
                                        ipad_width_bike:"none"
                                    })
                                    }}>Back</Button>
                                    </div>
                                </div>
                              </div>
                               )
                           })}


                        <div className="table-responsive-lg" style={{display:this.state.bike_model_array=="" ? "none" :"block"}}>
                        <Table striped>
                         <thead>
                              <tr>
                                 <th scope="col" className="table_head" style={{padding:"15px 25px",borderTop: "none"}}>Bike Brand Name</th>
                                 <th scope="col" className="table_head1"style={{padding:"15px 25px",borderTop: "none"}} >Action</th>
                             </tr>
                        </thead>
                        <tbody>
                        {
                         this.state.bike_model_array.map((value, index) => {
                                       return (
                              <tr key={index}>
                                <th className="stipped_inner_padding" scope="row"><div style={{display: "inline-flex"}}>
                                       <CustomInput
                                     type="checkbox"
                                      className="accc_ssss"
                                       id={index + 100}
                                       onChange={(e) => this.toggleCheckbox_bike(e, value,"multiple")}
                                       />
                                         {value.model}</div></th>
                                   <td className="white_space stipped_inner_padding">
                                       <Button disabled={this.state.master_control_12 == "false" ? 'disabled' : ''} className="button_sne4_1" color="success"   onClick={() => {
                                           //console.log("Bike Model__________ ", value);
                                           this.for_edit_bike_model(value);
                                       }}>Edit Model</Button>{' '}
                                       <Button disabled={this.state.master_control_12 =="false" ? 'disabled' : ''} className="button_sne5_data" color="danger"
                                        onClick={() => {this.setState({ modalOn_for_bike_model: true, bike_model_id: value._id,delete_type_bike:"single" }) }}
                                           >Delete Model</Button>
                                      </td>
                                  </tr>
                              )
                                 })
                             }
                            </tbody>
                        </Table>
                    </div>



                      </div>

                     </div>
                </div>


  {/* ********************************************************** ADD Bike MODEL *************************************************************** */}

                    <Modal
                        isOpen={ this.state.add_rto_model_for_bike }
                        toggle={ this.add_rto_model_for_bike }
                        className={ this.props.className,"addd_rtoo" }
                        fade
                    >
                        <div className="modal-header">
                            <h5 className="modal-title h2">{this.state.heading_for_bike}</h5>
                            <Button className="close" color="" onClick={ this.add_rto_model_for_bike }>
                                <Icon name="x" />
                            </Button>
                        </div>
                        <ModalBody>
                        <div className="row">
                               <div className="col-lg-4 col-md-4 col-sm-12">
                               <CustomInput type="radio" id="formRadio5" name="formRadio1" label="Input Feild" checked={this.state.status_bike === 1} onClick={(e) => this.radioHandler_bike(1)} />
                               </div>
                               <div className="col-lg-4 col-md-4 col-sm-12 my_checkboxx" >
                               <div style={{display:this.state.heading_for_bike=="Edit Bike Model" ? "none" :"block"}}>
                               <CustomInput type="radio" id="formRadio6" name="formRadio1" label="Choose File" checked={this.state.status_bike === 2} onClick={(e) => this.radioHandler_bike(2)} />
                                </div>
                                </div>
                               <div className="col-lg-6 col-md-6 col-sm-12" style={{marginBottom:"14px",marginTop:"14px",display:this.state.status_bike == 1 ? "block" :"none"}}>
                                   <div style={{display:this.state.status_bike == 1 ? "block" :"none"}}>
                                   <Label className="upload_file_1">Bike Model</Label>
                                   <input type="text"
                                        className="form-control"
                                        placeholder="Bike Model"
                                        value={this.state.bike_model_data}
                                        onChange={(e) => {
                                            this.setState({
                                                bike_model_data: e.target.value,
                                            });
                                        }}
                                    />

                                   </div>
                               </div>

                               <div className="col-lg-5 col-md-5 col-sm-12" style={{marginBottom:"14px",marginTop:"14px",display:this.state.status_bike == 2 ? "block" :"none"}}>
                                   <div style={{display:this.state.status_bike == 2 ? "block" :"none"}}>
                                   <Label className="upload_file_1">Upload File</Label>
                                   <div className="heavy">
                                     <Dropzone  onChange={(files) => {
                                        this.setState({
                                            file_array: files
                                           })
                                          //console.log(files);
                                    }} />

                                </div>
                                   </div>
                               </div>
                           </div>
                         </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={ this.add_rto_model_for_bike }>Close</Button>
                            { ' ' }
                            <Button color="warning" style={{color:"#fff",display:this.state.status_bike == 1 ? "inline-flex" :"none"}} onClick={ this.button_Call_for_bike_model }>{this.state.button_for_bike_model}</Button>
                            <Button color="warning" style={{color:"#fff",display:this.state.status_bike == 2 ? "inline-flex" :"none"}} onClick={ this.add_bike_model_excel }>Save file</Button>
                        </ModalFooter>
                    </Modal>


{/* *********************************************************** DELETE BIKE MODEL ******************************************************************************** */}

                                            <Modal className={this.props.className, "sssss"}
                                            isOpen={this.state.modalOn_for_bike_model}
                                            toggle={this.deleter_for_bike_model} fade>
                                            <ModalHeader>
                                            <div style={{width:"100%" , height :"20px" , marginLeft : "133px"}}>
                                            <Button className="close_button" style={{float:"right"}} onClick={this.deleter_for_bike_model}>
                                            <Icon name="x" />
                                            </Button>
                                            </div>
                                            </ModalHeader>
                                            <ModalBody>
                                                <p className="paragraph">Are you sure you want to Delete?</p>
                                            </ModalBody>
                                            <ModalFooter>
                                            <div style={{ height: '50px', width: '100%', marginTop:"-30px" }}>

                                                <Button color="brand no_btn"
                                                    style={{ marginRight: "20px"}}
                                                    onClick={() => {
                                                        this.delete_bike_model(this.state.bike_model_id)
                                                    }}
                                                >yes</Button>
                                                {'             '}
                                                <Button color="secondary" onClick={this.deleter_for_bike_model}>no</Button>
                                            </div>


                                            </ModalFooter>
                                        </Modal>






                                             <Modal className={this.props.className, "sssss"}
                                            isOpen={this.state.modalOn_for_bike}
                                            toggle={this.deleter_for_bike} fade>
                                            <ModalHeader>
                                            <div style={{width:"100%" , height :"20px" , marginLeft : "133px"}}>
                                            <Button className="close_button" style={{float:"right"}} onClick={this.deleter_for_bike}>
                                            <Icon name="x" />
                                            </Button>
                                            </div>
                                            </ModalHeader>
                                            <ModalBody>
                                                <p className="paragraph">Are you sure you want to Delete?</p>
                                            </ModalBody>
                                            <ModalFooter>
                                            <div style={{ height: '50px', width: '100%', marginTop:"-30px" }}>

                                                <Button color="brand no_btn"
                                                    style={{ marginRight: "20px"}}
                                                    onClick={() => {
                                                        this.delete_bike_brand(this.state.bike_brand_id)
                                                    }}
                                                >yes</Button>
                                                {'             '}
                                                <Button color="secondary" onClick={this.deleter_for_bike}>no</Button>
                                            </div>


                                            </ModalFooter>
                                        </Modal>


              <div className="" id="" />  </div></div>















{/* ********************************************************************************************************************* */}
                        {/* <h3 style={{ display: this.state.no_data_for_bike, padding: "15px",textAlign:"center",color:" #a4a3a3",marginTop:gk }}>No Data Found</h3>
                                        <div style={{display:this.state.isLoading_for_bike=="none" ? "block":"none"}}>
                                            <div className="table-responsive-lg table_res " style={{display:this.state.no_data_for_bike=="none" ? "block":"none"}}>
                                                <Table striped>
                                                    <thead>
                                                        <tr>
                                                            <th scope="col" className="table_head" style={{padding:"15px 25px"}}>Bike Brand Name</th>
                                                            <th scope="col" className="table_head1"style={{padding:"15px 25px"}} >Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    {
                                                     this.state.bike_brand_array.map((value, index) => {
                                                                return (
                                                        <tr key={index}>
                                                            <th className="stipped_inner_padding" scope="row">{value.brand}</th>
                                                            <td className="white_space stipped_inner_padding">
                                                                <Button disabled={this.state.master_control_12 == "false" ? 'disabled' : ''} className="button_sne4" color="success"   onClick={() => {
                                                                    //console.log("Bike Brand__________ ", value);
                                                                    this.for_edit_bike_brand(value);
                                                                }}>Edit</Button>{' '}
                                                                <Button disabled={this.state.master_control_12 =="false" ? 'disabled' : ''} className="button_sne5" color="danger"
                                                                onClick={() => {this.setState({ modalOn_for_bike: true, bike_brand_id: value._id }) }}
                                                                >Delete</Button>
                                                            </td>
                                                        </tr>
                                                    )
                                                        })
                                                    }
                                                    </tbody>
                                                </Table>
                                                </div>




                                        <div className="" id="" />  </div> */}
                          </Tabs.Pane>
                    </Tabs.Content>


              </div>



            </Fragment>
        );
    }
}

export default connect( ( { settings } ) => (
    {
        settings,
    }
) , { addToast: actionAddToast })( Content );


import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import './style.scss';
import Select from 'react-select';
import { Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap";
import { Badge, Button, Table, Spinner,CustomInput,Label} from 'reactstrap';
import PageTitle from '../../components/page-title';
import Snippet from '../../components/snippet';
import {
    addToast as actionAddToast,
} from '../../actions';
import Cookies from 'js-cookie';
import Icon from '../../components/icon';
import Tabs from '../../components/tabs';
import Dropzone from '../../components/dropzone';


const sayali =   window.innerWidth;
var height =   window.innerHeight;
//console.log("admin_screen.height", height);
const nav_height = document.querySelector('.rui-navbar-sticky').offsetHeight
//console.log("admin_nav_height",nav_height);
var my_height = height - nav_height;
var gk = (my_height/2);
//console.log("admin_gk",gk);
if(sayali < 600){
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
       button_for_car: "Save Car Model",
       button_for_bike: "Save Bike Model",
       heading_for_bike: "Add Bike Model",
       heading_for_car:"Add Car Model",
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

    };

    this.fetch_all_car_brand();
    this.fetch_all_car_model();
    this.add_car_model = this.add_car_model.bind(this);
    this.button_Call_for_car = this.button_Call_for_car.bind(this);
    this.button_Call_for_bike = this.button_Call_for_bike.bind(this);
    this.deleter_for_car = this.deleter_for_car.bind(this);
    this.deleter_for_bike = this.deleter_for_bike.bind(this);
    this.delete_car_model = this.delete_car_model.bind(this);
    this.update_car_model = this.update_car_model.bind(this);
    this.toggleTab = this.toggleTab.bind( this );
    this.add_rto_model = this.add_rto_model.bind(this);
    this.add_rto_model_for_bike = this.add_rto_model_for_bike.bind(this);
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
         this.fetch_all_bike_model()

     }, 600)
    }
    else{
     this.setState({
    isLoading: 'block'
    })
    setTimeout(() => {
     this.fetch_all_car_brand()
     this.fetch_all_car_model()
     }, 600)
    }
}

add_rto_model() {
    this.setState((preState) => ({
        add_rto_model: !preState.add_rto_model,
        button_for_car: "Save Car Model",
        car_model_data:"",
        car_brand_data: '',
        heading_for_car:"Add Car Model",
        status:0,
    }));
}
add_rto_model_for_bike() {
    this.setState((preState) => ({
        add_rto_model_for_bike: !preState.add_rto_model_for_bike,
        button_for_bike: "Save Bike Model",
        bike_model_data:"",
        bike_brand_data: '',
        heading_for_bike:"Add Bike Model",
        status_bike:0,
    }));
}

button_Call_for_car() {
    if (this.state.button_for_car == "Save Car Model") {
        this.add_car_model();
    }
    else {
        this.update_car_model();
    }
}
button_Call_for_bike() {
    if (this.state.button_for_bike == "Save Bike Model") {
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

///////////////////////////////////////////////////***************** fetch All Car Brand**************************////////////////////////////////



fetch_all_car_brand = ()=>  {
   const { settings } = this.props;
    const res = fetch(settings.api_url + "fetch_all_car_brand", {
        method: 'POST',
        // body: JSON.stringify(params),
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
                });
            }
            else {
                this.setState({
                    car_brand_array: [],

                });
                //console.log("something wrong");
            }
        })
}



// *********************************************************** FETCH ALL CAR MODEL *********************************************

fetch_all_car_model = (search)=>  {
    const { settings } = this.props;
    var params={
        search:search
    }
    //console.log("Search Data",params);
     const res = fetch(settings.api_url + "fetch_all_car_model", {
         method: 'POST',
         body: JSON.stringify(params),
         headers: {
             "Content-type": "application/json; charset=UTF-8",
         }
     }).then((response) => response.json())
         .then(json => {
             //console.log("fetch Car Model ****", json)
             var data = json;
             if (data.status == true) {
                 this.setState({
                     car_model_array: data.data,
                     isLoading:"none",
                     no_data:"none",
                 });
             }
             else {
                 this.setState({
                     car_model_array: [],
                     no_data:"block",
                     isLoading:"none",

                 });
                 //console.log("something wrong");
             }
         })
 }
///////////////////////////////////////////////////***************** ADD CAR BRAND***************************////////////////////////////////

add_car_model() {
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
        brand_id:brand_id_data,
        brand_data:brand_id
    }
    //console.log("Add Car Model Params", params);
    if (params.model == "" || params.model == undefined ||this.state.car_brand_data == "" || this.state.car_brand_data == undefined) {
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
                      button_for_car: "Save Car Model",
                      car_model_data:"",
                      car_brand_data: '',
                      heading_for_car:"Add Car Model"
                    });
                    this.fetch_all_car_model()
                    // this.fetch_all_rto();
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
                        button_for_car: "Save Car Model",
                        car_model_data:"",
                        car_brand_data: '',
                        heading_for_car:"Add Car Model"
                      });
                    //console.log("something wrong");
                }
            })
    }

  }

////////////////////////////////////////**************** DELETE CAR BRAND **************************/////////////////////////////

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
                    modalOn_for_car:false,
                    delete_type:""
                  })
                //   this.fetch_all_car_brand();
                this.fetch_all_car_model()
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

  for_edit_car_model(value) {
    this.setState({
        add_rto_model:true,
        button_for_car: "Update Car Model",
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
                  button_for_car: "Save Car Model",
                  car_model_data:"",
                  car_brand_data: '',
                  heading_for_car:"Add Car Model"
                });
                this.fetch_all_car_model()
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

  radioHandler = (status) => {
    //console.log("status",status);
  this.setState({ status });
};

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
              this.fetch_all_car_model();
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
                this.fetch_all_car_model();
            }

        })
}


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



//   **********************************************************************************************************************************************************************************************************************************************************************************************
///////////////////////////////////////////////////***************** fetch All Car Brand**************************////////////////////////////////



fetch_all_bike_brand = ()=>  {
       const { settings } = this.props;
        const res = fetch(settings.api_url + "fetch_all_bike_brand", {
            method: 'POST',
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
                    });
                }
                else {
                    this.setState({
                        bike_brand_array: [],

                    });
                    //console.log("something wrong");
                }
            })
    }



    // *********************************************FETCH THE BIKE MODEL **********************************************************************

fetch_all_bike_model = (search_bike_model)=>  {
    var params={
        search:search_bike_model
    }
    //console.log("Search Data",params);
    const { settings } = this.props;
     const res = fetch(settings.api_url + "fetch_all_bike_model", {
         method: 'POST',
         body: JSON.stringify(params),
         headers: {
             "Content-type": "application/json; charset=UTF-8",
         }
     }).then((response) => response.json())
         .then(json => {
             //console.log("fetch Bike Model ****", json)
             var data = json;
             if (data.status == true) {
                 this.setState({
                     bike_model_array: data.data,
                     isLoading_for_bike:"none",
                     no_data_for_bike:"none",
                 });
             }
             else {
                 this.setState({
                     bike_model_array: [],
                     isLoading_for_bike:"none",
                     no_data_for_bike:"block",

                 });
                 //console.log("something wrong");
             }
         })
 }

    ///////////////////////////////////////////////////***************** ADD Bike Model***************************////////////////////////////////

    add_bike_model() {
        const {
            addToast,settings
        } = this.props;
        var brand_id = this.state.bike_brand_data
        if (brand_id=="" || brand_id==undefined) {
            var brand_id_data = ""
        }
        else{
            var brand_id_data = brand_id.value
        }
        //console.log("brand_id_data",brand_id_data);
        var params = {
            model:this.state.bike_model_data,
            brand_id:brand_id_data,
            brand_data:brand_id
        }
        //console.log("Add Bike Model Params", params);
        if (params.model == "" || params.model == undefined ||this.state.bike_brand_data == "" || this.state.bike_brand_data == undefined) {
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
                          button_for_bike: "Save Bike Model",
                          bike_model_data:"",
                          bike_brand_data: '',
                          heading_for_bike:"Add Bike Model"
                        });
                        this.fetch_all_bike_model()
                        // this.fetch_all_rto();
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
                            button_for_bike: "Save Bike Model",
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
                        modalOn_for_bike:false,
                        delete_type_bike:""
                      })
                    //   this.fetch_all_car_brand();
                    this.fetch_all_bike_model()
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
            button_for_bike: "Update Bike Model",
            heading_for_bike: "Edit Bike Model",
            bike_brand_data: value.brand_data,
            bike_model_id: value._id,
            bike_model_data: value.model,
            status_bike:1
        })
      }

      update_bike_model() {
        const {
            addToast,settings
        } = this.props;
        var brand_id = this.state.bike_brand_data
        if (brand_id=="" || brand_id==undefined) {
            var brand_id_data = ""
        }
        else{
            var brand_id_data = brand_id.value
        }
        //console.log("brand_id_data",brand_id_data);
        var params = {
            model:this.state.bike_model_data,
            model_id:this.state.bike_model_id,
            brand_id:brand_id_data,
            brand_data:brand_id
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
                      button_for_bike: "Save Bike Model",
                      bike_model_data:"",
                      bike_brand_data: '',
                      heading_for_bike:"Add Bike Model"
                    });
                    this.fetch_all_bike_model()
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
                  this.fetch_all_bike_model();
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
                    this.fetch_all_bike_model();
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
        var bike_brand_array = this.state.bike_brand_array.map(item => {
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
                 <h1 className="heading_sne11111" style={{whiteSpace:"nowrap"}}>Car Model</h1>
                    <div className="bulbul">

                    <input type="text"
                        className="form-control task_entry "
                        placeholder="Search Car Model"
                        style={{marginRight:"10px"}}
                        value={this.state.search_car_model}
                        onChange={(e) => {
                            this.setState({
                                search_car_model: e.target.value,
                            });
                            this.fetch_all_car_model(e.target.value)
                        }}
                    />
                        </div>
                 {/* <button type="button" className="button_a" style={{whiteSpace:"nowrap",height:"37px"}} disabled={this.state.master_control_12 =="false" || this.state.show_erroe_data=="block" ? 'disabled' : ''} onClick={this.button_Call_for_car}> {this.state.button_for_car}</button> */}
                 <button type="button" className="button_delete" style={{whiteSpace:"nowrap",height:"37px",display:this.state.delete_type=="multiple" ? "block" :"none",marginLeft: "auto",marginRight:"10px"}} disabled={this.state.master_control_12 =="false"  ? 'disabled' : ''} onClick={() => {
                             this.setState({ modalOn_for_car: true})
                           }}> Delete All</button>
                 <button type="button" className="button_a" style={{whiteSpace:"nowrap",height:"37px",marginLeft:this.state.delete_type=="multiple" ? "unset": "auto"}} disabled={this.state.master_control_12 =="false"  ? 'disabled' : ''} onClick={this.add_rto_model}> Add Car Model</button>
              </div>
            </PageTitle>
            </div>
            <div style={{display:this.state.activeTab2 === 'profile' ? "block" :"none"}}>
            <PageTitle className="my_title" >
              <div className="my_classs">
                 <h1 className="heading_sne11111" style={{whiteSpace:"nowrap"}}>Bike Model</h1>
                 <div className="bulbul">

                    <input type="text"
                        className="form-control task_entry "
                        placeholder="Search Bike Model"
                        style={{marginRight:"10px"}}
                        value={this.state.search_bike_model}
                        onChange={(e) => {
                            this.setState({
                                search_bike_model: e.target.value,
                            });
                            this.fetch_all_bike_model(e.target.value)
                        }}
                    />
                        </div>
                 {/* <button type="button" className="button_a" style={{whiteSpace:"nowrap",height:"37px"}} disabled={this.state.master_control_12 =="false" || this.state.show_erroe_data=="block" ? 'disabled' : ''} onClick={this.button_Call_for_bike}> {this.state.button_for_bike}</button> */}
                 <button type="button" className="button_delete" style={{whiteSpace:"nowrap",height:"37px",display:this.state.delete_type_bike=="multiple" ? "block" :"none",marginLeft: "auto",marginRight:"10px"}} disabled={this.state.master_control_12 =="false"  ? 'disabled' : ''} onClick={() => {
                             this.setState({ modalOn_for_bike: true})
                           }}> Delete All</button>
                 <button type="button" className="button_a" style={{whiteSpace:"nowrap",height:"37px",marginLeft:this.state.delete_type_bike=="multiple" ? "unset": "auto"}} disabled={this.state.master_control_12 =="false"  ? 'disabled' : ''} onClick={this.add_rto_model_for_bike}> Add Bike Model</button>
              </div>
            </PageTitle>
            </div>

                 <Tabs pills className="brand_ull">
                        <Tabs.NavItem
                            isActive={ this.state.activeTab2 === 'home' }
                            onClick={ () => this.toggleTab( 2, 'home' ) }
                            className="brand_car"
                        >
                            Car Model
                        </Tabs.NavItem>
                        <Tabs.NavItem
                            isActive={ this.state.activeTab2 === 'profile' }
                            onClick={ () => this.toggleTab( 2, 'profile' ) }
                            className="brand_car"
                        >
                            Bike Model
                        </Tabs.NavItem>
                 </Tabs>
                    <Tabs.Content activeTab={ this.state.activeTab2 }>
                        <Tabs.Pane tabId="home">
                        <h3 style={{ display: this.state.no_data, padding: "15px",textAlign:"center",color:" #a4a3a3",marginTop:gk }}>No Data Found</h3>
                  <div style={{display:this.state.isLoading=="none" ? "block":"none"}}>
                   <div className="table-responsive-lg table_res mycalendar" style={{display:this.state.no_data=="none" ? "block":"none",height:my_height-126}}>
                    <Table striped>
                        <thead>

                            <tr>
                                <th scope="col" className="table_head" style={{padding:"15px 25px"}}>Car Model Name</th>
                                <th scope="col" className="table_head1" style={{padding:"15px 25px"}}>Action</th>
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
                                    <Button disabled={this.state.master_control_12 == "false" ? 'disabled' : ''} className="button_sne4" color="success"   onClick={() => {
                                          //console.log("Car Model__________ ", value);
                                          this.for_edit_car_model(value);
                                      }}>Edit</Button>{' '}
                                    <Button disabled={this.state.master_control_12 =="false" ? 'disabled' : ''} className="button_sne5" color="danger"
                                    onClick={() => {this.setState({ modalOn_for_car: true, car_model_id: value._id,delete_type:"single"}) }}
                                     >Delete</Button>
                                </td>
                            </tr>
                          )
                            })
                        }
                        </tbody>
                    </Table>
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
                               <div className="col-lg-4 col-md-4 col-sm-12" >
                               <div style={{display:this.state.heading_for_car=="Edit Car Model" ? "none" :"block"}}>
                               <CustomInput type="radio" id="formRadio2" name="formRadio" label="Choose File" checked={this.state.status === 2} onClick={(e) => this.radioHandler(2)} />
                                </div>
                                </div>
                               <div className="col-lg-6 col-md-6 col-sm-12" style={{marginBottom:"14px",marginTop:"14px",display:this.state.status == 1 ? "block" :"none"}}>
                                   <div style={{display:this.state.status == 1 ? "block" :"none"}}>
                                   <Label className="upload_file_1">Car Brand</Label>
                                      <Select
                                             value = {this.state.car_brand_data}
                                             onChange={(e) => {
                                                 //console.log(e, "Val.....")
                                                 this.setState({
                                                     car_brand_data: e
                                                 });
                                             }}
                                             placeholder="Select Car Brand"
                                             options={ car_brand_array }
                                             styles={ customStyles }
                                   />
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
                                   {/* <Label className="upload_file_1">Car Brand</Label>
                                   <Select
                                             value = {this.state.car_brand_data}
                                             onChange={(e) => {
                                                 //console.log(e, "Val.....")
                                                 this.setState({
                                                     car_brand_data: e
                                                 });
                                             }}
                                             placeholder="Select Car Brand"
                                             options={ car_brand_array }
                                             styles={ customStyles }
                                   />                               */}
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
                            <Button color="warning" style={{color:"#fff",display:this.state.status == 1 ? "inline-flex" :"none"}} onClick={ this.button_Call_for_car }>{this.state.button_for_car}</Button>
                            <Button color="warning" style={{color:"#fff",display:this.state.status == 2 ? "inline-flex" :"none"}} onClick={ this.add_car_model_excel }>Save file</Button>
                        </ModalFooter>
                    </Modal>



{/* ********************************************************** DELETE CAR MODEL *************************************************************** */}
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
                               this.delete_car_model(this.state.car_model_id)
                           }}
                       >yes</Button>
                       {'             '}
                       <Button color="secondary" onClick={this.deleter_for_car}>no</Button>
                   </div>


                   </ModalFooter>
               </Modal>



              <div className="" id="" />  </div>
                           </Tabs.Pane>
                        <Tabs.Pane tabId="profile">
                        <h3 style={{ display: this.state.no_data_for_bike, padding: "15px",textAlign:"center",color:" #a4a3a3",marginTop:gk }}>No Data Found</h3>
                                        <div style={{display:this.state.isLoading_for_bike=="none" ? "block":"none"}}>
                                            <div className="table-responsive-lg table_res mycalendar" style={{display:this.state.no_data_for_bike=="none" ? "block":"none",height:my_height-126}}>
                                                <Table striped>
                                                    <thead>
                                                        <tr>
                                                            <th scope="col" className="table_head" style={{padding:"15px 25px"}}>Bike Brand Name</th>
                                                            <th scope="col" className="table_head1"style={{padding:"15px 25px"}} >Action</th>
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
                                                                <Button disabled={this.state.master_control_12 == "false" ? 'disabled' : ''} className="button_sne4" color="success"   onClick={() => {
                                                                    //console.log("Bike Model__________ ", value);
                                                                    this.for_edit_bike_model(value);
                                                                }}>Edit</Button>{' '}
                                                                <Button disabled={this.state.master_control_12 =="false" ? 'disabled' : ''} className="button_sne5" color="danger"
                                                                onClick={() => {this.setState({ modalOn_for_bike: true, bike_model_id: value._id,delete_type_bike:"single" }) }}
                                                                >Delete</Button>
                                                            </td>
                                                        </tr>
                                                    )
                                                        })
                                                    }
                                                    </tbody>
                                                </Table>
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
                               <div className="col-lg-4 col-md-4 col-sm-12" >
                               <div style={{display:this.state.heading_for_bike=="Edit Bike Model" ? "none" :"block"}}>
                               <CustomInput type="radio" id="formRadio6" name="formRadio1" label="Choose File" checked={this.state.status_bike === 2} onClick={(e) => this.radioHandler_bike(2)} />
                                </div>
                                </div>
                               <div className="col-lg-6 col-md-6 col-sm-12" style={{marginBottom:"14px",marginTop:"14px",display:this.state.status_bike == 1 ? "block" :"none"}}>
                                   <div style={{display:this.state.status_bike == 1 ? "block" :"none"}}>
                                   <Label className="upload_file_1">Bike Brand</Label>
                                   <Select
                                             value = {this.state.bike_brand_data}
                                             onChange={(e) => {
                                                 //console.log(e, "Val.....")
                                                 this.setState({
                                                     bike_brand_data: e
                                                 });
                                             }}
                                             placeholder="Select Bike Brand"
                                             options={ bike_brand_array }
                                             styles={ customStyles }
                                   />
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
                            <Button color="warning" style={{color:"#fff",display:this.state.status_bike == 1 ? "inline-flex" :"none"}} onClick={ this.button_Call_for_bike }>{this.state.button_for_bike}</Button>
                            <Button color="warning" style={{color:"#fff",display:this.state.status_bike == 2 ? "inline-flex" :"none"}} onClick={ this.add_bike_model_excel }>Save file</Button>
                        </ModalFooter>
                    </Modal>


{/* *********************************************************** DELETE BIKE MODEL ******************************************************************************** */}

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
                                                        this.delete_bike_model(this.state.bike_model_id)
                                                    }}
                                                >yes</Button>
                                                {'             '}
                                                <Button color="secondary" onClick={this.deleter_for_bike}>no</Button>
                                            </div>


                                            </ModalFooter>
                                        </Modal>


                                        <div className="" id="" />  </div>
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

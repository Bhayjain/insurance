/**
 * External Dependencies
 */
 import './style.scss'
 import React, { Component, Fragment } from 'react';
 import { connect } from 'react-redux';
 import { Row,Col, FormGroup, Table, Spinner, Label, Input ,Button,Modal, ModalBody, ModalFooter} from 'reactstrap';
 import DatePicker from "../../components/date-time-picker";
 /**
  * Internal Dependencies
  */
 import Snippet from '../../components/snippet';
 import Icon from '../../components/icon';
 import PageTitle from '../../components/page-title';
 import moment from 'moment';
 import {
     addToast as actionAddToast,
 } from '../../actions';
 /**
  * Component
  */
 class Content extends Component {
 
     constructor(props){
         super(props)
         this.state = {
             addModal: false,
             loading: false,
           
             holiday:"",
             date:new Date(),
             message:"",
             button:"Save",
             text:"Add Holiday",
 
 
             add_holiday:[],
             fetch_holiday:[],
             fetch_single_holiday:[],
             edit_holiday:[],
             delete_holiday:[],
 
 
             no_data_message:"",
             isLoading:""
         }
         this.addModal = this.addModal.bind(this)
         this.deleteModal = this.deleteModal.bind(this)
     }
 
     componentDidMount(){
         this.fetch_holiday()
  
     }
 
 
  
     addModal(){
         this.setState((prevState)=>({
             addModal : !prevState.addModal,
             message: "",
             borderColor:false,
             loading:false,
         }));
     }
     deleteModal(){
         this.setState((prevState)=>({
             deleteModal : !prevState.deleteModal,
             loading:false,
         }));
     }
     
 
     switch_function=()=>{
     
         if (this.state.button === "Save") {
             this.add_holiday()
         } 
         else{
             this.edit_holiday()
         }  
     }
 
 //-------------------------------------------------------------------ADD_API-----------------------------------------------------------------------------------//
 add_holiday = () => {
     const { addToast, settings } = this.props;
     const {holiday,date} = this.state    
        this.setState({
            loading:true
        })
     var a = new Date(date)
     console.log("a",a)
     var day = '' + a.getDate()
     console.log("day",day)
     var month = '' + (a.getMonth()+1)
     console.log("month",month)
     var year = a.getFullYear()
     console.log("year",year)
 
     if (month.length < 2) 
         month = '0' + month;
     if (day.length < 2) 
         day = '0' + day;
 
     var new_date = [ year, month, day ].join('-') 
     console.log("new_date",new_date)
 
     var params = {
         holiday_name : holiday,
         holiday_date : new_date,
     }
     console.log("Params",params)
 
     if(params.holiday_name == "" || params.holiday_name == undefined || params.holiday_date == "" || 
     params.holiday_date == undefined || new_date === "1970-01-01" || new_date === ""){
         this.setState({
             message: "Please fill all the fields",
             borderColor : true,
             loading:false
         })
     }else{
 
         const res = fetch (settings.api_url + 'api/payroll/add_holiday',{
             method: 'POST',
             body: JSON.stringify(params),
             headers: {"Content-type" : "application/json; charset=UTF-8"}
         })
         .then((response) => response.json())
         .then(json => {console.log("Add Holiday",{params:params,response:json})
     
             var data = json ;
 
             if(data.status === true){
                 this.fetch_holiday()
                 this.addModal()
                 addToast({
                     title: 'Add Holiday',
                     content: data.message,
                     time: new Date(),
                     duration: 1000,
                 });
                 this.setState({
                     add_holiday:data.data,
                     holiday:"",
                     date:new Date(),
                     message:"",
                     borderColor : false,
                     loading : false,
                 });
              
             }
             else{  
                 addToast({
                     title: 'Add Holiday',
                     content: data.message,
                     time: new Date(),
                     duration: 1000,
                 }); 
                 this.setState({
                     add_holiday:[],
                     message: data.message,
                     borderColor : false,
                     loading : false,
                 }) 
             }
         });
     }
 }
 //-------------------------------------------------------------------Fetch_API-----------------------------------------------------------------------------------//
 fetch_holiday = () => {
     const {  addToast,settings } = this.props;
 
     const res = fetch (settings.api_url + 'api/payroll/fetch_holiday',{
         method: 'POST',
         headers: {"Content-type" : "application/json; charset=UTF-8"}
     })
     .then((response) => response.json())
     .then(json => {console.log("Fetch Holiday",json)
 
         var data = json ;
 
         if(data.status === true){
             
             this.setState({
                 fetch_holiday:data.data,
                 isLoading:"none",
                 no_data_message:"none"
             })
         }
         else{   
             this.setState({
                 fetch_holiday:[],
                 isLoading:"none",
                 no_data_message:"block"
             }) 
         }
         
     });
         
 }
 //-------------------------------------------------------------------Fetch_Single_API-----------------------------------------------------------------------------------//
 fetch_single_holiday = (_id) => {
     const {  addToast,settings } = this.props;
     
     var params = {
         holiday_id:_id
     }
     console.log("Params",params)
 
     const res = fetch (settings.api_url + 'api/payroll/fetch_single_holiday',{
         method: 'POST',
         body: JSON.stringify(params),
         headers: {"Content-type" : "application/json; charset=UTF-8"}
     })
     .then((response) => response.json())
     .then(json => {console.log("Fetch Single Holiday",{params:params,response:json})
 
         var data = json ;
 
         if(data.status === true){
             
             this.setState({
                 fetch_single_holiday:data.data,
                 id: data.data[0]._id,
             })
         }
         else{   
             this.setState({
                 fetch_single_holiday:[]
             }) 
         }
         
     });
         
 }
 
 //-------------------------------------------------------------------Edit_API-----------------------------------------------------------------------------------//
 handleEdit = (v) =>{
 
     console.log("V",v)
 
     this.setState({
         text: "Edit Holiday",
         button: "Update",
         id: v._id,
         holiday: v.holiday_name,
         date: new Date(v.holiday_date)
     }) 
 
 }
 
 edit_holiday = () => {
     
     const {  addToast,settings } = this.props;
    this.setState({
        loading:true
    })
     var a = new Date(this.state.date)
     console.log("a",a)
     var day = '' + a.getDate()
     console.log("day",day)
     var month = '' + (a.getMonth()+1)
     console.log("month",month)
     var year = a.getFullYear()
     console.log("year",year)
 
     if (month.length < 2) 
         month = '0' + month;
     if (day.length < 2) 
         day = '0' + day;
 
     var new_date = [ year, month, day ].join('-') 
     console.log("new_date",new_date)
     
     var params = {
         holiday_id: this.state.id,
         holiday_name:this.state.holiday,
         holiday_date: new_date
     }
     console.log("Params",params)
     
     if(params.holiday_name == "" || params.holiday_name == undefined || params.holiday_date == "" 
     || params.holiday_date == undefined  || new_date === "1970-01-01" || new_date === ""){
         this.setState({
             message: "Please fill all the fields",
             loading:false
         })
     }else{   
         const res = fetch (settings.api_url + 'api/payroll/edit_holiday',{
             method: 'POST',
             body: JSON.stringify(params),
             headers: {"Content-type" : "application/json; charset=UTF-8"}
         })
         .then((response) => response.json())
         .then(json => {console.log("Edit Holiday",{params:params,response:json})
     
             var data = json ;
     
             if(data.status === true){
                 this.fetch_holiday()  
                 this.addModal();
                 addToast({
                     title: 'Update holiday',
                     content: data.message,
                     time: new Date(),
                     duration: 2000,
                 });
                 this.setState({
                     edit_holiday:data.data,
                     message:"",
                     loading:false
                 })
      
             }
             else{  
                 addToast({
                     title: 'Update holiday',
                     content: data.message,
                     time: new Date(),
                     duration: 2000,
                 }); 
                 this.setState({
                     edit_holiday:[],
                     message:data.message,
                     loading:false
                 }) 
             }
          
         });
     }
 
 }
 
 //-------------------------------------------------------------------Delete_API-----------------------------------------------------------------------------------//
 delete_holiday = () => {
     
     const { addToast, settings } = this.props;
     this.setState({
        loading:true
     })
     var params = {
         holiday_id:this.state.id,
     }
     console.log("Params",params)
 
 
     const res = fetch (settings.api_url + 'api/payroll/delete_holiday',{
         method: 'POST',
         body: JSON.stringify(params),
         headers: {"Content-type" : "application/json; charset=UTF-8"}
     })
     .then((response) => response.json())
     .then(json => {console.log("Delete Holiday",{params:params,response:json})
 
         var data = json ;
 
         if(data.status === true){
             this.fetch_holiday()
             addToast({
                 title: 'Delete Holiday',
                 content: data.message,
                 time: new Date(),
                 duration: 1000,
             });
             this.setState({
                 delete_holiday:data.data,
                 loading:false
             })
         }
         else{
             addToast({
                 title: 'Delete Holiday',
                 content: data.message,
                 time: new Date(),
                 duration: 1000,
             });   
             this.setState({
                 delete_holiday:[],
                 loading:false
             }) 
         }
         this.deleteModal()
     });
 
 }
 
 
     render() {
         return (
             <Fragment>
              
                 <PageTitle className="holiday_heading">
                     <div className='my_head_content'>
                         
                         <h1>Holiday</h1>
                     
                         <Button color="warning" className="my_button" onClick={()=>{this.addModal();
                         this.setState({
                                 holiday:"",
                                 date:new Date(),
                                 message:"",
                                 text:"Add Holiday",
                                 button: "Save"
                             })
                         }}>Add Holiday</Button> 
                     
                     </div>
                 </PageTitle>
            
               
 
             
           
             <Spinner color="warning" className="spinner_spinner spinner_color" style={{display: this.state.isLoading}}/>
 
                 <div style={{display: this.state.isLoading=="none" ? "block" :"none"}}>
                     <h3 style={{ display: this.state.no_data_message, 
                     padding: "15px",textAlign:"center",color:" #a4a3a3",width: "100%"}}>No Data Found</h3>           
                
 
                     <div className="test_collapse" style={{display: this.state.no_data_message=="none" ? "block" :"none"}}>
 
                         <Table striped>
                             <thead className='my_thead'>
                                 <tr className='my_tr' style={{}}>
                                     <th className='my_th'>Holiday Name</th>
                                     <th className='my_th'>Holiday Date</th>
                                     <th className='my_th' style={{textAlign:'center'}}>Action</th>
                                 </tr>
                             </thead>
                             <tbody className='my_body'>
                                 {this.state.fetch_holiday.map((v,i)=>{
                                     return(
                                         <tr key={i} className='my_tr' style={{}} onClick={()=>{}}>
                                             <td className='my_holiday_name my_td'>{v.holiday_name}</td>
                                             <td className='my_holiday_date my_td'>{moment(v.holiday_date).format("DD-MM-YYYY")}</td>
                                             <td className='white_space stipped_inner_padding my_btns_end my_td'>
                                                 <div>
                                                     {<Button color="success" className="my_edit_btn" onClick={()=>{this.fetch_single_holiday(v._id);this.handleEdit(v);this.addModal()}}>Update</Button>}{" "}&nbsp;&nbsp;
                                                     {<Button color="danger" className="my_delete_btn" onClick={()=>{this.fetch_single_holiday(v._id);this.deleteModal()}}>Delete</Button>}
                                                 </div>
                                             </td>
                                         </tr>
                                 ) })
                                     
                                 }
                             </tbody>
                         </Table>
 
                     </div>
                 </div>
                    
                  
                 
 
 
             {/*ADD Modal*/}
             <Modal isOpen={this.state.addModal } toggle={this.addModal } className={this.props.className,'modal-dialog-centered'}>
                 <div className="modal-header">
                     <h5 className="modal-title h2">{this.state.text}</h5>
                     <Button className="close" color="" onClick={ this.addModal }>
                         <Icon style={{color:'grey'}} name="x" />
                     </Button>
                 </div>
                 <ModalBody style={{}}>
                     <FormGroup>
                         <Row>
                             <Col md={6}>
                                 <Label for="exampleHoliday">Holiday Name <span style={{color:'red'}}>*</span></Label>
                                 <Input id="exampleHoliday" type='text'
                                     name="holiday" 
                                     autoComplete="on"
                                     value={this.state.holiday} 
                                     placeholder='Holiday'
                                     onChange={(e)=>{
                                         this.setState({
                                             holiday: e.target.value
                                         })
                                 }}
                                 invalid={this.state.borderColor && this.state.holiday === "" ? true : false}></Input>
                             </Col>
                             <Col md={6}>
                                 <Label for="exampleDate">Holiday Date <span style={{color:'red'}}>*</span></Label>
                                 <DatePicker
                                     id="exampleDate"
                                     placeholder='Date'
                                     value={this.state.date}
                                     selected={this.state.date}
                                     onChange={(value) => {
                                         this.setState({
                                             date: value,
                                             message: ""
                                         })
                                     }}
                                     dateFormat="dd-MM-yyyy"
                                     className="rui-datetimepicker form-control d-flex new_widht"
                                 />
                             </Col>
                         </Row>
                     </FormGroup>
                 </ModalBody>
                 <ModalFooter className="my_foot" style={{border:'none'}}>
                     <div className="my_error_msg" style={{textAlign:'center',color:"red"}}>{this.state.message}</div>
                     <hr/>
                     <Button color="secondary" onClick={()=>{this.addModal()}}>Close</Button>
                     <Button color="warning" className="my_button" disabled={this.state.loading} onClick={()=>{this.switch_function()}}>{this.state.button}{this.state.loading ? (
                                <Spinner />
                            ) : ''}</Button>
                 </ModalFooter>
             </Modal>
 
 
             {/*Delete Modal*/}
             <Modal isOpen={this.state.deleteModal } toggle={this.deleteModal } className={this.props.className,'modal-dialog-centered my_delete_modal'}>
                 <ModalBody style={{textAlign:'center'}}>Are you sure you want to delete?</ModalBody>
                 <ModalFooter style={{border:'none',justifyContent:'center',marginTop:"20px"}}>
                     <Button color="secondary" onClick={this.deleteModal}>No</Button>
                     <Button color="warning" className="my_button" disabled={this.state.loading} onClick={()=>{this.delete_holiday()}}>Yes{this.state.loading ? (
                                <Spinner />
                            ) : ''}</Button>
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
 ) ,{ addToast: actionAddToast })(Content);
 
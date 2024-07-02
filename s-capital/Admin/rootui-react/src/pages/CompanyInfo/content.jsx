/**
 * External Dependencies
 */
 import React, { Component, Fragment } from 'react';
 import { connect } from 'react-redux';
 import DataTable from 'react-data-table-component';
 import { Container, Form, Row,Col,FormGroup,Label,Input,Button,FormFeedback, Spinner} from 'reactstrap';
 import PageTitle from '../../components/page-title';
 import './style.scss'
 import {
     addToast as actionAddToast,
 } from '../../actions';
 /**
  * Internal Dependencies
  */
 import Snippet from '../../components/snippet';
import Icon from '../../components/icon';
import { isValidmobile_number } from '../../utils';
import classnames from 'classnames/dedupe';
import DatePicker from '../../components/date-time-picker';
 
 /**
  * Component
  */
 
 
 const my_new_width = window.innerWidth
 console.log("my_new_width",my_new_width)
 const my_new_height = window.innerHeight
 console.log("my_new_height",my_new_height)
 const my_new_nav = document.querySelector('.rui-navbar-sticky').offsetHeight
 console.log("my_new_nav",my_new_nav)
 
 var my_exact_height = my_new_height - my_new_nav
 console.log("my_exact_height",my_exact_height)
 
 
 
 
 
 class Content extends Component {
 
     constructor (props){
         super (props)
         this.state = {
             companyname: "",
             companyaddress: "",
             companymobile: "",
             companygstin:"",
             image:"",
             image_type:"",
             image_name:"",
             image_link:"",
             image_linkBase64:"",
             message:"",
             mobile_number_error:"",
 
             fetch_company_details:[],
             update_company_details:[],
             loading:false,
             loginTime:"",
            logoutTime:"",
         }
 
         this.fetch_company_details()
     }
  
     checkNumber() {
        const {
            companymobile,
        } = this.state;

        const isValid = companymobile && isValidmobile_number(companymobile);

        this.setState({
            mobile_number_error: isValid ? '' : 'Invalid mobile number',
        });

        return isValid;
    }



     fileToDataUrl = (img) => {
         return new Promise(   
           (res) => {
             const reader = new FileReader();
             const { type, name, size } = img;  
           reader.addEventListener('load', () => {
             res({
                 image_link: reader.result.split(',')[1],
                 image_linkBase64: reader.result
             })
           });
           reader.readAsDataURL(img);
         })
         
     }
 
     uploadImage = async (e) => {
         let file = e.target.files[0]
         console.log("FILE",file)
         const image_name = file.name
         console.log("image_name",image_name)
         const image_type = file.type.split("/")[1]
         console.log("image_type",image_type)
         const newImg = []
         if (e.target.files && e.target.files.length > 0) {
           
           for (let i = 0; i < e.target.files.length; i++) {
             newImg.push(this.fileToDataUrl(e.target.files[i]))
           }
           const newImages = await Promise.all(newImg);
           console.log(newImages)
 
 
             this.setState({
                 image_name: image_name,
                 image_type: image_type,
                 image_link: newImages[0].image_link,
                 image_linkBase64: newImages[0].image_linkBase64,
                 image: URL.createObjectURL(file),
                 message:""
             })
         }
     }
 
     //-------------------------------------------------------------------Fetch_API-----------------------------------------------------------------------------------//
     fetch_company_details = () => {
         const {  addToast,settings } = this.props;
         
         var params = {
 
         }
         console.log("Params",params)
 
         const res = fetch (settings.api_url + 'fetch_company_details',{
             method: 'POST',
             body: JSON.stringify(params),
             headers: {"Content-type" : "application/json; charset=UTF-8"}
         })
         .then((response) => response.json())
         .then(json => {console.log("Fetch Company Details",{params:params,response:json})
 
             var data = json ;

             if( data.data[0].punch_in_time == undefined ||  data.data[0].punch_in_time == ""){
                var loginTime =""
             }else{
                var loginTime =new Date('1970-01-01T' + data.data[0].punch_in_time)
             }

             if( data.data[0].punch_out_time == undefined ||  data.data[0].punch_out_time == ""){
                var logOut =""
             }else{
                var logOut =new Date('1970-01-01T' + data.data[0].punch_out_time)
             }
 
             if(data.status === true){
                 this.setState({
                     fetch_company_details: data.data,
                     message:"",
                     companyname:data.data[0].company_name,
                     companyaddress:data.data[0].company_address,
                     companymobile:data.data[0].company_number,
                     companygstin:data.data[0].company_gstin,
                     image:data.data[0].company_logo,
                     image_linkBase64:data.data[0].company_logo_string_base64,
                     image_name:data.data[0].company_logo.split("profile_picture/")[1],
                     loginTime : loginTime,
                     logoutTime : logOut,
                 })
             }
             else{  
                 this.setState({
                     fetch_company_details: [],
                     message:"",
                 }) 
             }
         });
     }
 
     //-------------------------------------------------------------------API-----------------------------------------------------------------------------------//
     update_company_details = () => {
         this.setState({
            loading:true
         })
         const {  addToast,settings } = this.props;
 
         const {companyname,companyaddress,companymobile,companygstin,image_name,image_type,image_link} = this.state

         if (companymobile.length > 10 || companymobile < 10) {
             this.checkNumber()
         }else{
            console.log(image_type);
            if (image_type == "" || image_type == undefined) {
                var already_uploaded_company_logo = this.state.image_name
            }else{
                var already_uploaded_company_logo = undefined
            }

            if (this.state.loginTime != "") {
             
                const now = new Date(this.state.loginTime);

                // Get hours and minutes
                const hours = now.getHours();
                const minutes = now.getMinutes();

                var formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
                var formattedMinutes1 = hours + ":" + formattedMinutes;
            }
            

            if (this.state.logoutTime != "") {
             
                const logoutTimenow = new Date(this.state.logoutTime);

                // Get hours and minutes
                const logoutTimehours = logoutTimenow.getHours();
                const logoutTimeminutes = logoutTimenow.getMinutes();

                var logoutTimeformattedMinutes = logoutTimeminutes < 10 ? '0' + logoutTimeminutes : logoutTimeminutes;
                var formattedMinutes2 = logoutTimehours + ":" + logoutTimeformattedMinutes;
            }
            

         var params = {
             company_name: companyname,
             company_address: companyaddress,
             company_number: companymobile,
             company_gstin: companygstin, 
             company_logo_name: image_name,
             company_logo_extension: image_type,
             company_logo_string: image_link,
             company_logo_string_base64: this.state.image_linkBase64,
             already_uploaded_company_logo: already_uploaded_company_logo,
             punch_in_time : formattedMinutes1,
             punch_out_time : formattedMinutes2,
         }
         console.log("Params",params)

         const res = fetch (settings.api_url + 'update_company_details',{
             method: 'POST',
             body: JSON.stringify(params),
             headers: {"Content-type" : "application/json; charset=UTF-8"}
         })
         .then((response) => response.json())
         .then(json => {console.log("Upload Company Details",{params:params,response:json})
 
             var data = json ;
 
             if(data.status === true){
                 this.fetch_company_details()
                 addToast({
                     title: 'Update company Details',
                     content: data.message,
                     time: new Date(),
                     duration: 2000,
                 });
                 this.setState({
                     update_company_details:data.data,
                     message:"",
                     image_name:"",
                     image_type:"",
                     image_link:"",
                     loading:false
                 })
             }
             else{  
                 this.setState({
                    loading:false
                 })
                 addToast({
                     title: 'Update company Details',
                     content: data.message,
                     time: new Date(),
                     duration: 2000,
                 });
             }
         });
         }
         
         
        
     }
 
         
     render() {
         return (
             <Fragment>
                 
                 {/*PageTitle*/}
                 <PageTitle className="CompanyInfoTitle">
                     <div className="row">
                         <div className="col my_row_padding">
                             <h1 className="company_heading">Company Information</h1>
                         </div>
                     </div>
                 </PageTitle>
 
                 {/*Form*/}
                 <Container>
           
                     <Form className="main_form">
                         <Row>
                             <Col md={6} className="my_form">
                                 <FormGroup>
                                     <Label for="exampleName" className="labelBottom">Company Name </Label>
                                     <Input id="exampleName" type="text" 
                                     name="name"
                                     placeholder="Company Name"
                                     value={this.state.companyname}
                                     onChange={(e)=>{
                                         this.setState({
                                             companyname: e.target.value,
                                             message:""
                                         })
                                     }}
                                     invalid={this.state.message && this.state.companyname === "" ? true : false }
                                     style={{invalid: this.state.companyname === ""? false :true}}
                                     />
                                 </FormGroup>
                             </Col>
                             <Col md={6} className="my_form">
                                 <FormGroup>
                                     <Label for="exampleAddress" className="labelBottom">Company Address </Label>
                                     <Input id="exampleAddress" type="text"
                                     name="address"
                                     style={{textTransform : "capitalize"}}
                                     placeholder="Company Address"
                                     value={this.state.companyaddress}
                                     onChange={(e)=>{
                                         this.setState({
                                             companyaddress: e.target.value,
                                             message:""
                                         })
                                     }}
                                     />
                                 </FormGroup>
                             </Col>
                             <Col md={6} className="my_form">
                                 <FormGroup>
                                     <Label for="exampleMobile" className="labelBottom">Company Phone No </Label>
                                     <Input id="exampleMobile" 
                                     className={classnames(' form-control', { 'is-invalid': this.state.mobile_number_error })}
                                     name="mobile"
                                     minLength="10"
                                     maxLength="10" 
                                     type="number" pattern="/^-?\d+\.?\d*$/"
                                     placeholder="Company Phone No"
                                     value={this.state.companymobile}
                                     onChange={(e)=>{
                                         this.setState({
                                             companymobile: e.target.value,
                                             message:"",
                                             mobile_number_error:"",
                                         })
                                     }}
                                     />
                                     {this.state.mobile_number_error ? (
                                        <div id="mobile_number_error" className="invalid-feedback">{this.state.mobile_number_error}</div>
                                    ) : ''}
                                 </FormGroup>
                             </Col>
                             <Col md={6} className="my_form">
                                 <FormGroup>
                                     <Label for="exampleGstin" className="labelBottom">Company GSTIN </Label>
                                     <Input id="exampleGstin" type="tel" 
                                     name="GSTIN"
                                     placeholder="Company GSTIN"
                                     value={this.state.companygstin}
                                     onChange={(e)=>{
                                         this.setState({
                                             companygstin: e.target.value,
                                             message:""
                                         })
                                     }}
                                     invalid={this.state.message && this.state.companygstin === "" ? true : false}
                                     style={{invalid: this.state.companygstin === ""? false :true}}   
                                     />
                                 </FormGroup>
                             </Col>
                             <Col md={6} className="my_form">
                                 <FormGroup style={{display:"grid"}}>
                                     <Label for="exampleGstin" className="labelBottom">Punch In Time</Label>
                                     <DatePicker
                                        selected={ this.state.loginTime }
                                        onChange={ ( val ) => {
                                            this.setState( {
                                                loginTime: val,
                                            } );
                                        } }
                                        showTimeSelect
                                        showTimeSelectOnly
                                        placeholder="Select time"
                                        dateFormat="h:mm aa"
                                        className="rui-datetimepicker form-control w-auto"
                                        // interval={15}
                                        timeIntervals={15}
                                    />
                                 </FormGroup>
                             </Col>
                             <Col md={6} className="my_form">
                                 <FormGroup style={{display:"grid"}}>
                                     <Label for="exampleGstin" className="labelBottom">Punch Out Time</Label>
                                     <DatePicker
                                            selected={ this.state.logoutTime }
                                            onChange={ ( val ) => {
                                                this.setState( {
                                                    logoutTime: val,
                                                } );
                                            } }
                                            showTimeSelect
                                            showTimeSelectOnly
                                            placeholder="Select time"
                                            dateFormat="h:mm aa"
                                            className="rui-datetimepicker form-control w-auto"
                                            timeIntervals={15}
                                        />
                                 </FormGroup>
                             </Col>
                             <Col md={6} className="my_form">
                                 <FormGroup>
                                     <div className="inputfile-box">
                                         <Input type="file" id="file" accept="image/*" className="inputfile" value="" 
                                         onChange={(e)=>this.uploadImage(e)}
                                         invalid={this.state.message && this.state.image_name === "" ? true : false}
                                         style={{invalid: this.state.message === ""? false :true}}
                                         />
                                         <span className='my_logo'>Company Logo </span>
                                         <label htmlFor="file" style={{marginTop:"-6px"}}>
                                             <span id="file-name" className="file-box">{this.state.image_name}</span>
                                             <span className="file-button" style={{marginTop:"-6px"}}>Upload File</span>
                                         </label>
                                     </div>
                                     <div style={{}}>
                                         <button type="button"  className="btn btn-danger btn-uniform btn-sm mnt-10 mnb-10 p-0 delte_image"
                                                  onClick={()=>{
                                                    this.setState({
                                                        image_name:"",
                                                        image_type:"",
                                                        image_link:"",
                                                        image:"",
                                                    })
                                                }} style={{ display:this.state.image == "" || this.state.image == undefined ? "none" :  "grid" }}>
                                                      <Icon name="x" />
                                        </button>
                                         <img src={this.state.image} alt="" name="file" width="100px"></img>
                                     </div>
                                 </FormGroup>
                             </Col>
                            
                             <Col md={6}>
                              
                             </Col>
                             <Col md={6} className="my_form">
                               <div className="my_error_msg" style={{textAlign:'center',color:"red"}}>{this.state.message}</div>
                             </Col>
                             <Col md={6} className="my_form" style={{textAlign:"end"}}>
                             <Button disabled={this.state.loading} color="warning" style={{color:"#fff"}} onClick={()=>{this.update_company_details()}}>SAVE {this.state.loading ? (
                                <Spinner />
                            ) : ''}</Button>
                             </Col>
                         </Row>
 
                     </Form>
                 </Container>
 
 
 
             </Fragment>
         );
     }
 }
 
 export default connect( ( { settings } ) => (
     {
         settings,
     }
 ) ,{ addToast: actionAddToast })(Content);
 
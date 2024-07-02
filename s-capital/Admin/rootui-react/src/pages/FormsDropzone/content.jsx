/**
 * External Dependencies
 */
 import React, { Component, Fragment } from 'react';
 import { connect } from 'react-redux';
 import { ChromePicker, SketchPicker } from 'react-color';
 import { Row,Col,Table, Input,Spinner, Button,Modal,ModalBody,ModalFooter, FormGroup,Label,Card, Form} from 'reactstrap';
 import PageTitle from '../../components/page-title';
 import Icon from '../../components/icon';
 import './style.scss'
 import {
     addToast as actionAddToast,
 } from '../../actions';
 /**
  * Internal Dependencies
  */
 import Snippet from '../../components/snippet';
 import { ModalHeader } from 'reactstrap';
 import TextEditor from '../../components/text-editor';
 import style from 'react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark';
 
 
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

 var gk = my_exact_height/2
 console.log("my_exact_height",my_exact_height)
 
 
 
 
 
 class Content extends Component {
 
     constructor( props ) {
         super( props );
 
         this.state = {
             addModal: false,
 
             lettername:"",
             letterformat: "",
             message: "",
             button:"Save",
             text:"Add Letter",
             id:"",
           
             name:"{{Name}}",
             designation:"{{Designation}}",
             address:"{{Address}}",
             rmod:"{{RM for OD}}",
             rmmis:"{{RM for MIS}}",
             assigning_date:"{{Date of assigning}}",
             salary_package: "{{Salary/Package}}",
             salary_structure: "{{Salary Structure}}",
 
             add_letter_template:[],
             fetch_all_letter_template:[],
             fetch_single_letter_template:[],
             update_letter_template:[],
             delete_letter_template:[],
 
             new_content:"",
 
             no_data_message:"",
             isLoading:"",
             spinner:false,
             spinner_1: 'none',
     
             desktop_list:'block',
             desktop_content: 'block',
             ipad_list: 'block',
             ipad_content: 'none',
             my_back_icon: 'none',
 
             editor_content:"",
             editor_background:"",
             borderNew : false,
             loading:false
       
         };
 
         this.fetch_all_letter_template()
         this.addModal = this.addModal.bind(this)
         this.deleteModal = this.deleteModal.bind(this)
 
     }
 
 
     addModal(){
         this.setState((prevState)=>({
             addModal : !prevState.addModal,
             loading:false
         }));
     }
 
     deleteModal(){
         this.setState((prevState)=>({
             deleteModal : !prevState.deleteModal,
             loading:false
         }));
     }
 
     switch_function=()=>{
     
         if (this.state.button === "Save") {
             this.add_letter_template()
         } 
         else{
             this.update_letter_template()
         }
   
     }
 
 
 
     handleLetterFormat= (text)=>{
         console.log("name",this.state.name)
         console.log("designation",this.state.designation)
         console.log("address",this.state.address)
         console.log("rmod",this.state.rmod)
         console.log("rmmis",this.state.rmmis)
         console.log("assigning_date",this.state.assigning_date)
         console.log("salary_package",this.state.salary_package)
         console.log("salary_structure",this.state.salary_structure)
 
         console.log("text",text)
 
         this.setState({
             letterformat : text,
             message:"",
             editor_content:"",
             editor_background:""
         })
 
     }
 
 
     //-------------------------------------------------------------------Add_API-----------------------------------------------------------------------------------//
     add_letter_template = () => {
         const {  addToast,settings } = this.props;
         this.setState({
             isLoading: true
         });
         this.setState({
            loading:true
         })
         const {lettername,letterformat} = this.state;
 
         console.log("lettername",lettername)
         console.log("letterformat",letterformat)
 
         
         if(letterformat === "" || letterformat == "<p><br></p>" ){
             var new_letter_format = "<p><br></p>"
             console.log("new_letter_format",new_letter_format)
 
             this.setState({
                 editor_content: "1px solid #fac6cc",
                 editor_background: "#fef9fa",
             })
 
         }
         else{
             var new_letter_format = letterformat
             console.log("new_letter_format",new_letter_format)
             this.setState({
                 editor_content: "",
                 editor_background: "",
             })
         }
 
 
 
         if( lettername === "" || lettername === undefined || new_letter_format === "" || new_letter_format === "<p><br></p>" ){
             
             this.setState({
                message: "Please fill all the fields",
                borderNew:true,
                loading:false
             })
         }
 
         else{
 
             var params = {
                 letter_name: lettername,
                 letter_content: new_letter_format
             }
             console.log("Params",params)
 
             const res = fetch (settings.api_url + 'api/payroll/add_letter_template',{
                 method: 'POST',
                 body: JSON.stringify(params),
                 headers: {"Content-type" : "application/json; charset=UTF-8"}
             })
             .then((response) => response.json())
             .then(json => {console.log("Add Letter",{params:params,response:json})
     
                 var data = json ;
     
                 if(data.status === true){
                     this.fetch_all_letter_template()
                     this.addModal()
                     addToast({
                         title: 'Add Letter',
                         content: data.message,
                         time: new Date(),
                         duration: 1000,
                     });
                     this.setState({
                         add_letter_template : data.data,
                         message: "",
                         editor_content: "",
                         editor_background: "",
                         borderNew:false,
                         loading:false
                     })
                 }
                 else{ 
                     addToast({
                         title: 'Add Letter',
                         content: data.message,
                         time: new Date(),
                         duration: 1000,
                     });
                     this.setState({
                         add_letter_template : [],
                         message:data.message,
                         loading:false
 
                     }) 
                 }
             });
             
         }
     }
 
     //-------------------------------------------------------------------Fetch_API-----------------------------------------------------------------------------------//
     fetch_all_letter_template = () => {
         const {  addToast,settings } = this.props;
 
         const res = fetch (settings.api_url + 'api/payroll/fetch_all_letter_template',{
             method: 'POST',
             headers: {"Content-type" : "application/json; charset=UTF-8"}
         })
         .then((response) => response.json())
         .then(json => {console.log("Fetch Letter",json)
 
             var data = json ;
 
             if(data.status === true){
 
                 if(my_new_width < 796){
                    
                 }
                 else{
                     this.fetch_single_letter_template(data.data[0]._id)
                 }
             
                 this.setState({
                     fetch_all_letter_template:data.data,
                     isLoading:"none",
                     no_data_message:"none"
                 })
             }
             else{   
                 this.setState({
                     fetch_all_letter_template:[],
                     isLoading:"none",
                     no_data_message:"block"
                 })
                  
             }
         });  
     }
 
     //-------------------------------------------------------------------Fetch_Single_API-----------------------------------------------------------------------------------//
     fetch_single_letter_template = (_id) => {
         const {  addToast,settings } = this.props;
         
         var params = {
             letter_id:_id
         }
         console.log("Params",params)
 
         const res = fetch (settings.api_url + 'api/payroll/fetch_single_letter_template',{
             method: 'POST',
             body: JSON.stringify(params),
             headers: {"Content-type" : "application/json; charset=UTF-8"}
         })
         .then((response) => response.json())
         .then(json => {console.log("Fetch Single Letter",{params:params,response:json})
 
             var data = json ;
 
             if(data.status === true){
 
                 if(my_new_width < 796){
                     var new_ipad_list = "none"
                 }
                 else{
                     var new_ipad_list = "block"
                 }
         
                 this.setState({
                     fetch_single_letter_template:data.data,
                     id: data.data[0]._id,
                     spinner_1: 'none',
                     ipad_content: 'block',
                     ipad_list: new_ipad_list,
                     my_back_icon: 'none',
                     isLoading:"none"
                 })
             }
             else{  
 
                 this.setState({
                     fetch_single_letter_template:[],
                     ipad_content: 'none',
                     isLoading:"none"
                 }) 
             }
         });
     }
     //-------------------------------------------------------------------Update_API-----------------------------------------------------------------------------------//
     handleEdit = (v) =>{
 
         console.log("V",v)
     
         this.setState({
             text: "Edit Letter",
             button: "Update",
             id: v._id,
             lettername: v.letter_name,
             letterformat: v.letter_content,
             message:"",
             editor_content:"",
             editor_background:"",
             borderNew:false
         }) 
     
     }
     

     update_letter_template = () => {
        const {  addToast,settings } = this.props;
        this.setState({
            isLoading: true,
            loading:true
        });
        const {lettername,letterformat} = this.state;

        console.log("lettername",lettername)
        console.log("letterformat",letterformat)

        
        if(letterformat === "" || letterformat == "<p><br></p>" ){
            var new_letter_format = "<p><br></p>"
            console.log("new_letter_format",new_letter_format)

            this.setState({
                editor_content: "1px solid #fac6cc",
                editor_background: "#fef9fa",
            })

        }
        else{
            var new_letter_format = letterformat
            console.log("new_letter_format",new_letter_format)
            this.setState({
                editor_content: "",
                editor_background: "",
            })
        }



        if( lettername === "" || lettername === undefined || new_letter_format === "" || new_letter_format === "<p><br></p>" ){
            
            this.setState({
               message: "Please fill all the fields",
               borderNew:true,
               loading:false
            })
        }

        else{

            var params = {
                letter_id: this.state.id,
                letter_name: lettername,
                letter_content: new_letter_format
            }
            console.log("Params",params)

            const res = fetch (settings.api_url + 'api/payroll/update_letter_template',{
                method: 'POST',
                body: JSON.stringify(params),
                headers: {"Content-type" : "application/json; charset=UTF-8"}
            })
            .then((response) => response.json())
            .then(json => {console.log("Edit Letter",{params:params,response:json})
    
                var data = json ;
    
                if(data.status === true){
                    this.fetch_single_letter_template(this.state.id)
                    addToast({
                        title: 'Edit Letter',
                        content: data.message,
                        time: new Date(),
                        duration: 1000,
                    });
                    this.setState({
                        add_letter_template : data.data,
                        message: "",
                        editor_content: "",
                        editor_background: "",
                        borderNew:false,
                        addModal : false,
                        loading:false
                    })
                }
                else{ 
                    addToast({
                        title: 'Edit Letter',
                        content: data.message,
                        time: new Date(),
                        duration: 1000,
                    });
                    this.setState({
                        add_letter_template : [],
                        message:data.message,
                        addModal : true,
                        loading:false
                    }) 
                }
            });
            
        }
    }
 
     //-------------------------------------------------------------------Delete_API-----------------------------------------------------------------------------------//
     delete_letter_template = () => {
         
         const { addToast, settings } = this.props;
         this.setState({
            loading:true
         })
         var params = {
             letter_id:this.state.id,
         }
         console.log("Params",params)
 
 
         const res = fetch (settings.api_url + 'api/payroll/delete_letter_template',{
             method: 'POST',
             body: JSON.stringify(params),
             headers: {"Content-type" : "application/json; charset=UTF-8"}
         })
         .then((response) => response.json())
         .then(json => {console.log("Delete Letter",{params:params,response:json})
 
             var data = json ;
 
             if(data.status === true){
                 this.fetch_all_letter_template()
                 addToast({
                     title: 'Delete Letter',
                     content: data.message,
                     time: new Date(),
                     duration: 1000,
                 });
                 this.setState({
                     delete_letter_template:data.data,
                     loading:false
                 })
             }
             else{
                 addToast({
                     title: 'Delete Letter',
                     content: data.message,
                     time: new Date(),
                     duration: 1000,
                 });   
                 this.setState({
                     delete_letter_template:[],
                     loading:false
                 }) 
             }
             this.deleteModal()
         });
     }
 
 
 
 
 
 
     
     
 
     render() {
         return (
             <Fragment>
                 <PageTitle className="my_page_title">
                     <div className="row" style={{}}>
                         <div className="col my_head_content" >
                             <h1 className="heading_top">Letter Template</h1>
                             <Button color="warning" style={{color:"#fff"}} className="my_button" 
                             onClick={()=>{this.addModal();
                             this.setState({
                                     lettername:"",
                                     letterformat:"",
                                     message:"",
                                     text:"Add Letter",
                                     button: "Save",
                                     editor_content:"",
                                     editor_background: ""
                                 })
                             }}
                             >Add Format</Button> 
                         </div>
                     </div>
                 </PageTitle>
 
 
                
        <Spinner color="warning" className="spinner_letter" style={{display: this.state.isLoading ,marginTop : gk-100 }}/>
                 <div className="row test_collapse" style={{display: this.state.isLoading === "none" ? "flex" :"none"}} >
 
                     <div className="col-lg-3 col-md-12 col-sm-12 my_table_1 test_collapse my_scroll" id='my_letter_list' 
                     style={{display: my_new_width < 796 ? this.state.ipad_list : this.state.desktop_list,
                     height:(my_exact_height-70)}}
                     >
                         <Table striped className="test_collapse" style={{}}>
                             <thead>
                                 <tr>
                                     <th scope="col" className="my_th" 
                                     style={{ }}>Letter Name</th>
                                 </tr>
                             </thead>
                             <tbody className='my_tbody' style={{}}>
                                 {this.state.fetch_all_letter_template.map((v, i) => {
                                     return (
                                         <tr key={i} style={{ cursor: 'pointer' }} onClick={() => {
                                            
                                             this.setState({
                                                 spinner_1: 'block',
                                             })
                                             
                                             setTimeout(() => {
                                                 this.fetch_single_letter_template(v._id)
                                                 this.setState({
                                                     
                                                 })
                                             }, 0)
                                         }} >
                                             <td className="my_td" 
                                             style={{ borderLeft: v._id == this.state.id ? 
                                             "5px solid  #8bc240" : " 0px" }}>{v.letter_name}
                                             </td>   
                                         </tr>
                                         )
                                     })
                                 } 
                             </tbody>
                         </Table>
                     </div>
 
 
                     
                     <div className="col-lg-9 col-md-12 col-sm-12 my_table_2 test_collapse" id='my_complete_content_effect' 
                     style={{display:my_new_width < 796 ? this.state.ipad_content : this.state.desktop_content}}
                     >
                         <Spinner color="warning" className="spinner_2" style={{ display: this.state.spinner_1 }} />
                         <div className="test_collapse" style={{display:this.state.spinner_1=="none" ? "block":"none"}}>
                             {this.state.fetch_all_letter_template && this.state.fetch_single_letter_template.map((v, i) => {
                                     return (
                                         <div key={i} className='my_new_content'>
 
                                             <div className="my_card_content" style={{display:'inline-flex',
                                             width:'100%',justifyContent:'space-between'}}>
                                                 <h1 className="heading_top_1">{v.letter_name}</h1>
                                                 <div className='my_edit_delete_button' style={{}}>
                                                     <Button color="success" className="my_edit_btn" 
                                                     onClick={()=>{this.fetch_single_letter_template(v._id);
                                                     this.handleEdit(v);this.addModal()}}>Update</Button>{" "}&nbsp;&nbsp;
                                                     <Button color="danger" className="my_delete_btn" 
                                                     onClick={()=>{this.fetch_single_letter_template(v._id);
                                                     this.deleteModal()}}>Delete</Button>{" "}&nbsp;&nbsp;
                                                     <Button  color="primary" className="my_back_btn" 
                                                     style={{display:my_new_width<796 ? "block":this.state.my_back_icon}}
                                                     onClick={()=>{
                                                     this.setState({
                                                         ipad_list: "block"
                                                     })
                                                     }}>Back</Button>
                                                 </div>
                                             </div>
 
                                             <div className='my_card_background' style={{height:(my_exact_height -140)}}>
                                                 <Card className="my_card" style={{height:(my_exact_height - 160)}}>
                                                     <p className="my_map_letter" id="my_content" style={{paddingTop:'20px'}}
                                                     dangerouslySetInnerHTML={{__html: v.letter_content}}
                                                     ></p> 
                                                 </Card>
                                             </div>
 
                                         </div>
                                     )
                                 })
                             }
                         </div>
                     </div>
 
                 </div>
 
 
                 {/*Add Modal*/}
                 <Modal isOpen={ this.state.addModal } toggle={ this.addModal } 
                 className={'modal-dialog-centered modal-width'}>
                     <div className="modal-header">
                         <h5 className="modal-title h2" style={{marginLeft:'14px'}}>{this.state.text}</h5>
                         <Button className="close" color="" onClick={ ()=>{this.addModal()} }>
                             <Icon style={{color:'grey'}} name="x" />
                         </Button>
                     </div>
                     <ModalBody style={{paddingBottom:'0px'}}>
                         <Form>
                             <Row>
                                 <Col md={6}>
                                     <FormGroup>
                                         <Label for="exampleLetterName">Letter Name 
                                         <span style={{color:'red'}}>*</span></Label>
                                         <Input id="exampleLetterName" type='text' 
                                             invalid={this.state.message == "" ? false : true}
                                             style={{invalid: this.state.borderNew && this.state.lettername  == "" ? true : false,
                                             }}
                                             name="lettername" 
                                             autoComplete="off"
                                             value={this.state.lettername} 
                                             placeholder='Letter Name'
                                             onChange={(e)=>{
                                             this.setState({
                                                 lettername: e.target.value,
                                                 message:"",
                                                 editor_content:"",
                                                 editor_background:"",
                                             })
                                         }}/> 
                                     </FormGroup>
                                 </Col>
                             </Row>
                             <Row>
                                 <Col md={8} style={{}}>
                                     <FormGroup>
                                         <Label for="exampleLetterFormat" style={{}}>Letter Format 
                                         <span style={{color:'red'}}>*</span></Label>
                                         <div id='my_editor' className={this.state.borderNew == true && (this.state.letterformat == "<p><br></p>" || this.state.letterformat == "") ? "my_text_editor my_scroll showInvalid" : "my_text_editor my_scroll"} 
                                             style={{ overflowY: 'scroll',height:'500px' }}
                                             >
                                             <TextEditor id="exampleLetterFormat"
                                                 className="my_text_editor"
                                                 value={ this.state.letterformat } 
                                                 onChange={ this.handleLetterFormat } 
                                             />
                                         </div>
                                     </FormGroup>
                                 </Col>
                                 <Col md={4}>
                                     <FormGroup  style={{marginTop:'25px'}}>
                                         <Label>Letter format should contain these characters</Label>
                                         <div className='my_compulsory_char_list'>
                                             <p className='my_imp_char'>{this.state.name}</p>
                                             <p className='my_imp_char'>{this.state.designation}</p>
                                             <p className='my_imp_char'>{this.state.address}</p>
                                             <p className='my_imp_char'>{this.state.rmod}</p>
                                             <p className='my_imp_char'>{this.state.rmmis}</p>
                                             <p className='my_imp_char'>{this.state.assigning_date}</p>
                                             <p className='my_imp_char'>{this.state.salary_package}</p>
                                             <p className='my_imp_char'>{this.state.salary_structure}</p>
                                         </div>
                                     </FormGroup>
                                 </Col>
                             </Row>
                         </Form>
                     </ModalBody>
                     <div className='my_error_message'>
                         <div className="my_error_msg" style={{textAlign:'center',color:"red"}}>{this.state.message}</div>
                     </div>
                     <ModalFooter style={{border:'none'}}>
                         <Button color="secondary" onClick={this.addModal}>Close</Button>
                         <Button disabled={this.state.loading} color="warning" className="my_button" style={{color:"#fff"}} onClick={()=>{this.switch_function()}}>
                         {this.state.button}{this.state.loading ? (
                                <Spinner />
                            ) : ''}</Button>
                     </ModalFooter>
                 </Modal>
 
 
                 {/*Delete Modal*/}
                 <Modal isOpen={ this.state.deleteModal } toggle={ this.deleteModal } 
                 className={ 'modal-dialog-centered my_delete_modal' }>
                     <ModalBody style={{textAlign:'center'}}>Are you sure you want to delete?</ModalBody>
                     <ModalFooter style={{border:'none',justifyContent:'center'}}>
                         <Button color="secondary" onClick={this.deleteModal}>No</Button>
                         <Button disabled={this.state.loading} color="warning" style={{color:"#fff"}} className="my_button" 
                         onClick={()=>{this.delete_letter_template()}}>Yes{this.state.loading ? (
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
 
/**
 * Internal Dependencies
 */
// Auth
import AuthSignIn from './AuthSignIn';
import AuthSignUp from './AuthSignUp';

// Start
import Dashboard from './Dashboard';

// Apps
import Mailbox from './Mailbox';
import Messenger from './Messenger';
import Calendar from './Calendar';
import ProjectManagement from './ProjectManagement';
import Task from './Task';
import FileManager from './FileManager';
import Profile from './Profile';

// Content
import Grid from './Grid';
import Colors from './Colors';
import Typography from './Typography';
import ComponentTable from './ComponentTable';

// Components Base
import ComponentAlert from './ComponentAlert';
import ComponentBadge from './ComponentBadge';
import ComponentBreadcrumbs from './ComponentBreadcrumbs';
import ComponentButton from './ComponentButton';
import ComponentCard from './ComponentCard';
import ComponentCarousel from './ComponentCarousel';
import ComponentCollapse from './ComponentCollapse';
import ComponentDropdown from './ComponentDropdown';
import ComponentListGroup from './ComponentListGroup';
import ComponentMediaObject from './ComponentMediaObject';
import ComponentModal from './ComponentModal';
import ComponentNav from './ComponentNav';
import ComponentPagination from './ComponentPagination';
import ComponentPopover from './ComponentPopover';
import ComponentProgress from './ComponentProgress';
import ComponentSpinner from './ComponentSpinner';
import ComponentTabs from './ComponentTabs';

// Components Advanced
import ComponentIconsFeather from './ComponentIconsFeather';
import ComponentIconsFontAwesome from './ComponentIconsFontAwesome';
import ComponentChartsChartJs from './ComponentChartsChartJs';
import ComponentChartsChartist from './ComponentChartsChartist';
import ComponentChartsPeity from './ComponentChartsPeity';
import ComponentChartsEcharts from './ComponentChartsEcharts';
import ComponentChartsFlot from './ComponentChartsFlot';
import ComponentTimeline from './ComponentTimeline';
import ComponentTreeView from './ComponentTreeView';
import ComponentToast from './ComponentToast';
import ComponentSweetAlert from './ComponentSweetAlert';
import ComponentMaps from './ComponentMaps';
import ComponentDataTables from './ComponentDataTables';

// Forms
import FormsBase from './FormsBase';
import FormsDateTimePicker from './FormsDateTimePicker';
import FormsValidation from './FormsValidation';
import FormsTouchSpin from './FormsTouchSpin';
import FormsRangeSlider from './FormsRangeSlider';
import FormsInputMasks from './FormsInputMasks';
import FormsDropzone from './FormsDropzone';
import FormsColorPicker from './FormsColorPicker';
import FormsSelect from './FormsSelect';
import Campaign from './Campaign';
import CampaignArchive from './CampaignArchive';
import FormsWysiwyg from './FormsWysiwyg';
import FormsMarkdown from './FormsMarkdown';
import Contacts from './Contacts';
import ReferenceUser from './ReferenceUser'
import Payroll from './Payroll'
import Attendance from './Attendance';
import LeaveRequest from './LeaveRequest';
import Loans from './Loans';
import CompanyInfo from './CompanyInfo';
import ShowAttendance from './ShowAttendance';
import Allowance from './Allowance';
import PfReport from './PfReport';
import PTECReport from './PTECReport';
import EsicReport from './EsicReport';
import AttendanceReport from './AttendanceReport';
import PayrollReport from './PayrollReport';
import Recruitment from './Recruitment';
export default {
    // ************ Create New Pages Add from Khushboo Start ************************
    // '/': Dashboard,
    // Apps
    // '/doctors': Mailbox,
    '/user-management': Messenger,
    '/setting': Calendar,
    '/': Profile,
    '/support': ComponentButton,
    '/sales': ComponentCard,
    '/lead': ComponentChartsEcharts,
    '/task': ComponentChartsFlot,
    '/vehicle-registration-year': ComponentCarousel,
    '/vehicle-brand': ComponentCollapse,
    '/fuel-type': ComponentDropdown,
    '/rto': ComponentChartsChartist,
    '/vehicle-model': ComponentChartsChartJs,
    '/component-tabs': ComponentTabs,
    '/endorsement': FormsTouchSpin,


// *********** Signin & Home  Index

    '/sign-in': AuthSignIn,
    '/home': AuthSignUp,


// *********** Operations  Index
    '/operation-dock': Grid,
    '/mis-dock': Colors,
    '/deviation-dock': FormsWysiwyg,


// *********** Payments  Index

    '/pending-payment': ComponentProgress,
    '/pending-payout': ComponentChartsPeity,


// *********** Accounts  Index


    '/accounting': ComponentTable,
    '/cheque': Mailbox,
    '/cheque-report': ComponentSpinner,
    '/customer-cheque': ComponentTimeline,


// *********** Time Tracker Index
    '/time-tracker': Task,



// *********** Employee  Index

    '/recruitment': Recruitment,
    '/employee-management': FileManager,
    '/agencies-telesales': ComponentBadge,



// *********** Reports  Index

    '/daily-sales-report': ComponentIconsFeather,
    '/sm-business-wise': ComponentIconsFontAwesome,
    '/insurer-wise-business': ComponentListGroup,
    '/pending-payout-report': ComponentMediaObject,
    '/pending-payment-report': ComponentMaps,
    '/employee-wise-report': ComponentModal,
    '/lob-report': ComponentNav,
    '/investment-report': ComponentPagination,
    '/company-wise-report': ComponentPopover,



// *********** Masters  Index

    '/masters': ProjectManagement,
    '/admin-role': ComponentAlert,
    '/designation': ComponentBreadcrumbs,
    '/insurer': Typography,
    '/telecalling': FormsSelect,
    '/message-generator': ComponentTreeView,
    '/salary-structure': ComponentSweetAlert,
    '/holiday': FormsBase,
    '/leaves-model': FormsColorPicker,
    '/company-information': CompanyInfo,
    '/letter-template': FormsDropzone,


 // *********** Telecalling  Index

    '/campaign': Campaign,
    '/archive-campaign': CampaignArchive,
    '/contacts': Contacts,
    '/dashborad': Dashboard,
    '/reference-user': ReferenceUser,
    '/component-toast': ComponentToast,


// *********** Payroll Index

    '/payroll-dashboard': FormsRangeSlider,
    '/payroll': Payroll,
    
    '/attendance' : Attendance,
    '/requested-leave' : LeaveRequest,
    '/loans' : Loans,
    '/show-attendance' : ShowAttendance,
    '/allowance' : Allowance,
    '/pf-report' : PfReport,
    '/ptec-report' : PTECReport,
    '/esic-report' : EsicReport,
    '/attendance-report' : AttendanceReport,
    '/payroll-report' : PayrollReport,




// ************ Create New Pages Add from Khushboo End ************************






    // Components Base
    // '/component-alert': ComponentAlert,
    // '/component-badge': ComponentBadge,
    // '/component-breadcrumbs': ComponentBreadcrumbs,
    // '/component-button': ComponentButton,
    // '/component-card': ComponentCard,
    // '/component-carousel': ComponentCarousel,
    // '/component-collapse': ComponentCollapse,
    // '/component-dropdown': ComponentDropdown,
    // '/component-list-group': ComponentListGroup,
    // '/component-media-object': ComponentMediaObject,
    // '/component-modal': ComponentModal,
    // '/component-nav': ComponentNav,
    // '/component-pagination': ComponentPagination,
    // '/component-popover': ComponentPopover,
    // '/component-progress': ComponentProgress,


    // Components Advanced
    // '/component-icons-feather': ComponentIconsFeather,
    // '/component-icons-fontawesome': ComponentIconsFontAwesome,
    // '/component-charts-chartjs': ComponentChartsChartJs,
    // '/component-charts-chartist': ComponentChartsChartist,
    // '/component-charts-peity': ComponentChartsPeity,
    // '/component-charts-echarts': ComponentChartsEcharts,
    // '/component-charts-flot': ComponentChartsFlot,
    // '/component-timeline': ComponentTimeline,
    // '/component-tree-view': ComponentTreeView,
    '/component-toast': ComponentToast,
    // '/component-sweet-alert': ComponentSweetAlert,
    // '/component-maps': ComponentMaps,
    '/component-data-tables': ComponentDataTables,

    // Forms Base
    // '/forms-base': FormsBase,
    '/forms-datetime': FormsDateTimePicker,
    '/forms-validation': FormsValidation,
    // '/forms-touch-spin': FormsTouchSpin,
    // '/forms-range-slider': FormsRangeSlider,
    '/forms-input-masks': FormsInputMasks,
    // '/forms-dropzone': FormsDropzone,
    // '/forms-colorpicker': FormsColorPicker,
    // '/forms-select': FormsSelect,
    // '/forms-wysiwyg': FormsWysiwyg,
    '/forms-markdown': FormsMarkdown,
};

// Layout Components
import Banner from "~/components/layout/Banner/Banner";
import Footer from "~/components/layout/Footer/Footer";
import PreviewFooter from "~/components/layout/Footer/PreviewFooter";
import SearchBar from "~/components/layout/SearchBar/SearchBar";
import PreviewHeader from "~/components/layout/Header/PreviewHeader";

// Sidebar Components
import Sidebar from "~/components/layout/Sidebar/sidebar";
import DesktopSidebar from "~/components/layout/Sidebar/DesktopSidebar";
import MobileSidebar from "~/components/layout/Sidebar/sidebar";
import SettingsSidebar from "~/components/layout/Sidebar/SettingsSidebar";

 
//Buttons
import GenerateButton from "~/components/common/ui/Buttons/GenerateBtn"
import CreateButton from "~/components/common/ui/Buttons/CreateBtn"

//Fields
import DropdownField from "~/components/common/ui/Dropdown/DropdownField"
import CheckboxField from "~/components/common/ui/Input/CheckBox"
import InputField from "~/components/common/ui/Input/InputField"

  
//Textrea
import Textarea from "~/components/common/ui/Textarea/Textarea"

//Image Uploader
import ImageUploader from "~/components/common/ui/ImageUploader/ImageUploader"

//Dropzone
import Dropzone from "~/components/common/ui/Dropzone/Dropzone"

 
  
// Chat Components
import ChatContainer from "~/components/common/ui/Chats/Container/ChatContainer";
import PreviousChat from "~/components/common/ui/Chats/menu/PreviousMessageContainer";
import Menu from "~/components/common/ui/Chats/menu/Menu";
import ChatMain  from "~/components/common/ui/Chats/main/Chatmain";

//Create Component
import CharacterForm from "~/components/common/ui/Form/CharacterForm"
import RequiredFieldsPopup from "~/components/common/ui/Fields/RequiredFieldsPopup"
import FormActions from "~/components/common/ui/Actions/FormActions"
import TokenSummary from "~/components/common/ui/Summary/TokenSummary"
import VisibilityCheckboxes from "~/components/common/ui/CheckBox/VisibilityCheckboxes"
import GenderDropdown from "~/components/common/ui/Dropdown/GenderDropdown"
import TextareaSection from "~/components/common/ui/Sections/TextareaSection"
import ImageUpload from "~/components/common/ui/ImageUploader/ImageUpload"

// UI Components
import CharacterCard from "~/components/common/ui/Cards/CharacterCard";
import Pagination from "~/components/common/ui/Pagination/Pagination";
import SkeletonMessage from "~/components/common/ui/Skeleton/SkeletonMessage";
import SkeletonCard from "~/components/common/ui/Skeleton/SkeletonCard";
import CustomButton from "~/components/common/ui/Buttons/Buttons";

// Modal Components
import CharacterCardModal from "~/components/common/ui/Modal/CharacterCardModal";
import RegisterModal from "~/components/common/ui/Modal/Auth/RegisterModal";
import LoginModal from "~/components/common/ui/Modal/Auth/Loginmodal";

// Card Components
import { Card, CardContent, CardTitle, CardHeader } from "~/components/common/ui/ShadCdn/card";


// Persona Components
import Persona from "~/components/common/ui/Persona/Persona";

export {
  // Layout
  Banner,
  Footer,
  SearchBar,
  PreviewHeader,
  PreviewFooter,

  //Create 
  CharacterForm,
  RequiredFieldsPopup,
  FormActions,
  TokenSummary,
  VisibilityCheckboxes,
  GenderDropdown,
  TextareaSection,
  ImageUpload,
  
  // Chat
  ChatContainer,
  PreviousChat,
  Menu,
  ChatMain,

  // UI
  CharacterCard,
  Pagination,
  SkeletonMessage,
  SkeletonCard,
  CustomButton,

  //Fields
  CheckboxField,
  DropdownField,


  //Inputs
  InputField,

  //Buttons
  GenerateButton,
  CreateButton,

  //Dropzone
  Dropzone,

  // Sidebar
  Sidebar,
  DesktopSidebar,
  MobileSidebar,
  SettingsSidebar,

  //Textareas
  Textarea,

  // Modals
  CharacterCardModal,
  RegisterModal,
  LoginModal,

  // Cards
  Card,
  CardContent,
  CardTitle,
  CardHeader,

  // Image Uploader
  ImageUploader,

  // Persona
  Persona
};


//Had to organize everything else i would go insane when looking at everything compiled into one

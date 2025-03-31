// Layout Components
import Banner from '~/components/layout/Banner/Banner';
import Footer from '~/components/layout/Footer/Footer';
import PreviewFooter from '~/components/layout/Footer/PreviewFooter';
import SearchBar from '~/components/layout/SearchBar/SearchBar';
import PreviewHeader from '~/components/layout/Header/PreviewHeader';

// Sidebar Components
import Sidebar from '~/components/layout/Sidebar/sidebar';
import DesktopSidebar from '~/components/layout/Sidebar/DesktopSidebar';
import MobileSidebar from '~/components/layout/Sidebar/sidebar';
import SettingsSidebar from '~/components/layout/Sidebar/SettingsSidebar';

// Chat Components
import ChatContainer from '~/components/common/ui/Chats/Container/ChatContainer';
import EmptyContent from '~/components/common/ui/Chats/menu/PreviousMessageContainer';
import Menu from '~/components/common/ui/Chats/menu/Menu';

// UI Components
import CharacterCard from '~/components/common/ui/Cards/CharacterCard';
import Pagination from '~/components/common/ui/Pagination/Pagination';
import SkeletonMessage from '~/components/common/ui/Skeleton/SkeletonMessage';
import SkeletonCard from '~/components/common/ui/Skeleton/SkeletonCard';
import CustomButton from '~/components/common/ui/Buttons/Buttons';

// Modal Components
import CharacterCardModal from '~/components/common/ui/Modal/CharacterCardModal';
import RegisterModal from '~/components/common/ui/Modal/Auth/RegisterModal';
import LoginModal from '~/components/common/ui/Modal/Auth/Loginmodal';

// Card Components
import { Card, CardContent, CardTitle, CardHeader } from '~/components/common/ui/ShadCdn/card';

// Create Components
import CreateInputs from '~/components/common/ui/Create/Inputs/CreateInputs';
import ImageUploader from '~/components/common/ui/Create/ImageUploader';

// Persona Components
import Persona from '~/components/common/ui/Persona/Persona';

export {
  // Layout
  Banner,
  Footer,
  SearchBar,
  PreviewHeader,
  PreviewFooter,

  // Sidebar
  Sidebar,
  DesktopSidebar,
  MobileSidebar,
  SettingsSidebar,

  // Chat
  ChatContainer,
  EmptyContent,
  Menu,

  // UI
  CharacterCard,
  Pagination,
  SkeletonMessage,
  SkeletonCard,
  CustomButton,

  // Modals
  CharacterCardModal,
  RegisterModal,
  LoginModal,

  // Cards
  Card,
  CardContent,
  CardTitle,
  CardHeader,

  // Create
  CreateInputs,
  ImageUploader,

  // Persona
  Persona
};


//Had to organize everything else i would go insane when looking at everything compiled into one

import { CharacterForm } from '~/components';
import Sidebar from "~/components/layout/Sidebar/sidebar";
import CommunityGuidelines from "~/components/layout/Sidebar/GuidelineSidebar";

export default function CreatePage() {
  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />
      <main className="flex-1">
        <CharacterForm />
        <div className="md:hidden">
          <CommunityGuidelines className="mt-4" />
        </div>
      </main>
      <div className="hidden md:block">
        <CommunityGuidelines />
      </div>
    </div>
  );
}

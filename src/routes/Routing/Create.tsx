import { CharacterForm } from '~/components';
import { Sidebar, CommunityGuidelines } from '~/components';

export default function CreatePage() {
  return (
    <div className="flex flex-col sm:flex-row md:flex-row">
      <Sidebar />
      <main className="flex-1">
        <CharacterForm />
        <div className="block sm:hidden md:hidden">
          <CommunityGuidelines className="mt-4" />
        </div>
      </main>
      <div className="hidden sm:block md:block">
        <CommunityGuidelines />
      </div>
    </div>
  );
}

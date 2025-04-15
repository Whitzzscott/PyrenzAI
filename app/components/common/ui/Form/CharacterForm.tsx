import React, { useState } from "react";
import { Utils } from "~/Utility/Utility";
import { useUserStore as UserStore } from "~/store/UserStore";
import { useCharacterStore } from "~/store/CreateStore";
import {
  TextareaSection,
  GenderDropdown,
  VisibilityCheckboxes,
  TokenSummary,
  FormActions,
  RequiredFieldsPopup,
  ImageUpload,
} from "~/components";

interface CharacterData {
  persona: string;
  name: string;
  model_instructions: string;
  scenario: string;
  description: string;
  first_message: string;
  tags: string;
  gender: string;
  is_public: boolean;
  is_nsfw: boolean;
  textarea_token: { [key: string]: number };
  token_total: number;
}

interface ApiResponse {
  data?: any;
  error?: any;
}

interface UserState {
  user_uuid: string | null;
}

export default function CharacterForm() {
  const [loading, setLoading] = useState(false);
  const [showRequiredFieldsPopup, setShowRequiredFieldsPopup] = useState(false);
  const [missingFields, setMissingFields] = useState<string[]>([]);

  const characterData = useCharacterStore((state) => state);
  const setCharacterData = useCharacterStore((state) => state.setCharacterData);

  const user_uuid = UserStore((state: UserState) => state.user_uuid);

  const requiredFields = [
    "persona",
    "name",
    "model_instructions",
    "scenario",
    "description",
    "first_message",
    "tags",
    "gender",
  ];

  const handleImageSelect = (file: File | null) => {};

  const handleDropdownChange = (value: string) => {
    setCharacterData({ gender: value });
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox" && e.target instanceof HTMLInputElement) {
      setCharacterData({ [name]: e.target.checked });
    } else {
      setCharacterData({ [name]: value });
    }
  };

  const handleClear = () => {
    const emptyData: Omit<CharacterData, "textarea_token" | "token_total"> = {
      persona: "",
      name: "",
      model_instructions: "",
      scenario: "",
      description: "",
      first_message: "",
      tags: "",
      gender: "",
      is_public: false,
      is_nsfw: false,
    };
    setCharacterData({ ...emptyData, textarea_token: {} });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const missing = requiredFields.filter(
      (field) => !characterData[field as keyof CharacterData],
    );

    if (missing.length > 0) {
      setMissingFields(missing);
      setShowRequiredFieldsPopup(true);
      setLoading(false);
      return;
    }

    const bannerImage = sessionStorage.getItem("Character_Create_Image_Banner");
    const profileImage = sessionStorage.getItem(
      "Character_Create_Image_Profile",
    );

    if (!bannerImage || !profileImage) {
      alert("Missing required item: Images");
      setLoading(false);
      return;
    }

    try {
      const response: ApiResponse = await Utils.post("/api/createCharacter", {
        ...characterData,
        bannerImage,
        profileImage,
        input_user_uuid: user_uuid,
      });

      if (response.error) {
        console.error("Error creating character:", response.error);
      } else {
        console.log("Character created:", response.data);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-black p-8 rounded-lg shadow-lg w-full max-w-2xl space-y-6"
      >
        <ImageUpload onImageSelect={handleImageSelect} />
        <TextareaSection
          formState={characterData}
          handleChange={handleChange}
        />
        <GenderDropdown
          value={characterData.gender}
          onChange={handleDropdownChange}
        />
        <VisibilityCheckboxes
          isPublic={characterData.is_public}
          isNSFW={characterData.is_nsfw}
          handleChange={handleChange}
        />
        <TokenSummary tokenTotal={characterData.token_total} />
        <FormActions onClear={handleClear} loading={loading} />
      </form>
      {showRequiredFieldsPopup && (
        <RequiredFieldsPopup
          missingFields={missingFields}
          onClose={() => setShowRequiredFieldsPopup(false)}
        />
      )}
    </div>
  );
}

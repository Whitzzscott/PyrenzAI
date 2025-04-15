import { useEffect, useState, useRef } from "react";
import { supabase } from "~/Utility/supabaseClient";
import { useUserStore as UserStore } from "~/store/UserStore";
import {
  PreviewHeader,
  PreviewFooter as Footer,
  LoginModal,
  RegisterModal,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  DownloadModal,
} from "~/components";
import "~/Assets/Css/Preview.css";
import "~/Assets/Fonts/BalooDa2-Regular.ttf";
import Background from "~/Assets/Images/BackgroundTree.png";
import ChattingExample from "~/Assets/Images/ChattingExample.png";
import MagicalBook from "~/Assets/Images/MagicalBook.png";

interface UserState {
  user_uuid: string | null;
  auth_key: string | null;
  setUserUUID: (uuid: string) => void;
  setAuthKey: (key: string) => void;
}

export const meta = () => [
  { title: "Pyrenz AI - A Powerful AI Chat Application" },
];

const cardData = [
  {
    cardName: "Smart. Fast. Free.",
    cardImage: ChattingExample,
    cardDescription:
      "Talk to characters anytime. No delays, no message limits just pure roleplay.",
  },
  {
    cardName: "Tools For Creator",
    cardImage: MagicalBook,
    cardDescription:
      "Experience Pyrenz tools unleash your creativity with lorebooks, powerful model customization, and so much more",
  },
  {
    cardName: "Unlimited Messages",
    cardImage: ChattingExample,
    cardDescription:
      "Free or not, welcome to PyrenzAi! We offer unlimited messages for free!",
  },
];

export default function Preview() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);
  const pyrenzAiRef = useRef(null);
  const discoverMoreRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const setUserUUID = UserStore((state: UserState) => state.setUserUUID);
  const setAuthKey = UserStore((state: UserState) => state.setAuthKey);

  useEffect(() => {
    const fetchUserData = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error("Error fetching session:", error.message);
        return;
      }

      if (session) {
        const { user } = session;
        const user_data = {
          email: user.email,
          full_name: user.user_metadata.full_name,
          avatar_url: user.user_metadata.avatar_url,
          phone: user.phone,
          last_sign_in_at: user.last_sign_in_at,
          user_uuid: user.id,
        };

        const { data, error } = await supabase.rpc(
          "handle_user_authentication",
          { user_data },
        );

        if (error) {
          console.error("Error during authentication:", error.message);
          return;
        }

        const authResponse = data;

        if (authResponse.success) {
          if (authResponse.auth_key) {
            setAuthKey(authResponse.auth_key);
          } else {
            console.error("[ERROR]: Auth Key not provided in the response");
          }
        } else {
          console.error("[ERROR]: Authentication failed:", authResponse.error);
        }
      }
    };

    fetchUserData();

    const observer = new IntersectionObserver(
      (entries) => {
        const pyrenzAiEntry = entries.find(
          (entry) => entry.target === pyrenzAiRef.current,
        );
        const discoverMoreEntry = entries.find(
          (entry) => entry.target === discoverMoreRef.current,
        );

        if (pyrenzAiEntry && pyrenzAiEntry.isIntersecting) {
          setHideHeader(false);
        } else if (discoverMoreEntry && discoverMoreEntry.isIntersecting) {
          setHideHeader(true);
        }
      },
      {
        threshold: 0.5,
      },
    );

    if (pyrenzAiRef.current) {
      observer.observe(pyrenzAiRef.current);
    }

    if (discoverMoreRef.current) {
      observer.observe(discoverMoreRef.current);
    }

    return () => {
      if (pyrenzAiRef.current) {
        observer.unobserve(pyrenzAiRef.current);
      }
      if (discoverMoreRef.current) {
        observer.unobserve(discoverMoreRef.current);
      }
    };
  }, [setUserUUID, setAuthKey]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div
      className="flex flex-col font-[BalooDa2] bg-cover bg-fixed bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${Background})`,
      }}
    >
      <div
        className={`fixed top-0 w-full z-50 transition-transform duration-500 ${
          hideHeader ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <PreviewHeader
          setShowLogin={setShowLogin}
          setShowRegister={setShowRegister}
          hideNavbar={hideHeader}
        />
      </div>

      <div className="pt-20 flex-grow">
        <section
          ref={pyrenzAiRef}
          className="flex flex-col justify-center items-center min-h-screen text-white -mt-16"
        >
          <h1 className="text-7xl font-extrabold mb-4 text-center">
            Pyrenz AI
          </h1>
          <p className="text-2xl opacity-80 text-center">
            Enrich Creativity with AI, with advanced tools, let creativity flow
          </p>
          <button
            className="mt-4 bg-red-500 text-white px-8 py-3 rounded w-full max-w-xs hover:bg-red-600 transition-colors duration-300"
            onClick={openModal}
          >
            Get Started
          </button>
        </section>

        <DownloadModal isModalOpen={isModalOpen} closeModal={closeModal} />

        <section
          ref={discoverMoreRef}
          className="p-10 text-white pb-32 md:pb-16 max-h-screen overflow-y-auto md:max-h-none md:overflow-visible"
        >
          <h2 className="text-4xl font-bold mb-8 text-center">Discover More</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {cardData.map((card, i) => (
              <Card
                key={i}
                className="bg-gray-800 text-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl hover:scale-105 transition-transform duration-300 border-2 border-red-500"
              >
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold p-4">
                    {card.cardName}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <p className="opacity-90">{card.cardDescription}</p>
                  <img
                    src={card.cardImage}
                    alt={card.cardName}
                    className="mt-4 rounded-lg w-full"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-44">
        <Footer />
      </div>

      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onRegisterOpen={() => {
            setShowLogin(false);
            setShowRegister(true);
          }}
        />
      )}
      {showRegister && (
        <RegisterModal
          onClose={() => setShowRegister(false)}
          onRegisterOpen={() => {
            setShowRegister(false);
            setShowLogin(true);
          }}
        />
      )}
    </div>
  );
}

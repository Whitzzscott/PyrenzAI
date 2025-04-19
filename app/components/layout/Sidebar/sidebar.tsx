import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaHome, FaUser, FaPlus, FaCog, FaComments } from "react-icons/fa";
import { useNavigate } from "@remix-run/react";
import { supabase } from "~/Utility/supabaseClient";
import type { User } from "@supabase/supabase-js";

export default function Sidebar({ className }: { className?: string }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };

    checkUser();
  }, []);

  const menuItems = [
    { name: "Home", icon: <FaHome size={20} />, path: "/Home" },
    { name: "Create", icon: <FaPlus size={20} />, path: "/Create" },
    { name: "Settings", icon: <FaCog size={20} />, path: "/Settings" },
    { name: "Chats", icon: <FaComments size={20} />, path: "/Chats" },
  ];

  return (
    <>
      <motion.div
        className={`hidden md:flex fixed top-0 left-0 h-screen w-16 bg-gray-900 text-white flex-col justify-between p-4 rounded-r-3xl shadow-lg z-50 ${className}`}
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center gap-6">
          {menuItems.slice(0, 2).map((item) => (
            <SidebarItem
              key={item.name}
              item={item}
              hovered={hovered}
              setHovered={setHovered}
              navigate={navigate}
            />
          ))}
        </div>
        <div className="flex flex-col items-center gap-6">
          {user ? (
            <SidebarItem
              item={{
                name: "Profile",
                icon: (
                  <img
                    src={
                      user.user_metadata?.avatar_url || "/default-avatar.png"
                    }
                    alt="Avatar"
                    className="w-12 h-12 rounded-full border-2 border-gray-700"
                  />
                ),
                path: "/Profile",
              }}
              hovered={hovered}
              setHovered={setHovered}
              navigate={navigate}
            />
          ) : (
            <SidebarItem
              key="Login"
              item={{
                name: "Login",
                icon: <FaUser size={20} />,
                path: "/Login",
              }}
              hovered={hovered}
              setHovered={setHovered}
              navigate={navigate}
            />
          )}
          {menuItems.slice(2).map((item) => (
            <SidebarItem
              key={item.name}
              item={item}
              hovered={hovered}
              setHovered={setHovered}
              navigate={navigate}
            />
          ))}
        </div>
      </motion.div>

      <motion.div
        className="md:hidden fixed bottom-0 left-0 w-full bg-gray-900 text-white flex justify-around p-2 shadow-lg z-50"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {menuItems.map((item) => (
          <MobileNavItem key={item.name} item={item} navigate={navigate} />
        ))}
        {user ? (
          <MobileNavItem
            item={{
              name: "",
              icon: (
                <img
                  src={user.user_metadata?.avatar_url || "/default-avatar.png"}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full border-2 border-gray-700"
                />
              ),
              path: "/Profile",
            }}
            navigate={navigate}
          />
        ) : (
          <MobileNavItem
            key="Login"
            item={{ name: "Login", icon: <FaUser size={20} />, path: "/Login" }}
            navigate={navigate}
          />
        )}
      </motion.div>
    </>
  );
}

function SidebarItem({ item, hovered, setHovered, navigate }: any) {
  return (
    <motion.div
      className="relative flex items-center justify-center w-12 h-12 rounded-lg hover:bg-gray-800 cursor-pointer"
      onClick={() => navigate(item.path)}
      onMouseEnter={() => setHovered(item.name)}
      onMouseLeave={() => setHovered(null)}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      {item.icon}
      {hovered === item.name && (
        <motion.div
          className="absolute left-14 top-1/2 -translate-y-1/2 bg-gray-800 text-white px-3 py-1 rounded-lg text-xs shadow-md z-50 pointer-events-auto"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {item.name}
        </motion.div>
      )}
    </motion.div>
  );
}

function MobileNavItem({ item, navigate }: any) {
  return (
    <motion.div
      className="flex flex-col items-center cursor-pointer"
      onClick={() => navigate(item.path)}
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.3 }}
    >
      {item.icon}
      {item.name && <span className="text-xs">{item.name}</span>}
    </motion.div>
  );
}

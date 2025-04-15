export default function PreviewFooter() {
  return (
    <footer className="bg-transparent text-white py-10 w-screen animate__animated animate__fadeInUp animate__slow">
      <div className="w-screen px-16 mx-auto flex flex-wrap justify-between items-start">
        <div className="w-full md:w-1/3 px-6">
          <h3 className="font-bold text-lg border-b-2 border-[#E03201] pb-1">
            Quick Links
          </h3>
          <ul className="mt-2 space-y-2">
            {[
              { name: "Home", path: "/Home" },
              { name: "Explore", path: "/Home" },
              { name: "Chats", path: "/Chats" },
              { name: "Discord", path: "/Discord" },
            ].map((item, index) => (
              <li className="group" key={index}>
                <a
                  href={item.path}
                  className="transition duration-300 hover:text-[#E03201] group-hover:translate-x-2 block"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full md:w-1/3 px-6 mt-8 md:mt-0">
          <h3 className="font-bold text-lg border-b-2 border-[#E03201] pb-1">
            Guide
          </h3>
          <ul className="mt-2 space-y-2">
            {[
              { name: "Bot Creation", path: "/bot-creation" },
              { name: "How Token Works", path: "/token-guide" },
              { name: "Lorebooks", path: "/lorebooks" },
            ].map((item, index) => (
              <li className="group" key={index}>
                <a
                  href={item.path}
                  className="transition duration-300 hover:text-[#E03201] group-hover:translate-x-2 block"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full md:w-1/3 px-6 mt-8 md:mt-0">
          <h3 className="font-bold text-lg border-b-2 border-[#E03201] pb-1">
            Legal
          </h3>
          <ul className="mt-2 space-y-2">
            {[
              { name: "Privacy Policy", path: "/privacy-policy" },
              { name: "Terms of Service", path: "/terms" },
              { name: "Rules", path: "/rules" },
            ].map((item, index) => (
              <li className="group" key={index}>
                <a
                  href={item.path}
                  className="transition duration-300 hover:text-[#E03201] group-hover:translate-x-2 block"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="w-full text-center mt-12   pt-4 text-sm opacity-75">
        © {new Date().getFullYear()} Pyrenz AI. All Rights Reserved.
      </div>
    </footer>
  );
}

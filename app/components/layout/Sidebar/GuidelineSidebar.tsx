import { motion } from 'framer-motion';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

export default function CommunityGuidelines({ className }: { className?: string }) {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-gray-900 text-white p-6 rounded-lg shadow-xl md:fixed md:top-0 md:right-0 md:h-screen md:w-72 md:overflow-y-auto relative ${className}`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold pb-2">Community Guidelines</h2>
        <button
          onClick={toggleExpand}
          className="text-white absolute right-6 top-6"
        >
          <FontAwesomeIcon icon={isExpanded ? faChevronUp : faChevronDown} />
        </button>
      </div>
      <hr className="border-gray-700 mb-6 w-full" />
      <motion.div
        animate={{ height: isExpanded ? 'auto' : '0px' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <ul className="space-y-4 list-disc list-inside pl-4 marker:text-white">
          <motion.li
            whileHover={{ x: 5 }}
            className="flex items-start"
          >
            <span className="mr-2">&#x2022;</span>
            <span>No underage characters or any depictions resembling minors are allowed in any form. This includes visual art, written descriptions, dialogue, or implications. All characters must be unambiguously 18 years or older. Content that even slightly suggests underage characteristics such as childlike appearance, behavior, proportions, or references to school-age settings is strictly prohibited.</span>
          </motion.li>
          <motion.li
            whileHover={{ x: 5 }}
            className="flex items-start"
          >
            <span className="mr-2">&#x2022;</span>
            <span>No incest or NSFW family-related content is allowed. This includes any sexual or suggestive scenarios involving family members by blood, marriage, adoption, or implied relationships. All content must avoid any familial context in adult or explicit material.</span>
          </motion.li>
          <motion.li
            whileHover={{ x: 5 }}
            className="flex items-start"
          >
            <span className="mr-2">&#x2022;</span>
            <span>No bestiality or non-anthropomorphic animal content is allowed. Any explicit content involving animals or creatures that are not clearly humanized with sentient, anthropomorphic traits is strictly prohibited.</span>
          </motion.li>
          <motion.li
            whileHover={{ x: 5 }}
            className="flex items-start"
          >
            <span className="mr-2">&#x2022;</span>
            <span>No extreme or graphic violence, gore, torture, or fetishized harm. Content must avoid any themes that glorify abuse, mutilation, or suffering in a sexual or explicit context.</span>
          </motion.li>
        </ul>
      </motion.div>
    </motion.div>
  );
}

import React, { useState, useEffect } from "react";
import * as Slider from "@radix-ui/react-slider";
import { Utils } from "~/Utility/Utility";
import { motion } from "framer-motion";
import { useUserStore } from "~/store";

// Define the expected structure of the API response
interface CustomizationLimits {
  maxTokensLimit: number;
  temperatureLimit: number;
  topPLimit: number;
  presencePenaltyLimit: number;
  frequencyPenaltyLimit: number;
}

export default function Customization() {
  const [maxTokens, setMaxTokens] = useState(100);
  const [temperature, setTemperature] = useState(100);
  const [topP, setTopP] = useState(100);
  const [presencePenalty, setPresencePenalty] = useState(100);
  const [frequencyPenalty, setFrequencyPenalty] = useState(100);

  const { user_uuid, auth_key } = useUserStore((state) => ({
    user_uuid: state.user_uuid,
    auth_key: state.auth_key,
  }));

  useEffect(() => {
    const fetchCustomizationLimits = async () => {
      if (user_uuid && auth_key) {
        try {
          const response = await Utils.post<CustomizationLimits>("/api/GetAICustomizationLimit", {
            user_uuid,
            auth_key,
            type: "GetAICustomizationLimit",
          });

          const {
            maxTokensLimit,
            temperatureLimit,
            topPLimit,
            presencePenaltyLimit,
            frequencyPenaltyLimit,
          } = response;

          setMaxTokens(maxTokensLimit || 100);
          setTemperature(temperatureLimit || 100);
          setTopP(topPLimit || 100);
          setPresencePenalty(presencePenaltyLimit || 100);
          setFrequencyPenalty(frequencyPenaltyLimit || 100);
        } catch (error) {
          console.error("Error fetching customization limits:", error);
        }
      }
    };

    fetchCustomizationLimits();
  }, [user_uuid, auth_key]);

  const handleSubmit = async () => {
    const data = {
      maxTokens,
      temperature,
      topP,
      presencePenalty,
      frequencyPenalty,
    };

    try {
      const response = await Utils.post("/persona", data);
      console.log("Response:", response);
    } catch (error) {
      console.error("Error submitting data:", error);
      window.alert("Error submitting data. Please try again.");
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300">Max Tokens</label>
        <Slider.Root
          className="relative flex items-center h-5"
          value={[maxTokens]}
          onValueChange={(value) => setMaxTokens(value[0])}
          max={4000}
          step={1}
        >
          <Slider.Track className="relative h-1 w-full grow rounded-full bg-gray-600">
            <Slider.Range className="absolute h-full rounded-full bg-blue-500" />
          </Slider.Track>
          <Slider.Thumb className="block h-5 w-5 rounded-full bg-white shadow transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" />
        </Slider.Root>
        <span className="text-sm text-gray-400">{maxTokens}</span>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300">Temperature</label>
        <Slider.Root
          className="relative flex items-center h-5"
          value={[temperature]}
          onValueChange={(value) => setTemperature(value[0])}
          max={2}
          step={0.1}
        >
          <Slider.Track className="relative h-1 w-full grow rounded-full bg-gray-600">
            <Slider.Range className="absolute h-full rounded-full bg-blue-500" />
          </Slider.Track>
          <Slider.Thumb className="block h-5 w-5 rounded-full bg-white shadow transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" />
        </Slider.Root>
        <span className="text-sm text-gray-400">{temperature}</span>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300">Top-p</label>
        <Slider.Root
          className="relative flex items-center h-5"
          value={[topP]}
          onValueChange={(value) => setTopP(value[0])}
          max={1}
          step={0.01}
        >
          <Slider.Track className="relative h-1 w-full grow rounded-full bg-gray-600">
            <Slider.Range className="absolute h-full rounded-full bg-blue-500" />
          </Slider.Track>
          <Slider.Thumb className="block h-5 w-5 rounded-full bg-white shadow transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" />
        </Slider.Root>
        <span className="text-sm text-gray-400">{topP}</span>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300">Presence Penalty</label>
        <Slider.Root
          className="relative flex items-center h-5"
          value={[presencePenalty]}
          onValueChange={(value) => setPresencePenalty(value[0])}
          max={2}
          min={-2}
          step={0.1}
        >
          <Slider.Track className="relative h-1 w-full grow rounded-full bg-gray-600">
            <Slider.Range className="absolute h-full rounded-full bg-blue-500" />
          </Slider.Track>
          <Slider.Thumb className="block h-5 w-5 rounded-full bg-white shadow transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" />
        </Slider.Root>
        <span className="text-sm text-gray-400">{presencePenalty}</span>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300">Frequency Penalty</label>
        <Slider.Root
          className="relative flex items-center h-5"
          value={[frequencyPenalty]}
          onValueChange={(value) => setFrequencyPenalty(value[0])}
          max={2}
          min={-2}
          step={0.1}
        >
          <Slider.Track className="relative h-1 w-full grow rounded-full bg-gray-600">
            <Slider.Range className="absolute h-full rounded-full bg-blue-500" />
          </Slider.Track>
          <Slider.Thumb className="block h-5 w-5 rounded-full bg-white shadow transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" />
        </Slider.Root>
        <span className="text-sm text-gray-400">{frequencyPenalty}</span>
      </div>

      <motion.button
        onClick={handleSubmit}
        className="w-full px-4 py-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Submit
      </motion.button>
    </div>
  );
}

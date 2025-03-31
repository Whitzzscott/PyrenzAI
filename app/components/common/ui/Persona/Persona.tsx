import React, { useState, useEffect } from 'react';
import { User } from 'lucide-react';
import { useParams } from '@remix-run/react';
import PersonaModal from '../Modal/PersonaCardModal';

interface PersonaCard {
  id: string;
  name: string;
  description: string;
}

export default function Persona() {
  const { username } = useParams();
  const [isModalOpen, setModalOpen] = useState(false);
  const [personaData, setPersonaData] = useState<PersonaCard[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState<PersonaCard | null>(
    null,
  );

  const fetchPersona = async () => {
    if (username) {
      setLoading(true);
      try {
        const response = await fetch(`/persona%${username}`);
        const data = await response.json();
        setPersonaData(data);
      } catch (error) {
        console.error('Failed to fetch persona data', error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (username) {
      fetchPersona();
    }
  }, [username]);

  const handleSelectPersona = (persona: PersonaCard) => {
    setSelectedPersona(persona);
    setModalOpen(false);
  };

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex items-center gap-2'>
        <User size={24} className='text-gray-400' />
        <p className='text-lg font-semibold text-white'>My Persona</p>
      </div>

      <button
        onClick={() => setModalOpen(true)}
        className='w-full text-left text-white font-medium px-3 py-1 rounded-md transition hover:bg-gray-700'
      >
        Name:{' '}
        {selectedPersona ? selectedPersona.name : username || 'Unknown User'}
      </button>

      <button
        onClick={() => setModalOpen(true)}
        className='w-full text-left text-gray-300 px-3 py-1 rounded-md transition hover:bg-gray-700'
      >
        Description:{' '}
        {selectedPersona?.description
          ? selectedPersona.description.length > 100
            ? `${selectedPersona.description.slice(0, 100)}...`
            : selectedPersona.description
          : ''}
      </button>

      <PersonaModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        personaData={personaData}
        loading={loading}
        onSelect={handleSelectPersona}
      />
    </div>
  );
}

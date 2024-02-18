import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CharacterCard from '@/components/CharacterCard';


const fetchData = async (id) => {
  try {
    const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching character data:', error);
    return null;
  }
};

const CharacterDetails = () => {
  const [character, setCharacter] = useState<any>({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchCharacterData = async () => {
      if (id) {
        const data = await fetchData(id);
        setCharacter(data);
      }
    };

    fetchCharacterData();
  }, [id]);

  return (
    <div className='flex justify-center items-center h-[250px] bg-gray-700'>
      <CharacterCard character={character} />
    </div>
  );
};

export default CharacterDetails;

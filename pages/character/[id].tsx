import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const CharacterDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [character, setCharacter] = useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
        const data = await response.json();
        setCharacter(data);
      } catch (error) {
        console.error('Error fetching character data:', error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const goBack = () => {
    router.back();
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-xl p-4 border border-gray-300 rounded-lg shadow-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Character Details</h1>
          <button
            onClick={goBack}
            className="px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Back
          </button>
        </div>
        {character && (
          <div className="flex flex-col md:flex-row bg-white border border-gray-200 border-1 rounded-lg shadow">
            <div className="relative h-96 w-full md:w-48">
              <img
                src={character.image}
                alt={`${character.name} Image`}
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg md:rounded-none md:rounded-l-lg"
              />
            </div>
            <div className="p-4 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">{character.name}</h2>
                <p className="text-gray-700">{character.species}</p>
                <p className="text-gray-700">Status: {character.status}</p>
                <p className="text-gray-700">Gender: {character.gender}</p>
                <p className="text-gray-700">Origin: {character.origin?.name}</p>
                <p className="text-gray-700">Location: {character.location?.name}</p>
              </div>
              <div className="mt-4">
                <a
                  href={character.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  View Details
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CharacterDetails;
 
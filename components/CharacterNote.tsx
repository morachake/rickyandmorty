import React, { useState, useEffect } from 'react';
interface CharacterNotesProps {
  characterId: number;
}

const CharacterNote: React.FC<CharacterNotesProps> = ({ characterId }) => {
  const [note, setNote] = useState('');
  const [existingNotes, setExistingNotes] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Load existing notes from local storage on component mount
  useEffect(() => {
    const storedNotes = localStorage.getItem(`characterNotes-${characterId}`);
    if (storedNotes) {
      setExistingNotes(JSON.parse(storedNotes));
    }
  }, [characterId]);

  const handleAddNote = () => {
    if (!note.trim()) {
      setError('Please enter a non-empty note.');
      return;
    }

    // Save the note to local storage
    const updatedNotes = [...existingNotes, note];
    localStorage.setItem(`characterNotes-${characterId}`, JSON.stringify(updatedNotes));
    setExistingNotes(updatedNotes);
    setNote('');
    setError(null);
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Notes:</h3>

      {/* Display existing notes */}
      {existingNotes.length > 0 ? (
        <ul>
          {existingNotes.map((existingNote, index) => (
            <li key={index}>{existingNote}</li>
          ))}
        </ul>
      ) : (
        <p>No notes available.</p>
      )}

      {/* Form for adding notes */}
      <div className="mt-4">
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add a note..."
          className="w-full h-32 border border-gray-300 p-2 mb-2 rounded focus:outline-none focus:ring focus:border-blue-500"
        />
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex justify-end">
          <button
            onClick={handleAddNote}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Add Note
          </button>
        </div>
      </div>
    </div>
  );
};

export default CharacterNote;

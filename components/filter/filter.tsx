import { OptionProps } from '@/@types/Api';
import React, { useState, ChangeEvent } from 'react';

interface FilterProps extends OptionProps {
  changeID: (selectedOption: number) => void;
}

interface Option {
  value: number;
  label: string;
}

const Filter: React.FC<FilterProps> = ({ name, changeID, total }: FilterProps) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [suggestions, setSuggestions] = useState<Option[]>([]);

  // Create suggestions array
  const allOptions: Option[] = [...Array(total).keys()].map((x, index) => ({
    value: x + 1,
    label: `${name} - ${x + 1}`,
  }));

  // Filter suggestions based on input value and limit to 5
  const filteredSuggestions: Option[] = allOptions
    .filter((option) =>
      option.label.toLowerCase().includes(inputValue.toLowerCase())
    )
    .slice(0, 5);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setSuggestions(filteredSuggestions);
  };

  const handleSelectOption = (selectedOption: Option) => {
    setInputValue('');
    changeID(selectedOption.value);
    setSuggestions([]); // Clear suggestions
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder={`Type to search ${name}...`}
        className="bg-gray-50 border w-[280px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      />
      <ul>
        {suggestions.map((option) => (
          <li key={option.value} onClick={() => handleSelectOption(option)}>
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Filter;

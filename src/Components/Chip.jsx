import React, { useState, useRef, useEffect, useMemo } from 'react';
import './Chip.css'; // Import your CSS file

const ChipsInput = () => {
  const [inputValue, setInputValue] = useState('');
  const [chips, setChips] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [showItemList, setShowItemList] = useState(false);
  const inputRef = useRef(null);

  const items = useMemo(
    () => [
      { name: 'Nick Giannopoulos', email: 'nick@example.com' },
      { name: 'John Doe', email: 'john@example.com' },
      { name: 'Jane Doe', email: 'jane@example.com' },
      { name: 'Alice', email: 'alice@example.com' },
      { name: 'Bob', email: 'bob@example.com' },
      { name: 'Charlie', email: 'charlie@example.com' },
    ],
    []
  );

  useEffect(() => {
    setFilteredItems(
      items
        .filter(item => !chips.find(chip => chip.label === item.name))
        .map(item => ({ ...item }))
    );
  }, [chips, items]);

  const handleInputChange = (event) => {
    const value = event.target.value.trim();
    const regex = new RegExp(value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');

    const filtered = items.filter(item => regex.test(item.name)).map(item => ({ ...item }));

    setFilteredItems(filtered);
    setInputValue(value);
    setShowItemList(true);
  };

  const handleChipClick = (item) => {
    setChips([...chips, { id: item.name, label: item.name, email: item.email }]);
    setInputValue('');
    setShowItemList(false);
  };

  const handleChipRemove = (chipId) => {
    setChips(chips.filter(chip => chip.id !== chipId));
  };

  const handleInputKeyDown = (event) => {
    if (event.key === 'Backspace' && inputValue === '' && chips.length > 0) {
      const lastChip = chips[chips.length - 1];
      handleChipRemove(lastChip.id);
    }
  };

  return (
    <div className="chips-input-container">
      <div className="chips-list flex gap-2 flex-wrap">
        {chips.map(chip => (
          <div key={chip.id} className="chip">
            {chip.label}
            <button onClick={() => handleChipRemove(chip.id)} className="chip-remove-button">
              X
            </button>
          </div>
        ))}
      </div>

      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        ref={inputRef}
        placeholder="Type to filter..."
        onClick={() => setShowItemList(true)}
        className="p-3 text-lg border rounded-md w-full outline-none mt-2"
      />

      {showItemList && (
        <ul className="filtered-items-list mt-2">
          {filteredItems.map(item => (
            <li
              key={item.name}
              onClick={() => handleChipClick(item)}
              className="cursor-pointer "
            >
              {item.name} - {item.email}
            </li>
          ))}
        </ul>
      )}

    </div>
  );
};

export default ChipsInput;

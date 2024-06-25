import React, { useState, useEffect, useRef } from 'react';
import './Dropdown.css';

interface DropdownProps {
  options: { id: number, label: string }[];
  isMultiSelect?: boolean;
  itemShowLimit?: number;
  prefillSelected?: { id: number, label: string }[];
  onChange: (selected: { id: number, label: string }[]) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, isMultiSelect = false, itemShowLimit = 2, prefillSelected = [], onChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<{ id: number, label: string }[]>(prefillSelected);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (option: { id: number, label: string }) => {
    if (isMultiSelect) {
      setSelectedOptions(prev =>
        prev.some(item => item.id === option.id) ? prev.filter(item => item.id !== option.id) : [...prev, option]
      );
    } else {
      setSelectedOptions([option]);
      setIsOpen(false);
    }
  };

  useEffect(() => {
    onChange(selectedOptions);
  }, [selectedOptions, onChange]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const displayedOptions = selectedOptions.slice(0, itemShowLimit);
  const remainingCount = selectedOptions.length - itemShowLimit;

  return (
    <div className="dropdown" ref={dropdownRef}>
      <div className="dropdown-header" onClick={() => setIsOpen(!isOpen)}>
        {displayedOptions.length > 0 ? displayedOptions.map(option => option.label).join(', ') : 'Select...'}
        {remainingCount > 0 && <span> +{remainingCount}</span>}
        <span className="dropdown-arrow">{isOpen ? '▲' : '▼'}</span>
      </div>
      {isOpen && (
        <div className="dropdown-body">
          <input
            type="text"
            className="dropdown-search"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search..."
          />
          <ul className="dropdown-options">
            {filteredOptions.map(option => (
              <li
                key={option.id}
                className={`dropdown-option ${selectedOptions.some(item => item.id === option.id) ? 'selected' : ''}`}
                onClick={() => handleSelect(option)}
              >
                {isMultiSelect && (
                  <input
                    type="checkbox"
                    checked={selectedOptions.some(item => item.id === option.id)}
                    readOnly
                  />
                )}
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;

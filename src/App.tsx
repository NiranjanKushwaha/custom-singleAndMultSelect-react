import React, { useState, useCallback } from 'react';
import Dropdown from './Dropdown';

const App: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = useState<{ id: number, label: string }[]>([]);

  const handleDropdownChange = useCallback((selected: { id: number, label: string }[]) => {
    setSelectedOptions(selected);
  }, []);

  const handleSelect = (option: { id: number, label: string }) => {
    console.log('Selected:', option);
  };

  const handleDeselect = (option: { id: number, label: string }) => {
    console.log('Deselected:', option);
  };

  const handleSelectAll = () => {
    console.log('All options selected');
  };

  const handleDeselectAll = () => {
    console.log('All options deselected');
  };

  return (
    <div className="App">
      <h1>Custom Dropdown Component</h1>
      <Dropdown
        options={[
          { id: 1, label: 'Option 1' },
          { id: 2, label: 'Option 2' },
          { id: 3, label: 'Option 3' },
          { id: 4, label: 'Option 4' }
        ]}
        isMultiSelect={false}
        itemShowLimit={2}
        prefillSelected={[
          { id: 1, label: 'Option 1' },
          { id: 2, label: 'Option 2' }
        ]}
        onChange={handleDropdownChange}
        onSelect={handleSelect}
        onDeselect={handleDeselect}
        onSelectAll={handleSelectAll}
        onDeselectAll={handleDeselectAll}
      />
      <p>Selected Options: {selectedOptions.map(option => option.label).join(', ')}</p>
    </div>
  );
};

export default App;

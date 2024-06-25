import React, { useState } from 'react';
import Dropdown from './Dropdown';

const App: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = useState<{ id: number, label: string }[]>([]);

  const handleDropdownChange = (selected: { id: number, label: string }[]) => {
    setSelectedOptions(selected);
    console.log("on select: ",selected);
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
      />
      <p>Selected Options: {selectedOptions.map(option => option.label).join(', ')}</p>
    </div>
  );
};

export default App;

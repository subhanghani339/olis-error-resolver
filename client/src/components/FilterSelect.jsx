import Select from 'react-select';

function FilterSelect({
  label,
  name,
  value = [],
  onChange,
  options,
  placeholder,
}) {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? '#3b82f6' : '#d1d5db',
      boxShadow: state.isFocused ? '0 0 0 1px #3b82f6' : 'none',
      '&:hover': { borderColor: '#3b82f6' },
      fontSize: '0.875rem', 
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: '#e5e7eb', // gray-200
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: '#111827', // gray-900
      fontSize: '0.75rem', // text-xs
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: '#6b7280', // gray-500
      ':hover': { backgroundColor: '#f87171', color: 'white' }, // red-400 hover
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 50,
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
  };

  // handleChange supports multiple values
  const handleChange = (selectedOptions) => {
    onChange({
      target: {
        name,
        value: selectedOptions ? selectedOptions.map((opt) => opt.value) : [],
      },
    });
  };

  // react-select expects an array of objects for multi
  const selectedValues = options.filter((opt) => value.includes(opt.value));

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <Select
        name={name}
        value={selectedValues}
        onChange={handleChange}
        options={options}
        placeholder={placeholder}
        isMulti
        isClearable
        styles={customStyles}
        classNamePrefix="react-select"
      />
    </div>
  );
}

export default FilterSelect;

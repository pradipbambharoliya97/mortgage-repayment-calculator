import React, { useState } from 'react';

const Input = ({
  label,
  handleChange,
  prefix,
  prefixPosition = 'left',
  value = '',
  type = 'text',
  error,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div className='flex flex-col gap-2 items-start '>
      {label && (
        <label className='text-light-text text-sm font-medium'>{label}</label>
      )}
      <div
        className={`flex gap-1 w-full border rounded-md transition duration-150 overflow-hidden ${
          prefixPosition === 'left' ? 'flex-row-reverse' : ''
        } ${isFocused ? 'border-lime' : 'border-light-text'} ${
          error ? '!border-[red]' : ''
        }`}
      >
        <input
          type={type}
          value={value}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => handleChange(e.target.value)}
          className='p-1.5 w-full outline-none text-base peer'
        />
        {prefix && (
          <div
            className={`p-1.5 px-4 text-lg font-bold text-main-dark/80 transition duration-150 ${
              isFocused ? 'bg-lime' : 'bg-main-light'
            } ${error ? '!bg-[red] text-white' : ''}`}
          >
            {prefix}
          </div>
        )}
      </div>
      {error && <p className='text-xs font-medium text-[red]'>{error}</p>}
    </div>
  );
};

export default Input;

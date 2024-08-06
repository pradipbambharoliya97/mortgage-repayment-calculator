import React from 'react';

const Radio = ({ label, handleClick, checked }) => (
  <label>
    <input
      type='radio'
      value={label}
      id={`html-${label}`}
      className='peer hidden'
      name='framework'
      checked={checked}
      onChange={handleClick}
    />
    <div className='group flex gap-4 p-2 px-4 items-center transition-all duration-150 border cursor-pointer text-main-dark font-semibold rounded-md w-full hover:border-lime peer-checked:border-lime border-light-text'>
      <div class='w-3 h-3 text-lime hidden group-[.peer:checked+&]:block outline outline-lime rounded-full bg-lime outline-offset-2' />

      <div class='w-3 h-3 text-lime block group-[.peer:checked+&]:hidden outline outline-light-text group-hover:outline-lime rounded-full outline-offset-2' />

      <label
        className='mt-px text-gray-700 font-semibold cursor-pointer select-none'
        htmlFor={`html-${label}`}
      >
        {label}
      </label>
    </div>
  </label>
);

export default Radio;

import React from 'react'

const SelectBox = ({options, selectedValue, onChange}) => {
  return (
    <>
        <select value={selectedValue} onChange={onChange}>
            <option value="" disabled>
                Select Currency
            </option>
            {
                options.map((option) => {
                    return(
                        <option key={option} value={option}>{option}</option>
                    )
                })
            }
        </select>   
    </>
  )
}

export default SelectBox;

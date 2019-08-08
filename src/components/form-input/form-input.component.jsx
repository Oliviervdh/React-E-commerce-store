import React from 'react';

import './form-input.styles.scss';

const FormInput = ({ handleChange, label, ...otherProps}) => ( // The reason for handleChange is you want to bubble up any onChange that the input has.
    <div className='group'>
        <input className='form-input' onChange={handleChange} {...otherProps}/>
        {
            label ? // if the value is in, then apply the class of 'shrink' else ''
                (<label className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}>
                    {label}
                </label>)
                : null

        }

    </div>
);

export default FormInput;
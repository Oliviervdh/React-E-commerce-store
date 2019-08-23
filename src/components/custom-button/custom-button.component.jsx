import React from 'react';

import './custom-button.styles.scss';

const CustomButton = ({ children, isGoogleSignIn, inverted,  ...otherProps }) => ( // pulls the children that get passed through the props of "CustomButton", then destructure all the other props and spread them into your "custom-button"
    <button className={`${inverted ? 'inverted' : ''} ${isGoogleSignIn ? 'google-sign-in' : ''} custom-button`} {...otherProps}>  {/* conditionally renders a button based of a prop. If there is a type "submit" being passed in "CustomButton", the button will get that*/}
        {children}
    </button>
);

export default CustomButton;
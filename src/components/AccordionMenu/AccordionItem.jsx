import React from 'react';

export const AccordionItem = ({ onClick, title, children, open }) => {
  return (
    <div className="accordion-item">
      <div className="accordion-item--header" onClick={onClick}>
        {title}
      </div>
      <div className={`accordion-item--body ${open ? 'open' : ''}`}>
        {children}
      </div>
    </div>
  );
};

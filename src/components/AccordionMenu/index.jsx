import React, { useState, useEffect, useCallback } from 'react';

const AccordionMenu = props => {
  const [children, setChildren] = useState([]);
  const [openItem, setOpenItem] = useState();

  useEffect(() => {
    setChildren(() =>
      props.children.length ? props.children : [props.children]
    );
  }, [props.children]);

  const clickHandler = useCallback(id => {
    setOpenItem(prev => {
      if (id === prev) {
        return '';
      } else {
        return id;
      }
    });
  }, []);

  return (
    <div className="accordion-menu">
      {children.map((elt, idx) => (
        <elt.type
          key={idx}
          {...elt.props}
          open={elt.props.id === openItem}
          onClick={() => clickHandler(elt.props.id)}
        ></elt.type>
      ))}
    </div>
  );
};

export default AccordionMenu;

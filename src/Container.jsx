import React from 'react';
import SingleItem from './SingleItem';
const Container = ({ container }) => {
  return (
    <div>
      {container.map((item) => {
        return <SingleItem key={item.id} {...item} />;
      })}
    </div>
  );
};

export default Container;

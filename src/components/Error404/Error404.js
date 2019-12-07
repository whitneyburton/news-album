import React from 'react';
import { Link } from 'react-router-dom';

export const Error404 = () => {
  return (
    <div className="Error404">
      <p>We're sorry,</p>
      <p>There was an error loading this article.</p>
      <Link to="/" className="Error404--go-back">
        Go Back
      </Link>
    </div>
  );
};

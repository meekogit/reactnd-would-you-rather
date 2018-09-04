import React from 'react';
import pagenotfound from '../404.svg';

export default function PageNotFound() {
  return (
    <div class="page-not-found">
      <img
          src={pagenotfound}
          alt={"page not found"}
        />
    </div>
  );
}
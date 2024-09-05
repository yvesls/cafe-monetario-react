import React from 'react';

export default function Header({ icone, title, subtitle }) {
  return (
    <header className="header pt-3">
      <i className={`fa ${icone}`} />
      <h1>
        {title}
        <p className='lead text-muted'>{subtitle}</p>
      </h1>
    </header>
  );
}

import React from 'react';

export default function Header({ icone, title, subtitle }) {
  return (
    <header className="header">
      <h1>
        <i className={`fa ${icone}`} />
        {title}
        <p className='lead text-muted'>{subtitle}</p>
      </h1>
    </header>
  );
}

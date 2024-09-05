import React from 'react';
import Header from './layout/Header';

export default function Main(props) {
  return (
    <>
      <Header icone={props.icone} title={props.title} subtitle={props.subtitle} />
      <main className="mainContainer content">
        <div className='p-3 mt-3'>
          {props.children}
        </div>
      </main>
    </>
  );
}

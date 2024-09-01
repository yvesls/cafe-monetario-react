import React from 'react';
import Image from 'next/image';

export default function Logo() {
  return (
    <aside className="logo">
      <Image src="/assets/imagens/logo.png" alt="Logo" width={100} height={200} />
    </aside>
  );
}

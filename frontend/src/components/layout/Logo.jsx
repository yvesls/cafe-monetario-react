import Image from 'next/image';
import React from 'react';

export default function Logo() {
  return (
    <aside className="logo">
      <Image src="/assets/imagens/2.png" alt="Logo" width={90} height={90} />
    </aside>
  );
}

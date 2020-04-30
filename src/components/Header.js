import React from 'react';
import Link from 'next/link';

function Header() {
  return (
    <header>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/quizzes">
        <a>Quizzes</a>
      </Link>
    </header>
  );
}

export default Header;

import Link from 'next/link'

/**
 * The shared header component.
 */
export default function Header() {
  return (
    <header className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <h1 className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <h1>OkesBan</h1>
        </Link>
      </h1>
    </header>
  )
}
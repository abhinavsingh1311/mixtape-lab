import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 p-4">
            <Link href="/public" className="text-neon-blue hover:text-neon-cyan">Home</Link>
            <Link href="/about" className="ml-4 text-neon-blue hover:text-neon-cyan">About</Link>
        </nav>
    );
}
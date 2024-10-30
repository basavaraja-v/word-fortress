import Link from 'next/link'
import { BookOpenIcon, InfoIcon, LockIcon } from 'lucide-react'

export default function Footer() {
    return (
        <footer>
            <nav className="flex justify-center space-x-4">
                <Link href="/about" className="text-blue-600 dark:text-blue-300 hover:underline">
                    <BookOpenIcon className="inline-block mr-1" />
                    About
                </Link>
                <Link href="/how-to-play" className="text-blue-600 dark:text-blue-300 hover:underline">
                    <InfoIcon className="inline-block mr-1" />
                    How to Play
                </Link>
                <Link href="/privacy" className="text-blue-600 dark:text-blue-300 hover:underline">
                    <LockIcon className="inline-block mr-1" />
                    Privacy
                </Link>
            </nav>
        </footer>
    )
}
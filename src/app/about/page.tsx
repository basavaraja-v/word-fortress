import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeftIcon } from 'lucide-react'

export default function About() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 py-8 px-4">
            <div className="container mx-auto">
                <Link href="/" className="inline-block mb-8">
                    <Button variant="outline">
                        <ArrowLeftIcon className="mr-2 h-4 w-4" /> Back to Game
                    </Button>
                </Link>

                <Card className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 shadow-xl">
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold text-blue-600 dark:text-blue-300">About Word Fortress</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p>
                            Word Fortress is an exciting and educational word guessing game that challenges players to reveal hidden words while building and defending their virtual fortress. Developed with a passion for language and gaming, Word Fortress aims to make vocabulary building fun and engaging for players of all ages.
                        </p>
                        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-300">Our Mission</h2>
                        <p>
                            Our mission is to create an entertaining and educational gaming experience that helps players improve their vocabulary, spelling, and word recognition skills. We believe that learning should be fun, and Word Fortress embodies this philosophy by combining the thrill of gaming with the benefits of language acquisition.
                        </p>
                        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-300">Key Features</h2>
                        <ul className="list-disc list-inside space-y-2">
                            <li>Multiple difficulty levels to cater to players of all skill levels</li>
                            <li>Time-based gameplay for an added challenge</li>
                            <li>Visual fortress representation to track progress</li>
                            <li>Scoring system  that rewards quick thinking and accuracy</li>
                            <li>Responsive design for seamless play on any device</li>
                        </ul>
                        <p>
                            Whether you're a word game enthusiast, a student looking to expand your vocabulary, or someone who enjoys a good mental challenge, Word Fortress offers an engaging and rewarding experience. Start playing today and see how high you can score while fortifying your word power!
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
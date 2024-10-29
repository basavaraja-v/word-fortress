import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeftIcon } from 'lucide-react'

export default function HowToPlay() {
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
                        <CardTitle className="text-3xl font-bold text-blue-600 dark:text-blue-300">How to Play Word Fortress</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-300">Game Objective</h2>
                        <p>
                            Your goal is to guess the hidden word before your fortress falls or time runs out. Each correct guess strengthens your fortress, while incorrect guesses weaken it.
                        </p>

                        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-300">Gameplay Steps</h2>
                        <ol className="list-decimal list-inside space-y-2">
                            <li>Choose a difficulty level: Easy (4-letter words), Medium (5-letter words), or Hard (6-letter words).</li>
                            <li>The game starts with a hidden word and a full fortress (represented by shield icons).</li>
                            <li>Guess letters by clicking on the alphabet buttons.</li>
                            <li>Correct guesses reveal the letter in the word and increase your score.</li>
                            <li>Incorrect guesses damage your fortress (a shield icon turns red).</li>
                            <li>Keep guessing until you reveal the entire word or your fortress falls.</li>
                        </ol>

                        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-300">Scoring</h2>
                        <ul className="list-disc list-inside space-y-2">
                            <li>Easy mode: 10 points per correct guess</li>
                            <li>Medium mode: 20 points per correct guess</li>
                            <li>Hard mode: 30 points per correct guess</li>
                            <li>Bonus points: Remaining time x 2 added to your score upon winning</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-300">Tips</h2>
                        <ul className="list-disc list-inside space-y-2">
                            <li>Start with common vowels and consonants.</li>
                            <li>Pay attention to word patterns and letter frequencies.</li>
                            <li>Use the difficulty levels to challenge yourself as you improve.</li>
                            <li>Try to guess the word as quickly as possible for a higher score.</li>
                        </ul>

                        <p className="mt-4">
                            Remember, practice makes perfect! The more you play, the better you'll become at recognizing word patterns and guessing efficiently. Enjoy building your Word Fortress!
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
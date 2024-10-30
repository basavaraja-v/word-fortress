import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { InfoIcon, TimerIcon, TrophyIcon, ShieldIcon } from 'lucide-react'

type GameHeaderProps = {
    score: number
    fortressHealth: number
    timeLeft: number
    difficulty: string
    showHowToPlay: boolean
    setShowHowToPlay: (show: boolean) => void
    handleDifficultyChange: (value: 'easy' | 'medium' | 'hard') => void
}

export default function GameHeader({
    score,
    fortressHealth,
    timeLeft,
    difficulty,
    showHowToPlay,
    setShowHowToPlay,
    handleDifficultyChange
}: GameHeaderProps) {
    return (
        <div className="px-4 py-4">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-300">Word Fortress</h1>
                <div className="flex items-center space-x-2">
                    <Dialog open={showHowToPlay} onOpenChange={setShowHowToPlay}>
                        <DialogTrigger asChild>
                            <Button variant="outline" size="icon">
                                <InfoIcon className="h-5 w-5" />
                                <span className="sr-only">How to play</span>
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>How to Play Word Fortress</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-2">
                                <p>1. Guess letters to reveal the hidden word (4-8 letters).</p>
                                <p>2. Correct guesses build fortress strength and increase your score.</p>
                                <p>3. Incorrect consonant guesses damage your fortress health.</p>
                                <p>4. You have free vowel guesses that don&apos;t damage your fortress.</p>
                                <p>5. Use hints to reveal letters, but it costs you 10 seconds.</p>
                                <p>6. Win by guessing the word before time runs out or your fortress falls!</p>
                                <p>7. Choose harder difficulties for more challenge and higher scores.</p>
                            </div>
                            <DialogClose asChild>
                                <Button className="mt-4">Got it!</Button>
                            </DialogClose>
                        </DialogContent>
                    </Dialog>
                    <Select value={difficulty} onValueChange={handleDifficultyChange}>
                        <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="easy">Easy</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="hard">Hard</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="flex justify-between items-center text-lg mt-4">
                <span className="flex items-center">
                    <TrophyIcon className="mr-1 h-5 w-5" aria-hidden="true" />
                    Score: {score}
                </span>
                <span className="flex items-center">
                    <ShieldIcon className="mr-1 h-5 w-5" aria-hidden="true" />
                    Health: {fortressHealth}
                </span>
                <span className="flex items-center">
                    <TimerIcon className="mr-1 h-5 w-5" aria-hidden="true" />
                    Time: {timeLeft}s
                </span>
            </div>
        </div>
    )
}
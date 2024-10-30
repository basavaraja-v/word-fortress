import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ShieldIcon, HelpCircleIcon, PlayIcon } from 'lucide-react'
import { alphabet } from '../lib/utils'

type GameContentProps = {
    gameState: 'idle' | 'playing' | 'won' | 'lost'
    word: string
    guessedLetters: Set<string>
    fortressHealth: number
    fortressStrength: number
    vowelsLeft: number
    difficulty: string
    startGame: () => void
    handleGuess: (letter: string) => void
    getLetterStatus: (letter: string) => 'default' | 'correct' | 'incorrect'
    getHint: () => void
    score: number
}

export default function GameContent({
    gameState,
    word,
    guessedLetters,
    fortressHealth,
    fortressStrength,
    vowelsLeft,
    difficulty,
    startGame,
    handleGuess,
    getLetterStatus,
    getHint,
    score
}: GameContentProps) {
    return (
        <div className="p-4 space-y-6">
            <div className="space-y-6">
                {gameState === 'idle' ? (
                    <div className="text-center">
                        <Button onClick={startGame} className="bg-green-500 hover:bg-green-600 text-white text-lg px-8 py-4">
                            <PlayIcon className="mr-2 h-6 w-6" />
                            Play
                        </Button>
                    </div>
                ) : (
                    <>
                        <div className="text-center">
                            <div className="text-4xl font-mono space-x-0.5">
                                {word.split('').map((char, index) => (
                                    <span key={index} className="inline-block w-10 h-14 sm:w-8 sm:h-12 border-b-2 border-blue-500 dark:border-blue-300">
                                        {guessedLetters.has(char) ? (
                                            <span className="text-blue-700 dark:text-blue-200">{char}</span>
                                        ) : (
                                            <span className="invisible">_</span>
                                        )}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <div className="flex justify-center space-x-2">
                                {Array.from({ length: word.length + (difficulty === 'easy' ? 2 : difficulty === 'medium' ? 2 : 1) }).map((_, i) => (
                                    <div
                                        key={i}
                                        className={`w-8 h-8 rounded-sm transition-all duration-300 ${i < fortressHealth ? 'bg-blue-500 dark:bg-blue-400' : 'bg-red-500 dark:bg-red-400'
                                            }`}
                                    >
                                        <ShieldIcon className="w-full h-full p-1 text-white" />
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Fortress Strength:</span>
                                <span>{fortressStrength}%</span>
                                <span>Free Vowels Left:</span>
                                <span>{vowelsLeft}</span>
                            </div>
                            <Progress value={fortressStrength} className="w-full" />
                        </div>

                        {gameState === 'playing' && (
                            <>
                                <div className="w-full max-w-3xl mx-auto px-2 sm:px-4">
                                    <div className="grid grid-rows-3 gap-1.5 sm:gap-2 md:gap-4">
                                        {/* First row - QWERTYUIOP */}
                                        <div className="grid grid-cols-10 gap-1 sm:gap-2 md:gap-4 mx-auto w-full">
                                            {alphabet.slice(0, 10).map((letter) => {
                                                const status = getLetterStatus(letter)
                                                return (
                                                    <Button
                                                        key={letter}
                                                        onClick={() => handleGuess(letter)}
                                                        disabled={guessedLetters.has(letter)}
                                                        className={`w-full h-8 sm:h-10 md:h-12 text-xs sm:text-sm md:text-lg font-bold transition-all duration-300 p-0 sm:p-2 ${status === 'correct'
                                                            ? 'bg-green-500 hover:bg-green-600 text-white scale-105'
                                                            : status === 'incorrect'
                                                                ? 'bg-red-500 hover:bg-red-600 text-white scale-95 opacity-50'
                                                                : 'bg-blue-300 hover:bg-blue-400 dark:bg-blue-700 dark:hover:bg-blue-600'
                                                            }`}
                                                    >
                                                        {letter}
                                                    </Button>
                                                )
                                            })}
                                        </div>
                                        {/* Second row - ASDFGHJKL */}
                                        <div className="grid grid-cols-9 gap-1 sm:gap-2 md:gap-4 mx-auto w-[95%] sm:w-[90%]">
                                            {alphabet.slice(10, 19).map((letter) => {
                                                const status = getLetterStatus(letter)
                                                return (
                                                    <Button
                                                        key={letter}
                                                        onClick={() => handleGuess(letter)}
                                                        disabled={guessedLetters.has(letter)}
                                                        className={`w-full h-8 sm:h-10 md:h-12 text-xs sm:text-sm md:text-lg font-bold transition-all duration-300 p-0 sm:p-2 ${status === 'correct'
                                                            ? 'bg-green-500 hover:bg-green-600 text-white scale-105'
                                                            : status === 'incorrect'
                                                                ? 'bg-red-500 hover:bg-red-600 text-white scale-95 opacity-50'
                                                                : 'bg-blue-300 hover:bg-blue-400 dark:bg-blue-700 dark:hover:bg-blue-600'
                                                            }`}
                                                    >
                                                        {letter}
                                                    </Button>
                                                )
                                            })}
                                        </div>
                                        {/* Third row - ZXCVBNM */}
                                        <div className="grid grid-cols-7 gap-1 sm:gap-2 md:gap-4 mx-auto w-[85%] sm:w-[75%] md:w-[70%]">
                                            {alphabet.slice(19).map((letter) => {
                                                const status = getLetterStatus(letter)
                                                return (
                                                    <Button
                                                        key={letter}
                                                        onClick={() => handleGuess(letter)}
                                                        disabled={guessedLetters.has(letter)}
                                                        className={`w-full h-8 sm:h-10 md:h-12 text-xs sm:text-sm md:text-lg font-bold transition-all duration-300 p-0 sm:p-2 ${status === 'correct'
                                                            ? 'bg-green-500 hover:bg-green-600 text-white scale-105'
                                                            : status === 'incorrect'
                                                                ? 'bg-red-500 hover:bg-red-600 text-white scale-95 opacity-50'
                                                                : 'bg-blue-300 hover:bg-blue-400 dark:bg-blue-700 dark:hover:bg-blue-600'
                                                            }`}
                                                    >
                                                        {letter}
                                                    </Button>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-center">
                                    <Button onClick={getHint} className="bg-yellow-500 hover:bg-yellow-600 text-white">
                                        <HelpCircleIcon className="mr-2 h-4 w-4" />
                                        Get Hint (-10s)
                                    </Button>
                                </div>
                            </>
                        )}
                        {gameState !== 'playing' && (
                            <div className="text-center space-y-4">
                                <p className="text-3xl font-bold mb-2 animate-bounce">
                                    {gameState === 'won' ? '🎉 You won! 🎉' : '💔 Game Over 💔'}
                                </p>
                                <p className="text-xl">The word was: <span className="font-bold text-blue-600 dark:text-blue-300">{word}</span></p>
                                <p className="text-2xl">Final Score: <span className="font-bold text-green-600 dark:text-green-400">{score}</span></p>
                                <Button onClick={startGame} className="bg-blue-500  hover:bg-blue-600 text-white text-lg px-8 py-2">Play Again</Button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}
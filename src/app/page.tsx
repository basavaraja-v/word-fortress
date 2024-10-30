'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { InfoIcon, TimerIcon, TrophyIcon, BookOpenIcon, ShieldIcon, LockIcon, HelpCircleIcon, PlayIcon } from 'lucide-react'
import { toast, Toaster } from 'react-hot-toast'
import { Progress } from "@/components/ui/progress"

const getDifficultySettings = () => {
  return {
    easy: { timeLimit: 180, freeVowels: 5 },
    medium: { timeLimit: 120, freeVowels: 4 },
    hard: { timeLimit: 90, freeVowels: 3 }
  }
}

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const vowels = ['A', 'E', 'I', 'O', 'U']

export default function WordFortress() {
  const [words, setWords] = useState<{ [key: number]: string[] }>({})
  const [word, setWord] = useState('')
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set())
  const [fortressHealth, setFortressHealth] = useState(0)
  const [fortressStrength, setFortressStrength] = useState(0)
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'won' | 'lost'>('idle')
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy')
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(120)
  const [showHowToPlay, setShowHowToPlay] = useState(false)
  const [vowelsLeft, setVowelsLeft] = useState(4)
  const [difficultySettings, setDifficultySettings] = useState(getDifficultySettings())

  useEffect(() => {
    const loadWords = async () => {
      const wordLengths = [4, 5, 6, 7, 8]
      const loadedWords: { [key: number]: string[] } = {}
      for (const length of wordLengths) {
        const response = await fetch(`/words_${length}_letters.json`)
        loadedWords[length] = await response.json()
      }
      setWords(loadedWords)
    }
    loadWords()

    const isFirstVisit = !localStorage.getItem('hasVisitedBefore')
    if (isFirstVisit) {
      setShowHowToPlay(true)
      localStorage.setItem('hasVisitedBefore', 'true')
    }
  }, [])

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && gameState === 'playing') {
      setGameState('lost')
    }
  }, [timeLeft, gameState])

  useEffect(() => {
    if (gameState === 'lost') {
      toast.error('Game over! Your fortress has fallen.')
    } else if (gameState === 'won') {
      toast.success('Congratulations! You\'ve won!')
    }
  }, [gameState])

  useEffect(() => {
    // Reinitialize the game when difficulty changes
    if (gameState !== 'idle') {
      startGame()
    }
  }, [difficulty])

  const startGame = () => {
    if (Object.keys(words).length > 0) {
      const wordLengths = Object.keys(words).map(Number)
      const randomLength = wordLengths[Math.floor(Math.random() * wordLengths.length)]
      const wordList = words[randomLength] || []
      const newWord = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase()
      setWord(newWord)
      setGuessedLetters(new Set())
      setFortressHealth(newWord.length + (difficulty === 'easy' ? 4 : difficulty === 'medium' ? 2 : 1))
      setFortressStrength(0)
      setGameState('playing')
      setTimeLeft(difficultySettings[difficulty].timeLimit)
      setScore(0)
      setVowelsLeft(difficultySettings[difficulty].freeVowels)
    }
  }

  const handleGuess = (letter: string) => {
    if (guessedLetters.has(letter) || gameState !== 'playing') return

    setGuessedLetters(new Set(guessedLetters).add(letter))

    if (word.includes(letter)) {
      const newScore = score + (difficulty === 'easy' ? 10 : difficulty === 'medium' ? 20 : 30)
      setScore(newScore)
      setFortressStrength(prev => Math.min(prev + 10, 100))
      if (word.split('').every(char => guessedLetters.has(char) || char === letter)) {
        setGameState('won')
        setScore(newScore + (timeLeft * 2))
      }
    } else {
      if (vowels.includes(letter) && vowelsLeft > 0) {
        setVowelsLeft(prev => prev - 1)
      } else {
        setFortressHealth(health => {
          const newHealth = health - 1
          if (newHealth <= 0) {
            setGameState('lost')
          }
          return newHealth
        })
      }
    }
  }

  const getLetterStatus = (letter: string) => {
    if (!guessedLetters.has(letter)) return 'default'
    return word.includes(letter) ? 'correct' : 'incorrect'
  }

  const getHint = () => {
    const unguessedLetters = word.split('').filter(char => !guessedLetters.has(char))
    if (unguessedLetters.length > 0) {
      const hintLetter = unguessedLetters[Math.floor(Math.random() * unguessedLetters.length)]
      handleGuess(hintLetter)
      setTimeLeft(prev => Math.max(prev - 10, 0))
      toast.success(`Hint: The word contains the letter ${hintLetter}`)
    } else {
      toast.error("No more letters to reveal!")
    }
  }

  const handleDifficultyChange = (value: 'easy' | 'medium' | 'hard') => {
    setDifficulty(value)
    setDifficultySettings(getDifficultySettings()) // Reset difficulty settings
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 py-8 px-4">
      <Toaster position="top-center" />
      <div className="container mx-auto flex-grow">
        <Card className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 shadow-xl">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-3xl font-bold text-blue-600 dark:text-blue-300">Word Fortress</CardTitle>
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
            <CardDescription className="flex justify-between items-center text-lg mt-4">
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
            </CardDescription>
          </CardHeader>
          <CardContent>
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
                    <div className="text-4xl font-mono space-x-1">
                      {word.split('').map((char, index) => (
                        <span key={index} className="inline-block w-10 h-14 border-b-2 border-blue-500 dark:border-blue-300">
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
                      {Array.from({ length: word.length + (difficulty === 'easy' ? 4 : difficulty === 'medium' ? 2 : 1) }).map((_, i) => (
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
                      <div className="grid grid-cols-4 sm:grid-cols-7 md:grid-cols-9 gap-2">
                        {alphabet.map((letter) => {
                          const status = getLetterStatus(letter)
                          return (
                            <Button
                              key={letter}
                              onClick={() => handleGuess(letter)}
                              disabled={guessedLetters.has(letter)}
                              className={`w-full h-12 text-lg font-bold transition-all duration-300 ${status === 'correct' ? 'bg-green-500 hover:bg-green-600 text-white scale-105' :
                                status === 'incorrect' ? 'bg-red-500 hover:bg-red-600 text-white scale-95 opacity-50' :
                                  'bg-blue-300 hover:bg-blue-400 dark:bg-blue-700 dark:hover:bg-blue-600'
                                }`}
                            >
                              {letter}
                            </Button>
                          )
                        })}
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
          </CardContent>
        </Card>
      </div>

      <footer className="mt-8">
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
    </div>
  )
}
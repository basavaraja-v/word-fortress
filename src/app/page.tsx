'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { InfoIcon, TimerIcon, TrophyIcon, BookOpenIcon, ShieldIcon, LockIcon } from 'lucide-react'
import { toast, Toaster } from 'react-hot-toast'

const getDifficultySettings = () => {
  return {
    easy: { maxGuesses: 8, timeLimit: 120, wordLength: 4 },
    medium: { maxGuesses: 6, timeLimit: 90, wordLength: 5 },
    hard: { maxGuesses: 4, timeLimit: 60, wordLength: 6 }
  }
}

const difficultySettings = getDifficultySettings()
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

export default function WordFortress() {
  const [words, setWords] = useState<{ [key: number]: string[] }>({})
  const [word, setWord] = useState('')
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set())
  const [fortressHealth, setFortressHealth] = useState(6)
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing')
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium')
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(90)
  const [showHowToPlay, setShowHowToPlay] = useState(false)

  useEffect(() => {
    const loadWords = async () => {
      const wordLengths = [4, 5, 6]
      const loadedWords: { [key: number]: string[] } = {}
      for (const length of wordLengths) {
        const response = await fetch(`/words_${length}_letters.json`)
        loadedWords[length] = await response.json()
      }
      setWords(loadedWords)
    }
    loadWords()

    // Check if it's the user's first visit
    const isFirstVisit = !localStorage.getItem('hasVisitedBefore')
    if (isFirstVisit) {
      setShowHowToPlay(true)
      localStorage.setItem('hasVisitedBefore', 'true')
    }
  }, [])

  useEffect(() => {
    if (words[difficultySettings[difficulty].wordLength]) {
      resetGame()
    }
  }, [difficulty, words])

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

  const resetGame = () => {
    const wordLength = difficultySettings[difficulty].wordLength
    const wordList = words[wordLength] || []
    const newWord = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase()
    setWord(newWord)
    setGuessedLetters(new Set())
    setFortressHealth(difficultySettings[difficulty].maxGuesses)
    setGameState('playing')
    setTimeLeft(difficultySettings[difficulty].timeLimit)
    setScore(0)
  }

  const handleGuess = (letter: string) => {
    if (guessedLetters.has(letter) || gameState !== 'playing') return

    setGuessedLetters(new Set(guessedLetters).add(letter))

    if (!word.includes(letter)) {
      setFortressHealth(health => {
        const newHealth = health - 1
        if (newHealth <= 0) {
          setGameState('lost')
        }
        return newHealth
      })
    } else {
      const newScore = score + (difficulty === 'easy' ? 10 : difficulty === 'medium' ? 20 : 30)
      setScore(newScore)
      if (word.split('').every(char => guessedLetters.has(char) || char === letter)) {
        setGameState('won')
        setScore(newScore + (timeLeft * 2))
      }
    }
  }

  const getLetterStatus = (letter: string) => {
    if (!guessedLetters.has(letter)) return 'default'
    return word.includes(letter) ? 'correct' : 'incorrect'
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 py-8 px-4">
      <Toaster position="top-center" />
      <div className="container mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-300">Word Fortress</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link href="/about" className="text-blue-600 dark:text-blue-300 hover:underline">
                  <BookOpenIcon className="inline-block mr-1" />
                  About
                </Link>
              </li>
              <li>
                <Link href="/how-to-play" className="text-blue-600 dark:text-blue-300 hover:underline">
                  <InfoIcon className="inline-block mr-1" />
                  How to Play
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-blue-600 dark:text-blue-300 hover:underline">
                  <LockIcon className="inline-block mr-1" />
                  Privacy
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        <Card className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 shadow-xl">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-3xl font-bold text-blue-600 dark:text-blue-300">Game Board</CardTitle>
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
                      <p>1. Guess letters to reveal the hidden word.</p>
                      <p>2. Each correct guess builds your fortress and increases your score.</p>
                      <p>3. Each incorrect guess damages your fortress.</p>
                      <p>4. Win by guessing the word before time runs out or your fortress falls!</p>
                      <p>5. Choose your difficulty level for more challenge and higher scores.</p>
                    </div>
                    <DialogClose asChild>
                      <Button className="mt-4">Got it!</Button>
                    </DialogClose>
                  </DialogContent>
                </Dialog>
                <Select value={difficulty} onValueChange={(value: 'easy' | 'medium' | 'hard') => setDifficulty(value)}>
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
                <TimerIcon className="mr-1 h-5 w-5" aria-hidden="true" />
                Time: {timeLeft}s
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
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
              <div className="flex justify-center space-x-2">
                {Array.from({ length: difficultySettings[difficulty].maxGuesses }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-10 h-10 rounded-sm transition-all duration-300 ${i < fortressHealth ? 'bg-blue-500 dark:bg-blue-400' : 'bg-red-500 dark:bg-red-400'
                      }`}
                    aria-hidden="true"
                  >
                    <ShieldIcon className="w-full h-full p-2 text-white" />
                  </div>
                ))}
              </div>
              {gameState === 'playing' && (
                <div className="grid grid-cols-7 sm:grid-cols-9 gap-2">
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
              )}
              {gameState !== 'playing' && (
                <div className="text-center space-y-4">
                  <p className="text-3xl font-bold mb-2 animate-bounce">
                    {gameState === 'won' ? '🎉 You won! 🎉' : '💔 Game Over 💔'}
                  </p>
                  <p className="text-xl">The word was: <span className="font-bold text-blue-600 dark:text-blue-300">{word}</span></p>
                  <p className="text-2xl">Final Score: <span className="font-bold text-green-600 dark:text-green-400">{score}</span></p>
                  <Button onClick={resetGame} className="bg-blue-500 hover:bg-blue-600 text-white text-lg px-8 py-2">Play Again</Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
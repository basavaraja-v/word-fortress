'use client'

import { useState, useEffect } from 'react'
import { toast, Toaster } from 'react-hot-toast'
import GameHeader from '@/components/GameHeader'
import GameContent from '@/components/GameContent'
import Footer from '@/components/Footer'
import { getDifficultySettings, alphabet, vowels } from '../lib/utils'
import { Card } from "@/components/ui/card"

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
    setDifficultySettings(getDifficultySettings())
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800">
      <Toaster position="top-center" />
      <div className="w-full flex-grow px-0 sm:px-4 sm:container sm:mx-auto">
        <Card className="w-full h-full sm:max-w-2xl sm:mx-auto bg-white dark:bg-gray-800 shadow-xl sm:my-4 rounded-none sm:rounded-xl">
          <GameHeader
            score={score}
            fortressHealth={fortressHealth}
            timeLeft={timeLeft}
            difficulty={difficulty}
            showHowToPlay={showHowToPlay}
            setShowHowToPlay={setShowHowToPlay}
            handleDifficultyChange={handleDifficultyChange}
          />
          <GameContent
            gameState={gameState}
            word={word}
            guessedLetters={guessedLetters}
            fortressHealth={fortressHealth}
            fortressStrength={fortressStrength}
            vowelsLeft={vowelsLeft}
            difficulty={difficulty}
            startGame={startGame}
            handleGuess={handleGuess}
            getLetterStatus={getLetterStatus}
            getHint={getHint}
            score={score}
          />
        </Card>
      </div>
      <Footer />
    </div>
  )
}
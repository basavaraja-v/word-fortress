import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const getDifficultySettings = () => {
  return {
    easy: { timeLimit: 180, freeVowels: 5 },
    medium: { timeLimit: 120, freeVowels: 4 },
    hard: { timeLimit: 90, freeVowels: 3 }
  }
}

export const alphabet = 'QWERTYUIOPASDFGHJKLZXCVBNM'.split('')
export const vowels = ['A', 'E', 'I', 'O', 'U']
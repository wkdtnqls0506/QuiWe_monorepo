'use client'

import { INTERVAL, MINUTES_IN_MS } from '@/constants/timer'
import { useEffect, useState } from 'react'

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState<number>(MINUTES_IN_MS)
  const minutes = String(Math.floor((timeLeft / (1000 * 60)) % 60)).padStart(
    2,
    '0',
  )
  const second = String(Math.floor((timeLeft / 1000) % 60)).padStart(2, '0')

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - INTERVAL)
    }, INTERVAL)

    if (timeLeft <= 0) {
      clearInterval(timer)
      alert('시간이 종료되었습니다.')
    }

    return () => {
      clearInterval(timer)
    }
  }, [timeLeft])
  return <div>{`남은 시간 : ${minutes} : ${second}`}</div>
}

export default Timer

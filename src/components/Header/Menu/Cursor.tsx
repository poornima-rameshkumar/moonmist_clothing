"use client"
import { useEffect } from "react"

export default function Cursor() {
  useEffect(() => {
    const coords = { x: 0, y: 0 }
    const circles = document.querySelectorAll<HTMLDivElement>(".circle")

    circles.forEach((circle) => {
      ;(circle as any).x = 0
      ;(circle as any).y = 0
      circle.style.backgroundColor = "black" // 👈 always black
    })

    window.addEventListener("mousemove", (e) => {
      coords.x = e.clientX
      coords.y = e.clientY
    })

    function animateCircles() {
      let x = coords.x
      let y = coords.y

      circles.forEach((circle, index) => {
        circle.style.left = x - 12 + "px"
        circle.style.top = y - 12 + "px"
        circle.style.scale = String((circles.length - index) / circles.length)

        ;(circle as any).x = x
        ;(circle as any).y = y

        const nextCircle = (circles[index + 1] as any) || (circles[0] as any)
        x += (nextCircle.x - x) * 0.3
        y += (nextCircle.y - y) * 0.3
      })

      requestAnimationFrame(animateCircles)
    }

    animateCircles()
  }, [])

  return (
    <>
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="circle fixed w-6 h-6 rounded-full pointer-events-none z-[9999]"
          style={{ left: "0px", top: "0px" }}
        />
      ))}
    </>
  )
}

import { useEffect, useRef } from 'react'

export default function ParticleBackground({ count = 80, color = '#00e89d', opacity = 0.3 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let particles = []

    const resize = () => {
      canvas.width = canvas.parentElement.clientWidth * Math.min(window.devicePixelRatio, 2)
      canvas.height = canvas.parentElement.clientHeight * Math.min(window.devicePixelRatio, 2)
      canvas.style.width = '100%'
      canvas.style.height = '100%'
    }

    const initParticles = () => {
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 0.5,
        dx: (Math.random() - 0.5) * 0.4,
        dy: (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * opacity + 0.05,
      }))
    }

    let lastTime = 0
    const interval = 1000 / 30 // 30 fps

    const draw = (time) => {
      animId = requestAnimationFrame(draw)
      if (time - lastTime < interval) return
      lastTime = time

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const p of particles) {
        p.x += p.dx
        p.y += p.dy

        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = color
        ctx.globalAlpha = p.alpha
        ctx.fill()
      }
      ctx.globalAlpha = 1

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = color
            ctx.globalAlpha = (1 - dist / 120) * 0.08
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
      ctx.globalAlpha = 1
    }

    resize()
    initParticles()
    animId = requestAnimationFrame(draw)
    window.addEventListener('resize', () => { resize(); initParticles() })

    return () => {
      cancelAnimationFrame(animId)
    }
  }, [count, color, opacity])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}

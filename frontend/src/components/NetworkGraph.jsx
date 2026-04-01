import { useEffect, useRef, useMemo } from 'react'
import * as THREE from 'three'

/**
 * Reusable Three.js network graph.
 * Props:
 *   nodes: [{ id, label, x, y }]    – normalised -1..1
 *   edges: [{ from, to, active }]
 *   optimizedEdges: [{ from, to }]   – shown after optimization
 *   optimized: boolean               – toggle between states
 *   width / height: pixel dims
 */
export default function NetworkGraph({
  nodes = [],
  edges = [],
  optimizedEdges = [],
  optimized = false,
  width = 600,
  height = 500,
}) {
  const mountRef = useRef(null)
  const rendererRef = useRef(null)
  const sceneRef = useRef(null)
  const frameId = useRef(null)

  const currentEdges = optimized ? optimizedEdges : edges

  // Stable geometry
  const nodePositions = useMemo(() => {
    const map = {}
    nodes.forEach((n) => {
      map[n.id] = new THREE.Vector3(n.x * 3, n.y * 2.5, 0)
    })
    return map
  }, [nodes])

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    // Scene
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100)
    camera.position.z = 8

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Node spheres
    const sphereGeo = new THREE.SphereGeometry(0.18, 24, 24)
    const nodeGroup = new THREE.Group()

    nodes.forEach((n) => {
      const mat = new THREE.MeshBasicMaterial({ color: 0x4AC9A0 })
      const mesh = new THREE.Mesh(sphereGeo, mat)
      mesh.position.copy(nodePositions[n.id])
      nodeGroup.add(mesh)

      // Glow
      const glowGeo = new THREE.SphereGeometry(0.3, 16, 16)
      const glowMat = new THREE.MeshBasicMaterial({
        color: 0x4AC9A0,
        transparent: true,
        opacity: 0.12,
      })
      const glow = new THREE.Mesh(glowGeo, glowMat)
      glow.position.copy(nodePositions[n.id])
      nodeGroup.add(glow)
    })
    scene.add(nodeGroup)

    // Labels (using sprites)
    nodes.forEach((n) => {
      const canvas2d = document.createElement('canvas')
      canvas2d.width = 128
      canvas2d.height = 48
      const ctx2d = canvas2d.getContext('2d')
      ctx2d.font = '600 22px "JetBrains Mono", monospace'
      ctx2d.textAlign = 'center'
      ctx2d.fillStyle = '#f0f4ff'
      ctx2d.fillText(n.label, 64, 30)
      const tex = new THREE.CanvasTexture(canvas2d)
      const spriteMat = new THREE.SpriteMaterial({ map: tex, transparent: true, opacity: 0.85 })
      const sprite = new THREE.Sprite(spriteMat)
      sprite.scale.set(1.2, 0.4, 1)
      sprite.position.copy(nodePositions[n.id])
      sprite.position.y -= 0.45
      scene.add(sprite)
    })

    // Animate
    let t = 0
    const animate = () => {
      frameId.current = requestAnimationFrame(animate)
      t += 0.005

      // Gentle float
      nodeGroup.children.forEach((child, i) => {
        child.position.y += Math.sin(t + i * 0.5) * 0.001
      })

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(frameId.current)
      renderer.dispose()
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement)
      }
    }
  }, [nodes, nodePositions, width, height])

  // Update edges dynamically
  useEffect(() => {
    const scene = sceneRef.current
    if (!scene) return

    // Remove old edge lines
    const toRemove = []
    scene.children.forEach((child) => {
      if (child.userData?.isEdge) toRemove.push(child)
    })
    toRemove.forEach((c) => scene.remove(c))

    // Draw new edges
    currentEdges.forEach((e) => {
      const from = nodePositions[e.from]
      const to = nodePositions[e.to]
      if (!from || !to) return

      const points = [from, to]
      const geo = new THREE.BufferGeometry().setFromPoints(points)
      const mat = new THREE.LineBasicMaterial({
        color: optimized ? 0x4AC9A0 : 0xC9974A,
        transparent: true,
        opacity: optimized ? 0.8 : 0.35,
        linewidth: 1,
      })
      const line = new THREE.Line(geo, mat)
      line.userData.isEdge = true
      scene.add(line)
    })
  }, [currentEdges, optimized, nodePositions])

  return (
    <div
      ref={mountRef}
      style={{
        width,
        height,
        borderRadius: 16,
        overflow: 'hidden',
      }}
    />
  )
}

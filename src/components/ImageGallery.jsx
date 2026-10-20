import { useRef } from "react"
import { animated, useSpring } from "@react-spring/web"
import { useGesture } from "@use-gesture/react"
import imgs from "../data"

const calcX = (pointerY, galleryY) =>
  -(pointerY - galleryY - window.innerHeight / 2) / 20

const calcY = (pointerX, galleryX) =>
  (pointerX - galleryX - window.innerWidth / 2) / 20

export default function ImageGallery() {
  const domTarget = useRef(null)
  const [springs, api] = useSpring(() => ({
    from: {
      opacity: 0,
      x: 0,
      y: 24,
      scale: 0.96,
      rotateX: 0,
      rotateY: 0,
    },
    to: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      rotateX: 0,
      rotateY: 0,
    },
    config: {
      mass: 5,
      tension: 350,
      friction: 40,
    },
  }))

  useGesture(
    {
      onDrag: ({ active, offset: [x, y] }) => {
        api.start({
          x,
          y,
          rotateX: 0,
          rotateY: 0,
          scale: active ? 1 : 1.03,
          //   immediate: active,
        })
      },

      onMove: ({ xy: [px, py], dragging }) => {
        if (dragging || !domTarget.current) return

        const rect = domTarget.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        api.start({
          rotateX: -(py - centerY) / 20,
          rotateY: (px - centerX) / 20,
          scale: 1.03,
        })
      },

      onHover: ({ hovering }) => {
        if (!hovering) {
          api.start({
            rotateX: 0,
            rotateY: 0,
            scale: 1,
          })
        } else {
          api.start({ scale: 1.03 })
        }
      },
    },
    {
      target: domTarget,
      eventOptions: { passive: false },
    },
  )

  return (
    <animated.section
      ref={domTarget}
      style={{
        perspective: 1000,
        ...springs,
      }}
      className="w-full max-w-190 bg-white/10 rounded-3xl p-3 shadow-xl touch-none cursor-grab active:cursor-grabbing"
      aria-label="Landscape photo collection"
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {imgs.map((img) => (
          <div
            key={img}
            style={{
              backgroundImage: `url(${img})`,
            }}
            className="aspect-square bg-cover bg-center rounded-2xl bg-slate-700"
            aria-label="Landscape photograph"
          />
        ))}
      </div>
    </animated.section>
  )
}

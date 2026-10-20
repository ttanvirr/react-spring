# Initial Setup

Follow this link to set up the following things:

- Vite + React + TypeScript
- Tailwind CSS

# Install React Spring

Run the following command to install React Spring:

```bash
npm install @react-spring/web
```

# Get Started

## The Animated Element

The actual component that handles animation is our `animated` component. This is just a higher-order component (HOC).

> a higher-order component is a function that takes a component and returns a new component.

So, it's just a fancy wrapper. To use it, we need to import it:

```jsx
import { animated } from "@react-spring/web"
```

We use our animated component like any other JSX element and to ensure we can see it, we'll add some styling:

```jsx
import { animated } from "@react-spring/web"

export default function MyComponent() {
  return (
    <animated.div
      style={{
        width: 80,
        height: 80,
        background: "#ff6d6d",
        borderRadius: 8,
      }}
    />
  )
}
```

Now we're ready to add our hook & animate the component!

## The Hook and the Animation

Our signature hook is – `useSpring`.

To use `useSpring`, we treat it like any other hook:

```jsx
import { useSpring, animated } from "@react-spring/web"

export default function MyComponent() {
  const springs = useSpring({
    from: { x: 0 },
    to: { x: 100 },
  })

  return (
    <animated.div
      style={{
        width: 80,
        height: 80,
        background: "#ff6d6d",
        borderRadius: 8,
        ...springs,
      }}
    />
  )
}
```

We use the keywords `from` and `to` to define the start and end values of our animation.

`useSpring` doesn't animate anything. It just returns `SpringValues` that we pass to our animated component like `style={...springs}`.

## Reacting to events

We normally want animations to occur on a user interaction like, mouseenter, click, keydown or any event that could occur.

`useSpring` can take two types of first argument, a `config` object and a `function`. We'll start by changing the notation of our hook.

`App.jsx`

```jsx
// ...imports

export default function MyComponent() {
  const [springs, api] = useSpring(() => ({
    from: { x: 0 },
  }))

  // ...rest of the code
}
```

When we provide a function to `useSpring` we get an array returned, with the first argument as our `springs` and the second argument is the `api` that controls these springs.

We'll start with a very basic user interaction, the `onClick` event by creating a handler and in that handler we'll use the `api.start` method. The `start` method starts our animation with the configuration we provide to it, like so:

```jsx
import { useSpring, animated } from "@react-spring/web"

export default function MyComponent() {
  const [springs, api] = useSpring(() => ({
    from: { x: 0 },
  }))

  const handleClick = () => {
    api.start({
      from: {
        x: 0,
      },
      to: {
        x: 100,
      },
    })
  }

  return (
    <animated.div
      onClick={handleClick}
      style={{
        width: 80,
        height: 80,
        background: "#ff6d6d",
        borderRadius: 8,
        ...springs,
      }}
    />
  )
}
```

The `api` value has many different methods that we can use to control our animation. We can `stop` our animations, we can `set` them (to change the value without animation) and much more.

# useSpring hook

This is our flagship hook. Applicable to most use-cases.

## Using with a function & deps

```jsx
import { useSpring, animated } from "@react-spring/web"

function MyComponent() {
  const [props, api] = useSpring(
    () => ({
      from: { opacity: 0 },
      to: { opacity: 1 },
    }),
    [],
  )

  return <animated.div style={props}>Hello World</animated.div>
}
```

## Using with a config object

```jsx
import { useSpring, animated } from "@react-spring/web"

function MyComponent() {
  const props = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
  })

  return <animated.div style={props}>Hello World</animated.div>
}
```

## Examples:

### 1. Animating Auto

`src/components/AnimatingAuto`

```jsx
import useMeasure from "react-use-measure"
import { useState } from "react"
import { animated, useSpring } from "@react-spring/web"

export default function AnimatingAuto() {
  const [ref, { width }] = useMeasure()
  const [toggle, setToggle] = useState(false)
  const props = useSpring({ width: toggle ? width : 0 })

  return (
    <div
      ref={ref}
      className="relative overflow-hidden w-50 h-12 border-2 border-[#272727] rounded"
      onClick={() => setToggle(!toggle)}
    >
      <animated.div
        className="absolute top-0 left-0 w-full h-full bg-pink-400"
        style={props}
      />
      <animated.div className="absolute top-0 left-0 w-full h-full text-[##272727] flex items-center justify-center">
        {props.width.to((x) => x.toFixed(0))}
      </animated.div>
    </div>
  )
}
```

We need to install `react-use-measure` to use `useMeasure` hook.

Here, the `to()` method maps the animated value to a new value where, `x` represents the current animated value.

### 2. Dragging with `useGesture`

Create `src/data.js` with some image srcs:

```js
const imgs = [
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80",
]
export default imgs
```

Create `src/components/ImageGallery.jsx`:

```jsx
import imgs from "../data"

export default function ImageGallery() {
  return (
    <section
      className="w-full max-w-190 bg-white/10 rounded-3xl p-3 shadow-xl"
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
    </section>
  )
}
```

Check if the image gallery is shown in the browser.

Next use `useSpring` to to animate the gallery on page load and on hover:

```jsx
import { animated, useSpring } from "@react-spring/web"
import imgs from "../data"

export default function ImageGallery() {
  const [springs, api] = useSpring(() => ({
    from: {
      opacity: 0,
      y: 24,
      scale: 0.96,
    },
    to: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
    config: {
      mass: 5,
      tension: 350,
      friction: 40,
    },
  }))

  return (
    <animated.section
      style={springs}
      onPointerEnter={() => api.start({ scale: 1.03 })}
      onPointerLeave={() => api.start({ scale: 1 })}
      className="w-full max-w-190 bg-white/10 rounded-3xl p-3 shadow-xl"
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
```

`config` controls how the spring animation behaves.

Run and test that the animations work properly.

Now let's make the gallery draggable.

We'll use the official `useGesture` API from `@use-gesture/react`:

```bash
npm install @use-gesture/react
```

Add thsese two imports:

`src/components/ImageGallery.jsx`

```jsx
import { useRef } from "react"
import { useGesture } from "@use-gesture/react"
```

Create a reference to the gallery

```jsx
const domTarget =
  useRef() <
  //......
  animated.section
ref = { domTarget }
style = { springs }
```

Put `x` positions in addition to the existing `y` positions because dragging works on both axis:

```jsx
const domTarget = useRef(null)

const [springs, api] = useSpring(() => ({
  from: {
    opacity: 0,
    x: 0, //new
    y: 24,
    scale: 0.96,
  },
  to: {
    opacity: 1,
    x: 0, //new
    y: 0,
    scale: 1,
  },
  config: {
    mass: 5,
    tension: 350,
    friction: 40,
  },
}))
```

Immediately after useSpring, add gesture handler for both dragging and hover:

```jsx
useGesture(
  {
    onDrag: ({ active, offset: [x, y] }) => {
      api.start({
        x,
        y,
        scale: active ? 1 : 1.03,
        immediate: active,
      })
    },

    onHover: ({ hovering }) => {
      api.start({
        scale: hovering ? 1.03 : 1,
      })
    },
  },
  {
    target: domTarget,
    eventOptions: { passive: false },
  },
)
```

Remove the two pointer events for mouseenter and mouseleave added previously, because `useGesture` already handles hover events.

```jsx
<animated.section
    ref={domTarget}
    style={springs}
    onPointerEnter={() => api.start({ scale: 1.03 })} // remove line
    onPointerLeave={() => api.start({ scale: 1 })}  // remove line
```

Add these new classes for dragging styles: `touch-none cursor-grab active:cursor-grabbing`:

```jsx
<animated.section
    className="w-full max-w-190 bg-white/10 rounded-3xl p-3 shadow-xl touch-none cursor-grab active:cursor-grabbing"
```

Run and test that the animation and dragging works.

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
            className='relative overflow-hidden w-50 h-12 border-2 border-[#272727] rounded'
            onClick={() => setToggle(!toggle)}>
            <animated.div
                className='absolute top-0 left-0 w-full h-full bg-pink-400'
                style={props}
            />
            <animated.div className='absolute top-0 left-0 w-full h-full text-[##272727] flex items-center justify-center'>
                {props.width.to((x) => x.toFixed(0))}
            </animated.div>
        </div>
    )
}
```

We need to install `react-use-measure` to use `useMeasure` hook.

Here, the `to()` method maps the animated value to a new value where, `x` represents the current animated value.

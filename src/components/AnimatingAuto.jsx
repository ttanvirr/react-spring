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
            <animated.div className='absolute top-0 left-0 w-full h-full text-[#272727] flex items-center justify-center'>
                {props.width.to((x) => x.toFixed(0))}
            </animated.div>
        </div>
    )
}

import { useRef, useState, useCallback, memo } from 'react'
import { useSpring, animated, config } from '@react-spring/web'
import Image from './Image'
import Link from './Link'

// Constants for animation calculations
const ANIMATION_CONFIG = {
  perspective: 600,
  scale: {
    default: 1,
    hover: 0.92,
    imageOnly: 1.05,
  },
  sensitivity: {
    x: 10,
    y: 1,
    imageOnly: 4,
  },
}

// Memoized calculation function
const calculateTransform = (x, y, rect, onlyImg) => {
  const { sensitivity } = ANIMATION_CONFIG
  const divisor = onlyImg ? sensitivity.imageOnly : 1

  return [
    -(y - rect.top - rect.height / 2) / divisor,
    (x - rect.left - rect.width / 2) / (onlyImg ? sensitivity.imageOnly : sensitivity.x),
    onlyImg ? ANIMATION_CONFIG.scale.imageOnly : ANIMATION_CONFIG.scale.hover,
  ]
}

// Memoized transform function
const transform = (x, y, s) =>
  `perspective(${ANIMATION_CONFIG.perspective}px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`

// Base styles for the card
const baseStyles = {
  card: 'overflow-hidden',
  gradient:
    'rounded-md -z-10 h-full bg-gradient-to-r from-secondaryAccentDark via-secondaryAccent to-neonblush',
  content: `
    relative z-20 h-full overflow-hidden rounded-md
    bg-[#f7f7f7] will-change-transform
    after:pointer-events-none after:absolute after:inset-0 after:z-10
    after:bg-texture-pattern after:bg-cover after:bg-no-repeat
    after:opacity-0 after:mix-blend-hard-light after:transition-opacity
    after:duration-500 after:will-change-auto hover:after:opacity-100
    dark:bg-[#11091e]
  `,
}

const ButtonCard = memo(
  ({
    children,
    title,
    description,
    imgSrc,
    href,
    onlyImg = false,
    className = '',
    mdSize = true,
  }) => {
    const ref = useRef(null)
    const [xys, set] = useState([0, 0, ANIMATION_CONFIG.scale.default])

    // Memoized spring animation
    const props = useSpring({
      xys,
      config: config.molasses,
    })

    // Memoized event handlers
    const handleMouseLeave = useCallback(() => {
      set([0, 0, ANIMATION_CONFIG.scale.default])
    }, [])

    const handleMouseMove = useCallback(
      (e) => {
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()
        set(calculateTransform(e.clientX, e.clientY, rect, onlyImg))
      },
      [onlyImg]
    )

    // Memoized size classes
    const sizeClasses =
      !onlyImg && mdSize ? 'w-full text-secondaryAccent dark:text-secondaryAccentDark md:w-1/4' : ''

    // Memoized padding classes
    const paddingClasses = onlyImg ? 'p-0.5' : 'p-0.5 dark:p-px'

    // Memoized image size classes
    const imageSizeClasses = onlyImg ? 'h-32 w-32' : ''

    return (
      <div className={`${sizeClasses} ${className} ${baseStyles.card}`} ref={ref}>
        <div className={`${baseStyles.gradient} ${paddingClasses}`}>
          <Link href={href} aria-label={`Link to ${title}`}>
            <animated.div
              style={{ transform: props.xys.to(transform) }}
              onMouseLeave={handleMouseLeave}
              onMouseMove={handleMouseMove}
              className={`${baseStyles.content} ${imageSizeClasses}`}
            >
              {imgSrc && <Image alt={title} src={imgSrc} className="object-cover object-center" />}

              {onlyImg ? (
                children
              ) : (
                <div className="p-4">
                  <h2 className="mb-1 text-2xl font-bold leading-8 tracking-tight">{title}</h2>
                  <p className="prose mb-1 max-w-none text-black dark:text-white">{description}</p>
                  <div className="text-2xl font-thin leading-6 text-secondaryAccent hover:text-primaryAccent dark:text-secondaryAccentDark dark:hover:text-neonblush">
                    <svg
                      className="rotate-180"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M6.75 8.75V17.25H15.25"
                      />
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M7 17L17.25 6.75"
                      />
                    </svg>
                  </div>
                </div>
              )}
            </animated.div>
          </Link>
        </div>
      </div>
    )
  }
)

ButtonCard.displayName = 'ButtonCard'

export default ButtonCard

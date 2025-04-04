import { useRef, useState } from 'react'
import { useSpring, animated, config } from '@react-spring/web'
import Image from './Image'
import Link from './Link'

const calc = (x, y, rect, onlyImg) => [
  -(y - rect.top - rect.height / 2) / (onlyImg ? 4 : 1),
  (x - rect.left - rect.width / 2) / (onlyImg ? 4 : 10),
  onlyImg ? 1.05 : 0.92,
]
const trans = (x, y, s) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`

const ButtonCard = ({
  children,
  title,
  description,
  imgSrc,
  href,
  onlyImg = false,
  className,
  mdSize = true,
}) => {
  const ref = useRef(null)
  const [xys, set] = useState([0, 0, 1])
  const props = useSpring({ xys, config: config.molasses })

  return (
    <div
      className={`${
        !onlyImg && mdSize && 'w-full text-secondaryAccent dark:text-secondaryAccentDark md:w-1/4'
      } ${className} overflow-hidden`}
      ref={ref}
    >
      <div
        className={`rounded-md ${
          onlyImg ? 'p-0.5' : 'p-0.5 dark:p-px'
        } -z-10 h-full bg-gradient-to-r from-secondaryAccentDark via-secondaryAccent to-neonblush`}
      >
        <Link href={href} aria-label={`Link to ${title}`}>
          <animated.div
            style={{ transform: props.xys.to(trans) }}
            onMouseLeave={() => set([0, 0, 1])}
            onMouseMove={(e) => {
              const rect = ref.current.getBoundingClientRect()
              set(calc(e.clientX, e.clientY, rect, onlyImg))
            }}
            className={`${
              onlyImg && 'h-32 w-32'
            } hover:after:animate-hue-animation relative z-20 h-full overflow-hidden rounded-md
          bg-[#f7f7f7] will-change-transform after:pointer-events-none after:absolute after:inset-0 after:z-10 after:bg-texture-pattern
          after:bg-cover after:bg-no-repeat after:opacity-0 after:mix-blend-hard-light after:transition-opacity
          after:duration-500 after:will-change-auto hover:after:opacity-100 dark:bg-[#11091e]`}
          >
            {imgSrc && <Image alt={title} src={imgSrc} className="object-cover object-center" />}
            {onlyImg && <>{children}</>}
            {!onlyImg && (
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

export default ButtonCard

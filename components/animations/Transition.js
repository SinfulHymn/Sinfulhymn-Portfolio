import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'

const variants = {
  in: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.2,
      delay: 0,
    },
  },
  out: {
    opacity: 0,
    scale: 1,
    y: 40,
    transition: {
      duration: 0.2,
    },
  },
}

const Transition = ({ children }) => {
  const { asPath } = useRouter()
  return (
    <div className="overflow-hidden">
      <AnimatePresence initial={false} mode="wait">
        <motion.div variants={variants} key={asPath} animate="in" initial="out" exit="out">
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default Transition

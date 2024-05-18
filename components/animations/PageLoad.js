import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'

const variants = {
  in: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.45,
      delay: 0.005,
    },
  },
  out: {
    opacity: 0,
    scale: 1,
    y: 40,
    transition: {
      duration: 0.45,
    },
  },
}

const PageLoad = ({ children }) => {
  const { asPath } = useRouter()
  return (
    <div className="overflow-hidden">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          variants={{
            initial: {},
            animate: {
              transition: {
                when: 'beforeChildren',
                staggerChildren: 0.1,
              },
            },
            exit: {},
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default PageLoad

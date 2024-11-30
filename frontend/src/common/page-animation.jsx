import { AnimatePresence,  motion} from "framer-motion";
const AnimatioWrapper = ({ children, initial={ opacity:0}, animate= { opacity:1}, transition={duration: 1}, keyValue, classname }) => {
    return (

        <motion.div 
            key={keyValue}
            initial={initial}
            animate={animate}
            transition={transition}
            className={classname}
        >
            { children }
        </motion.div>
    )
}

export default AnimatioWrapper
import { motion } from "framer-motion";

export default function Pagina({ className, entrada = true, children }) {
  return (
    <motion.section
      className={className ? "pagina " + className : "pagina"}
      initial={entrada ? { opacity: 0, y: 18 } : false}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.section>
  );
}

import { motion } from "framer-motion";

// a página entra como uma carta trazida para perto: cresce de leve enquanto aparece
export default function Pagina({ className, entrada = true, children }) {
  return (
    <motion.section
      className={className ? "pagina " + className : "pagina"}
      initial={entrada ? { opacity: 0, y: 28, scale: 0.96 } : false}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
}

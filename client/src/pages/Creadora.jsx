import React from 'react';
import { motion } from 'framer-motion';
import AcercaDeMi from '../components/AcercaDeMi/AcercaDeMi';

function Creadora() {
    return (
        <div>
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <AcercaDeMi />
            </motion.div>
        </div>
    );
}

export default Creadora;

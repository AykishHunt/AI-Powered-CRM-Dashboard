import React from "react"
import { motion } from "framer-motion"

export default function FeatureCard({ title, desc, icon }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="relative pl-16"
    >
      <dt className="text-base/7 font-semibold text-gray-900 dark:text-white">
        <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600 dark:bg-indigo-500">
          {icon}
        </div>
        {title}
      </dt>
      <dd className="mt-2 text-base/7 text-gray-500 dark:text-gray-400">
        {desc}
      </dd>
    </motion.div>
  )
}
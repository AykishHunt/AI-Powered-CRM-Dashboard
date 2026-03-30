import React from "react"

const testimonials = [
  { name: "Muhammad", role: "CEO, TechCorp", text: "This CRM transformed how we manage our customers. Super intuitive and powerful." },
  { name: "Ahmed", role: "Operations Lead", text: "The automation features saved us hours every week. Highly recommended!" },
  { name: "Ismail", role: "Product Manager", text: "Clean UI, fast performance, and great analytics. Love it!" },
]

export default function Testimonials() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base/7 font-semibold text-indigo-600 dark:text-indigo-400">
            Testimonials
          </h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            What our users say
          </p>
          <p className="mt-6 text-lg/8 text-gray-500 dark:text-gray-400">
            Real feedback from teams already growing with our platform.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mt-24 lg:max-w-none lg:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="flex flex-col justify-between rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50 p-8"
            >
              <p className="text-base/7 text-gray-600 dark:text-gray-300">"{t.text}"</p>
              <div className="mt-6 border-t border-gray-100 dark:border-gray-700/50 pt-6">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{t.name}</p>
                <p className="text-sm text-indigo-600 dark:text-indigo-400">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
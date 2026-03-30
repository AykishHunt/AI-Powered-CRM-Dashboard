import React from "react"

const members = [
  { name: "Leslie Alexander", role: "Co-Founder / CEO", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
  { name: "Michael Foster", role: "Co-Founder / CTO", img: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
  { name: "Dries Vincent", role: "Business Relations", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
  { name: "Lindsay Walton", role: "Front-end Developer", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
  { name: "Courtney Henry", role: "Designer", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
  { name: "Tom Cook", role: "Director of Product", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
]

export function Team() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:px-8 xl:grid-cols-3">
        <div className="max-w-xl">
          <h2 className="text-base/7 font-semibold text-indigo-600 dark:text-indigo-400">
            Our people
          </h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Meet our leadership
          </p>
          <p className="mt-6 text-lg/8 text-gray-500 dark:text-gray-400">
            We're a dynamic group of individuals passionate about what we do and dedicated to delivering the best results for our clients.
          </p>
        </div>

        <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
          {members.map((m) => (
            <li key={m.name}>
              <div className="flex items-center gap-x-6">
                <img
                  src={m.img}
                  alt={m.name}
                  className="size-16 rounded-full ring-2 ring-indigo-100 dark:ring-white/10"
                />
                <div>
                  <h3 className="text-base/7 font-semibold tracking-tight text-gray-900 dark:text-white">{m.name}</h3>
                  <p className="text-sm/6 font-semibold text-indigo-600 dark:text-indigo-400">{m.role}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
import React from "react"
import FeatureCard from "./FeatureCard"
import { BarChart, Users, Zap, ShieldCheck } from "lucide-react"

export default function Features() {
  const data = [
    {
      title: "Smart Analytics",
      desc: "Track performance with real-time insights and make data-driven decisions faster than ever before.",
      icon: <BarChart className="size-6 text-white" />,
    },
    {
      title: "Customer Management",
      desc: "Manage and organize all your customers in one place. Keep relationships strong and data clean.",
      icon: <Users className="size-6 text-white" />,
    },
    {
      title: "Automation",
      desc: "Save time by automating repetitive workflows. Focus on what matters and let the system handle the rest.",
      icon: <Zap className="size-6 text-white" />,
    },
    {
      title: "Advanced Security",
      desc: "Enterprise-grade security keeps your data safe. SSL, encryption, and access controls built in.",
      icon: <ShieldCheck className="size-6 text-white" />,
    },
  ]

  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base/7 font-semibold text-indigo-600 dark:text-indigo-400">
            Built for scale
          </h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Powerful Features for Modern Teams
          </p>
          <p className="mt-6 text-lg/8 text-gray-500 dark:text-gray-400">
            Everything you need to manage customers, automate workflows, and grow your business — all in one place.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {data.map((item) => (
              <FeatureCard key={item.title} {...item} />
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
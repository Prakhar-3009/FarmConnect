"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  {
    name: "Jan",
    farmers: 12,
    products: 8,
  },
  {
    name: "Feb",
    farmers: 16,
    products: 12,
  },
  {
    name: "Mar",
    farmers: 24,
    products: 18,
  },
  {
    name: "Apr",
    farmers: 32,
    products: 29,
  },
  {
    name: "May",
    farmers: 40,
    products: 36,
  },
  {
    name: "Jun",
    farmers: 48,
    products: 42,
  },
  {
    name: "Jul",
    farmers: 52,
    products: 48,
  },
  {
    name: "Aug",
    farmers: 61,
    products: 55,
  },
  {
    name: "Sep",
    farmers: 70,
    products: 61,
  },
  {
    name: "Oct",
    farmers: 82,
    products: 68,
  },
  {
    name: "Nov",
    farmers: 94,
    products: 74,
  },
  {
    name: "Dec",
    farmers: 102,
    products: 87,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip />
        <Bar dataKey="farmers" fill="#4ade80" radius={[4, 4, 0, 0]} className="fill-primary" />
        <Bar dataKey="products" fill="#16a34a" radius={[4, 4, 0, 0]} className="fill-primary" />
      </BarChart>
    </ResponsiveContainer>
  )
}

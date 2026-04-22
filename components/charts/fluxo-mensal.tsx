"use client"

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { formatBRL } from "@/lib/format"

type Row = { mesLabel: string; receitas: number; gastos: number }

const tickStyle = { fill: "#6b7699", fontSize: 11 }
const axisLineStyle = { stroke: "#272d44" }
const cursorStyle = { fill: "rgba(255,255,255,.03)" }
const tooltipContentStyle = {
  background: "#1c2030",
  border: "1px solid #272d44",
  borderRadius: 10,
  fontSize: 12,
}
const legendStyle = { color: "#6b7699", fontSize: 11 }

export function FluxoMensalChart({ data }: { data: Row[] }) {
  return (
    <div className="h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} barCategoryGap="20%">
          <CartesianGrid stroke="#272d44" strokeDasharray="0" vertical={false} />
          <XAxis
            dataKey="mesLabel"
            tick={tickStyle}
            axisLine={axisLineStyle}
            tickLine={false}
          />
          <YAxis
            tick={tickStyle}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v: number) => `R$${(v / 1000).toFixed(1)}k`}
          />
          <Tooltip
            cursor={cursorStyle}
            contentStyle={tooltipContentStyle}
            formatter={(value: number) => formatBRL(value)}
          />
          <Legend wrapperStyle={legendStyle} />
          <Bar
            dataKey="receitas"
            name="Receitas"
            fill="rgba(0,201,167,.65)"
            radius={[6, 6, 0, 0]}
          />
          <Bar
            dataKey="gastos"
            name="Gastos"
            fill="rgba(255,95,126,.65)"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

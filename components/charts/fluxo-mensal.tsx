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

export function FluxoMensalChart({ data }: { data: Row[] }) {
	return (
		<div className="h-[250px] w-full">
			<ResponsiveContainer width="100%" height="100%">
				<BarChart
					data={data}
					barCategoryGap="22%"
					margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
				>
					<CartesianGrid stroke="var(--color-border)" strokeDasharray="0" vertical={false} />

					<XAxis
						dataKey="mesLabel"
						tick= fill: "var(--color-muted)", fontSize: 11 
						axisLine= stroke: "var(--color-border)" 
						tickLine={false}
					/>

					<YAxis
						tick= fill: "var(--color-muted)", fontSize: 11 
						axisLine={false}
						tickLine={false}
						tickFormatter={(v) => `R$${(Number(v) / 1000).toFixed(1)}k`}
					/>

					<Tooltip
						cursor= fill: "rgba(255,255,255,.03)" 
						formatter={(value) => formatBRL(Number(value))}
					/>

					<Legend wrapperStyle= color: "var(--color-muted)", fontSize: 11  />

					<Bar dataKey="receitas" name="Receitas" fill="rgba(0,201,167,.65)" radius={[10, 10, 0, 0]} />
					<Bar dataKey="gastos" name="Gastos" fill="rgba(255,95,126,.65)" radius={[10, 10, 0, 0]} />
				</BarChart>
			</ResponsiveContainer>
		</div>
	)
}
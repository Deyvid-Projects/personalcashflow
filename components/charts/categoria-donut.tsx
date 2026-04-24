"use client"

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { formatBRL } from "@/lib/format"

const COLORS = [
	"#7b6ff0",
	"#00c9a7",
	"#ff5f7e",
	"#f9c846",
	"#4ca3f5",
	"#f093fb",
	"#43e97b",
	"#fa709a",
]

type Row = { categoria: string; valor: number }

// Helpers pra ler CSS vars com fallback (evita quebrar SSR/hidratação)
function cssVar(name: string, fallback: string) {
	if (typeof window === "undefined") return fallback
	const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
	return v || fallback
}

export function CategoriaDonut({ data }: { data: Row[] }) {
	const top = data.slice(0, 8)

	const muted = cssVar("--color-muted", "#6b7699")
	const card = cssVar("--color-card", "#1c2030")

	return (
		<div className="h-[250px] w-full">
			<ResponsiveContainer width="100%" height="100%">
				<PieChart>
					<Pie
						data={top}
						dataKey="valor"
						nameKey="categoria"
						innerRadius="62%"
						outerRadius="90%"
						paddingAngle={2}
						// “corte” limpo do donut (combina com o card)
						stroke={card}
						strokeWidth={3}
					>
						{top.map((_, i) => (
							<Cell key={i} fill={COLORS[i % COLORS.length]} />
						))}
					</Pie>

					{/* Tooltip: aparência vem do globals.css (.recharts-default-tooltip) */}
					<Tooltip formatter={(value) => formatBRL(Number(value))} />

					<Legend
						layout="vertical"
						align="right"
						verticalAlign="middle"
						wrapperStyle=
							color: muted,
							fontSize: 11,
							lineHeight: "14px",
						
					/>
				</PieChart>
			</ResponsiveContainer>
		</div>
	)
}

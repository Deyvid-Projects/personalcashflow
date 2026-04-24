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

// Helpers pra ler CSS vars com fallback (evita quebrar SSR/hidratação)
function cssVar(name: string, fallback: string) {
	if (typeof window === "undefined") return fallback
	const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
	return v || fallback
}

export function FluxoMensalChart({ data }: { data: Row[] }) {
	// Pega cores do tema (fallback pros valores que você já tinha)
	const muted = cssVar("--color-muted", "#6b7699")
	const border = cssVar("--color-border", "#272d44")
	const teal = cssVar("--color-teal", "#00c9a7")
	const red = cssVar("--color-red", "#ff5f7e")

	const tickStyle = { fill: muted, fontSize: 11 }
	const axisLineStyle = { stroke: border }
	const gridStyle = { stroke: border, strokeDasharray: "0" as const }

	return (
		<div className="h-[250px] w-full">
			<ResponsiveContainer width="100%" height="100%">
				<BarChart data={data} barCategoryGap="22%" margin= top: 8, right: 8, left: 0, bottom: 0 >
					<CartesianGrid {...gridStyle} vertical={false} />

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
						tickFormatter={(v) => `R$${(Number(v) / 1000).toFixed(1)}k`}
					/>

					{/* Tooltip: aparência vem do globals.css (.recharts-default-tooltip) */}
					<Tooltip
						cursor= fill: "rgba(255,255,255,.03)" 
						formatter={(value) => formatBRL(Number(value))}
					/>

					<Legend
						wrapperStyle=
							color: muted,
							fontSize: 11,
						
					/>

					<Bar
						dataKey="receitas"
						name="Receitas"
						fill={`rgba(0,0,0,0)`}
						// usa a cor do tema com alpha via fillOpacity (mais controlável)
						stroke={`rgba(0,0,0,0)`}
						radius={[10, 10, 0, 0]}
						// @ts-expect-error recharts aceita fillOpacity no runtime
						fillOpacity={1}
						shape={undefined}
						// fill direto com alpha (mantém visual “soft”)
						// Recharts não tem var() direto em rgba, então usamos a cor em hex vinda do tema como base.
						fill={teal.startsWith("#") ? `${teal}A6` : "rgba(0,201,167,.65)"}
					/>

					<Bar
						dataKey="gastos"
						name="Gastos"
						radius={[10, 10, 0, 0]}
						fill={red.startsWith("#") ? `${red}A6` : "rgba(255,95,126,.65)"}
					/>
				</BarChart>
			</ResponsiveContainer>
		</div>
	)
}

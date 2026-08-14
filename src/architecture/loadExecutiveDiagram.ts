import { createShapeId, Editor, toRichText } from 'tldraw'

export function loadExecutiveDiagram(editor: Editor) {
	// Clear existing shapes on current page to start clean
	const existingShapeIds = editor.getCurrentPageShapes().map((s) => s.id)
	if (existingShapeIds.length > 0) {
		editor.deleteShapes(existingShapeIds)
	}

	// Helper to create geo shapes
	function makeGeo({
		id,
		x,
		y,
		w,
		h,
		text = '',
		color = 'black',
		fill = 'none',
		geo = 'rectangle',
		align = 'middle',
		size = 'm',
	}: {
		id: string
		x: number
		y: number
		w: number
		h: number
		text?: string
		color?: string
		fill?: 'none' | 'semi' | 'solid' | 'pattern'
		geo?: string
		align?: 'start' | 'middle' | 'end'
		size?: 's' | 'm' | 'l' | 'xl'
	}) {
		const shapeId = createShapeId(id)
		editor.createShape({
			id: shapeId,
			type: 'geo',
			x,
			y,
			props: {
				geo: geo as any,
				w,
				h,
				richText: toRichText(text),
				color: color as any,
				fill: fill as any,
				align: align as any,
				size: size as any,
			},
		})
		return shapeId
	}

	// Helper to create text shapes
	function makeText({
		id,
		x,
		y,
		text,
		size = 'm',
		color = 'black',
	}: {
		id: string
		x: number
		y: number
		text: string
		size?: 's' | 'm' | 'l' | 'xl'
		color?: string
	}) {
		const shapeId = createShapeId(id)
		editor.createShape({
			id: shapeId,
			type: 'text',
			x,
			y,
			props: {
				richText: toRichText(text),
				size: size as any,
				color: color as any,
			},
		})
		return shapeId
	}

	// Helper to create arrows
	function makeArrow({
		id,
		startId,
		endId,
		label = '',
		color = 'black',
	}: {
		id: string
		startId: string
		endId: string
		label?: string
		color?: string
	}) {
		const startShape = editor.getShape(createShapeId(startId))
		const endShape = editor.getShape(createShapeId(endId))

		const startBounds = startShape ? editor.getShapePageBounds(startShape) : null
		const endBounds = endShape ? editor.getShapePageBounds(endShape) : null

		const startX = startBounds ? startBounds.center.x : 0
		const startY = startBounds ? startBounds.center.y : 0
		const endX = endBounds ? endBounds.center.x : 100
		const endY = endBounds ? endBounds.center.y : 100

		const shapeId = createShapeId(id)
		editor.createShape({
			id: shapeId,
			type: 'arrow',
			x: startX,
			y: startY,
			props: {
				start: { x: 0, y: 0 },
				end: { x: endX - startX, y: endY - startY },
				richText: toRichText(label),
				color: color as any,
				size: 's',
			},
		})

		if (startShape && endShape) {
			try {
				editor.createBinding({
					type: 'arrow',
					fromId: shapeId,
					toId: createShapeId(startId),
					props: { terminal: 'start', isExact: false, isPrecise: true } as any,
				})
				editor.createBinding({
					type: 'arrow',
					fromId: shapeId,
					toId: createShapeId(endId),
					props: { terminal: 'end', isExact: false, isPrecise: true } as any,
				})
			} catch (e) {
				// optional binding fallback
			}
		}

		return shapeId
	}

	// -------------------------------------------------------------
	// 1. TOP HEADER BANNER & CANVAS TITLE
	// -------------------------------------------------------------
	makeGeo({
		id: 'header_bg',
		x: 100,
		y: 50,
		w: 2800,
		h: 140,
		color: 'violet',
		fill: 'solid',
		geo: 'rectangle',
	})

	makeText({
		id: 'main_title',
		x: 130,
		y: 65,
		text: 'FLEEKS AI MISSION CONTROL',
		size: 'xl',
		color: 'black',
	})

	makeText({
		id: 'main_subtitle',
		x: 130,
		y: 120,
		text: 'Agent Evolution Flywheel and Production Trust System — Boardroom Architecture Blueprint',
		size: 'm',
		color: 'grey',
	})

	// -------------------------------------------------------------
	// 2. LAYER CONTAINERS (LANDSCAPE 4 COLUMNS)
	// -------------------------------------------------------------

	// Layer 1: Agent Execution Layer (Left)
	makeGeo({
		id: 'layer1_bg',
		x: 100,
		y: 220,
		w: 640,
		h: 1220,
		color: 'blue',
		fill: 'semi',
		geo: 'rectangle',
	})
	makeText({
		id: 'layer1_title',
		x: 120,
		y: 235,
		text: '1. AGENT EXECUTION LAYER',
		size: 'l',
		color: 'blue',
	})
	makeText({
		id: 'layer1_desc',
		x: 120,
		y: 275,
		text: 'Agents run anywhere in client ecosystem',
		size: 's',
		color: 'grey',
	})

	// Layer 2: Measurement & Attribution Layer
	makeGeo({
		id: 'layer2_bg',
		x: 770,
		y: 220,
		w: 660,
		h: 1220,
		color: 'light-blue',
		fill: 'semi',
		geo: 'rectangle',
	})
	makeText({
		id: 'layer2_title',
		x: 790,
		y: 235,
		text: '2. MEASUREMENT & ATTRIBUTION',
		size: 'l',
		color: 'light-blue',
	})
	makeText({
		id: 'layer2_desc',
		x: 790,
		y: 275,
		text: 'Standardized telemetry & single source of truth',
		size: 's',
		color: 'grey',
	})

	// Layer 3: Evaluation & Intelligence Layer (Center Heart)
	makeGeo({
		id: 'layer3_bg',
		x: 1460,
		y: 220,
		w: 700,
		h: 1220,
		color: 'violet',
		fill: 'semi',
		geo: 'rectangle',
	})
	makeText({
		id: 'layer3_title',
		x: 1480,
		y: 235,
		text: '3. EVALUATION & INTELLIGENCE',
		size: 'l',
		color: 'violet',
	})
	makeText({
		id: 'layer3_desc',
		x: 1480,
		y: 275,
		text: 'Multi-engine evaluation & Trust Score Generator',
		size: 's',
		color: 'grey',
	})

	// Layer 4: Governance & Evolution Layer (Right)
	makeGeo({
		id: 'layer4_bg',
		x: 2190,
		y: 220,
		w: 710,
		h: 1220,
		color: 'green',
		fill: 'semi',
		geo: 'rectangle',
	})
	makeText({
		id: 'layer4_title',
		x: 2210,
		y: 235,
		text: '4. GOVERNANCE & EVOLUTION',
		size: 'l',
		color: 'green',
	})
	makeText({
		id: 'layer4_desc',
		x: 2210,
		y: 275,
		text: 'Leaderboard, Production Gating & A/B Evolution',
		size: 's',
		color: 'grey',
	})

	// -------------------------------------------------------------
	// 3. LAYER 1 CARDS (Agent Execution Layer)
	// -------------------------------------------------------------

	// Frameworks Sub-box
	makeGeo({ id: 'fw_box', x: 130, y: 315, w: 580, h: 320, color: 'blue', fill: 'none' })
	makeText({
		id: 'fw_title',
		x: 150,
		y: 330,
		text: 'Heterogeneous Agent Ecosystem',
		size: 'm',
		color: 'blue',
	})

	makeGeo({
		id: 'fw_langgraph',
		x: 150,
		y: 375,
		w: 260,
		h: 65,
		text: '🦜 LangGraph Agents\n(Multi-Agent Graphs)',
		color: 'black',
		fill: 'solid',
		size: 's',
	})
	makeGeo({
		id: 'fw_crewai',
		x: 430,
		y: 375,
		w: 260,
		h: 65,
		text: '👥 CrewAI Agents\n(Role-based Crews)',
		color: 'black',
		fill: 'solid',
		size: 's',
	})
	makeGeo({
		id: 'fw_openai',
		x: 150,
		y: 460,
		w: 260,
		h: 65,
		text: '🤖 OpenAI Agents SDK\n(Function Callers)',
		color: 'black',
		fill: 'solid',
		size: 's',
	})
	makeGeo({
		id: 'fw_custom',
		x: 430,
		y: 460,
		w: 260,
		h: 65,
		text: '🏢 Custom Enterprise\n(Proprietary / In-house)',
		color: 'black',
		fill: 'solid',
		size: 's',
	})
	makeGeo({
		id: 'fw_tools',
		x: 150,
		y: 545,
		w: 540,
		h: 65,
		text: '🔌 Interactions: Tools, APIs, DBs, Knowledge Bases & Vector Stores',
		color: 'grey',
		fill: 'pattern',
		size: 's',
	})

	// Agent Run Output Box
	makeGeo({ id: 'run_box', x: 130, y: 655, w: 580, h: 220, color: 'blue', fill: 'solid' })
	makeText({ id: 'run_title', x: 150, y: 670, text: '📦 Agent Execution Run', size: 'm', color: 'black' })
	makeText({
		id: 'run_items',
		x: 150,
		y: 710,
		text: '• User Prompt & Intent\n• Agent Reasoning Process\n• Tool Invocations & Parameters\n• Model Outputs & Final Response',
		size: 's',
		color: 'black',
	})

	// Fleeks SDK Instrumentation Box
	makeGeo({ id: 'sdk_box', x: 130, y: 895, w: 580, h: 280, color: 'violet', fill: 'solid' })
	makeText({
		id: 'sdk_title',
		x: 150,
		y: 910,
		text: '🛡️ Fleeks SDK (Lightweight Instrumentation)',
		size: 'm',
		color: 'black',
	})
	makeText({
		id: 'sdk_bullets',
		x: 150,
		y: 950,
		text: 'Attaches Metadata to Every Run:\n  • Agent ID & Version Hash\n  • Session ID & User Context\n  • Run ID & Trace Hierarchy\n  • Execution Timestamps',
		size: 's',
		color: 'black',
	})
	makeGeo({
		id: 'sdk_forward',
		x: 150,
		y: 1090,
		w: 540,
		h: 60,
		text: '⚡ Centralized Telemetry Forwarding',
		color: 'violet',
		fill: 'pattern',
		size: 's',
	})

	// -------------------------------------------------------------
	// 4. LAYER 2 CARDS (Measurement & Attribution Layer)
	// -------------------------------------------------------------
	makeGeo({ id: 'm_box', x: 800, y: 315, w: 600, h: 560, color: 'light-blue', fill: 'none' })
	makeText({
		id: 'm_title',
		x: 820,
		y: 330,
		text: 'Telemetry Collection & Standardization',
		size: 'm',
		color: 'light-blue',
	})

	const metrics = [
		'🪙 Token Consumption (Prompt / Completion / Cached)',
		'💸 Execution Cost (Model + Tool Usage Costs)',
		'⏱️ Latency & Throughput (TTFT, Total Duration)',
		'🔧 Tool Usage & Call Tree Resolution',
		'❌ Retries, Failures & Error Stack Traces',
		'🧠 Memory Interactions & Context Retrieval',
		'💬 User Feedback Signals (Clicks, Edits, Ratings)',
		'📄 Generated Outputs & Artifact Payload',
	]

	metrics.forEach((m, idx) => {
		makeGeo({
			id: 'm_item_' + idx,
			x: 820,
			y: 375 + idx * 58,
			w: 560,
			h: 48,
			text: m,
			color: 'black',
			fill: 'solid',
			align: 'start',
			size: 's',
		})
	})

	// Unified Execution Record
	makeGeo({ id: 'uer_box', x: 800, y: 895, w: 600, h: 280, color: 'light-blue', fill: 'solid' })
	makeText({
		id: 'uer_title',
		x: 820,
		y: 910,
		text: '📑 UNIFIED EXECUTION RECORD',
		size: 'm',
		color: 'black',
	})
	makeText({
		id: 'uer_sub',
		x: 820,
		y: 955,
		text: 'Single Source of Truth for Framework-Agnostic Runs',
		size: 's',
		color: 'grey',
	})
	makeText({
		id: 'uer_desc',
		x: 820,
		y: 1000,
		text: 'Consolidates all execution telemetry into a normalized,\nsearchable, and auditable record regardless of underlying\nframework (LangGraph, CrewAI, OpenAI, Custom).',
		size: 's',
		color: 'black',
	})

	// -------------------------------------------------------------
	// 5. LAYER 3 CARDS (Evaluation & Intelligence Layer)
	// -------------------------------------------------------------
	makeGeo({ id: 'eval_engines_box', x: 1490, y: 315, w: 640, h: 560, color: 'violet', fill: 'none' })
	makeText({
		id: 'eval_title',
		x: 1510,
		y: 330,
		text: 'Simultaneous Evaluation Engines',
		size: 'm',
		color: 'violet',
	})

	const engines = [
		{
			title: '🎯 Task Success Engine',
			desc: 'Objective completion & expected outcome verification',
		},
		{
			title: '🛡️ Trustworthiness Engine',
			desc: 'Hallucination rate, grounding quality, factual reliability',
		},
		{ title: '⚡ Performance Engine', desc: 'Latency, TTFT, SLA compliance, throughput stability' },
		{
			title: '💰 Cost Efficiency Engine',
			desc: 'Cost per run, cost per outcome, token efficiency ratio',
		},
		{
			title: '👥 Human Feedback Engine',
			desc: 'User ratings, thumbs up/down, manual review & approvals',
		},
	]

	engines.forEach((eng, idx) => {
		makeGeo({
			id: 'engine_' + idx,
			x: 1510,
			y: 375 + idx * 105,
			w: 600,
			h: 90,
			text: eng.title + '\n' + eng.desc,
			color: 'violet',
			fill: 'solid',
			align: 'start',
			size: 's',
		})
	})

	// Trust Score Generator Box
	makeGeo({ id: 'tsg_box', x: 1490, y: 895, w: 640, h: 280, color: 'yellow', fill: 'solid' })
	makeText({
		id: 'tsg_title',
		x: 1510,
		y: 910,
		text: '🏆 TRUST SCORE GENERATOR',
		size: 'l',
		color: 'black',
	})
	makeGeo({
		id: 'score_badge',
		x: 1510,
		y: 955,
		w: 600,
		h: 100,
		text: 'UNIFIED AGENT RELIABILITY SCORE\nScore: 94.8 / 100 (Grade: A+)',
		color: 'orange',
		fill: 'solid',
		size: 'm',
	})
	makeText({
		id: 'tsg_desc',
		x: 1510,
		y: 1070,
		text: 'Provides organizational confidence benchmark to compare\nagents across teams and environments.',
		size: 's',
		color: 'black',
	})

	// -------------------------------------------------------------
	// 6. LAYER 4 CARDS (Governance & Evolution Layer)
	// -------------------------------------------------------------
	// Leaderboard
	makeGeo({ id: 'lb_box', x: 2220, y: 315, w: 650, h: 250, color: 'green', fill: 'solid' })
	makeText({ id: 'lb_title', x: 2240, y: 330, text: '🏅 Agent Leaderboard', size: 'm', color: 'black' })
	makeText({
		id: 'lb_desc',
		x: 2240,
		y: 370,
		text: 'Ranks enterprise agents by:\n  • Reliability Score & Trust Trend\n  • Cost Efficiency per Outcome\n  • User Adoption & SLA Compliance',
		size: 's',
		color: 'black',
	})

	// Production Gate
	makeGeo({ id: 'pg_box', x: 2220, y: 585, w: 650, h: 290, color: 'green', fill: 'solid' })
	makeText({ id: 'pg_title', x: 2240, y: 600, text: '🚪 Production Gate', size: 'm', color: 'black' })
	makeText({
		id: 'pg_desc',
		x: 2240,
		y: 640,
		text: 'Enforces Predefined Deployment Rules:\n  • Min Trust Score Threshold (e.g. >= 92%)\n  • Max Hallucination Rate (< 2%)\n  • Cost Cap per Run & Latency SLA',
		size: 's',
		color: 'black',
	})

	makeGeo({
		id: 'pg_approve',
		x: 2240,
		y: 775,
		w: 290,
		h: 80,
		text: '✅ Approved for Production\nDeployment',
		color: 'green',
		fill: 'pattern',
		size: 's',
	})
	makeGeo({
		id: 'pg_flag',
		x: 2550,
		y: 775,
		w: 300,
		h: 80,
		text: '🚩 Flagged for Review\nRollback / Optimization',
		color: 'orange',
		fill: 'pattern',
		size: 's',
	})

	// Evolution Engine
	makeGeo({
		id: 'evo_box',
		x: 2220,
		y: 895,
		w: 650,
		h: 280,
		color: 'light-green',
		fill: 'solid',
	})
	makeText({ id: 'evo_title', x: 2240, y: 910, text: '🧬 Evolution Engine', size: 'm', color: 'black' })
	makeText({
		id: 'evo_desc',
		x: 2240,
		y: 955,
		text: 'Continuous Analysis & Automated Recommendations:\n  • Failure Clustering & Root Cause Analysis\n  • Prompt & Tool Optimization Suggestions\n  • Model Selection & Memory Tuning\n  • Controlled A/B Testing Experiments',
		size: 's',
		color: 'black',
	})

	// -------------------------------------------------------------
	// 7. CONNECTING ARROWS & FLOW PIPELINES
	// -------------------------------------------------------------
	makeArrow({
		id: 'arrow1',
		startId: 'run_box',
		endId: 'sdk_box',
		label: 'Instruments Run',
		color: 'blue',
	})
	makeArrow({
		id: 'arrow2',
		startId: 'sdk_box',
		endId: 'm_box',
		label: 'Telemetry Stream',
		color: 'violet',
	})
	makeArrow({
		id: 'arrow3',
		startId: 'm_box',
		endId: 'uer_box',
		label: 'Standardize',
		color: 'light-blue',
	})
	makeArrow({
		id: 'arrow4',
		startId: 'uer_box',
		endId: 'eval_engines_box',
		label: 'Normalized Runs',
		color: 'violet',
	})
	makeArrow({
		id: 'arrow5',
		startId: 'eval_engines_box',
		endId: 'tsg_box',
		label: 'Multi-Engine Ratings',
		color: 'violet',
	})
	makeArrow({
		id: 'arrow6',
		startId: 'tsg_box',
		endId: 'lb_box',
		label: 'Reliability Index',
		color: 'yellow',
	})
	makeArrow({
		id: 'arrow7',
		startId: 'lb_box',
		endId: 'pg_box',
		label: 'Gating Evaluation',
		color: 'green',
	})
	makeArrow({
		id: 'arrow8',
		startId: 'pg_box',
		endId: 'evo_box',
		label: 'Feedback & Optimization',
		color: 'green',
	})

	// Zoom camera to fit layout
	setTimeout(() => {
		editor.zoomToFit({ animation: { duration: 400 } })
	}, 150)
}

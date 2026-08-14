import { HTMLContainer, RecordProps, Rectangle2d, ShapeUtil, T, TLShape } from 'tldraw'

const SHAPE_TYPE = 'execution-layer'

declare module 'tldraw' {
	export interface TLGlobalShapePropsMap {
		[SHAPE_TYPE]: {
			w: number
			h: number
		}
	}
}

export type ExecutionLayerShape = TLShape<typeof SHAPE_TYPE>

export class ExecutionLayerShapeUtil extends ShapeUtil<ExecutionLayerShape> {
	static override type = SHAPE_TYPE
	static override props: RecordProps<ExecutionLayerShape> = {
		w: T.number,
		h: T.number,
	}

	getDefaultProps(): ExecutionLayerShape['props'] {
		return {
			w: 570,
			h: 800,
		}
	}

	override canEdit() {
		return false
	}
	override canResize() {
		return false
	}

	getGeometry(shape: ExecutionLayerShape) {
		return new Rectangle2d({
			width: shape.props.w,
			height: shape.props.h,
			isFilled: true,
		})
	}

	getIndicatorPath(shape: ExecutionLayerShape) {
		const path = new Path2D()
		path.rect(0, 0, shape.props.w, shape.props.h)
		return path
	}

	component(shape: ExecutionLayerShape) {
		return (
			<HTMLContainer
				style={{
					width: shape.props.w,
					height: shape.props.h,
					pointerEvents: 'all',
				}}
			>
				<div className="exec-card-container exec-layer-cyan">
					<div className="exec-card-header">
						<div className="exec-step-number">01</div>
						<div>
							<h2 className="exec-card-title">Agent Execution Layer</h2>
							<p className="exec-card-subtext">Agents run in existing frameworks & enterprise codebases</p>
						</div>
					</div>

					<div className="exec-section-box">
						<div className="exec-section-label">Supported Agent Frameworks</div>
						<div className="exec-grid-2x2">
							<div className="exec-item-chip">
								<span className="exec-chip-icon">🦜</span>
								<div>
									<div className="exec-chip-title">LangGraph Agents</div>
									<div className="exec-chip-desc">Stateful cyclical graphs</div>
								</div>
							</div>
							<div className="exec-item-chip">
								<span className="exec-chip-icon">👥</span>
								<div>
									<div className="exec-chip-title">CrewAI Agents</div>
									<div className="exec-chip-desc">Role-based autonomous crews</div>
								</div>
							</div>
							<div className="exec-item-chip">
								<span className="exec-chip-icon">🤖</span>
								<div>
									<div className="exec-chip-title">OpenAI Agents SDK</div>
									<div className="exec-chip-desc">Assistants & function callers</div>
								</div>
							</div>
							<div className="exec-item-chip">
								<span className="exec-chip-icon">🏢</span>
								<div>
									<div className="exec-chip-title">Custom Enterprise Agents</div>
									<div className="exec-chip-desc">In-house microservices & bots</div>
								</div>
							</div>
						</div>
					</div>

					<div className="exec-section-box">
						<div className="exec-section-label">External Interactions & Knowledge</div>
						<div className="exec-interactive-bar">
							<span>🔌 Tools & REST APIs</span>
							<span>🗄️ SQL & NoSQL DBs</span>
							<span>📚 Vector DBs & RAG</span>
						</div>
					</div>

					<div className="exec-artifact-card">
						<div className="exec-artifact-header">
							<span>📦 AGENT RUN ARTIFACT</span>
							<span className="exec-tag-live">LIVE EXECUTION</span>
						</div>
						<div className="exec-artifact-flow">
							<div className="exec-flow-step">1. User Request</div>
							<div className="exec-flow-arrow">➔</div>
							<div className="exec-flow-step">2. Reasoning Chain</div>
							<div className="exec-flow-arrow">➔</div>
							<div className="exec-flow-step">3. Tool Calls</div>
							<div className="exec-flow-arrow">➔</div>
							<div className="exec-flow-step">4. Model Outputs & Response</div>
						</div>
					</div>

					<div className="exec-sdk-banner">
						<div className="exec-sdk-badge">LIGHTWEIGHT INSTRUMENTATION</div>
						<h3 className="exec-sdk-title">🛡️ Fleeks SDK</h3>
						<p className="exec-sdk-desc">
							Attaches Agent ID, Session ID, Run ID, Trace Information, and Execution Metadata to every
							run without altering business logic.
						</p>
						<div className="exec-sdk-tags">
							<span>agent_id: "ag-cust-809"</span>
							<span>session_id: "sess-994"</span>
							<span>run_id: "run-40291"</span>
							<span>trace_span: "active"</span>
						</div>
						<div className="exec-forward-notice">
							⚡ Forwards telemetry into Centralized Telemetry Collection System
						</div>
					</div>
				</div>
			</HTMLContainer>
		)
	}
}

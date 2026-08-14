import { HTMLContainer, RecordProps, Rectangle2d, ShapeUtil, T, TLShape } from 'tldraw'

const SHAPE_TYPE = 'governance-layer'

declare module 'tldraw' {
	export interface TLGlobalShapePropsMap {
		[SHAPE_TYPE]: {
			w: number
			h: number
		}
	}
}

export type GovernanceLayerShape = TLShape<typeof SHAPE_TYPE>

export class GovernanceLayerShapeUtil extends ShapeUtil<GovernanceLayerShape> {
	static override type = SHAPE_TYPE
	static override props: RecordProps<GovernanceLayerShape> = {
		w: T.number,
		h: T.number,
	}

	getDefaultProps(): GovernanceLayerShape['props'] {
		return {
			w: 580,
			h: 800,
		}
	}

	override canEdit() {
		return false
	}
	override canResize() {
		return false
	}

	getGeometry(shape: GovernanceLayerShape) {
		return new Rectangle2d({
			width: shape.props.w,
			height: shape.props.h,
			isFilled: true,
		})
	}

	getIndicatorPath(shape: GovernanceLayerShape) {
		const path = new Path2D()
		path.rect(0, 0, shape.props.w, shape.props.h)
		return path
	}

	component(shape: GovernanceLayerShape) {
		return (
			<HTMLContainer
				style={{
					width: shape.props.w,
					height: shape.props.h,
					pointerEvents: 'all',
				}}
			>
				<div className="exec-card-container exec-layer-amber">
					<div className="exec-card-header">
						<div className="exec-step-number">04</div>
						<div>
							<h2 className="exec-card-title">Governance & Evolution Layer</h2>
							<p className="exec-card-subtext">Leaderboard, Production Gating & Continuous Evolution</p>
						</div>
					</div>

					<div className="exec-section-box">
						<div className="exec-section-label">🏅 Agent Leaderboard (Enterprise Rankings)</div>
						<div className="exec-leaderboard-table">
							<div className="exec-lb-row exec-lb-head">
								<span>#</span>
								<span>Agent Name</span>
								<span>Score</span>
								<span>Status</span>
							</div>
							<div className="exec-lb-row active">
								<span className="rank-badge gold">1</span>
								<div>
									<div className="lb-name">Customer Support Agent</div>
									<div className="lb-sub">LangGraph • $0.012/run</div>
								</div>
								<span className="lb-score">94.8</span>
								<span className="status-badge green">Approved</span>
							</div>
							<div className="exec-lb-row">
								<span className="rank-badge silver">2</span>
								<div>
									<div className="lb-name">Sales SDR Assistant</div>
									<div className="lb-sub">CrewAI • $0.024/run</div>
								</div>
								<span className="lb-score">89.2</span>
								<span className="status-badge green">Approved</span>
							</div>
							<div className="exec-lb-row">
								<span className="rank-badge bronze">3</span>
								<div>
									<div className="lb-name">Code Review Bot</div>
									<div className="lb-sub">Custom Enterprise</div>
								</div>
								<span className="lb-score">76.4</span>
								<span className="status-badge red">Flagged</span>
							</div>
						</div>
					</div>

					<div className="exec-gate-card">
						<div className="exec-gate-header">
							<span>🚪 PRODUCTION GATE</span>
							<span className="gate-policy-label">POLICY ENFORCEMENT</span>
						</div>
						<div className="exec-gate-rules">
							<div className="gate-rule pass">
								<span>✔ Min Trust Score &gt;= 85.0</span>
								<span className="rule-val">PASS (94.8)</span>
							</div>
							<div className="gate-rule pass">
								<span>✔ Max Hallucination &lt; 1.0%</span>
								<span className="rule-val">PASS (0.3%)</span>
							</div>
							<div className="gate-rule pass">
								<span>✔ Max Cost &lt; $0.05/run</span>
								<span className="rule-val">PASS ($0.012)</span>
							</div>
						</div>
						<div className="exec-gate-actions">
							<div className="gate-action green">
								<span>✅ APPROVED FOR PRODUCTION DEPLOYMENT</span>
							</div>
							<div className="gate-action red">
								<span>🚩 FLAGGED FOR REVIEW / ROLLBACK</span>
							</div>
						</div>
					</div>

					<div className="exec-evolution-card">
						<div className="exec-evo-header">
							<span>🧬 EVOLUTION ENGINE</span>
							<span className="evo-tag">CONTINUOUS OPTIMIZATION</span>
						</div>
						<p className="exec-evo-desc">
							Historical telemetry analysis: Failure Clustering, Root Cause Analysis, Prompt & Tool
							Optimization, Model Selection & Memory Recommendations.
						</p>

						<div className="exec-ab-box">
							<div className="ab-header">
								<span>🔬 Controlled A/B Experimentation</span>
								<span className="ab-badge">ACTIVE TEST</span>
							</div>
							<div className="ab-grid">
								<div className="ab-item">
									<div className="ab-label">Variant A (Baseline)</div>
									<div className="ab-val">Prompt v2.1 • GPT-4o</div>
									<div className="ab-metric">Score: 89.4</div>
								</div>
								<div className="ab-item winner">
									<div className="ab-label">Variant B (Optimized)</div>
									<div className="ab-val">Prompt v2.2 • Claude Sonnet</div>
									<div className="ab-metric">Score: 94.8 (+5.4)</div>
								</div>
							</div>
						</div>
						<div className="exec-evo-feedback-notice">
							🔄 Results feed back through evaluation pipeline into continuous improvement
						</div>
					</div>
				</div>
			</HTMLContainer>
		)
	}
}

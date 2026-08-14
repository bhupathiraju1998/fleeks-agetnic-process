import { HTMLContainer, RecordProps, Rectangle2d, ShapeUtil, T, TLShape } from 'tldraw'

const SHAPE_TYPE = 'evaluation-layer'

declare module 'tldraw' {
	export interface TLGlobalShapePropsMap {
		[SHAPE_TYPE]: {
			w: number
			h: number
		}
	}
}

export type EvaluationLayerShape = TLShape<typeof SHAPE_TYPE>

export class EvaluationLayerShapeUtil extends ShapeUtil<EvaluationLayerShape> {
	static override type = SHAPE_TYPE
	static override props: RecordProps<EvaluationLayerShape> = {
		w: T.number,
		h: T.number,
	}

	getDefaultProps(): EvaluationLayerShape['props'] {
		return {
			w: 610,
			h: 800,
		}
	}

	override canEdit() {
		return false
	}
	override canResize() {
		return false
	}

	getGeometry(shape: EvaluationLayerShape) {
		return new Rectangle2d({
			width: shape.props.w,
			height: shape.props.h,
			isFilled: true,
		})
	}

	getIndicatorPath(shape: EvaluationLayerShape) {
		const path = new Path2D()
		path.rect(0, 0, shape.props.w, shape.props.h)
		return path
	}

	component(shape: EvaluationLayerShape) {
		return (
			<HTMLContainer
				style={{
					width: shape.props.w,
					height: shape.props.h,
					pointerEvents: 'all',
				}}
			>
				<div className="exec-card-container exec-layer-violet exec-card-heart">
					<div className="exec-heart-badge">❤️ THE HEART OF THE PLATFORM</div>
					<div className="exec-card-header">
						<div className="exec-step-number">03</div>
						<div>
							<h2 className="exec-card-title">Evaluation & Intelligence Layer</h2>
							<p className="exec-card-subtext">5 Simultaneous Evaluation Engines & Trust Generator</p>
						</div>
					</div>

					<div className="exec-section-box">
						<div className="exec-section-label">Simultaneous Evaluation Engines</div>
						<div className="exec-engines-stack">
							<div className="exec-engine-card">
								<div className="exec-eng-icon">🎯</div>
								<div className="exec-eng-body">
									<div className="exec-eng-title">Task Success Engine</div>
									<div className="exec-eng-desc">
										Measures objective completion, goal verification & output accuracy
									</div>
								</div>
								<div className="exec-eng-badge green">98.4% Success</div>
							</div>

							<div className="exec-engine-card">
								<div className="exec-eng-icon">🛡️</div>
								<div className="exec-eng-body">
									<div className="exec-eng-title">Trustworthiness Engine</div>
									<div className="exec-eng-desc">
										Hallucination rates, grounding quality, confidence consistency, factual integrity
									</div>
								</div>
								<div className="exec-eng-badge cyan">0.3% Halluc.</div>
							</div>

							<div className="exec-engine-card">
								<div className="exec-eng-icon">⚡</div>
								<div className="exec-eng-body">
									<div className="exec-eng-title">Performance Engine</div>
									<div className="exec-eng-desc">
										Latency, response time, throughput & SLA compliance limits
									</div>
								</div>
								<div className="exec-eng-badge violet">420ms Avg</div>
							</div>

							<div className="exec-engine-card">
								<div className="exec-eng-icon">💰</div>
								<div className="exec-eng-body">
									<div className="exec-eng-title">Cost Efficiency Engine</div>
									<div className="exec-eng-desc">
										Cost per run, cost per successful outcome, token utilization efficiency
									</div>
								</div>
								<div className="exec-eng-badge amber">$0.013/Run</div>
							</div>

							<div className="exec-engine-card">
								<div className="exec-eng-icon">👥</div>
								<div className="exec-eng-body">
									<div className="exec-eng-title">Human Feedback & Alignment Engine</div>
									<div className="exec-eng-desc">
										User ratings, manual expert reviews, audit approvals & RLHF alignment
									</div>
								</div>
								<div className="exec-eng-badge rose">4.9 / 5.0 Star</div>
							</div>
						</div>
					</div>

					<div className="exec-generator-card">
						<div className="exec-gen-header">
							<span className="exec-gen-tag">CENTRAL SCORING SYSTEM</span>
							<span className="exec-gen-label">REAL-TIME WEIGHTED EVALUATION</span>
						</div>
						<h3 className="exec-gen-title">🏆 Trust Score Generator</h3>
						<p className="exec-gen-desc">
							Synthesizes task success, trustworthiness, performance, cost, and human feedback into a single,
							comparable reliability benchmark.
						</p>

						<div className="exec-score-display">
							<div className="exec-score-box">
								<div className="exec-score-number">94.8</div>
								<div className="exec-score-max">/ 100</div>
							</div>
							<div className="exec-score-meta">
								<div className="exec-grade-badge">GRADE: A+ PRODUCTION READY</div>
								<div className="exec-score-subtext">Unified Agent Reliability Score</div>
							</div>
						</div>
					</div>
				</div>
			</HTMLContainer>
		)
	}
}

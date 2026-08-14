import { HTMLContainer, RecordProps, Rectangle2d, ShapeUtil, T, TLShape } from 'tldraw'

const SHAPE_TYPE = 'measurement-layer'

declare module 'tldraw' {
	export interface TLGlobalShapePropsMap {
		[SHAPE_TYPE]: {
			w: number
			h: number
		}
	}
}

export type MeasurementLayerShape = TLShape<typeof SHAPE_TYPE>

export class MeasurementLayerShapeUtil extends ShapeUtil<MeasurementLayerShape> {
	static override type = SHAPE_TYPE
	static override props: RecordProps<MeasurementLayerShape> = {
		w: T.number,
		h: T.number,
	}

	getDefaultProps(): MeasurementLayerShape['props'] {
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

	getGeometry(shape: MeasurementLayerShape) {
		return new Rectangle2d({
			width: shape.props.w,
			height: shape.props.h,
			isFilled: true,
		})
	}

	getIndicatorPath(shape: MeasurementLayerShape) {
		const path = new Path2D()
		path.rect(0, 0, shape.props.w, shape.props.h)
		return path
	}

	component(shape: MeasurementLayerShape) {
		return (
			<HTMLContainer
				style={{
					width: shape.props.w,
					height: shape.props.h,
					pointerEvents: 'all',
				}}
			>
				<div className="exec-card-container exec-layer-emerald">
					<div className="exec-card-header">
						<div className="exec-step-number">02</div>
						<div>
							<h2 className="exec-card-title">Measurement & Attribution Layer</h2>
							<p className="exec-card-subtext">Unified telemetry standardization & execution tracking</p>
						</div>
					</div>

					<div className="exec-section-box">
						<div className="exec-section-label">Captured Execution Telemetry</div>
						<div className="exec-metrics-grid">
							<div className="exec-metric-card">
								<span className="exec-m-icon">🪙</span>
								<div className="exec-m-name">Token Consumption</div>
								<div className="exec-m-val">1.4K prompt / 380 comp</div>
							</div>
							<div className="exec-metric-card">
								<span className="exec-m-icon">💸</span>
								<div className="exec-m-name">Execution Cost</div>
								<div className="exec-m-val">$0.0128 per run</div>
							</div>
							<div className="exec-metric-card">
								<span className="exec-m-icon">⏱️</span>
								<div className="exec-m-name">Latency & SLA</div>
								<div className="exec-m-val">420ms (TTFT: 110ms)</div>
							</div>
							<div className="exec-metric-card">
								<span className="exec-m-icon">🔧</span>
								<div className="exec-m-name">Tool Usage & Retries</div>
								<div className="exec-m-val">3 calls (0 retries)</div>
							</div>
							<div className="exec-metric-card">
								<span className="exec-m-icon">❌</span>
								<div className="exec-m-name">Failures & Errors</div>
								<div className="exec-m-val">0 rate limits / 0 timeouts</div>
							</div>
							<div className="exec-metric-card">
								<span className="exec-m-icon">🧠</span>
								<div className="exec-m-name">Memory Interactions</div>
								<div className="exec-m-val">State diff & context recall</div>
							</div>
							<div className="exec-metric-card">
								<span className="exec-m-icon">💬</span>
								<div className="exec-m-name">User Feedback Signals</div>
								<div className="exec-m-val">👍 Thumbs up + Ratings</div>
							</div>
							<div className="exec-metric-card">
								<span className="exec-m-icon">📄</span>
								<div className="exec-m-name">Generated Outputs</div>
								<div className="exec-m-val">Full response payload</div>
							</div>
						</div>
					</div>

					<div className="exec-record-card">
						<div className="exec-record-badge">SINGLE SOURCE OF TRUTH</div>
						<h3 className="exec-record-title">📑 Unified Execution Record</h3>
						<p className="exec-record-desc">
							Consolidates framework-specific execution metadata into a standardized, canonical record
							for enterprise-wide analysis, compliance auditing, and evaluation.
						</p>

						<div className="exec-record-json">
							<div className="exec-json-line">
								<span className="j-key">"framework"</span>: <span className="j-val">"LangGraph"</span>,
							</div>
							<div className="exec-json-line">
								<span className="j-key">"attributions"</span>: &#123;{' '}
								<span className="j-key">"cost"</span>: <span className="j-num">0.0128</span>,{' '}
								<span className="j-key">"tokens"</span>: <span className="j-num">1780</span> &#125;,
							</div>
							<div className="exec-json-line">
								<span className="j-key">"status"</span>: <span className="j-val">"COMPLETED"</span>,
							</div>
							<div className="exec-json-line">
								<span className="j-key">"standardized"</span>: <span className="j-bool">true</span>
							</div>
						</div>
					</div>

					<div className="exec-layer-footer-note">
						🌐 Framework-agnostic view of agent behavior regardless of where built or executed
					</div>
				</div>
			</HTMLContainer>
		)
	}
}

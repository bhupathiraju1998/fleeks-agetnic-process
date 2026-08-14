import { HTMLContainer, RecordProps, Rectangle2d, ShapeUtil, T, TLShape } from 'tldraw'

const SHAPE_TYPE = 'flywheel-hub'

declare module 'tldraw' {
	export interface TLGlobalShapePropsMap {
		[SHAPE_TYPE]: {
			w: number
			h: number
		}
	}
}

export type FlywheelShape = TLShape<typeof SHAPE_TYPE>

const FLYWHEEL_STEPS = [
	{ id: 1, label: 'RECORD', desc: 'Capture Telemetry', color: '#0EA5E9' },
	{ id: 2, label: 'ATTRIBUTE', desc: 'Standardize Context', color: '#10B981' },
	{ id: 3, label: 'EVALUATE', desc: '5 Multi-Engine Scoring', color: '#8B5CF6' },
	{ id: 4, label: 'RANK', desc: 'Leaderboard Positioning', color: '#F59E0B' },
	{ id: 5, label: 'GATE', desc: 'Production Policy Gating', color: '#EF4444' },
	{ id: 6, label: 'IMPROVE', desc: 'Failure Clustering & Fixes', color: '#EC4899' },
	{ id: 7, label: 'VALIDATE', desc: 'Controlled A/B Testing', color: '#6366F1' },
	{ id: 8, label: 'PROMOTE', desc: 'Deploy Best Version', color: '#14B8A6' },
]

export class FlywheelShapeUtil extends ShapeUtil<FlywheelShape> {
	static override type = SHAPE_TYPE
	static override props: RecordProps<FlywheelShape> = {
		w: T.number,
		h: T.number,
	}

	getDefaultProps(): FlywheelShape['props'] {
		return {
			w: 2420,
			h: 180,
		}
	}

	override canEdit() {
		return false
	}
	override canResize() {
		return false
	}

	getGeometry(shape: FlywheelShape) {
		return new Rectangle2d({
			width: shape.props.w,
			height: shape.props.h,
			isFilled: true,
		})
	}

	getIndicatorPath(shape: FlywheelShape) {
		const path = new Path2D()
		path.rect(0, 0, shape.props.w, shape.props.h)
		return path
	}

	component(shape: FlywheelShape) {
		return (
			<HTMLContainer
				style={{
					width: shape.props.w,
					height: shape.props.h,
					pointerEvents: 'all',
				}}
			>
				<div className="exec-flywheel-banner">
					<div className="exec-flywheel-left-brand">
						<div className="exec-brand-logo">⚡ FLEEKS</div>
						<div className="exec-brand-title">Mission Control</div>
						<div className="exec-brand-tagline">"Measure. Trust. Evolve."</div>
						<div className="exec-brand-subtext">Coordinates entire agent lifecycle</div>
					</div>

					<div className="exec-flywheel-track-container">
						<div className="exec-flywheel-track-header">
							<span className="track-title">🔄 THE CONTINUOUS AGENT EVOLUTION FLYWHEEL</span>
							<span className="track-sub">Continuous Loop vs One-Time Evaluation</span>
						</div>

						<div className="exec-flywheel-steps-ring">
							{FLYWHEEL_STEPS.map((step, idx) => (
								<div key={step.id} className="exec-flywheel-step">
									<div className="step-number-bubble" style={{ borderColor: step.color }}>
										{step.id}
									</div>
									<div className="step-content">
										<div className="step-label" style={{ color: step.color }}>
											{step.label}
										</div>
										<div className="step-desc">{step.desc}</div>
									</div>
									{idx < FLYWHEEL_STEPS.length - 1 && <div className="step-arrow">➔</div>}
									{idx === FLYWHEEL_STEPS.length - 1 && <div className="step-arrow-loop">🔄</div>}
								</div>
							))}
						</div>
					</div>
				</div>
			</HTMLContainer>
		)
	}
}

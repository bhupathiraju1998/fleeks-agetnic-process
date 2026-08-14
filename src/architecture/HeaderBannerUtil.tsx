import { HTMLContainer, RecordProps, Rectangle2d, ShapeUtil, T, TLShape } from 'tldraw'

const SHAPE_TYPE = 'header-banner'

declare module 'tldraw' {
	export interface TLGlobalShapePropsMap {
		[SHAPE_TYPE]: {
			w: number
			h: number
			title: string
			subtitle: string
		}
	}
}

export type HeaderBannerShape = TLShape<typeof SHAPE_TYPE>

export class HeaderBannerShapeUtil extends ShapeUtil<HeaderBannerShape> {
	static override type = SHAPE_TYPE
	static override props: RecordProps<HeaderBannerShape> = {
		w: T.number,
		h: T.number,
		title: T.string,
		subtitle: T.string,
	}

	getDefaultProps(): HeaderBannerShape['props'] {
		return {
			w: 2420,
			h: 120,
			title: 'Fleeks AI Mission Control: Agent Evolution Flywheel and Production Trust System',
			subtitle:
				'Transforming raw AI agent execution data into trusted production decisions & continuous agent evolution',
		}
	}

	override canEdit() {
		return false
	}
	override canResize() {
		return false
	}
	override isAspectRatioLocked() {
		return true
	}

	getGeometry(shape: HeaderBannerShape) {
		return new Rectangle2d({
			width: shape.props.w,
			height: shape.props.h,
			isFilled: true,
		})
	}

	getIndicatorPath(shape: HeaderBannerShape) {
		const path = new Path2D()
		path.rect(0, 0, shape.props.w, shape.props.h)
		return path
	}

	component(shape: HeaderBannerShape) {
		return (
			<HTMLContainer
				style={{
					width: shape.props.w,
					height: shape.props.h,
					pointerEvents: 'all',
				}}
			>
				<div className="exec-header-banner">
					<div className="exec-header-content">
						<div className="exec-header-badge">
							<span className="exec-badge-pulse" />
							EXECUTIVE ARCHITECTURE SPECIFICATION
						</div>
						<h1 className="exec-header-title">{shape.props.title}</h1>
						<p className="exec-header-subtitle">
							Agents continue running wherever they already run today—LangGraph, CrewAI, OpenAI Agents
							SDK, or Custom Systems—while Fleeks acts as the measurement, attribution, evaluation,
							trust, and evolution layer above the entire ecosystem.
						</p>
					</div>
					<div className="exec-header-pills">
						<span className="exec-pill exec-pill-cyan">Framework Agnostic</span>
						<span className="exec-pill exec-pill-emerald">Real-Time Telemetry</span>
						<span className="exec-pill exec-pill-violet">Multi-Engine Eval</span>
						<span className="exec-pill exec-pill-amber">Production Trust Gate</span>
					</div>
				</div>
			</HTMLContainer>
		)
	}
}

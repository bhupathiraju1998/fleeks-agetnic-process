import { HTMLContainer, RecordProps, Rectangle2d, ShapeUtil, T, TLShape } from 'tldraw'

const SHAPE_TYPE = 'strategic-callout'

declare module 'tldraw' {
	export interface TLGlobalShapePropsMap {
		[SHAPE_TYPE]: {
			w: number
			h: number
		}
	}
}

export type StrategicCalloutShape = TLShape<typeof SHAPE_TYPE>

export class StrategicCalloutShapeUtil extends ShapeUtil<StrategicCalloutShape> {
	static override type = SHAPE_TYPE
	static override props: RecordProps<StrategicCalloutShape> = {
		w: T.number,
		h: T.number,
	}

	getDefaultProps(): StrategicCalloutShape['props'] {
		return {
			w: 2420,
			h: 100,
		}
	}

	override canEdit() {
		return false
	}
	override canResize() {
		return false
	}

	getGeometry(shape: StrategicCalloutShape) {
		return new Rectangle2d({
			width: shape.props.w,
			height: shape.props.h,
			isFilled: true,
		})
	}

	getIndicatorPath(shape: StrategicCalloutShape) {
		const path = new Path2D()
		path.rect(0, 0, shape.props.w, shape.props.h)
		return path
	}

	component(shape: StrategicCalloutShape) {
		return (
			<HTMLContainer
				style={{
					width: shape.props.w,
					height: shape.props.h,
					pointerEvents: 'all',
				}}
			>
				<div className="exec-callout-banner">
					<div className="callout-icon-box">💡</div>
					<div className="callout-content">
						<div className="callout-tag">STRATEGIC ENTERPRISE REALITY</div>
						<p className="callout-quote">
							"Organizations will not struggle to build agents; they will struggle to understand{' '}
							<span className="h-cyan">which agents work</span>,{' '}
							<span className="h-emerald">which agents can be trusted</span>,{' '}
							<span className="h-violet">which agents are improving</span>, and{' '}
							<span className="h-amber">which agents should be deployed at scale</span>. Fleeks is the
							system that answers these questions through measurement, attribution, evaluation,
							governance, and evolution."
						</p>
					</div>
				</div>
			</HTMLContainer>
		)
	}
}

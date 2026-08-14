import { HTMLContainer, RecordProps, Rectangle2d, ShapeUtil, T, TLShape } from 'tldraw'

const SHAPE_TYPE = 'vision-banner'

declare module 'tldraw' {
	export interface TLGlobalShapePropsMap {
		[SHAPE_TYPE]: {
			w: number
			h: number
		}
	}
}

export type VisionBannerShape = TLShape<typeof SHAPE_TYPE>

export class VisionBannerShapeUtil extends ShapeUtil<VisionBannerShape> {
	static override type = SHAPE_TYPE
	static override props: RecordProps<VisionBannerShape> = {
		w: T.number,
		h: T.number,
	}

	getDefaultProps(): VisionBannerShape['props'] {
		return {
			w: 2420,
			h: 130,
		}
	}

	override canEdit() {
		return false
	}
	override canResize() {
		return false
	}

	getGeometry(shape: VisionBannerShape) {
		return new Rectangle2d({
			width: shape.props.w,
			height: shape.props.h,
			isFilled: true,
		})
	}

	getIndicatorPath(shape: VisionBannerShape) {
		const path = new Path2D()
		path.rect(0, 0, shape.props.w, shape.props.h)
		return path
	}

	component(shape: VisionBannerShape) {
		return (
			<HTMLContainer
				style={{
					width: shape.props.w,
					height: shape.props.h,
					pointerEvents: 'all',
				}}
			>
				<div className="exec-vision-banner">
					<div className="vision-badge">FOUNDATIONAL PLATFORM PARADIGM</div>
					<h2 className="vision-title">From Agent Observability to Agent Evolution</h2>
					<p className="vision-desc">
						Fleeks transforms execution telemetry into trusted production decisions and continuous agent
						improvement, ultimately becoming the mission control system for AI-native organizations.
					</p>
				</div>
			</HTMLContainer>
		)
	}
}

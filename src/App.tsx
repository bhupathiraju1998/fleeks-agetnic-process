import {
	DefaultActionsMenu,
	DefaultQuickActions,
	DefaultStylePanel,
	TLComponents,
	Tldraw,
	TldrawOptions,
	TldrawUiToolbar,
	useEditor,
	useValue,
} from 'tldraw'
import { EvaluationLayerShapeUtil } from './architecture/EvaluationLayerUtil'
import { ExecutionLayerShapeUtil } from './architecture/ExecutionLayerUtil'
import { executiveStore } from './architecture/ExecutiveState'
import { FlywheelShapeUtil } from './architecture/FlywheelUtil'
import { GovernanceLayerShapeUtil } from './architecture/GovernanceLayerUtil'
import { HeaderBannerShapeUtil } from './architecture/HeaderBannerUtil'
import { loadExecutiveDiagram } from './architecture/loadExecutiveDiagram'
import { MeasurementLayerShapeUtil } from './architecture/MeasurementLayerUtil'
import { StrategicCalloutShapeUtil } from './architecture/StrategicCalloutUtil'
import { VisionBannerShapeUtil } from './architecture/VisionBannerUtil'
import { OnCanvasComponentPicker } from './components/OnCanvasComponentPicker.tsx'
import { WorkflowRegions } from './components/WorkflowRegions.tsx'
import { overrides, WorkflowToolbar } from './components/WorkflowToolbar.tsx'
import { ConnectionBindingUtil } from './connection/ConnectionBindingUtil'
import { ConnectionCenterHandleOverlayUtil } from './connection/ConnectionCenterHandleOverlayUtil'
import { ConnectionShapeUtil } from './connection/ConnectionShapeUtil'
import { keepConnectionsAtBottom } from './connection/keepConnectionsAtBottom'
import { disableTransparency } from './disableTransparency.tsx'
import { NodeShapeUtil } from './nodes/NodeShapeUtil'
import { PointingPort } from './ports/PointingPort'

// Executive architecture shape utilities
const executiveShapeUtils = [
	HeaderBannerShapeUtil,
	ExecutionLayerShapeUtil,
	MeasurementLayerShapeUtil,
	EvaluationLayerShapeUtil,
	GovernanceLayerShapeUtil,
	FlywheelShapeUtil,
	StrategicCalloutShapeUtil,
	VisionBannerShapeUtil,
]

// All shape utilities combined
const shapeUtils = [NodeShapeUtil, ConnectionShapeUtil, ...executiveShapeUtils]
const bindingUtils = [ConnectionBindingUtil]
const overlayUtils = [ConnectionCenterHandleOverlayUtil]

// Executive Control Overlay Component
function ExecutiveControlOverlay() {
	const editor = useEditor()
	return (
		<div
			style={{
				position: 'absolute',
				top: 16,
				right: 16,
				zIndex: 1000,
				display: 'flex',
				gap: 8,
				background: 'rgba(15, 23, 42, 0.95)',
				border: '1px solid rgba(56, 189, 248, 0.3)',
				borderRadius: 12,
				padding: '8px 12px',
				boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
			}}
		>
			<button
				onClick={() => loadExecutiveDiagram(editor)}
				style={{
					background: 'rgba(56, 189, 248, 0.15)',
					border: '1px solid rgba(56, 189, 248, 0.4)',
					color: '#38bdf8',
					fontWeight: 700,
					fontSize: 12,
					padding: '6px 12px',
					borderRadius: 8,
					cursor: 'pointer',
				}}
			>
				📐 Load Architecture Diagram
			</button>
			<button
				onClick={() => editor.zoomToFit({ animation: { duration: 300 } })}
				style={{
					background: 'rgba(52, 211, 153, 0.15)',
					border: '1px solid rgba(52, 211, 153, 0.4)',
					color: '#34d399',
					fontWeight: 700,
					fontSize: 12,
					padding: '6px 12px',
					borderRadius: 8,
					cursor: 'pointer',
				}}
			>
				🔍 Fit Landscape View
			</button>
			<button
				onClick={() => executiveStore.startSimulation()}
				style={{
					background: 'rgba(168, 85, 247, 0.15)',
					border: '1px solid rgba(168, 85, 247, 0.4)',
					color: '#c084fc',
					fontWeight: 700,
					fontSize: 12,
					padding: '6px 12px',
					borderRadius: 8,
					cursor: 'pointer',
				}}
			>
				⚡ Simulate Agent Run
			</button>
		</div>
	)
}

const components: TLComponents = {
	InFrontOfTheCanvas: () => (
		<>
			<ExecutiveControlOverlay />
			<OnCanvasComponentPicker />
			<WorkflowRegions />
		</>
	),
	Toolbar: () => (
		<>
			<WorkflowToolbar />
			<div className="tlui-main-toolbar tlui-main-toolbar--horizontal">
				<TldrawUiToolbar className="tlui-main-toolbar__tools" label="Actions">
					<DefaultQuickActions />
					<DefaultActionsMenu />
				</TldrawUiToolbar>
			</div>
		</>
	),
	MenuPanel: () => null,
	StylePanel: () => {
		const editor = useEditor()
		const shouldShowStylePanel = useValue(
			'shouldShowStylePanel',
			() => {
				return (
					!editor.isIn('select') ||
					editor.getSelectedShapes().some((s) => s.type !== 'node' && s.type !== 'connection')
				)
			},
			[editor]
		)
		if (!shouldShowStylePanel) return
		return <DefaultStylePanel />
	},
}

const options: Partial<TldrawOptions> = {
	actionShortcutsLocation: 'menu',
	maxPages: 1,
}

function App() {
	return (
		<div style={{ position: 'fixed', inset: 0 }}>
			<Tldraw
				persistenceKey="fleeks-executive-diagram-v2"
				options={options}
				overrides={overrides}
				shapeUtils={shapeUtils}
				bindingUtils={bindingUtils}
				overlayUtils={overlayUtils}
				components={components}
				onMount={(editor) => {
					;(window as any).editor = editor

					// Automatically load the Executive Architecture Diagram if not loaded
					loadExecutiveDiagram(editor)

					editor.user.updateUserPreferences({ isSnapMode: true })
					editor.getStateDescendant('select')!.addChild(PointingPort)
					keepConnectionsAtBottom(editor)
					disableTransparency(editor, ['node', 'connection'])
				}}
			/>
		</div>
	)
}

export default App

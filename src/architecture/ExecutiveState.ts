import { SimulationState } from './types'

type Listener = () => void

class ExecutiveStore {
	private state: SimulationState = {
		isRunning: false,
		activeStep: 0,
		activeAgent: 'LangGraph Customer Support Agent',
		lastScore: 94.8,
		telemetryCount: 148920,
		experimentActive: true,
	}

	private listeners: Set<Listener> = new Set()

	getState(): SimulationState {
		return this.state
	}

	subscribe(listener: Listener): () => void {
		this.listeners.add(listener)
		return () => this.listeners.delete(listener)
	}

	private notify() {
		this.listeners.forEach((listener) => listener())
	}

	startSimulation() {
		if (this.state.isRunning) return
		this.state.isRunning = true
		this.state.activeStep = 1
		this.notify()

		const interval = setInterval(() => {
			if (this.state.activeStep < 8) {
				this.state.activeStep += 1
				this.state.telemetryCount += Math.floor(Math.random() * 45) + 10
				this.notify()
			} else {
				this.state.isRunning = false
				this.state.activeStep = 0
				this.state.lastScore = Number((93.5 + Math.random() * 4.5).toFixed(1))
				clearInterval(interval)
				this.notify()
			}
		}, 1200)
	}

	toggleExperiment() {
		this.state.experimentActive = !this.state.experimentActive
		this.notify()
	}
}

export const executiveStore = new ExecutiveStore()

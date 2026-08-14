export interface AgentMetric {
	name: string
	value: string | number
	status: 'good' | 'warning' | 'critical'
	change?: string
}

export interface AgentLeaderboardItem {
	rank: number
	name: string
	framework: string
	trustScore: number
	reliability: string
	costPerRun: string
	hallucinationRate: string
	status: 'Production Approved' | 'Flagged for Review' | 'In A/B Test'
}

export interface SimulationState {
	isRunning: boolean
	activeStep: number
	activeAgent: string
	lastScore: number
	telemetryCount: number
	experimentActive: boolean
}

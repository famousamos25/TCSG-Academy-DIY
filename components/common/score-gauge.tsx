"use client";

import { getScoreLabel } from '@/lib/credit-report';
import { cn } from '@/lib/utils';

interface Props {
	score: number;
}

const ScoreGauge = ({ score }: Props) => {
	const minScore = 300;
	const maxScore = 850;
	const scoreRange = maxScore - minScore;

	// Calculate the percentage filled (clamped between 0-100%)
	const percentageFilled = Math.min(100, Math.max(0, ((score - minScore) / scoreRange) * 100));

	const getIndicatorClass = () => {
		if (!score) return 'bg-gray-400';
		if (score >= 800) return 'bg-emerald-500';
		if (score >= 740) return 'bg-green-500';
		if (score >= 670) return 'bg-blue-500';
		if (score >= 580) return 'bg-orange-500';
		return 'bg-red-500';
	};

	// Calculate which segments should be colored
	const segments = [
		{ flex: '50%', maxWidth: '50%' },
		{ flex: '20%', maxWidth: '20%' },
		{ flex: '15%', maxWidth: '15%' },
		{ flex: '10%', maxWidth: '10%' },
		{ flex: '5%', maxWidth: '5%' }
	];

	// Calculate accumulated percentages for segment coloring
	let accumulatedPercent = 0;
	const segmentsWithColor = segments.map((segment) => {
		const segmentWidth = parseInt(segment.flex);
		const segmentStart = accumulatedPercent;
		const segmentEnd = segmentStart + segmentWidth;
		accumulatedPercent = segmentEnd;

		// Determine how much of this segment should be colored
		let colorPercentage = 0;
		if (percentageFilled > segmentStart) {
			if (percentageFilled >= segmentEnd) {
				colorPercentage = 100; // Fully colored
			} else {
				colorPercentage = ((percentageFilled - segmentStart) / segmentWidth) * 100;
			}
		}

		return {
			...segment,
			background: colorPercentage > 0
				? `linear-gradient(to right, rgb(255, 109, 0) ${colorPercentage}%, rgb(204, 204, 204) ${colorPercentage}%)`
				: 'rgb(204, 204, 204)'
		};
	});

	console.log(segmentsWithColor, score);
	

	return (
		<div>
			<div className="flex items-center space-x-2 mb-2">
				<div className={cn(`h-2 w-2 rounded-full bg-red-500`, getIndicatorClass())} />
				<span className="text-sm font-medium text-gray-600">
					{getScoreLabel(score)}
				</span>
			</div>
			<div className="flex gap-1 w-full h-2 bg-transparent">
				{segmentsWithColor.map((segment, index) => (
					<div
						key={index}
						className="rounded-md"
						style={{
							flex: segment.flex,
							maxWidth: segment.maxWidth,
							background: segment.background
						}}
					/>
				))}
			</div>
			<div className="flex justify-between text-xs text-gray-500 mt-1">
				<span>300</span>
				<span>850</span>
			</div>
		</div>
	);
};

export default ScoreGauge;

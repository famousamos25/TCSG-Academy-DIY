"use client";

interface Props {
	score: number;
}

const ScoreGauge = ({ score }: Props) => {
	const minScore = 300;
	const maxScore = 850;
	const scoreRange = maxScore - minScore;

	// Calculate the percentage filled (clamped between 0-100%)
	const percentageFilled = Math.min(100, Math.max(0, ((score - minScore) / scoreRange) * 100));

	// Calculate which segments should be colored
	const segments = [
		{ flex: '50%', maxWidth: '50%', color: '#F44336', label: 'Poor' },       // Red (50% and Below)
		{ flex: '20%', maxWidth: '20%', color: '#FF9800', label: 'Fair' },       // Orange (30-49%)
		{ flex: '15%', maxWidth: '15%', color: '#2196F3', label: 'Good' },       // Blue (10-29%)
		{ flex: '10%', maxWidth: '10%', color: '#4CAF50', label: 'Very Good' },  // Green (0-9%)
		{ flex: '5%', maxWidth: '5%', color: '#4CAF50', label: 'Very Good' }     // Green (also part of Very Good)
	];

	// Function to get score label and color based on score
	const getScoreDetails = (score: number) => {
		if (!score) return { label: 'No Score', color: '#9E9E9E' }; // Gray for no score

		const normalizedScore = Math.max(0, Math.min(100, ((score - minScore) / scoreRange) * 100));

		if (normalizedScore < 50) return { label: 'Poor', color: '#F44336' };
		if (normalizedScore < 70) return { label: 'Fair', color: '#FF9800' };
		if (normalizedScore < 85) return { label: 'Good', color: '#2196F3' };
		return { label: 'Very Good', color: '#4CAF50' };
	};

	const scoreDetails = getScoreDetails(score);

	// Calculate which segments should be colored
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
        ? `linear-gradient(to right, ${segment.color} ${colorPercentage}%, rgb(204, 204, 204) ${colorPercentage}%)`
        : 'rgb(204, 204, 204)'
    };
  });

	console.log(segmentsWithColor, score);


	return (
		<div>
			<div className="flex items-center space-x-2 mb-2">
				<div
					className="h-2 w-2 rounded-full"
					style={{ backgroundColor: scoreDetails.color }}
				/>
				<span className="text-sm font-medium text-gray-600">
					{scoreDetails.label}
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

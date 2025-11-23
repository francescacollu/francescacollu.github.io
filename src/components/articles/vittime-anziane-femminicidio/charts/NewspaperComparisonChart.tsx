import React from 'react';
import ResponsivePlotlyChart from '../ResponsivePlotlyChart';
import chartData from './newspaper_comparison.json';

interface NewspaperComparisonChartProps {
    caption?: string;
    className?: string;
    minHeight?: string;
}

const NewspaperComparisonChart: React.FC<NewspaperComparisonChartProps> = ({
    caption,
    className,
    minHeight = '600px'
}) => {
    return (
        <ResponsivePlotlyChart
            data={chartData.data}
            layout={chartData.layout}
            config={chartData.config}
            className={className}
            minHeight={minHeight}
            caption={caption}
        />
    );
};

export default NewspaperComparisonChart;


import React from 'react';
import ResponsivePlotlyChart from '../ResponsivePlotlyChart';
import chartData from './zero_coverage.json';

interface ZeroCoverageChartProps {
    caption?: string;
    className?: string;
    minHeight?: string;
}

const ZeroCoverageChart: React.FC<ZeroCoverageChartProps> = ({
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

export default ZeroCoverageChart;


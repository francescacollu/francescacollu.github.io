import React from 'react';
import ResponsivePlotlyChart from '../ResponsivePlotlyChart';
import chartData from './age_groups.json';

interface AgeGroupsChartProps {
    caption?: string;
    className?: string;
    minHeight?: string;
}

const AgeGroupsChart: React.FC<AgeGroupsChartProps> = ({
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

export default AgeGroupsChart;


import React from 'react';
import ResponsivePlotlyChart from '../ResponsivePlotlyChart';
import chartData from './unique_names_scatter.json';

interface UniqueNamesScatterChartProps {
    caption?: string;
    className?: string;
    minHeight?: string;
}

const UniqueNamesScatterChart: React.FC<UniqueNamesScatterChartProps> = ({
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

export default UniqueNamesScatterChart;

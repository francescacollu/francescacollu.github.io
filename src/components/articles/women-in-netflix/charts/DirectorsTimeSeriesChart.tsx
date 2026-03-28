import React from 'react';
import ResponsivePlotlyChart from '../ResponsivePlotlyChart';
import chartData from './directors_time_series.json';

interface DirectorsTimeSeriesChartProps {
    caption?: string;
    className?: string;
    minHeight?: string;
}

const DirectorsTimeSeriesChart: React.FC<DirectorsTimeSeriesChartProps> = ({
    caption,
    className,
    minHeight = '600px'
}) => {
    return (
        <ResponsivePlotlyChart
            data={chartData.data}
            layout={chartData.layout}
            config={chartData.config || {}}
            className={className}
            minHeight={minHeight}
            caption={caption}
        />
    );
};

export default DirectorsTimeSeriesChart;

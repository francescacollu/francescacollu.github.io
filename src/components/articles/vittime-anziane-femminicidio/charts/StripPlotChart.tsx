import React from 'react';
import ResponsivePlotlyChart from '../ResponsivePlotlyChart';
import chartData from './strip_plot_200cases.json';

interface StripPlotChartProps {
    caption?: string;
    className?: string;
    minHeight?: string;
}

const StripPlotChart: React.FC<StripPlotChartProps> = ({
    caption,
    className,
    minHeight = '800px'
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

export default StripPlotChart;


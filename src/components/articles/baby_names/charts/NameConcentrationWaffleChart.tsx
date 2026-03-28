import React from 'react';
import ResponsivePlotlyChart from '../ResponsivePlotlyChart';
import chartData from './name_concentration_waffle.json';

interface NameConcentrationWaffleChartProps {
    caption?: string;
    className?: string;
    minHeight?: string;
}

const NameConcentrationWaffleChart: React.FC<NameConcentrationWaffleChartProps> = ({
    caption,
    className,
    minHeight = '500px'
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

export default NameConcentrationWaffleChart;

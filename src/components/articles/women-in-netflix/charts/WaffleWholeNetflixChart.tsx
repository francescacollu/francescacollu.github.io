import React from 'react';
import ResponsivePlotlyChart from '../../shared/ResponsivePlotlyChart';
import chartData from './whole_netflix_gender_distribution.json';

interface WaffleWholeNetflixChartProps {
    caption?: string;
    className?: string;
    minHeight?: string;
}

const WaffleWholeNetflixChart: React.FC<WaffleWholeNetflixChartProps> = ({
    caption,
    className,
    minHeight = '500px'
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

export default WaffleWholeNetflixChart;

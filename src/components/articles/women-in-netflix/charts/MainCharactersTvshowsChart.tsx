import React from 'react';
import ResponsivePlotlyChart from '../../shared/ResponsivePlotlyChart';
import chartData from './main_characters_tvshows_time_series_percentage.json';

interface MainCharactersTvshowsChartProps {
    caption?: string;
    className?: string;
    minHeight?: string;
}

const MainCharactersTvshowsChart: React.FC<MainCharactersTvshowsChartProps> = ({
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

export default MainCharactersTvshowsChart;

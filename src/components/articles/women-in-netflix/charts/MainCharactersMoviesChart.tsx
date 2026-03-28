import React from 'react';
import ResponsivePlotlyChart from '../ResponsivePlotlyChart';
import chartData from './main_characters_movies_time_series_percentage.json';

interface MainCharactersMoviesChartProps {
    caption?: string;
    className?: string;
    minHeight?: string;
}

const MainCharactersMoviesChart: React.FC<MainCharactersMoviesChartProps> = ({
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

export default MainCharactersMoviesChart;

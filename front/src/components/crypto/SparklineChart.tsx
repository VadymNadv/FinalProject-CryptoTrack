
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

interface SparklineChartProps {
    data: number[];
}

const SparklineChart: React.FC<SparklineChartProps> = ({ data }) => {
    const prices = data || [];
    const firstPrice = prices[0] ?? 0;
    const lastPrice = prices[prices.length - 1] ?? 0;

    const chartColor = lastPrice >= firstPrice ? '#0ECB81' : '#F6465D';

    const chartData = {
        labels: prices.map((_, index) => index),
        datasets: [
            {
                data: prices,
                borderColor: chartColor,
                tension: 0.4,
                pointRadius: 0,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: { enabled: false },
        },
        scales: {
            x: { display: false },
            y: { display: false },
        },
    };

    return (
        <div className="w-24 h-12">
            <Line data={chartData} options={options} />
        </div>
    );
};

export default SparklineChart;
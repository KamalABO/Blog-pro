
import {Line, Bar} from 'react-chartjs-2'
import {Chart as ChartJS, LineElement, BarElement, CategoryScale, LinearScale, PointElement} from 'chart.js'
import { dataBar, dataLine } from './chartData'
ChartJS.register(LineElement, BarElement, CategoryScale, LinearScale, PointElement)

const Dashboard = () => {
  return (
    <div className='grow p-8'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
            <div className='bg-white p-4 dark:bg-gray-800 rounded-lg shadow-md'>
                <h3 className='text-lg font-semibold mb-4'>Posts Data</h3>
                <Line data={dataLine} />
            </div>
            <div className='bg-white p-4 dark:bg-gray-800 rounded-lg shadow-md'>
                <h3 className='text-lg font-semibold mb-4'>Users Data</h3>
                <Bar data={dataBar} />
            </div>
        </div>
    </div>
  )
}

export default Dashboard
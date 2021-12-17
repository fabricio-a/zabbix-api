import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'

export default function SimpleChart(props) {
    let {
        data,
        lineDataKey,
        xDataKey
    } = props

    return (
        <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 0, bottom: 5, left: 0 }}>
            <Line type='monotone' dataKey={lineDataKey} stroke='#8884d8' />
            <CartesianGrid stroke='#ccc' strokeDasharray='5 5' />
            <XAxis dataKey={xDataKey} />
            <YAxis />
            <Tooltip />
        </LineChart>
    )
}
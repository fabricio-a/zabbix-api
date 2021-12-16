import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'

export default function SimpleChart(props) {
    const {
        data,
        width,
        height
    } = props

    return (
        <LineChart width={width} height={height} data={data} margin={{ top: 5, right: 0, bottom: 5, left: 0 }}>
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
        </LineChart>
    )
}
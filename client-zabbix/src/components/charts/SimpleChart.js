import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'
import MySelect from '../menu/MySelect'
import { useState } from 'react'

export default function SimpleChart(props) {
    let {
        data,
        lineDataKey,
        xDataKey
    } = props

    const [ itemSelect, setItemSelect ] = useState([])

    return (
        <div>
            <MySelect 
                id='item-select'
                label='Item'
                multiple={true} check={true}
                data={[{value: 'Grafico 1', label:'Grafico 1'}]}
                selectValue={itemSelect}
                selectHandler={(e) => setItemSelect(e.target.value)}    
            />

            <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 0, bottom: 5, left: 0 }}>
                <Line type='monotone' dataKey={lineDataKey} stroke='#8884d8' />
                <CartesianGrid stroke='#ccc' strokeDasharray='5 5' />
                <XAxis dataKey={xDataKey} />
                <YAxis />
                <Tooltip />
            </LineChart>
        </div>
    )
}
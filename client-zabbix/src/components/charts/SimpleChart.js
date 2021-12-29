import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts'
import { useState } from 'react'

export default function SimpleChart(props) {
    let { data, xDataKey } = props
    let yData = []

    data.map(line => {
        line.history_response.map(point => {
            const aux = {}
            aux[line.item.name] = point.value
            aux[xDataKey] = point.clock

            yData.push(aux)
        })
    })

    return (
        <div>
{/*             <MySelect 
                id='item-select'
                label='Item'
                multiple={true} check={true}
                data={[{value: 'Grafico 1', label:'Grafico 1'}]}
                selectValue={itemSelect}
                selectHandler={(e) => setItemSelect(e.target.value)}    
            /> */}

            <LineChart width={650} height={300} data={yData} margin={{ top: 5, right: 0, bottom: 5, left: 0 }}>
                <Legend verticalAlign="top" height={36}/>
                {data.map(newLine =>
                    <Line name={newLine.item.name} type='monotone' dataKey={newLine.item.name} stroke={'#' + Math.floor(Math.random() * 0x1000000).toString(16).padStart(6, '0')} />
                )}
                <CartesianGrid stroke='#ccc' strokeDasharray='5 5' />
                <XAxis dataKey={xDataKey} />
                <YAxis />
                <Tooltip />
            </LineChart>
        </div>
    )
}
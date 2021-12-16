import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addText } from '../../store/reportArea/reportSlice'
import { TextField, Button } from '@mui/material'
import MySelect from './MySelect'

export default function TextMenu () {
    const [textSizeSelect, setTextSizeSelect] = useState([])
    const [textInput, setTextInput] = useState([])
    const [allGraphs, setAllGraphs] = useState([])
    
    const dispatch = useDispatch()

    return (
        <div className='menuText'>
            <MySelect 
                id='textSize-select'
                label='Tamanho do texto'
                multiple={false} check={false}
                data={[
                    { value: 'h1', label: 'h1'},
                    { value: 'h2', label: 'h2'},
                    { value: 'h3', label: 'h2'},
                    { value: 'h4', label: 'h4'}
                ]}
                selectValue={textSizeSelect}
                selectHandler={(e) => setTextSizeSelect(e.target.value)} 
            />

            <TextField 
                value={textInput}
                onChange={e => setTextInput(e.target.value)}
            />

            <Button className='bt' variant='contained' color='primary' 
                onClick={() => {
                    dispatch(addText(textInput))
                }}>
                Adicionar Texto
            </Button>
        </div>
    )
}
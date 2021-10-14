import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

/*
            <FormControl sx={{ m:1, minWidth: 300, mt:3 }}>
                <Select
                    multiple
                    displayEmpty
                    value={selectedHosts}
                    onChange={(e) => {}}
                    input={<OutlinedInput />}
                    renderValue={(selected) => {
                        if (selected.length === 0) {
                            return <em>Placeholder</em>;
                        }
            
                        return selected.join(', ');
                    }}
                    inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem disabled value="">
                            <em>Hosts</em>
                        </MenuItem>

                        {allHosts.map((host) => (
                            <MenuItem
                                key={host.hostid}
                                value={host.hostid}
                            >
                                {host.host}
                            </MenuItem>
                    ))}
                </Select>
            </FormControl> */

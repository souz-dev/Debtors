import { useEffect, useState } from 'react'
import TextField from '@material-ui/core/TextField';
import  Autocomplete  from '@material-ui/lab/Autocomplete';
import services from '../../services';
import './style.scss'


export function CreateCardDebtors({ users, debtores, setDebtores, newDebt }) {


  const handleChange = event => {
    const { id, value } = event.target
    setDebtores({ ...debtores, [id]: value })
  }


  const onSubmit = async (event) => {
    event.preventDefault();
    const data = {
      idUsuario: debtores.UserId.id,
      motivo: debtores.description,
      valor: debtores.value
    }
  
    const { data: { data: { success }}} = await services.debtors.post(data)
    setDebtores({
      UserId: '',
      description: '',
      value: ''
    })
    console.log('res:', success);
    if(success){
      newDebt(data)
    }
  }

  return (
    <div id="form">
        <header>
          <div>
            <h3>Inserir uma divida</h3>
          </div>
        </header>
        <main>
          <form onSubmit={ onSubmit }>
            <div>
              <h4 className="fomr-client">Cliente</h4>
            <Autocomplete
              id="UserId"
              options={users}
              // groupBy={(option) => option.firstLetter}
              getOptionLabel={(users) => users.name}
              style={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Clientes" variant="outlined" />}
              onChange={(e,i)=> setDebtores({ ...debtores, UserId: i })}
              value={debtores.UserId}
            />
            </div>
            <div>
              <h4>Motivo</h4>
              <textarea 
                id="description" 
                name="motivo" 
                rows="2" cols="33" 
                onChange={handleChange}
                value={debtores.description}
              />
            </div>
            <div>
              <h4>Valor</h4>
              <input 
                id='value'
                type="text" 
                className="input-value" 
                onChange={handleChange}
                value={debtores.value}
              />
            </div>
            <div className="button-container">
              <button className="button-cancel">
                Cancelar
              </button>
              <button type="submit" className="button-add">
                Adicionar Divida
              </button>
            </div>
          </form>
        </main>
    </div>
  )
}

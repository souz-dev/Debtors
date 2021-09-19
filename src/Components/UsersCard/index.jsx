import './style.scss'
import iconEdit from '../../assets/icons/edit.svg'
import iconDelete from '../../assets/icons/trash.svg'
import {convertToBrazil} from '../../utils/currency.js'


export function UsersCard({clitente, motivo, valor, handleEdit, hanldleRemove}) {
  console.log(clitente)
  return (
    <li id="users-card">
      <header className="header-card">
      <h3>{ clitente }</h3>
      <div className="buttons-content">
      <div onClick={handleEdit} className="button-edit">
        <img src={iconEdit} alt="" />
      </div>
      <div onClick={hanldleRemove} className="button-delete">
        <img src={iconDelete} alt="" />
      </div>
      </div>
      </header>
      <h4>Motivo:</h4>
      <p>{ motivo }</p>
      <div>
      <h4>Valor:</h4>
      <p>{ convertToBrazil(valor) }</p>
      </div>
    </li>
  )
}
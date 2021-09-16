import './style.scss'

export function UsersCard({clitente, motivo, valor, handleEdit }) {
  console.log(clitente)
  return (
    <li id="users-card">
      <h3>{ clitente }</h3>
      <button onClick={handleEdit}>Edit</button>
      <button>Delet</button>
      <h4>Motivo:</h4>
      <p>{ motivo }</p>
      <div>
      <h4>Valor:</h4>
      <p>{ valor }</p>
      </div>
    </li>
  )
}
import './style.scss'
import logo from '../../assets/icons/debtors.png'
export function Header() {
  return (
    <header className="header-container">
      <div className="">
        <img src={logo} alt="" />
      </div>
      <ul>
        <li><button type="button">ADD</button></li>
      </ul>
    </header>
  )
}
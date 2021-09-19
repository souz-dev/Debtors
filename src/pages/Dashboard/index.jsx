import { useEffect, useState } from "react";
import { Header } from "../../Components/Header";
import { CreateCardDebtors } from "../../Components/CreateCardDebtors";
import { UsersCard } from "../../Components/UsersCard";
import services from "../../services";
import plus from '../../assets/icons/plus.svg'
import "./style.scss";
import {convertToBrazil} from '../../utils/currency.js'

export function Dashboard() {
  const [clients, setClients] = useState([]);
  const [debts, setDebts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showAddButton, setShowAddButton] = useState(true);
  


  const [debtors, setDebtors] = useState({
    UserId: {},
    description: "",
    value: '',
  });

  useEffect(() => {
    async function getUsers() {
      const { data: {data} } = await services.users.get();
      const clients = data.map((option) => {
        return {
          id: option.id,
          name: option.name,
        };
      });
      setClients(clients);
    }
    getUsers();
  }, []);
  async function getDividas() {
    const { data } = await services.debtors.get();

    const getDebts = data.result.map((user) => {
      const nome = clients && clients?.find((u) => u.id === user.idUsuario)?.name;
      return {
        nome,
        ...user
      };
    });
    setDebts(getDebts);
  }
  useEffect(() => {
    getDividas();
  }, [clients]);

  
   function newDebt () {
    getDividas();
  }

  function handleEdit(d) {
    setDebtors({
      isEdit: true,
      id: d._id,
      UserId: { id: d.id, name: d.nome },
      description: d.motivo,
      value: convertToBrazil(d.valor),
    });
    setShowForm(!showForm);
    setShowAddButton(!showAddButton);
  }
  
  async function handleRemove(d) {
    const  { data: { data: { success }}} = await services.debtors.delete(d._id);
    if (success) {
      getDividas();
      setShowForm(false)
      setShowAddButton(true)
      setDebtors({
        isEdit: false,
        UserId: '',
        description: '',
        value: ''
      });
    }
  }

  function clearForm()  {
    setDebtors({
      isEdit: false,
      UserId: '',
      description: '',
      value: ''
    });
    setShowForm(!showForm); 
    setShowAddButton(!showAddButton); 
  }

  function formShow() {
    setShowForm(!showForm); 
    setShowAddButton(!showAddButton); 
  }

  return (
    <div id="dash-board">
      <Header />
      <main className="main-dashboard">
        <h1>Devedores</h1>
        <p>Detalhes de todos os devedores cadastrados.</p>
      </main>
      <section className="container-dashboard">
        <div className="container">
          <h2>Listagem</h2>
          <div className="container-list">
            <div className="content-filter">
              <h2>Credores</h2>

              <ul>
                {
                  debts.length === 0 && (
                    <p> Não Dividas Registradas</p>
                  )
                }
                {debts.length > 0 &&
                  debts.map((d) => (
                    <UsersCard
                      clitente={d.nome}
                      motivo={d.motivo}
                      valor={d.valor}
                      handleEdit={ () => handleEdit(d)} 
                      hanldleRemove={ () => handleRemove(d)}
                    />
                  ))}
              </ul>
            </div>
            <div className="content-cards">
              {
                showForm && ( 
                  <CreateCardDebtors  
                    {...
                      { 
                        debtors, 
                        setDebtors, 
                        newDebt, 
                        clients, 
                        showForm, 
                        setShowForm,
                        showAddButton,
                        setShowAddButton
                      }
                    } 
                    clearForm={clearForm} 
                  />
                  
                )
              }
            </div>
          </div>
        </div>
      </section>
      { 
        showAddButton && (
          <div onClick={formShow} className="fixed-button">
          <a className="btn-floating btn-large">
            <i>
              <img src={plus} alt="Adicionar Divida" />        
            </i>    
          </a>
        </div>
        )
      }
    </div>
  );
}

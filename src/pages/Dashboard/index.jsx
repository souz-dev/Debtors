import { useEffect, useState } from "react";
import { Header } from "../../Components/Header";
import { CreateCardDebtors } from "../../Components/CreateCardDebtors";
import { UsersCard } from "../../Components/UsersCard";
import services from "../../services";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/debt.actions";

import "./style.scss";
export function Dashboard() {
  const dividas = useSelector((x) => x.debtReducer.dividas);
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [debt, setDebt] = useState([]);
  const [showForm, setShowForm] = useState(false);


  const [debtores, setDebtores] = useState({
    UserId: {},
    description: "",
    value: 0,
  });

  useEffect(() => {
    async function users() {
      const { data } = await services.users.get("/users");
      const clients = data.map((option) => {
        return {
          id: option.id,
          name: option.name,
        };
      });
      setUsers(clients);
    }
    users();
  }, []);
  useEffect(() => {
    async function dividas() {
      const { data } = await services.debtors.get();

      const debt = data.result.map((user) => {
        const nome = users && users?.find((u) => u.id === user.idUsuario)?.name;
        console.log("NOME", nome);
        return {
          id: user.idUsuario,
          motivo: user.motivo,
          valor: user.valor,
          nome,
        };
      });
      setDebt(debt);
    }
    dividas();
    newDebt();
  }, [users]);


  function newDebt (e) {
    
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
                {debt.length > 0 &&
                  debt.map((d) => (
                    <UsersCard
                      clitente={d.nome}
                      motivo={d.motivo}
                      valor={d.valor}
                      handleEdit={() => {
                        setDebtores({
                          UserId: { id: d.id, name: d.nome },
                          description: d.motivo,
                          value: d.valor,
                        });
                      }}
                    />
                  ))}
              </ul>
            </div>
            <div className="content-cards">
              {
                showForm && (
                  <CreateCardDebtors users={users} {...{ debtores, setDebtores }} {...{newDebt}} />
                )
              }
              <div>
                <button onClick={() => setShowForm(!showForm)}> Add Debtors</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

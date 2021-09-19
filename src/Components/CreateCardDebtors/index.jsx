import TextField from "@material-ui/core/TextField";
import { useState, useEffect } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import services from "../../services";
import "./style.scss";
import { convertToBrazil } from "../../utils/currency.js";

export function CreateCardDebtors({
  clients,
  debtors,
  setDebtors,
  newDebt,
  clearForm,
  showForm,
  setShowForm,
  showAddButton,
  setShowAddButton,
}) {
  const [emptyValue, setEmptyValue] = useState(false);

  useEffect(() => {}, [debtors]);

  const handleChange = (event) => {
    const { id, value } = event.target;

    //    setDebtors({ ...debtors, [id]: formatToBRL(value.replace(/\D/gi,''))})
    setDebtors({
      ...debtors,
      [id]: convertToBrazil(value.replace(/\D/gi, "")),
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const data = {
      idUsuario: debtors.UserId.id,
      motivo: debtors.description,
      valor: debtors.value.replace(/\D/gi, ""),
    };

    let emptyValues = Object.values(debtors).some((obj) => obj == "");
    setEmptyValue(emptyValues);
    if (debtors.isEdit) {
      const {
        data: {
          data: { success },
        },
      } = await services.debtors.put(debtors.id, data);
      if (success) {
        newDebt(data);
        setShowForm(!showForm);
        setShowAddButton(!showAddButton);
      }
    } else {
      const {
        data: {
          data: { success },
        },
      } = await services.debtors.post(data);
      if (success) {
        newDebt(data);
        setShowForm(!showForm);
        setShowAddButton(!showAddButton);
      }
    }
    setDebtors({
      id: "",
      UserId: "",
      description: "",
      value: "",
    });
  };

  return (
    <div id="form">
      <header>
        <div>
          <h3>Inserir uma divida</h3>
        </div>
      </header>
      <main>
        <form onSubmit={onSubmit}>
          <div>
            <h4 className="fomr-client">Cliente</h4>
            <Autocomplete
              id="UserId"
              options={clients}
              // groupBy={(option) => option.firstLetter}
              getOptionLabel={(users) => users.name}
              style={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Clientes" variant="outlined" />
              )}
              onChange={(e, i) => setDebtors({ ...debtors, UserId: i })}
              value={debtors.UserId}
              disabled={debtors.isEdit}
            />
          </div>
          <div>
            <h4>Motivo</h4>
            <textarea
              id="description"
              name="motivo"
              rows="2"
              cols="33"
              onChange={(e) =>
                setDebtors({ ...debtors, description: e.target.value })
              }
              value={debtors.description}
              placeholder=" Informe o motivo"
            />
          </div>
          <div>
            <h4>Valor</h4>
            <input
              id="value"
              type="text"
              className="input-value"
              onChange={(e) => handleChange(e)}
              value={debtors.value}
              placeholder="R$ 100,00"
            />
          </div>
          {emptyValue && (
            <span className="empty">Todos os campos devem está preechidos !!</span>
          )}
          <div className="button-container">
            <button type="submit" onClick={clearForm} className="button-cancel">
              Cancelar
            </button>
            <button type="submit" className="button-add">
              {debtors.isEdit ? "Editar" : "Adicionar"} Divida
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

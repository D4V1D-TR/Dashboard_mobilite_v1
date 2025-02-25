import * as React from "react";
import axios from "axios";
import Table from "@mui/joy/Table";

export default function BasicTable() {
  const [lpaandco, setlpaandco] = React.useState([]);

  React.useEffect(() => {
    axios
      .get("http://192.168.2.27:8000/api/lpaandco/")
      .then((response) => setlpaandco(response.data))
      .catch((error) => console.error("Erreur lpaandco:", error));
  }, []);

  return (
    <Table>
      <thead>
        <tr>
          <th>Nom</th>
          <th>Tarif 1H</th>
          <th>Tarif 2H</th>
          <th>Tarif 24H</th>
          <th>Abo mensuel</th>
        </tr>
      </thead>
      <tbody>
        {lpaandco.length > 0 ? (
          lpaandco.map((lpaandco) => (
            <tr key={lpaandco.id}>
              <td>{lpaandco.nom}</td>
              <td>{lpaandco.tarif_1h}</td>
              <td>{lpaandco.tarif_2h}</td>
              <td>{lpaandco.tarif_24h}</td>
              <td>{lpaandco.abo_mensuel}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4">Chargement des données...</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}

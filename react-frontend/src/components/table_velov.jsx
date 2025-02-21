import * as React from "react";
import axios from "axios";
import Table from "@mui/joy/Table";

export default function BasicTable() {
  const [velov, setvelov] = React.useState([]);

  React.useEffect(() => {
    axios
      .get("http://192.168.2.27:8000/api/velov/")
      .then((response) => setvelov(response.data))
      .catch((error) => console.error("Erreur Velov:", error));
  }, []);

  return (
    <Table>
      <thead>
        <tr>
          <th>Nom</th>
          <th>Places disponibles</th>
          <th>Vélos mécaniques</th>
          <th>Vélos électriques</th>
        </tr>
      </thead>
      <tbody>
        {velov.length > 0 ? (
          velov.map((velov) => (
            <tr key={velov.id}>
              <td>{velov.Name}</td>
              <td>{velov.Available_bike_stands}</td>
              <td>{velov.Mechanical_bikes}</td>
              <td>{velov.Elec_bikes}</td>
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

import * as React from "react";
import axios from "axios";
import Table from "@mui/joy/Table";

export default function BasicTable() {
  const [parkings, setParkings] = React.useState([]);

  React.useEffect(() => {
    axios
      .get("http://192.168.2.27:8000/api/parking/")
      .then((response) => setParkings(response.data))
      .catch((error) => console.error("Erreur Parking:", error));
  }, []);

  return (
    <Table>
      <thead>
        <tr>
          <th>Nom</th>
          <th>Capacité</th>
          <th>Places Disponibles</th>
          <th>État du parc</th>
        </tr>
      </thead>
      <tbody>
        {parkings.length > 0 ? (
          parkings.map((parking) => (
            <tr key={parking.id}>
              <td>{parking.nom}</td>
              <td>{parking.nb_places}</td>
              <td>{parking.places_disponibles}</td>
              <td>{parking.etat}</td>
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

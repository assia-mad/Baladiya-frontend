import React, { useState, useEffect } from "react";
import apiInstance from "../../../../../../API";
import FormationDetails from "./FormationDetails";
import { useParams } from "react-router-dom";

const FormationDetailsComponent = () => {
  const { id } = useParams();
  const [modifiedFormation, setModifiedFormation] = useState(null);

  useEffect(() => {
    const fetchFormationData = async () => {
      try {
        const response = await apiInstance.get(`formations/${id}/`);
        setModifiedFormation(response); // Ensure to use response.data to get the actual data from the API response
      } catch (error) {
        console.log('Error fetching formation data', error);
      }
    };

    fetchFormationData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setModifiedFormation((prevFormation) => ({
      ...prevFormation,
      [name]: value,
    }));
  };

  const handleSwitchChange = async (id, newState) => {
    try {
      const state = newState;
      const response = await apiInstance.patch(`formations/${id}/`, { state });
      setModifiedFormation((prevFormation) => ({
        ...prevFormation,
        state: response?.state, // Update the state with the new state received from the API response
      }));
    } catch (error) {
      console.log('Error updating formation state', error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await apiInstance.patch(`formations/${modifiedFormation.id}/`, modifiedFormation);
      console.log('Response after update:', response);
    } catch (error) {
      console.log('Error updating formation', error);
    }
  };

  if (!modifiedFormation) {
    return <div>Loading...</div>;
  }

  return (
    <FormationDetails
      handleChange={handleChange}
      handleSwitchChange={handleSwitchChange}
      handleUpdate={handleUpdate}
      modifiedFormation={modifiedFormation}
    />
  );
};

export default FormationDetailsComponent;

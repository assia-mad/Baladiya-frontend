import React from "react";
import apiInstance from "../../../API";
import TopicDetails from "./TopicDetails";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const TopicDetailsComponent = () => {
    const { id } = useParams();
    const [modifiedTopic, setModifiedTopic] = useState(null);
  
    useEffect(() => {
      const fetchTopicData = async () => {
        try {
          const response = await apiInstance.get(`topics/${id}/`);
          setModifiedTopic(response);
          console.log('truuuuuuuuue',response)
        } catch (error) {
          console.log('error',error);
        }
      };
  
      fetchTopicData();
    }, [id]);
  
    const handleChange = (e) => {
        const { name, value } = e.target;
        setModifiedTopic((prevTopic) => ({
          ...prevTopic,
          [name]: value,
        }));
      };

    const handleSwitchChange = async (id, newState) => {
        try {
          const state = newState;
          const response = await apiInstance.patch(`topics/${id}/`, { state });
          setTopics((prevTopics) =>
            prevTopics.map((topic) =>
              topic.id === id ? { ...topic, state } : topic
            )
          );
        } catch (error) {
          console.log('error');
        }
      };
    const handleUpdate = async () => {
        try {
            const response = await apiInstance.patch(`topics/${modifiedTopic.id}/`,modifiedTopic);
            console.log('respoooonse',response);
        }
        catch(error){
            console.log('error');
        }

    
    };

    if (!modifiedTopic) {
        return <div>Loading...</div>;
      }

    return <TopicDetails handleChange={handleChange} handleSwitchChange={handleSwitchChange} handleUpdate={handleUpdate} modifiedTopic={modifiedTopic}/>
}

export default TopicDetailsComponent;
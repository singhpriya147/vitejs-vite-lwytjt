import React, { useState } from 'react';

const SingleItem = ({ ...item }) => {
  const [medDetails, setMedDetails] = useState({});
  // console.log(item);

  const handleMedsType = (e) => {
    // console.log("here btn", e.target.value);
    const key = e.target.value;
    // console.log('here btn', item.salt_forms_json[key]);

    setMedDetails(item.salt_forms_json[key]);
    console.log('med data', medDetails);

    Object.keys(medDetails).map((key1, index1)=>{
      console.log("key = ",key1,  Object.keys(medDetails[key1]));
      
    })


  

    // item.salt_forms_json.key
  };

  // const handleMedDoseType = (e) => {
  //   const key = e.target.value;
  //   console.log('here qty', medDetails[key]);
  //   Object.keys(medDetails).map((key1, index1)=>{
  //     console.log("keys", medDetails[key1]);
  //   })

  // };

  return (
    <>
      <h3>{item.id}</h3>
      <h2>{item.salt}</h2>
      {/* { <div className="button-container">
     <h2>form:</h2>
        {item.available_forms.map((form, index) => (
          <button key={index}>{form}</button>
        ))}
     
      </div> } */}
      <div className="salt-container">
        <ul>
      {Object.keys(item.salt_forms_json).map((key, index) => (
        <div className="button-container" key={index}>

          <button id={index} value={key} onClick={(e) => handleMedsType(e)}>
            {key}
          </button>
          {
            medDetails && <>
            {
              Object.keys(medDetails).map((key1, index1)=>{
                // <h2>{key1}</h2>
                <button id={index1} value={key1} onClick={(e)=>handleMedDoseType(e)}>"lllllll</button>
              })
            }
            </>
          }
        </div>
      ))}
      </ul>
      </div>
      {/* {
  Object.keys(item).map((obj,key)=>(
    <>
     < h1>{item.id}</h1>
  <h2>{item.available_forms}</h2>
    </>
  
  ))
} */}
    </>
  );
};

export default SingleItem;

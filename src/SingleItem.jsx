import React, { useState } from 'react';

const SingleItem = ({ ...item }) => {
  const [selectedForm, setSelectedForm] = useState(null);
  const [selectedStrength, setSelectedStrength] = useState(null);
  const [selectedPackaging, setSelectePackaging] = useState(null);

  const [minPrice, setMinPrice] = useState('');
  const [showMinPrice, setShowMinPrice] = useState(false);

  const [medDetails, setMedDetails] = useState(
    item.salt_forms_json[Object.keys(item.salt_forms_json)[0]]
  );
  const [strength, setStrength] = useState(
    Object.values(item.salt_forms_json[Object.keys(item.salt_forms_json)[0]])[0]
  );
  const [summary, setSummary] = useState([]);
  const [showSummary, setShowSummary] = useState(false);

  const [showAllForms, setShowAllForms] = useState(false);
  const [showAllStrengths, setShowAllStrengths] = useState(false);
  const [showAllPackaging, setShowAllPackaging] = useState(false);

  const handleMedsType = (e) => {
    const key = e.target.textContent;

    setSelectedForm(key);
    setMedDetails(item.salt_forms_json[key]);

    setSummary([key]);
    setStrength({});
    setShowSummary(false);
  };

  const detectMinPrice = (strength, key) => {
    const FormType = Object.entries(strength).find(
      ([tabletKey]) => tabletKey === key
    );

    if (!FormType) {
      return Infinity;
    }

    const productIds = FormType[1];

    let minimumPrice = Infinity;

    Object.entries(productIds).forEach((productId) => {
      if (productId[1] && productId[1].length > 0) {
        productId[1].forEach((item) => {
          if (item.selling_price < minimumPrice) {
            minimumPrice = item.selling_price;
          }
        });
      }
    });

    return minimumPrice;
  };

  const CheckAvailibity = (key) => {
    let isAvailable = false;

    console.log(key);
    console.log(strength[key]);

    Object.entries(strength[key]).map((item, index) => {
      if (item[1] != null) {
        isAvailable = true;
      }
    });
    console.log(isAvailable);
    return isAvailable;
  };

  const handleStrength = (e) => {
    const key = e.target.textContent;
    while (summary.length > 1) {
      summary.splice(-1);
    }
    setSelectedStrength(key);
    setSummary([...summary, key]);
    setStrength(medDetails[key]);

    setShowSummary(false);

    Object.entries(medDetails[key]).forEach((packaging) => {
      setPackagingAvailability(packaging);
    });

    console.log('pacaked is available in this form ', packagingAvailability);
  };

  const handlePackaging = (e) => {
    while (summary.length > 2) {
      summary.splice(-1);
    }
    const key = e.target.textContent; // package
    setSummary([...summary, key]);
    setShowSummary(true);
    setSelectePackaging(key);

    const minimumPrice = detectMinPrice(strength, key);
    if (minimumPrice !== Infinity) {
      setMinPrice(minimumPrice);
      setShowMinPrice(true);
    } else {
      setMinPrice(minimumPrice);
      setShowMinPrice(true);
    }
  };

  return (
    <div className="singleItem">
      <div className="salt-container">
        <div className="left-container">
          <div className="inner-div">
            <div className="name">
              <span className="detail-span">Form:</span>
            </div>
            <div className="values">
              <ul>
                {Object.keys(item.salt_forms_json)
                  .slice(0, showAllForms ? undefined : 3)
                  .map((key, index) => (
                    <li
                      className={`left-container-li ${
                        selectedForm === key ? 'selected' : ''
                      }`}
                      key={index}
                      name={key}
                      onClick={handleMedsType}
                    >
                      {key}
                    </li>
                  ))}
                {Object.keys(item.salt_forms_json).length > 3 && (
                  <>
                    <div onClick={() => setShowAllForms(!showAllForms)}>
                      {showAllForms ? <b>hide </b> : <b>more...</b>}
                    </div>
                  </>
                )}
              </ul>
            </div>
          </div>

          {Object.keys(medDetails).length > 0 ? (
            <>
              <div className="inner-div">
                <div className="name">
                  <span className="detail">Strength:</span>
                </div>
                <div className="values">
                  <ul>
                    {Object.keys(medDetails)
                      .slice(0, showAllStrengths ? undefined : 3)
                      .map((key1, index1) => {
                        return (
                          <li
                            className={`left-container-li ${
                              selectedStrength === key1 ? 'selected' : ''
                            }`}
                            key={index1}
                            name={key1}
                            onClick={handleStrength}
                          >
                            {key1}
                          </li>
                        );
                      })}
                    {Object.keys(medDetails).length > 3 && (
                      <>
                        <div
                          onClick={() => setShowAllStrengths(!showAllStrengths)}
                        >
                          {showAllStrengths ? <b>hide </b> : <b>more...</b>}
                        </div>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
          {Object.keys(strength).length > 0 ? (
            <>
              <div className="inner-div">
                <div className="name">
                  <span className="detail">Packaging:</span>
                </div>
                <div className="values">
                  <ul>
                    {Object.keys(strength)
                      .slice(0, showAllPackaging ? undefined : 3)
                      .map((key1, index1) => {
                        let showAvailbility = CheckAvailibity(key1);
                        return (
                          <li
                            className={`${
                              showAvailbility
                                ? 'random'
                                : 'not-available-package'
                            } ${selectedPackaging === key1 ? 'selected' : ''}`}
                            key={index1}
                            name={key1}
                            onClick={handlePackaging}
                          >
                            {key1}
                          </li>
                        );
                      })}

                    {Object.keys(strength).length > 3 && (
                      <>
                        <div
                          onClick={() => setShowAllPackaging(!showAllPackaging)}
                        >
                          {showAllPackaging ? <b>hide </b> : <b>more...</b>}
                        </div>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>

        <div className="salt-header">
          <h3>{item.salt}</h3>
          {showSummary ? (
            <>
              <ul>
                {summary.map((key1, index1) => {
                  return (
                    <span className="summary-span" key={index1} name={key1}>
                      {key1}
                    </span>
                  );
                })}
              </ul>
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="min-price">
          {showMinPrice ? (
            isFinite(minPrice) ? (
              <h2>From: &#8377;{minPrice}</h2>
            ) : (
              <div className="not-available">
                <span>No Stores selling this product near you</span>
              </div>
            )
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleItem;

import React from "react";
import Table from 'react-bootstrap/Table';

const Wheather = ({ city, temperature, forecast }) => {

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

    
    const displayDate = date => {
        const oldDate = new Date(date);
        const day = oldDate.getDate();
        const month = oldDate.getMonth();
        const newDate = `${monthNames[month]} ${day}`;
        return newDate;
    }

    const convertToCelsius = grade => {
        const result = (grade - 32) / 1.8;
        return Math.floor(result);
    }


  return (
    ( city && forecast !== null &&
      <div>
        <h4>Current Condition</h4>
        <p>Show temperature:  <strong>{temperature}</strong> &#8451; </p>
        <p>Forecast for 5 days</p>
       
        <Table striped bordered hover size="sm" variant="dark">
            <thead>
                <tr>
                    <th>Day</th>
                    <th>Min</th>
                    <th>Max</th>
                </tr>
            </thead>
            <tbody>
                {forecast.map((el, key) => {
                    return (
                        <tr key={key}>
                            <td>{displayDate(el.Date)}</td>
                            <td>{convertToCelsius(el.Temperature.Minimum.Value)} &#8451;</td>
                            <td>{convertToCelsius(el.Temperature.Maximum.Value)} &#8451;</td>
                        </tr>)}
                    )
                }
            </tbody>
        </Table>
      </div>
    ) 
  );
};

export default Wheather;

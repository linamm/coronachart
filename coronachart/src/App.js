import React from 'react';
import './App.css';
import { Label, Legend, LineChart, XAxis, YAxis, Tooltip, Line, CartesianGrid } from 'recharts';
import { totalCases, fatalityCases } from './Data.js'; 
import ReactGA from 'react-ga';

ReactGA.initialize('UA-101607316-3');
ReactGA.pageview(window.location.pathname + window.location.search);

function App() {

  const headline = {
    marginHorizontal: 40,
    alignContent: 'flex-start',
    display:'flex',
    marginTop: 20,
    fontSize: 50
  }

  const paragraph = {
    marginHorizontal: 40,
    alignContent: 'flex-start',
    display:'flex',
    marginTop: 20
  }
  const app = {
    display:'flex',
    flexDirection: 'column',
    margin: 50,
    paddingBottom: 50
  }
  return (
    <div style={app}>
       <div style={headline}>
        <b> Stay Home  Save Lives</b>
      </div>

      <div style={paragraph}>
        On the 24th of March, the predicted death is 413 while the actual is 422. At same stage in Italy, the number is 463. The prediction, the actual and Italy (the past) are presenting very similar, comparable numbers. However, on the same day, the predicted total cases is 8407, the actual is 8077 while Italy is 15113. These numbers are very different. This is difficult to explain.
        UK has similar health system to Italy, yet, the fatality rate in the UK is much higher. A plausible explaination could be that the testing coverage in the UK is much lower, this could be due to a very high number of infected people with mild symptoms are, hopefully self isolating, without being counted into the statistics. Alternatively, this could be highlighting that the testing capacity in the UK is a real bottle neck and there is just not enough testing going on to reveal the real numbers.
      </div>

      <div style={paragraph}>
          <b>The predicted total cases by the 25th of March is 9021 and nearly  15,000 cases by the 30th of March.</b>
      </div>
     <div style={paragraph}>
      <b>
      The predicted number of fatalities is 548 on the 25th of March and close to 2000 by 1st of April. The total fatality cases will surpass China arround the 6th of March. Considering China has nearly 1.4 billion people, while there is only 63 million in the UK, the impact from coronavirus for the UK will be much higher.
        </b>       
      </div>
        <div style={paragraph}>
        The starting point of the first graph is the day when Italy has 150 cases (2020-02-23), 
        while the UK has 160 cases (2020-03-06). At that point, UK is 12 days behind Italy.

        </div>
        <div style={paragraph}>
         In the early days, the UK curve is quite closely following the Italy one, therefore a simplified model to predict the uk numbers is to track the daily growth rate of cases in Italy.  However, the UK seems to be doing much better later on, this might be a result of the social distancing measures are working. Therefore, the prediction model takes into account of a previous predition error. </div>

      
      <div style={{margin: 20, marginTop: 40,}}>
        <LineChart
          width={1000}
          height={300}
          margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
          data={totalCases}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis dataKey="it"/>
          <Tooltip />
          <Legend verticalAlign="top" height={36}/>
          <Line name="Total Cases in Italy" type="monotone" dataKey="it" stroke="#008c45" yAxisId={0} />
          <Line name="Total Cases in the UK" type="monotone" dataKey="uk" stroke="#00247d" yAxisId={0} />
          <Line name="Predicted Total Cases in the UK" type="monotone" dataKey="uk_predict" stroke="#cf142b" yAxisId={0} />
        </LineChart>
      </div>

      <div style={paragraph}>
        Graph below shows the prediction of fatality cases using the same prediction model.
      </div>

      <div style={{margin: 20, marginTop: 40,}}>
      <LineChart
          width={1000}
          height={300}
          margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
          data={fatalityCases}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis dataKey="it"/>
          <Tooltip />
          <Legend verticalAlign="top" height={36}/>
          <Line name="Fatality in Italy" type="monotone" dataKey="it" stroke="#008c45" yAxisId={0} />
          <Line name="Fatality in the UK" type="monotone" dataKey="uk" stroke="#00247d" yAxisId={0} />
          <Line name="Predicted Fatality in the UK" type="monotone" dataKey="uk_predict" stroke="#cf142b" yAxisId={0} />
        </LineChart>
        </div>

        <div style={paragraph}>
     Desclaimer: The prediction here is entirely speculative and subject to change anytime. This site or author doesn't take any form of responsibility of getting the predictions wrong.
</div>

    </div>


  );
}

export default App;

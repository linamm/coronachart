import React from 'react';
import './App.css';
import { Label, Legend, LineChart, XAxis, YAxis, Tooltip, Line, CartesianGrid } from 'recharts';
import { totalCases, fatalityCases } from './Data.js'; 
import ReactGA from 'react-ga';

ReactGA.initialize('UA-101607316-3');
ReactGA.pageview(window.location.pathname + window.location.search);

function App() {

const styles = {
  headline: {
    marginHorizontal: 40,
    alignContent: 'flex-start',
    display:'flex',
    marginTop: 20,
    fontSize: 50
  },
   paragraph: {
    marginHorizontal: 40,
    alignContent: 'flex-start',
    display:'flex',
    marginTop: 20
  },
  app: {
    display:'flex',
    flexDirection: 'column',
    margin: 50,
    paddingBottom: 50
  },
  graph: {
    margin: 20,
    marginTop: 40,}
};

  return (
    <div style={styles.app}>
       <div style={styles.headline}>
        <b> Stay Home  Save Lives</b>
      </div>

      <div style={styles.paragraph}>
        Editor's Analysis (8pm, 27 March):
          The new number of fatality has spiked today, which is much higher than predicted. This sudden spike might be a sign that the NHS is reaching the breaking point fast. The number of new cases was higher than expected as well, the rate of growth is looking scary again, tracking more closely to what was happening in Italy. This is very alarming. Hopefully, the lockdown effect is yet to kick in and we will see a slow down in the coming few days.

          Coupling with the news of both the UK Prime Minister and the Health Secretary has been confirmed to be tested positive, there is an additional risk of the effort of tackling this crisis might get affected. It has been a very bad day!! :(
        </div>

      <div style={styles.paragraph}>
          <b>The predicted total cases by the 28th of March is 17109 and over 30,000 cases by the 1st of April and almost doubling in just 5 days.</b>
      </div>
     <div style={styles.paragraph}>
      <b>
      The predicted number of fatalities is 944 on the 28th of March and over 2000 by the 2nd of April. 
        </b>       
      </div>
        <div style={styles.paragraph}>
        The starting point of the first graph is the day when Italy has 150 cases (2020-02-23), 
        while the UK has 160 cases (2020-03-06). At that point, UK is 12 days behind Italy.

        </div>
        <div style={styles.paragraph}>
         In the early days, the UK curve is quite closely following the Italy one, therefore a simplified model to predict the uk numbers is to track the daily growth rate of cases in Italy.  However, the UK seems to be doing much better later on, this might be a result of the social distancing measures are working. Therefore, the prediction model takes into account of a previous predition error. </div>

      
      <div style={styles.graph}>
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

      <div style={styles.paragraph}>
        Graph below shows the prediction of fatality cases using the same prediction model.
      </div>

      <div style={styles.graph}>
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
        <div style={styles.paragraph}>
     Desclaimer: The prediction here is entirely speculative and subject to change anytime. This site or author doesn't take any form of responsibility of getting the predictions wrong.
</div>

    </div>


  );
}

export default App;

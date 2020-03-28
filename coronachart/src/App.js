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
        Editor's Analysis (11pm, 27 March):
          Another bad day for nubmer of fatilities, which put the trend in the UK increasingly closer to Italy. That is a pretty dreadful outlook.
          Data from China is added for comparison. China went to lock down on the 23rd of Jan when there is only arround 800 cases, the total cases start to show a slowing down trend from arround 20 days after the lock down. The official UK lock down is on the 23rd of March, when there is already over 6000 cases. Although, UK has announced social distancing and closing of pubs a few days before that. The shielding of 1.2 million vounerable people is also a unique approach in comparison with other countries. If UK follows a similar pattern like have seen in China, we will start to see a slow down of new cases arround mid April. Fatality rate will start to slow down about 10 days after that.
          The UK lock down happened at a much later stage than that of China, but, slightly earlier than Italy. An earlier lockdown in China and Korean has been proved to achieve lower fatality rate. The effect of the UK approach is yet to be seen.
        </div>

      <div style={styles.paragraph}>
          <b>The predicted total cases by the 29th of March is close to 20,000 and which will double to over 40,000 by the 4th of April, i.e. within a week.</b>
      </div>
     <div style={styles.paragraph}>
      <b>
      The predicted number of fatalities is 1176 on the 29th of March (data at 5pm 28th March, but, not published until 29th) and over 4000 by the 5th of April.
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
          <Line name="Total Cases in China" type="monotone" dataKey="cn" stroke="#DE2910" yAxisId={0} />
          <Line name="Predicted Total Cases in the UK" type="monotone" dataKey="uk_predict" stroke="#aaaaaa" yAxisId={0} />
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
          <Line name="Fatalities in Italy" type="monotone" dataKey="it" stroke="#008c45" yAxisId={0} />
          <Line name="Fatalities in the UK" type="monotone" dataKey="uk" stroke="#00247d" yAxisId={0} />
          <Line name="Fatalities in China" type="monotone" dataKey="cn" stroke="#DE2910" yAxisId={0} />
          <Line name="Predicted Fatality in the UK" type="monotone" dataKey="uk_predict" stroke="#aaaaaa" yAxisId={0} />
        </LineChart>
        </div>
        <div style={styles.paragraph}>
     Desclaimer: The prediction here is entirely speculative and subject to change anytime. This site or author doesn't take any form of responsibility of getting the predictions wrong.
</div>

    </div>


  );
}

export default App;

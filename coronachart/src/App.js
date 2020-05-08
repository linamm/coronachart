import React from "react";
import "./App.css";
import {
  Legend,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  CartesianGrid,
  Bar,
  BarChart
} from "recharts";
import { displayTotalCases, displayFatalityCases, newCases, newFatalityCases, fatalityRates } from "./Data.js";
import ReactGA from "react-ga";

ReactGA.initialize("UA-101607316-3");
ReactGA.pageview(window.location.pathname + window.location.search);


function App() {

  const [dimensions, setDimensions] = React.useState({ 
    height: window.innerHeight,
    width: window.innerWidth
  });
  
  React.useEffect(() => {
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth
      });
    };
    

    window.addEventListener('resize', handleResize);

    return _ => {
      window.removeEventListener('resize', handleResize);
    }
    
  });
  
  const styles = {
    headline: {
      marginHorizontal: 40,
      alignContent: "flex-start",
      display: "flex",
      marginTop: 20,
      fontSize: 50
    },
    paragraph: {
      marginHorizontal: 40,
      alignContent: "flex-start",
      display: "flex",
      flex: 1,
      marginTop: 20,
      flexDirection: "column",
    },
    app: {
      display: "flex",
      flexDirection: "column",
      margin: 50,
      paddingBottom: 50,
    },
    graph: {
      margin: 20,
      marginTop: 40
    }
  };

  const colors = {
    uk: "#00247d",
    it: "#008c45",
    china: "#DE2910",
    uk_predict: "#666666"
  }

  const graphSize = {
    // width: dimensions.width * 0.8,
    // height: dimensions.width * 0.6
    width: 1000,
    height: 400
  }

  return (
    <div style={styles.app}>
      <div style={styles.headline}>
        <b> Zero COVID-19, True Freedom</b>
      </div>

      <div style={styles.paragraph}>
        Updated (0:10am, 9th May)
        Only zero new cases of COVID-19 will give our true freedom back. As long as there is still new COVID-19 cases, the NHS frontline heros cannot stop fighting the war, the vulnerables cannot participate in society and the economy will not be moving. Every single decision made by every individual will be affected by the fact that there is still new cases of COVID-19. The day we hear from the media that 'there is zero cases of new COVID-19 cases', is the day, we could all say 'Hooray!' and resume normality as it was.

        "Keep going, we aren't done yet!" - Dominic Raab - 7th May
      </div>
      <div style={styles.paragraph}>
        <b>
          The predicted total cases by the 9th of May is 216162, adding 4798 new cases and over 300,000 by the 27th of May.
        </b>
      </div>
      <div style={styles.paragraph}>
        <b>
          The predicted number of fatalities published on the 9th of May is 31728, adding 487 new fatalities, over 40,000 by the beginning of June.
        </b>
      </div>

      <div style={styles.graph}>
          <BarChart
            width={graphSize.width}
            height={graphSize.height}
            data={newCases}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="uk" fill={colors.uk} name='New Cases UK'/>
            <Bar dataKey="uk_predict" fill={colors.uk_predict} name='New Cases UK Predict' />
            {/* <Bar dataKey="it" fill={colors.it} name='New Cases Italy Predict' /> */}

          </BarChart>

      </div>

      <div style={styles.graph}>
          <BarChart
            width={graphSize.width}
            height={graphSize.height}
            data={newFatalityCases}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="uk" fill={colors.uk} name='New Fatalities UK'/>
            <Bar dataKey="uk_predict" fill={colors.uk_predict} name='New Fatalities UK Predict' />
          </BarChart>

      </div>
      
      <div style={styles.graph}>
        <LineChart
          width={graphSize.width}
          height={graphSize.height}
          margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
          data={displayTotalCases}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis dataKey="uk_predict" />
          <Tooltip />
          <Legend verticalAlign="top" height={36} />
          <Line
            name="Predicted Total Cases in the UK"
            type="monotone"
            dataKey="uk_predict"
            stroke={colors.uk_predict}
            yAxisId={0}
          />

          {/* <Line
            name="Total Cases in Italy"
            type="monotone"
            dataKey="it"
            stroke={colors.it}
            yAxisId={0}
          />

          <Line
            name="Total Cases in China"
            type="monotone"
            dataKey="cn"
            stroke={colors.china}
            yAxisId={0}
          /> */}

          <Line
            name="Total Cases in the UK"
            type="monotone"
            dataKey="uk"
            stroke={colors.uk}
            yAxisId={0}
          />
        </LineChart>
      </div>

      <div style={styles.graph}>
        <LineChart
          width={graphSize.width}
          height={graphSize.height}
          margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
          data={displayFatalityCases}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis dataKey="uk_predict" />
          <Tooltip />
          <Legend verticalAlign="top" height={36} />
          {/* <Line
            name="Fatalities in Italy"
            type="monotone"
            dataKey="it"
            stroke={colors.it}
            yAxisId={0}
          />
          <Line
            name="Fatalities in China"
            type="monotone"
            dataKey={"cn"}
            stroke={colors.china}
            yAxisId={0}
          /> */}
          <Line
            name="Predicted Fatality in the UK"
            type="monotone"
            dataKey="uk_predict"
            stroke={colors.uk_predict}
            yAxisId={0}
          />
          <Line
            name="Fatalities in the UK"
            type="monotone"
            dataKey="uk"
            stroke={colors.uk}
            yAxisId={0}
          />
        </LineChart>
      </div>

      <div style={styles.graph}>
        <LineChart
          width={graphSize.width}
          height={graphSize.height}
          margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
          data={fatalityRates}
        >
          <CartesianGrid strokeDasharray="3 4" />
          <XAxis dataKey="name" />
          <YAxis dataKey="uk_predict" />
          <Tooltip />
          <Legend verticalAlign="top" height={36} />
          {/* <Line
            name="Fatality rate in China"
            type="monotone"
            dataKey="cn"
            stroke={colors.china}
            yAxisId={0}
          />
          <Line
            name="Fatality rate in Italy"
            type="monotone"
            dataKey="it"
            stroke={colors.it}
            yAxisId={0}
          /> */}
          <Line
            name="Predicted Fatality rate in the UK"
            type="monotone"
            dataKey="uk_predict"
            stroke={colors.uk_predict}
            yAxisId={0}
          />
          <Line
            name="Fatality rate in the UK"
            type="monotone"
            dataKey="uk"
            stroke={colors.uk}
            yAxisId={0}
          />
        </LineChart>
      </div>

      {/* <div style={styles.paragraph}>
        Italy has 150 cases (2020-02-23), while the UK has 160 cases (2020-03-06). At that
        point, UK is 12 days behind Italy. The data from Italy and UK is aligned from that point.
      </div>
      <div style={styles.paragraph}>
        In the early days, the UK curve is quite closely following the Italy
        one, therefore a simplified model to predict the uk numbers is to track
        the daily growth rate of cases in Italy. The prediction model also takes
        into account of previous predition errors in order to achieve a more accurate number.

        On 18th April, the predition using the above model has been quite off for two days in a row, which indicates that the UK is no longer following the curve set by Italy. The new prediction is based on trend analysis by calculating the running average rate and rate change of the past 7 days of daily new cases and new fatalities.
      </div> */}

      <div style={styles.paragraph}>
        <div>
          Desclaimer: The prediction here is entirely speculative and subject to
          change anytime. This site or author doesn't take any form of
          responsibility of getting the predictions wrong.
        </div>
        <div> References: </div>
        <div>
          1.
          https://www.gov.uk/guidance/coronavirus-covid-19-information-for-the-public
        </div>
        <div>
          2.
          https://en.wikipedia.org/wiki/2020_coronavirus_pandemic_in_the_United_Kingdom
        </div>
        <div>
          3. https://en.wikipedia.org/wiki/2020_coronavirus_pandemic_in_Italy
        </div>
        <div> 4. https://www.worldometers.info/coronavirus/ </div>
        <div> 5. https://coronavirus.jhu.edu/map.html </div>
      </div>
    </div>
  );
}

export default App;

import React from "react";
import "./App.css";
import {
  Label,
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
import { totalCases, fatalityCases, newCases, newFatalityCases, fatalityRates } from "./Data.js";
import ReactGA from "react-ga";
import { isConditionalExpression } from "@babel/types";

ReactGA.initialize("UA-101607316-3");
ReactGA.pageview(window.location.pathname + window.location.search);

function App() {
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
      marginTop: 20,
      flexDirection: "column"
    },
    app: {
      display: "flex",
      flexDirection: "column",
      margin: 50,
      paddingBottom: 50
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
    width: 1000,
    height: 500
  }

  return (
    <div style={styles.app}>
      <div style={styles.headline}>
        <b> Stay Home Save Lives</b>
      </div>

      <div style={styles.paragraph}>
        Editor's Analysis (8:00pm, 2 April):
        <div>
          The predicted total cases and fatalities are both very close to the published data today, which indicates a stablising trend and no major factor has changed. Bar chart of new daily for total cases and fatality cases are added. This helps to see the trend more clearly. The increase in daily new cases is similar or even smaller than it has been and hopefully will be decreasing soon. The new fatalities is still increasing, but, the rate of increasing is slowing down.
        </div>
      </div>

      <div style={styles.paragraph}>
        <b>
          The predicted total cases by the 3rd of April is 37,172 and will be over 50,000 by the 7th of April.
        </b>
      </div>
      <div style={styles.paragraph}>
        <b>
          The predicted number of fatalities published on the 3rd of April will be 3364, which overtakes 3318 reported in China to date. The predicted number will be over 5000 by 6th April and over 10,000 by 11th of April.
        </b>
      </div>
      
      <div style={styles.graph}>
        <LineChart
          width={graphSize.width}
          height={graphSize.height}
          margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
          data={totalCases}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis dataKey="it" />
          <Tooltip />
          <Legend verticalAlign="top" height={36} />
          <Line
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
          />
          <Line
            name="Predicted Total Cases in the UK"
            type="monotone"
            dataKey="uk_predict"
            stroke={colors.uk_predict}
            yAxisId={0}
          />
          <Line
            name="Total Cases in the UK"
            type="monotone"
            dataKey="uk"
            stroke={colors.uk}
            yAxisId={0}
          />
        </LineChart>
      </div>

      <div style={styles.paragraph}>
        The starting point of the first graph is the day when Italy has 150
        cases (2020-02-23), while the UK has 160 cases (2020-03-06). At that
        point, UK is 12 days behind Italy.
      </div>
      <div style={styles.paragraph}>
        In the early days, the UK curve is quite closely following the Italy
        one, therefore a simplified model to predict the uk numbers is to track
        the daily growth rate of cases in Italy. However, the UK seems to be
        doing much better later on, this might be a result of the social
        distancing measures are working. Therefore, the prediction model takes
        into account of a previous predition error.{" "}
      </div>


      <div style={styles.paragraph}>
        Graph below shows the prediction of fatality cases using the same
        prediction model.
      </div>

      <div style={styles.graph}>
        <LineChart
          width={graphSize.width}
          height={graphSize.height}
          margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
          data={fatalityCases}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis dataKey="it" />
          <Tooltip />
          <Legend verticalAlign="top" height={36} />
          <Line
            name="Fatalities in Italy"
            type="monotone"
            dataKey="it"
            stroke={colors.it}
            yAxisId={0}
          />
          <Line
            name="Fatalities in China"
            type="monotone"
            dataKey={"china"}
            stroke={colors.china}
            yAxisId={0}
          />
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
          data={fatalityRates}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis dataKey="it" />
          <Tooltip />
          <Legend verticalAlign="top" height={36} />
          <Line
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
          />
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

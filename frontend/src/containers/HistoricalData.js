import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//import axios from 'axios';
import * as dataActions from '../actions/data';
import classes from './Chart.css';
import AmCharts from '@amcharts/amcharts3-react';
import { Button } from 'antd';

// Component which contains the dynamic state for the chart
class HistoricalData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataProvider: {},
    };
  }

  generateData(props) {
    //console.log('in generateData', props.data.batchData);
    var dataProvider = [];
    var data = props.data.batchData['BTC'];
    data = data['USD'];
    data = data['day'];
    for (var key in data) {
      var date = new Date(data[key]['time'] * 1000);
      dataProvider.push({
        date: date,
        open: data[key]['open'],
        close: data[key]['close'],
        high: data[key]['high'],
        low: data[key]['low'],
        volumn: data[key]['volumnto'] - data[key]['volumnfrom'],
      });
    }
    return dataProvider;
  }

  componentWillReceiveProps(nextProps) {
    //console.log('next', nextProps.data.batchData);

    this.setState({
      // Update the chart dataProvider
      dataProvider: this.generateData(nextProps),
    });
    //this.props.onStartFetchDaylyData();
  }

  componentWillUnmount() {
    //clearInterval(this.state.timer);
    //this.props.onStopFetchDaylyData();
  }

  onStart() {
    this.props.onStartFetchDaylyData();
  }

  onStop() {
    this.props.onStopFetchDaylyData();
  }

  render() {
    const config = {
      type: 'stock',
      theme: 'light',
      dataSets: [
        {
          fieldMappings: [
            {
              fromField: 'open',
              toField: 'open',
            },
            {
              fromField: 'close',
              toField: 'close',
            },
            {
              fromField: 'high',
              toField: 'high',
            },
            {
              fromField: 'low',
              toField: 'low',
            },
            {
              fromField: 'volume',
              toField: 'volume',
            },
            {
              fromField: 'value',
              toField: 'value',
            },
          ],
          color: '#7f8da9',
          dataProvider: this.state.dataProvider,
          categoryField: 'date',
        },
      ],
      balloon: {
        horizontalPadding: 13,
      },
      panels: [
        {
          title: 'Value',
          stockGraphs: [
            {
              id: 'g1',
              type: 'candlestick',
              openField: 'open',
              closeField: 'close',
              highField: 'high',
              lowField: 'low',
              valueField: 'close',
              lineColor: '#7f8da9',
              fillColors: '#7f8da9',
              negativeLineColor: '#db4c3c',
              negativeFillColors: '#db4c3c',
              fillAlphas: 1,
              balloonText:
                'open:<b>[[open]]</b><br>close:<b>[[close]]</b><br>low:<b>[[low]]</b><br>high:<b>[[high]]</b>',
              useDataSetColors: false,
            },
          ],
        },
      ],
      scrollBarSettings: {
        graphType: 'line',
        usePeriod: 'WW',
      },
      panelsSettings: {
        panEventsEnabled: true,
      },
      cursorSettings: {
        valueBalloonsEnabled: true,
        valueLineBalloonEnabled: true,
        valueLineEnabled: true,
      },
      periodSelector: {
        position: 'bottom',
        periods: [
          {
            period: 'DD',
            count: 10,
            label: '10 days',
          },
          {
            period: 'MM',
            selected: true,
            count: 1,
            label: '1 month',
          },
          {
            period: 'YYYY',
            count: 1,
            label: '1 year',
          },
          {
            period: 'YTD',
            label: 'YTD',
          },
          {
            period: 'MAX',
            label: 'MAX',
          },
        ],
      },
    };

    return (
      <div id="#historicalData" className={classes.intraday}>
        <p className={[classes.intradayintro, 'col'].join(' ')}>
          Historical Dataflow{' '}
        </p>
        <AmCharts.React
          style={{ width: '100%', height: '350px' }}
          options={config}
        />
        <Button type="primary" onClick={() => this.onStart()}>
          Start
        </Button>
        <Button type="primary" onClick={() => this.onStop()}>
          Stop
        </Button>
      </div>
    );
  }
}

HistoricalData.propTypes = {
  onStartFetchDaylyData: PropTypes.func,
  onStopFetchDaylyData: PropTypes.func,
  data: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    data: state.data,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onStartFetchDaylyData: () =>
      dispatch(dataActions.sagaStartSyncBatchDaylyData()),
    onStopFetchDaylyData: () =>
      dispatch(dataActions.sagaStopSyncBatchDaylyData()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoricalData);

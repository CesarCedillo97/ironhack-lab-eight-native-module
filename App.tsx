import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NativeModules} from 'react-native';

interface BatteryModuleType {
  getBatteryLevel(): Promise<number>;
}

function App(): React.JSX.Element {
  const {BatteryModule} = NativeModules;
  const [batteryLevel, setBatteryLevel] = useState<number>(0);

  useEffect(() => {
    (BatteryModule as BatteryModuleType)
      .getBatteryLevel()
      .then(level => {
        console.log(`Battery level is ${level}%`);
        setBatteryLevel(level);
      })
      .catch(error => {
        console.error(error);
      });
  }, [BatteryModule]);

  return (
    <View style={styles.container}>
      <Text>Nivel de la bateria</Text>
      <View style={styles.batteryContainer}>
        <Text style={styles.bateryLevelText}>{batteryLevel}%</Text>
        <View style={styles.tipOfBattery} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  batteryContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  tipOfBattery: {
    borderWidth: 1,
    height: 20,
    width: 10,
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
  },
  bateryLevelText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#8acc4f',
    borderWidth: 1,
    paddingHorizontal: 5,
    borderRadius: 2,
  },
});

export default App;

import React from 'react';
import {Button} from 'react-native';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';

type LocationWatchObject = {
  locations: Location.LocationObject[];
};

const LOCATION_TASK_NAME = 'background-location-task';

const requestPermissions = async () => {
  const {status: foregroundStatus} =
    await Location.requestForegroundPermissionsAsync();
  if (foregroundStatus === 'granted') {
    const {status: backgroundStatus} =
      await Location.requestBackgroundPermissionsAsync();
    if (backgroundStatus === 'granted') {
      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.LocationAccuracy.BestForNavigation,
        timeInterval: 1000,
      });
    }
  }
};

const stopLocation = async () => {
  await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
  console.log('Stopped location');
};

export const PermissionsButton = () => (
  <Button onPress={requestPermissions} title="Enable" />
);

export const StopLocationButton = () => (
  <Button onPress={stopLocation} title="Disable" />
);

TaskManager.defineTask(LOCATION_TASK_NAME, ({data, error}) => {
  if (error) {
    console.error('location error', error);
    return;
  }
  if (data) {
    const {locations} = data as LocationWatchObject;
    console.log('locations', locations);
    return;
  }
});

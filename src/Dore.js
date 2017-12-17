import {Linking} from 'react-native'

import ToastBridge from './bridge/ToastBridge'
import DeviceInfoBridge from './bridge/DeviceInfoBridge'
import DatePickerBridge from './bridge/DatePickerBridge'
import BadgeBridge from './bridge/BadgeBridge'
import KeyboardBridge from './bridge/KeyboardBridge'
import ClipboardBridge from './bridge/ClipboardBridge'
import GeolocationBridge from './bridge/GeolocationBridge'
import OrientationBridge from "./bridge/OrientationBridge";
import NetInfoBridge from "./bridge/NetInfoBridge";
import StatusBarBridge from "./bridge/StatusBarBridge";
import StateBridge from "./bridge/StateBridge";

const Dore = {};

Dore.inject = (modules) => {
  for(let i=0;i<modules.length;i++) {
    let module = modules[i];
    Dore[module.name] = module.class;
  }
};

Dore.handleMessage = (event, webView) => {
  let eventData = {};
  try {
    eventData = JSON.parse(event.nativeEvent.data);
  } catch (error) {
    ToastBridge(error);
  }

  const action = eventData.action;
  const payload = eventData.payload;

  switch (action) {
    case 'DEVICE_INFO': {
      return DeviceInfoBridge(payload, webView, Dore.DeviceInfo)
    }
    case 'TOAST': {
      return ToastBridge(payload, Dore.Toast)
    }
    case 'BADGE': {
      return BadgeBridge(payload, webView, Dore.Badge)
    }
    case 'DATE_PICKER': {
      return DatePickerBridge(payload, webView)
    }
    case 'KEYBOARD': {
      return KeyboardBridge(payload)
    }
    case 'CLIPBOARD': {
      return ClipboardBridge(payload, webView)
    }
    case 'GEOLOCATION': {
      return GeolocationBridge(payload, webView)
    }
    case 'ORIENTATION': {
      return OrientationBridge(payload, webView, Dore.Orientation)
    }
    case 'OPEN_LINK': {
      return Linking.openURL(payload)
    }
    case 'NET_INFO': {
      return NetInfoBridge(payload, webView)
    }
    case 'STATUS_BAR': {
      return StatusBarBridge(payload)
    }
    case 'STATE': {
      return StateBridge(payload, webView)
    }
  }
};

export default Dore;
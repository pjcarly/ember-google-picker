# ember-google-picker

## Installation

* `git clone <repository-url>` this repository
* `cd ember-google-picker`
* `npm install`
* `bower install`

## Configuration

* in your configuration.environment add keys to the ENV variable

```
var ENV = {
  googlePicker: {
    apiKey: <YOUR_GOOGLE_DEVELOPER_API_KEY>,
    clientId: <YOUR_GOOGLE_DEVELOPER_OAUTH_CLIENT_ID>,
    scope: [] // Optional scope for the views you want to support
  }
}
```

## Component
```
{{google-picker valueChanged=(action 'googlePickerValueChanged')}}
```

## Response

* The response will be a JSON document (https://developers.google.com/picker/docs/results) passed to the action given in valueChanged

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

* pass the views you want to support as an attribute

```
{{google-picker views=googlePickerViews valueChanged=(action 'googlePickerValueChanged')}}
```

* depending on the views you want, you must extend your configuration scope (https://developers.google.com/picker/docs/)

## Response

* The response will be a JSON document (https://developers.google.com/picker/docs/results) passed to the action given in valueChanged

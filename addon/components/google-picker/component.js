/* global: gapi, google */
import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'button',
  apiKey: Ember.computed(function(){
    let config = Ember.getOwner(this).resolveRegistration('config:environment');
    Ember.assert('You must define a Google Picker API Key', !Ember.isBlank(config.googlePicker.clientId));
    return config.googlePicker.apiKey;
  }),
  clientId: Ember.computed(function(){
    let config = Ember.getOwner(this).resolveRegistration('config:environment');
    Ember.assert('You must define a Google Picker Client ID', !Ember.isBlank(config.googlePicker.clientId));
    return config.googlePicker.clientId;
  }),
  scope: Ember.computed(function(){
    let config = Ember.getOwner(this).resolveRegistration('config:environment');
    if(Ember.isBlank(config.googlePicker.scope)){
      return [];
    }
    return config.googlePicker.scope;
  }),
  onAuthApiLoad(){
    gapi.auth.authorize({
     'client_id': this.get('clientId'),
     'scope': this.get('scope'),
     'immediate': false
    },
    this.handleAuthResult.bind(this));
  },
  onPickerApiLoad(){
    this.set('pickerApiLoaded', true);
    this.createPicker();
  },
  handleAuthResult(authResult){
    if (authResult && !authResult.error) {
      this.set('oauthToken', authResult.access_token);
      this.createPicker();
    }
  },
  createPicker() {
    if (this.get('pickerApiLoaded') && this.get('oauthToken')) {

      let picker = new google.picker.PickerBuilder().
          addView(google.picker.ViewId.RECENTLY_PICKED).
          addView(google.picker.ViewId.PHOTOS).
          addView(new google.picker.ImageSearchView().setLicense(google.picker.ImageSearchView.License.NONE)).
          setOAuthToken(this.get('oauthToken')).
          setDeveloperKey(this.get('apiKey')).
          setCallback(this.picker.bind(this)).
          build();

      picker.setVisible(true);
    }
  },
  picker(data){
    if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
      const action = this.get('valueChanged');
      if(!Ember.isBlank(action)){
        action(data);
      }
    }
  },
  click(){
    gapi.load('auth', this.onAuthApiLoad.bind(this));
    gapi.load('picker', this.onPickerApiLoad.bind(this));
  }
});

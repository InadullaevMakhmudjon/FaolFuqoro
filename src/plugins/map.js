import Vue from 'vue';
import * as VueGoogleMaps from 'vue2-google-maps';

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCVi14ikRw6DoJE6ehUs8fRSRDkxxi7wCU',
    libraries: '3.26',
  },
  installComponents: true,
});

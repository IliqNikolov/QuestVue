import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({theme: {
    themes: {
      light: {
        primary: '#388334',
        warning: '#FF5252'        
      },
    },
  },
});

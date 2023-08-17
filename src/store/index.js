//import vuex
import { createStore } from 'vuex'
import daftarpeserta from './module/daftarpeserta'

//create store vuex
export default createStore({

    modules: {
        daftarpeserta,
    }

})
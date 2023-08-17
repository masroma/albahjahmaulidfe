import Api from '../../api/Api'
const daftarpeserta = {

    //set namespace true
    namespaced: true,

    //state
    state: {
       datas: {},
    },

    //mutations
    mutations: {
        SET_DATA(state, data) {
            state.datas = data
        },
    },

    //actions
    actions: {

        store({ commit }, formData) {
          

            //define callback promise
            return new Promise((resolve, reject) => {

                // const token = localStorage.getItem('token')

                //set axios header dengan type Authorization + Bearer token
                // Api.defaults.headers.common['Authorization'] = `Bearer ${token}`

                Api.post('/transaksi', formData)

                    .then(response => {

                        console.log(response.data.data)
                        commit('')
                        resolve(response)

                    }).catch(error => {


                        //reject ke component dengan hasil response
                        reject(error.response.data)

                    })

            })
        },
      
    },

    //getters
    getters: {

    }

}

export default daftarpeserta
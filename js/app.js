const example = {
    data() {
        return {
            data: [],
            ok:false,
            total: 0,
            loading: false,
            sortField: 'vote_count',
            sortOrder: 'desc',
            defaultSortOrder: 'desc',
            page: 1,
            perPage: 10,
            checkboxGroup: ['globo.com','r7.com'],
            wordsGroup:['dengue','hiv'],
            teste:[],
            checkedRows: [],
            isLoading: false,
            isFullPage: true

        }
    },
    methods: {


        getNews () {

            console.log(wordsGroup.join(', '))
            axios.post('http://localhost:8081/getNews',{

                "word":"dengue",
                "domains":this.checkboxGroup

            })
            .then(({data}) =>{
                this.data = []
                
                this.loading = false
                //console.log(data.articles)
                data.articles.forEach((item) => {
                        this.data.push(item)
                    })
                this.total = data.articles.length;
                //console.log(data.articles)
                this.ok=true;

            })
            .catch((error) => {
                    this.data = []
                    this.total = 0
                    this.loading = false
                    throw error
                })
            

        },

        /*
         * Load async data

         TODO:
            - ADD LOADING
            - NEWS WITHOUT WITHOUT RANKING (BETTER PERFOMANCE)
            - IMPROVE RANKING SYSTEM
            - CREATE A TOUR FOR LEARNING PURPOSES

        
         BUGS:
            - Double Loading Animation
            
         */

        

        loadAsyncData() {

            console.log(this.wordsGroup.join(', '));
            
            this.loading = true
            
            this.isLoading = true

            axios.post('http://localhost:8081/getNews',{

                "word":"dengue",
                "domains":this.checkboxGroup

            })
            .then(({data}) =>{
                this.data = []
                
                this.loading = false
                data.articles.forEach((item) => {
                        this.data.push(item)
                    })
                this.total = data.articles.length;
                //console.log(data.articles)
                this.ok=true;
                this.isLoading = false

            })
            .catch((error) => {
                    this.data = []
                    this.total = 0
                    this.loading = false
                    throw error
                })
            



        },

        onPageChange(page) {
            this.page = page
            this.loadAsyncData()
        },

        onSort(field, order) {
            this.sortField = field
            this.sortOrder = order
            this.loadAsyncData()
        },
        /*
         * Define um estilo com base a nota - Utilizando as classes padrões de danger, warning e success
         */
        type(value) {
            const number = parseFloat(value)
            if (number < 6) {
                return 'is-danger'
            } else if (number >= 6 && number < 8) {
                return 'is-warning'
            } else if (number >= 8) {
                return 'is-success'
            }
        }
    },
    filters: {
        /**
         * Filter to truncate string, accepts a length parameter
         */
        truncate(value, length) {
            return value.length > length
                ? value.substr(0, length) + '...'
                : value
        }
    },
    mounted() {
        //this.loadAsyncData()
        //console.log(data)
    }
}

const app = new Vue(example)

app.$mount('#app')
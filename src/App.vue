<template>
  <div id="app">
    <nav class="navbar navbar-default">
      <div class="container">
        <div class="navbar-header">
          <a class="navbar-brand" href="/">
            CRUD CouchDB
          </a>
        </div>
        <div class="collapse navbar-collapse">
          <p class="navbar-text navbar-right">
            Banco de Dados II - UFFS - Humberto Piaia
          </p>
        </div>
      </div>
    </nav>

    <div class="container mar-top">
      <create-form @created="addPerson"></create-form>
      <data-table :list="list" @deleted="removePerson"></data-table>
    </div>

    <edit-form @updated="fetchPeople"></edit-form>
  </div>
</template>

<script>
  import CreateForm from './components/CreateForm.vue';
  import DataTable from './components/DataTable.vue';
  import EditForm from './components/EditForm.vue';

  export default {
    name: 'app',

    components: {
      CreateForm,
      DataTable,
      EditForm
    },

    data() {
      return {
        list: [],
      }
    },

    mounted() {
      this.fetchPeople();
    },

    methods: {
      fetchPeople() {
        axios.get('http://127.0.0.1:5984/people/_all_docs?include_docs=true')
          .then(response => {
            this.list = _.map(response.data.rows, item => item.doc);
          });
      },

      addPerson(person) {
        this.list.push(person);
      },

      removePerson(person) {
        this.list = _.reject(this.list, item => item._rev == person._rev);
      },
    }
  }
</script>

<style>
  .mar-top {
    margin-top: 20px;
  }
</style>

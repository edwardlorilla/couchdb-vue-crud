<template>
  <table class="table table-striped table-hover">
    <thead>
      <tr>
        <th>ID</th>
        <th>Nome</th>
        <th>E-mail</th>
        <th>Idade</th>
        <th class="text-center">Ações</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="person in list">
        <td width="300">{{ person._id }}</td>
        <td>{{ person.name }}</td>
        <td>{{ person.email }}</td>
        <td>{{ person.age }}</td>
        <td class="text-center">
          <button class="btn btn-info btn-xs" data-toggle="modal" data-target="#edit-modal" :data-person="person._id">
            Editar
          </button>
          <button class="btn btn-danger btn-xs" @click="deletePerson(person)">
            Apagar
          </button>
        </td>
      </tr>
      <tr v-if="! list.length">
        <td colspan="5" class="text-center">Nenhum registro encontrado</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  export default {
    props: ['list'],

    methods: {
      deletePerson(person) {
        axios.delete('http://127.0.0.1:5984/people/' + person._id, {
          params: { rev: person._rev }
        }).then(response => {
          if (response.data.ok) {
            this.$emit('deleted', person);
          }
        });
      }
    }
  }
</script>

<style>
  table {
    margin-top: 25px;
  }
</style>

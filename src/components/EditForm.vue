<template>
  <div class="modal fade" id="edit-modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <h4 class="modal-title">Editar registro</h4>
        </div>
        <div class="modal-body">
          <form action="">
            <div class="form-group">
              <label>ID</label>
              <input class="form-control" readonly :value="person._id">
            </div>
            <div class="form-group">
              <label>Rev</label>
              <input class="form-control" readonly :value="person._rev">
            </div>
            <div class="form-group">
              <label>Nome</label>
              <input class="form-control" v-model="person.name">
            </div>
            <div class="form-group">
              <label>E-mail</label>
              <input class="form-control" v-model="person.email">
            </div>
            <div class="form-group">
              <label>Idade</label>
              <input class="form-control" v-model="person.age">
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
          <button type="button" class="btn btn-success" @click="submit">Salvar alterações</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        person: {
          _id: '',
          name: '',
          email: '',
          age: ''
        }
      };
    },

    mounted() {
      $('#edit-modal').on('show.bs.modal', event => {
        let person = $(event.relatedTarget).data('person');

        axios.get('http://127.0.0.1:5984/people/' + person)
          .then(response => {
            this.person = response.data;
          });
      });
    },

    methods: {
      submit() {
        axios.put('http://127.0.0.1:5984/people/' + this.person._id, this.person)
          .then(response => {
            this.person._rev = response.data.rev;
            this.$emit('updated', this.person);

            $('#edit-modal').modal('hide');

            swal('Sucesso!', 'Alterações salvas com sucesso!', 'success');
          });
      }
    }
  }
</script>

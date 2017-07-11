<template>
  <form action="" method="post" @submit.prevent="submit">
    <div class="row">
      <div class="col col-md-3">
        <input class="form-control" v-model="person.name" placeholder="Nome">
      </div>
      <div class="col col-md-3">
        <input type="text" class="form-control" v-model="person.email" placeholder="E-mail">
      </div>
      <div class="col col-md-3">
        <input type="number" class="form-control" v-model="person.age" placeholder="Idade">
      </div>
      <div class="col col-md-3">
        <button class="btn btn-success btn-block">
          <i class="fa fa-fw fa-plus"></i>
          Cadastrar
        </button>
      </div>
    </div>
  </form>
</template>

<script>
  export default {
    data() {
      return {
        _id: '',

        person: {
          name: '',
          email: '',
          age: ''
        }
      };
    },

    methods: {
      submit() {
        if (this.person.name && this.person.email && this.person.age) {
          axios.get('http://127.0.0.1:5984/_uuids')
            .then(response => {
              this._id = response.data.uuids[0];
              this.requestCreate();
            });
        }
      },

      requestCreate() {
        axios.put('http://127.0.0.1:5984/people/' + this._id, this.person)
          .then(response => {
            if (response.data.ok) {
              this.$emit('created', Object.assign({
                _id: this._id,
                _rev: response.data.rev,
              }, this.person));

              this.clearForm();

              swal('Sucesso!', 'Pessoa cadastrada com sucesso!', 'success');
            }
          });
      },

      clearForm() {
        this.person = {
          name: '',
          email: '',
          age: ''
        }
      }
    }
  }
</script>

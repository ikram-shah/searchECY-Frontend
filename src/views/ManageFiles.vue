<template>
  <div class="section is-main-section">
    <b-field class="column is-one-third"  label="Data Source">
        <b-select v-model="selectedDataSource" expanded>
            <option v-for="(dataSource, index) in dataSourcesOption" :key="index" :value="dataSource">{{dataSource}}</option>
        </b-select>
    </b-field>
    <card-component v-if="selectedDataSource" class="has-table has-mobile-sort-spaced" title="" icon="alpha-c-circle">
    <modal-box :is-active="isModalActive" :trash-object-name="trashObjectName" @confirm="trashConfirm"
               @cancel="trashCancel"/>
    <div v-for="(fileName, index) in files" :key="index">
    <b-table
      :checked-rows.sync="checkedRows"
      :loading="isLoading"
      :paginated="paginated"
      :per-page="perPage"
      :striped="true"
      :hoverable="true"
      default-sort="name"
      :data="fileName">

      <template slot-scope="props">
        <b-table-column  label="S. No" field="id">
          {{ props.index+1 }}
        </b-table-column>
         <b-table-column label="Documents" field="name">
         <a @click="openAFile(props.row,selectedDataSource)"> {{ props.row }} </a>
         </b-table-column>
        <b-table-column custom-key="actions" class="is-actions-cell">
          <div class="buttons is-right">
            <!-- <router-link :to="{name:'client.edit', params: {id: props.row.id}}" class="button is-small is-primary">
              <b-icon icon="account-edit" size="is-small"/>
            </router-link> -->
            <button disabled class="button is-small is-danger" type="button" @click.prevent="trashModal(props.row)">
              <b-icon icon="trash-can" size="is-small"/>
            </button>
          </div>
        </b-table-column>
      </template>

      <section class="section" slot="empty">
        <div class="content has-text-grey has-text-centered">
          <template v-if="isLoading">
            <p>
              <b-icon icon="dots-horizontal" size="is-large"/>
            </p>
            <p>Fetching data...</p>
          </template>
          <template v-else>
            <p>
              <b-icon icon="emoticon-sad" size="is-large"/>
            </p>
            <p>Nothing's here&hellip;</p>
          </template>
        </div>
      </section>
    </b-table>
    </div>
    </card-component>
  </div>
</template>

<script>
import axios from 'axios'
import ModalBox from '@/components/ModalBox'
import CardComponent from '@/components/CardComponent'

export default {
  name: 'filesTableSample',
  components: { ModalBox, CardComponent },
  props: {
    dataUrl: {
      type: String,
      default: null
    },
    checkable: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      selectedDataSource: '',
      isModalActive: false,
      trashObject: null,
      dataSourcesOption: [],
      files: [],
      isLoading: false,
      paginated: false,
      perPage: 10,
      checkedRows: []
    }
  },
  computed: {
    trashObjectName () {
      if (this.trashObject) {
        return this.trashObject.name
      }

      return null
    }
  },
  mounted () {
    this.getSourceNames()
  },
  watch: {
    selectedDataSource (val) {
      this.getFiles(val)
    }
  },
  methods: {
    openAFile (fileName, selectedDataSource) {
      axios
        .post('https://www.infineon-hack-doc-search.ml/view_file', { 'name': selectedDataSource, 'file_name': fileName })
        .then(r => {
          window.open(r.data.res, '_blank')
        })
        .catch(e => {
          // this.isLoading = false
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: 'is-danger'
          })
        })
    },
    getSourceNames () {
      axios
        .get('https://www.infineon-hack-doc-search.ml/view_connection')
        .then(r => {
        //   this.files.push(r.data.res)
          r.data.res.forEach(element => {
            this.dataSourcesOption.push(element.name)
          })
          console.log(this.dataSourcesOption)
          // this.isLoading = false
          // if (r.data && r.data.data) {
          //   if (r.data.data.length > this.perPage) {
          //     this.paginated = true
          //   }
          //   this.files = r.data.data
          // }
          console.log(r)
        })
        .catch(e => {
          // this.isLoading = false
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: 'is-danger'
          })
        })
    },
    getFiles (dataSourceName) {
      axios
        .post('https://www.infineon-hack-doc-search.ml/view_files', { 'name': dataSourceName })
        .then(r => {
          this.files.push(r.data.res)
          // this.isLoading = false
          // if (r.data && r.data.data) {
          //   if (r.data.data.length > this.perPage) {
          //     this.paginated = true
          //   }
          //   this.files = r.data.data
          // }
          console.log(r)
        })
        .catch(e => {
          // this.isLoading = false
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: 'is-danger'
          })
        })
    },
    trashModal (trashObject) {
      this.trashObject = trashObject
      this.isModalActive = true
    },
    trashConfirm () {
      this.isModalActive = false
      this.$buefy.snackbar.open({
        message: 'Confirmed',
        queue: false
      })
    },
    trashCancel () {
      this.isModalActive = false
    }
  }
}
</script>

<style scoped>
a {
    color: #1464ac
}
</style>

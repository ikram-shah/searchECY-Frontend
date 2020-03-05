<template>
  <div>
    <b-loading :is-full-page="false" :active.sync="isLoading" :can-cancel="true"></b-loading>
    <modal-box :is-active="isModalActive" :trash-object-name="trashObjectName" @confirm="trashConfirm"
               @cancel="trashCancel"/>
    <div v-for="(client, index) in clients" :key="index">
    <b-table
      :checked-rows.sync="checkedRows"
      :loading="isLoading"
      :paginated="paginated"
      :per-page="perPage"
      :striped="true"
      :hoverable="true"
      default-sort="name"
      :data="client">

      <template slot-scope="props">
        <b-table-column  label="S. No" field="id" sortable>
          {{ props.index+1 }}
        </b-table-column>
         <b-table-column  label="Name" field="name" sortable>
          {{ props.row.name }}
        </b-table-column>
         <b-table-column  label="Region" field="region" sortable>
          {{ props.row.region }}
        </b-table-column>
        <b-table-column  label="Source" field="source" sortable>
          <!-- {{ props.row.source }} -->
          AWS S3
        </b-table-column>
        <b-table-column label="Access ID" field="accessID" sortable>
          {{ props.row.acess_key_id }}
        </b-table-column>
        <b-table-column label="Bucket Name" field="bucketName" sortable>
          {{ props.row.bucket }}
        </b-table-column>
        <!-- <b-table-column class="is-progress-col" label="Progress" field="progress" sortable>
          <progress class="progress is-small is-primary" :value="props.row.progress" max="100">{{ props.row.progress }}</progress>
        </b-table-column> -->
        <!-- <b-table-column label="Created">
          <small class="has-text-grey is-abbr-like" :title="props.row.created">{{ props.row.created }}</small>
        </b-table-column> -->
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
  </div>
</template>

<script>
import axios from 'axios'
import ModalBox from '@/components/ModalBox'

export default {
  name: 'ClientsTableSample',
  components: { ModalBox },
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
      isModalActive: false,
      trashObject: null,
      clients: [],
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
    this.getDataSources()
  },
  methods: {
    openLoading () {
      this.isLoading = true
    },
    closeLoading () {
      this.isLoading = false
    },
    getDataSources () {
      this.clients = []
      this.openLoading()
      axios
        .get('https://www.infineon-hack-doc-search.ml/view_connection')
        .then(r => {
          this.closeLoading()
          this.clients.push(r.data.res)
        })
        .catch(e => {
          this.closeLoading()
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

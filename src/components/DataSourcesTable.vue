<template>
  <div>
    <modal-box :is-active="isModalActive" :trash-object-name="trashObjectName" @confirm="trashConfirm"
               @cancel="trashCancel"/>
    <b-table
      :checked-rows.sync="checkedRows"
      :loading="isLoading"
      :paginated="paginated"
      :per-page="perPage"
      :striped="true"
      :hoverable="true"
      default-sort="name"
      :data="clients">

      <template slot-scope="props">
        <b-table-column  label="ID" field="id" sortable>
          {{ props.row.id }}
        </b-table-column>
        <b-table-column  label="Source" field="source" sortable>
          {{ props.row.source }}
        </b-table-column>
        <b-table-column label="Username" field="username" sortable>
          {{ props.row.username }}
        </b-table-column>
        <b-table-column label="Database" field="database" sortable>
          {{ props.row.database }}
        </b-table-column>
         <b-table-column label="Host" field="host" sortable>
          {{ props.row.host }}
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
            <button class="button is-small is-danger" type="button" @click.prevent="trashModal(props.row)">
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
      clients: [
        {
          'id': 1,
          'source': 'mySQL',
          'username': 'IkramShah',
          'database': 'Books',
          'host': '17.165.121.1:8000',
          'created': 'Aug 29, 2018'
        },
        {
          'id': 2,
          'source': 'mySQL',
          'username': 'RamPrasath',
          'database': 'Costs',
          'host': '17.165.121.1:8000',
          'created': 'Jan 12, 2018'
        },
        {
          'id': 3,
          'source': 'mySQL',
          'username': 'applicationAccess1',
          'database': 'Access',
          'host': 'http://ap-south-1.databaseservice.com/1jasdjfsd11231nxancajsnca:3000',
          'created': 'Feb 28, 2020'
        },
        {
          'id': 4,
          'source': 'mySQL',
          'username': 'client7121',
          'database': 'Stocks',
          'host': 'http://bestsyntheticoil.com/petty:8012',
          'created': 'Sept 12, 2018'
        }
      ],
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
    if (this.dataUrl) {
      this.isLoading = true
      axios
        .get(this.dataUrl)
        .then(r => {
          this.isLoading = false
          if (r.data && r.data.data) {
            if (r.data.data.length > this.perPage) {
              this.paginated = true
            }
            this.clients = r.data.data
          }
        })
        .catch(e => {
          this.isLoading = false
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: 'is-danger'
          })
        })
    }
  },
  methods: {
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

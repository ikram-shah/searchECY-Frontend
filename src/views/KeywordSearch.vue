<template>
  <div class="wrapper" horizontal>
    <b-loading :is-full-page="false" :active.sync="isLoading" :can-cancel="true"></b-loading>
    <div class="columns" horizontal>
    <b-field class="column is-one-third">
        <b-select placeholder="Select a Data Source*" v-model="selectedDataSource" expanded>
            <option v-for="(dataSource, index) in dataSourcesOption" :key="index" :value="dataSource">{{dataSource}}</option>
        </b-select>
    </b-field>
      <b-field v-if="selectedDataSource" class="column">
        <b-input
          placeholder="Search Query"
          type="search"
          v-model="textSearch"
          icon="magnify"
        ></b-input>
      </b-field>
      <b-field v-if="selectedDataSource" class="column">
        <b-input placeholder="Search Tags" type="search" v-model="tagSearch" icon="magnify"></b-input>
      </b-field>
    </div>
    <div v-for="(item,index) in searchResult" :key="index" class="control card">
        <card-component :title="item._id" icon="ballot" >
            <div>
            <b-field grouped>
            <div class="control">
                <b-button @click="openFile(item._id, selectedDataSource)" type="is-danger" size="is-small" icon-left="arrow-top-right"> Open </b-button>
            </div>
            <div class="control">
                <b-button @click="addManualTag(item._id, item._index)" type="is-primary" size="is-small" icon-left="plus"> Add Manual Tags </b-button>
            </div>
            </b-field>
            <br>
            <p><strong>SUMMARY</strong> ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <!-- <p class="subtitle">Jeff Atwood</p> -->
            </div>
            <hr>
            <b-field v-if="item._source.tags" class="control">
                <b-taglist>
                    <b-tag @close="deleteManualTag(tag,item._id, item._index)" type="is-warning" closable rounded v-for="(tag, index) in formatTags(item._source.tags)" :key="index">{{tag}}</b-tag>
                </b-taglist>
            <!-- <b-taglist>
                <b-tag closable rounded v-for="index in 6" :key="index" type="is-warning">Tag {{index}}</b-tag>
            </b-taglist> -->
            </b-field>
                <!-- <b-field grouped group-multiline>
                <div class="control">
                    <b-taglist attached>
                        <b-tag type="is-primary">Chennai</b-tag>
                        <b-tag type="is-dark">city</b-tag>
                    </b-taglist>
                </div>
                <div class="control">
                    <b-taglist attached>
                        <b-tag type="is-primary">0.54.2</b-tag>
                        <b-tag type="is-dark">version</b-tag>
                    </b-taglist>
                </div>
                </b-field> -->
                <b-field v-if="item._source.automated_tags">
                    <div class="control">
                        <b-taglist>
                            <b-tag @close="deleteAutomatedTag(automated_tag,item._id, item._index)" closable v-for="(automated_tag, index) in formatTags(item._source.automated_tags)" :key="index" type="is-primary">{{automated_tag}}</b-tag>
                        </b-taglist>
                    </div>
                </b-field>
        </card-component>
    </div>
  </div>
</template>

<script>
import CardComponent from '@/components/CardComponent.vue'
import axios from 'axios'
export default {
  components: { CardComponent },
  mounted () {
    this.getSourceNames()
  },
  data () {
    return {
      isLoading: false,
      dataSourcesOption: [],
      selectedDataSource: null,
      textSearch: '',
      tagSearch: '',
      searchResult: null
    }
  },
  watch: {
    selectedDataSource () {
      this.searchChoiceSelection()
    },
    tagSearch () {
      this.searchChoiceSelection()
    },
    textSearch () {
      this.searchChoiceSelection()
    }
  },
  methods: {
    openLoading () {
      this.isLoading = true
    //   setTimeout(() => {
    //     this.isLoading = false
    //   }, 10 * 1000)
    },
    closeLoading () {
      this.isLoading = false
    },
    deleteManualTag (tag, id, datasource) {
      this.openLoading()
      axios
        .post('https://www.infineon-hack-doc-search.ml/delete_tag', { 'tag': tag, 'conn_name': datasource, 'file': id })
        .then(r => {
          this.closeLoading()
          this.searchChoiceSelection()
          this.$buefy.toast.open({
            message: `Manual tag deleted: ${tag}`,
            type: 'is-success'
          })
        })
        .catch(e => {
          this.closeLoading()
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: 'is-danger'
          })
        })
    },
    deleteAutomatedTag (tag, id, datasource) {
      this.openLoading()
      axios
        .post('https://www.infineon-hack-doc-search.ml/delete_automated_tag', { 'tag': tag, 'conn_name': datasource, 'file': id })
        .then(r => {
          this.closeLoading()
          this.searchChoiceSelection()
          this.$buefy.toast.open({
            message: `Automated tag deleted: ${tag}`,
            type: 'is-success'
          })
        })
        .catch(e => {
          this.closeLoading()
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: 'is-danger'
          })
        })
    },
    addManualTag (id, datasource) {
      this.$buefy.dialog.prompt({
        message: `Add a Manual Tag`,
        inputAttrs: {
          placeholder: 'e.g. Integrated Process'
        //   maxlength: 10
        },
        trapFocus: true,
        onConfirm: (value) => {
          this.openLoading()
          axios
            .post('https://www.infineon-hack-doc-search.ml/add_tag', { 'tag': value, 'conn_name': datasource, 'file': id })
            .then(r => {
              this.closeLoading()
              this.searchChoiceSelection()
              this.$buefy.toast.open({
                message: `Manual tag added: ${value}`,
                type: 'is-success'
              })
            })
            .catch(e => {
              this.closeLoading()
              this.$buefy.toast.open({
                message: `Error: ${e.message}`,
                type: 'is-danger'
              })
            })
        }
      })
    },
    openFile (fileName, selectedDataSource) {
      this.openLoading()
      axios
        .post('https://www.infineon-hack-doc-search.ml/view_file', { 'name': selectedDataSource, 'file_name': fileName })
        .then(r => {
          this.closeLoading()
          window.open(r.data.res, '_blank')
        })
        .catch(e => {
          this.closeLoading()
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: 'is-danger'
          })
        })
    },
    formatTags (tags) {
      let a = tags.split(',')
      return a
    },
    getTagAndTextSearch () {
      this.openLoading()
      axios
        .post('https://www.infineon-hack-doc-search.ml/search_content_and_tag', { 'connection': 'Ikram s3', 'tag': this.tagSearch, 'txt': this.textSearch })
        .then(r => {
          this.closeLoading()
          this.searchResult = r.data.res
        })
        .catch(e => {
          this.closeLoading()
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: 'is-danger'
          })
        })
    },
    getTagSearch () {
      this.openLoading()
      axios
        .post('https://www.infineon-hack-doc-search.ml/search_tag', { 'connection': 'Ikram s3', 'tag': this.tagSearch })
        .then(r => {
          this.closeLoading()
          this.searchResult = r.data.res
        })
        .catch(e => {
          this.closeLoading()
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: 'is-danger'
          })
        })
    },
    gettextSearch () {
      this.openLoading()
      axios
        .post('https://www.infineon-hack-doc-search.ml/search_full_text', { 'connection': 'Ikram s3', 'txt': this.textSearch })
        .then(r => {
          this.closeLoading()
          this.searchResult = r.data.res
        })
        .catch(e => {
          this.closeLoading()
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: 'is-danger'
          })
        })
    },
    searchChoiceSelection () {
      if (this.selectedDataSource !== null && this.textSearch !== '' && this.tagSearch === '') {
        this.gettextSearch()
      } else if (this.selectedDataSource !== null && this.textSearch === '' && this.tagSearch !== '') {
        this.getTagSearch()
      } else if (this.selectedDataSource !== null && this.textSearch !== '' && this.tagSearch !== '') {
        this.getTagAndTextSearch()
      } else {
        console.log('DO NOTHING')
      }
    },
    getSourceNames () {
      this.openLoading()
      axios
        .get('https://www.infineon-hack-doc-search.ml/view_connection')
        .then(r => {
          this.closeLoading()
          r.data.res.forEach(element => {
            this.dataSourcesOption.push(element.name)
          })
        })
        .catch(e => {
          this.closeLoading()
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: 'is-danger'
          })
        })
    }
  }
}
</script>

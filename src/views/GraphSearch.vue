<template>
  <div class="wrapper">
    <b-loading :is-full-page="false" :active.sync="isLoading" :can-cancel="true"></b-loading>
      <div class="columns" horizontal>
        <b-field class="column is-one-third">
        <b-select placeholder="Select Data Source*" v-model="selectedDataSource" expanded>
            <option v-for="(dataSource, index) in dataSourcesOption" :key="index" :value="dataSource">{{dataSource}}</option>
        </b-select>
       </b-field>
        <b-field class="column is-one-third">
            <b-select placeholder="Select Type" v-model="searchType" expanded>
                <option value="document">Document</option>
                <option value="tag">Tag</option>
            </b-select>
        </b-field>
        <b-field v-if="searchType=='document'" class="column">
            <b-autocomplete
                v-model="documentSearchText"
                placeholder="e.g. Anne"
                :keep-first="keepFirst"
                :open-on-focus="openOnFocus"
                @typing="documentSearchOptions"
                :data="filteredDocumentsName"
                @select="option => selectedDocumentName = option">
            </b-autocomplete>
        </b-field>
        <b-field v-if="searchType=='tag'" class="column">
            <b-input placeholder="Search Tags"
                type="search"
                v-model="tagSearch"
                icon="magnify">
            </b-input>
            <!-- <p class="control">
                <button class="button is-primary">Search</button>
            </p> -->
        </b-field>
      </div>
    <network
    class="network"
    ref="network"
    :nodes="network.nodes"
    :edges="network.edges"
    :options="network.options"
    @click="networkEvent('click')"
    @double-click="networkEvent('doubleClick')"
    @oncontext="networkEvent('oncontext')"
    @hold="networkEvent('hold')"
    @release="networkEvent('release')"
    @select="networkEvent('select')"
    @select-node="networkEvent('selectNode')"
    @select-edge="networkEvent('selectEdge')"
    @deselect-node="networkEvent('deselectNode')"
    @deselect-edge="networkEvent('deselectEdge')"
    @drag-start="networkEvent('dragStart')"
    @dragging="networkEvent('dragging')"
    @drag-end="networkEvent('dragEnd')"
    @hover-node="networkEvent('hoverNode')"
    @blur-node="networkEvent('blurNode')"
    @hover-edge="networkEvent('hoverEdge')"
    @blur-edge="networkEvent('blurEdge')"
    @zoom="networkEvent('zoom')"
    @show-popup="networkEvent('showPopup')"
    @hide-popup="networkEvent('hidePopup')"
    @start-stabilizing="networkEvent('startStabilizing')"
    @stabilization-progress="networkEvent('stabilizationProgress')"
    @stabilization-iterations-done="networkEvent('stabilizationIterationsDone')"
    @stabilized="networkEvent('stabilized')"
    @resize="networkEvent('resize')"
    @init-redraw="networkEvent('initRedraw')"
    @before-drawing="networkEvent('beforeDrawing')"
    @after-drawing="networkEvent('afterDrawing')"
    @animation-finished="networkEvent('animationFinished')"
    @config-change="networkEvent('configChange')"
    @nodes-mounted="networkEvent('nodes-mounted')"
    @nodes-add="networkEvent('nodes-add')"
    @nodes-update="networkEvent('nodes-update')"
    @nodes-remove="networkEvent('nodes-remove')"
    @edges-mounted="networkEvent('edges-mounted')"
    @edges-add="networkEvent('edges-add')"
    @edges-update="networkEvent('edges-update')"
    @edges-remove="networkEvent('edges-remove')">
  </network>
  <!-- <button @click="addNode">Add node</button>
  <button @click="addEdge">Add edge</button>
  <button @click="resetNetwork">Reset Network</button>
  <button @click="removeNode">Remove Node</button>
  <button @click="removeEdge">Remove Edge</button> -->
  <!-- <div class="events"><p>Network events: <br /> {{networkEvents}}</p></div> -->
</div>
</template>

<script>
import { Network } from 'vue2vis'
import axios from 'axios'
export default {
  data: () => ({
    filteredDocumentsName: null,
    keepFirst: false,
    openOnFocus: false,
    documentSearch: [],
    documentSearchText: '',
    dataSourcesOption: [],
    selectedDataSource: null,
    selectedDocumentName: null,
    tagSearch: '',
    isLoading: false,
    networkEvents: '',
    searchType: null,
    files: [],
    network: {
      nodes: [
        // {
        //   'id': 1,
        //   'label': 'ChinaWorries.pdf'
        // },
        // {
        //   'id': 2,
        //   'label': "Trump's high approval rating .docx"
        // },
        // {
        //   'id': 3,
        //   'label': 'US India Trade Deal.txt'
        // }
      ],
      edges: [
        // {
        //   'from': 1,
        //   'id': 1,
        //   'label': 'business',
        //   'to': 3
        // },
        // {
        //   'from': 1,
        //   'id': 2,
        //   'label': 'Trump',
        //   'to': 2
        // }
      ],
      options: {
        nodes: {
          shape: 'box'
        },
        edges: {
          length: 100
        }
      }
    }
  }),
  watch: {
    selectedDocumentName (val) {
      this.selectNodes(val)
    },
    tagSearch (val) {
      console.log(val)
    },
    selectedDataSource (val) {
      this.getGraphData()
      this.getFiles(val)
    }
  },
  components: {
    Network
  },
  mounted () {
    this.getSourceNames()
  },
  methods: {
    openLoading () {
      this.isLoading = true
    },
    closeLoading () {
      this.isLoading = false
    },
    documentSearchOptions (val) {
      console.log(val, this.files)
      let fileNames = this.files[0].map(function (v) { return v.toLowerCase() })
      this.filteredDocumentsName = (fileNames.filter(item => item.toString().includes(val.toLowerCase())))
      // this.filteredDocumentsName.push(percents)
      console.log(this.filteredDocumentsName)
    },
    getFiles (dataSourceName) {
      this.files = []
      this.openLoading()
      axios
        .post('https://www.infineon-hack-doc-search.ml/view_files', { 'name': dataSourceName })
        .then(r => {
          this.closeLoading()
          this.files.push(r.data.res)
          this.filteredDocumentsName = this.files[0]
        })
        .catch(e => {
          this.closeLoading()
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: 'is-danger'
          })
        })
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
    },
    getGraphData () {
      this.openLoading()
      axios
        .post('https://www.infineon-hack-doc-search.ml/get_graph', { 'conn_name': this.selectedDataSource.toLowerCase().replace(/\s/g, '') })
        .then(r => {
          this.closeLoading()
          this.network.nodes = r.data.nodes
          this.network.edges = r.data.edges
        })
        .catch(e => {
          this.closeLoading()
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: 'is-danger'
          })
        })
    },
    selectNodes (val) {
      let selectedNode = this.network.nodes.filter(item => item.label.toLowerCase() === val)
      console.log(selectedNode)
      this.$refs.network.redraw()
      this.$refs.network.focus([selectedNode[0].id], this.network.options)
      this.$refs.network.selectNodes([selectedNode[0].id], this.network.options)
    },
    networkEvent (eventName) {
      if (this.networkEvents.length > 500) this.networkEvents = ''
      this.networkEvents += `${eventName}, `
      // console.log(this.$refs.network.getSelection())
      // this.selectNodes()
    },
    addNode () {
      const id = new Date().getTime()
      this.network.nodes.push({ id, label: 'New node' })
    },
    addEdge () {
      const n1 = Math.floor(Math.random() * this.network.nodes.length)
      const n2 = Math.floor(Math.random() * this.network.nodes.length)
      this.network.edges.push({
        id: `${this.network.nodes[n1].id}-${this.network.nodes[n2].id}`,
        from: this.network.nodes[n1].id,
        to: this.network.nodes[n2].id
      })
    },
    // resetNetwork () {
    //   this.network = {
    //     nodes: [
    //       { id: 1, label: 'Document 1' },
    //       { id: 2, label: 'Document 2' },
    //       { id: 3, label: 'Document 3' },
    //       { id: 4, label: 'Document 4' },
    //       { id: 5, label: 'Document 5' }
    //     ],
    //     edges: [
    //       { id: 1, from: 1, to: 3, through: 'Ikram', label: 'Tag 1' },
    //       { id: 6, from: 1, to: 3, through: 'Ikram', label: 'Tag 2' },
    //       { id: 2, from: 1, to: 2, through: 'Ikram' },
    //       { id: 3, from: 2, to: 4 },
    //       { id: 4, from: 2, to: 5 },
    //       { id: 5, from: 3, to: 3 }
    //     ],
    //     options: {}
    //   }
    // },
    removeNode () {
      this.network.nodes.splice(0, 1)
    },
    removeEdge () {
      this.network.edges.splice(0, 1)
    }
  }
}
</script>

<style>
/* * {
  font-family: sans-serif;
} */
.wrapper {
  padding: 20px 50px;
  text-align: center;
}
.events {
  text-align: left;
  height: 70px;
}
.network {
  height: 500px;
  border: 1px dotted #ccc;
  background-color: aliceblue
  /* margin: 5px 0; */
}
</style>

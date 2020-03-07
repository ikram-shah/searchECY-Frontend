<template>
  <div class="wrapper">
    <b-loading :is-full-page="false" :active.sync="isLoading" :can-cancel="true"></b-loading>
      <div class="columns" horizontal>
        <b-field class="column is-one-third">
        <b-select placeholder="Select Data Source*" v-model="selectedDataSource" expanded>
            <option v-for="(dataSource, index) in dataSourcesOption" :key="index" :value="dataSource">{{dataSource}}</option>
        </b-select>
       </b-field>
        <b-field v-if="selectedDataSource" class="column is-one-third">
            <b-select placeholder="Select Type*" v-model="searchType" expanded>
                <option value="tag">Tag</option>
                <option value="document">Document</option>
            </b-select>
        </b-field>
        <b-field v-if="searchType=='document'" class="column">
            <b-autocomplete
                v-model="documentSearchText"
                placeholder="e.g. Filename.pdf"
                :keep-first="keepFirst"
                :open-on-focus="openOnFocus"
                @typing="documentSearchOptions"
                :data="filteredDocumentsName"
                @select="option => selectedDocumentName = option">
            </b-autocomplete>
        </b-field>
        <b-field v-if="searchType=='tag'" class="column">
            <b-autocomplete
                v-model="tagSearchText"
                placeholder="e.g. Survey"
                :keep-first="keepFirst"
                :open-on-focus="openOnFocus"
                @typing="tagSearchOptions"
                :data="filteredTagName"
                @select="option => selectedTagName = option">
            </b-autocomplete>
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
    filteredTagName: null,
    filteredDocumentsName: null,
    tagSearchText: '',
    selectedTagName: null,
    keepFirst: false,
    openOnFocus: false,
    documentSearch: [],
    allTags: [],
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
          length: 200
        }
        // physics: {
        //   forceAtlas2Based: {
        //     gravitationalConstant: -26,
        //     centralGravity: 0.005,
        //     springLength: 230,
        //     springConstant: 0.18
        //   },
        //   maxVelocity: 146,
        //   solver: 'forceAtlas2Based',
        //   timestep: 0.35,
        //   stabilization: { iterations: 150 }
        // }
      }
    }
  }),
  watch: {
    selectedDocumentName (val) {
      this.selectNodes(val)
    },
    selectedTagName (val) {
      this.selectNodes(val)
    },
    selectedDataSource (val) {
      this.getFiles(val)
      this.getTagNames()
    },
    searchType (val) {
      if (val === 'document') {
        this.getGraphData('doc')
      } else if (val === 'tag') {
        this.getGraphData('tag')
      }
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
    tagSearchOptions (val) {
      console.log(val, this.allTags)
      let tagNames = this.allTags.map(function (v) { return v.toLowerCase() })
      this.filteredTagName = (tagNames.filter(item => item.toString().includes(val.toLowerCase())))
      console.log(this.filteredTagName)
    },
    documentSearchOptions (val) {
      console.log(val, this.files)
      let fileNames = this.files[0].map(function (v) { return v.toLowerCase() })
      this.filteredDocumentsName = (fileNames.filter(item => item.toString().includes(val.toLowerCase())))
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
    getTagNames () {
      this.openLoading()
      axios
        .post('https://www.infineon-hack-doc-search.ml/fetch_tags', { 'name': this.selectedDataSource })
        .then(r => {
          this.closeLoading()
          this.allTags = r.data.res
          this.filteredTagName = r.data.res
        })
        .catch(e => {
          this.closeLoading()
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: 'is-danger'
          })
        })
    },
    getGraphData (val) {
      this.openLoading()
      axios
        .post('https://www.infineon-hack-doc-search.ml/get_graph', { 'conn_name': this.selectedDataSource.toLowerCase().replace(/\s/g, ''), 'type': val })
        .then(r => {
          this.closeLoading()
          this.network.nodes = r.data.nodes
          this.network.edges = r.data.edges
          // this.network.edges.forEach(element => {
          //   element.length = 200
          // })
          console.log(this.network.edges)
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
      // this.neighbourhoodHighlight(selectedNode)
      this.$refs.network.redraw()
      this.$refs.network.focus([selectedNode[0].id], this.network.options)
      this.$refs.network.selectNodes([selectedNode[0].id], this.network.options)
      console.log(this.$refs.network.getConnectedEdges([selectedNode[0].id]))
    },
    // neighbourhoodHighlight (params) {
    //   console.log(params)
    //   let highlightActive = false
    //   // if something is selected:
    //   if (params.nodes.length > 0) {
    //     highlightActive = true
    //     var i, j
    //     var selectedNode = params.nodes[0]
    //     var degrees = 2

    //     // mark all nodes as hard to read.
    //     for (var nodeId in this.network.nodes) {
    //       this.network.nodes[nodeId].color = 'rgba(200,200,200,0.5)'
    //       if (this.network.nodes[nodeId].hiddenLabel === undefined) {
    //         this.network.nodes[nodeId].hiddenLabel = this.network.nodes[nodeId].label
    //         this.network.nodes[nodeId].label = undefined
    //       }
    //     }
    //     var connectedNodes = this.network.getConnectedNodes(selectedNode)
    //     var allConnectedNodes = []

    //     // get the second degree nodes
    //     for (i = 1; i < degrees; i++) {
    //       for (j = 0; j < connectedNodes.length; j++) {
    //         allConnectedNodes = allConnectedNodes.concat(this.network.getConnectedNodes(connectedNodes[j]))
    //       }
    //     }

    //     // all second degree nodes get a different color and their label back
    //     for (i = 0; i < allConnectedNodes.length; i++) {
    //       this.network.nodes[allConnectedNodes[i]].color = 'rgba(150,150,150,0.75)'
    //       if (this.network.nodes[allConnectedNodes[i]].hiddenLabel !== undefined) {
    //         this.network.nodes[allConnectedNodes[i]].label = this.network.nodes[allConnectedNodes[i]].hiddenLabel
    //         this.network.nodes[allConnectedNodes[i]].hiddenLabel = undefined
    //       }
    //     }

    //     // all first degree nodes get their own color and their label back
    //     for (i = 0; i < connectedNodes.length; i++) {
    //       this.network.nodes[connectedNodes[i]].color = undefined
    //       if (this.network.nodes[connectedNodes[i]].hiddenLabel !== undefined) {
    //         this.network.nodes[connectedNodes[i]].label = this.network.nodes[connectedNodes[i]].hiddenLabel
    //         this.network.nodes[connectedNodes[i]].hiddenLabel = undefined
    //       }
    //     }

    //     // the main node gets its own color and its label back.
    //     this.network.nodes[selectedNode].color = undefined
    //     if (this.network.nodes[selectedNode].hiddenLabel !== undefined) {
    //       this.network.nodes[selectedNode].label = this.network.nodes[selectedNode].hiddenLabel
    //       this.network.nodes[selectedNode].hiddenLabel = undefined
    //     }
    //   } else if (highlightActive === true) {
    //   // reset all nodes
    //     for (nodeId in this.network.nodes) {
    //       this.network.nodes[nodeId].color = undefined
    //       if (this.network.nodes[nodeId].hiddenLabel !== undefined) {
    //         this.network.nodes[nodeId].label = this.network.nodes[nodeId].hiddenLabel
    //         this.network.nodes[nodeId].hiddenLabel = undefined
    //       }
    //     }
    //     highlightActive = false
    //   }

    //   // transform the object into an array
    //   var updateArray = []
    //   for (nodeId in this.network.nodes) {
    //     if (this.network.nodes.hasOwnProperty(nodeId)) {
    //       updateArray.push(this.network.nodes[nodeId])
    //     }
    //   }
    //   this.network.nodes.update(updateArray)
    // },
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

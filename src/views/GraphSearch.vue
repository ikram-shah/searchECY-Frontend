<template>
  <div class="wrapper">
      <div class="columns" horizontal>
       <b-field class="column" >
            <b-input placeholder="Search Documents"
                type="search"
                v-model="documentSearch"
                icon="magnify">
            </b-input>
            <!-- <p class="control">
                <button class="button is-primary">Search</button>
            </p> -->
        </b-field>
        <b-field class="column">
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
    documentSearch: '',
    tagSearch: '',
    networkEvents: '',
    network: {
      nodes: [
        {
          'id': 1,
          'label': 'ChinaWorries.pdf'
        },
        {
          'id': 2,
          'label': "Trump's high approval rating .docx"
        },
        {
          'id': 3,
          'label': 'US India Trade Deal.txt'
        }
      ],
      edges: [
        {
          'from': 1,
          'id': 1,
          'label': 'business',
          'to': 3
        },
        {
          'from': 1,
          'id': 2,
          'label': 'Trump',
          'to': 2
        }
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
    documentSearch (val) {
      console.log(val)
    },
    tagSearch (val) {
      console.log(val)
    }
  },
  components: {
    Network
  },
  mounted () {
    this.getGraphData()
  },
  methods: {
    getGraphData () {
      axios
        .post('https://www.infineon-hack-doc-search.ml/get_graph')
        .then(r => {
          // this.isLoading = false
          console.log(this.network)
        })
        .catch(e => {
          // this.isLoading = false
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: 'is-danger'
          })
        })
    },
    selectNodes () {
      // this.$refs.network.selectNodes([1])
    },
    networkEvent (eventName) {
      if (this.networkEvents.length > 500) this.networkEvents = ''
      this.networkEvents += `${eventName}, `
      console.log(this.$refs.network.getSelection())
      this.selectNodes()
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
  /* border: 1px solid #ccc; */
  /* margin: 5px 0; */
}
</style>

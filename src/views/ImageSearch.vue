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
export default {
  data: () => ({
    documentSearch: '',
    tagSearch: '',
    networkEvents: '',
    network: {
      nodes: [
        { id: 1, shape: 'image', image: 'https://lh4.googleusercontent.com/proxy/iFHmUVS80OFpN39pg4jh_QMggqC2uM1n1qxalffXMbKTifWYeVVe1KBAPih6U-gpINt9ZVWw3eaGL5Eqi7MO-yzjwbbQ5_gVmof2WNtKDCsvJYa8Zb68FVhNcGhZ7js2Fp_T-w' },
        { id: 2, shape: 'image', image: 'https://lh4.googleusercontent.com/proxy/iFHmUVS80OFpN39pg4jh_QMggqC2uM1n1qxalffXMbKTifWYeVVe1KBAPih6U-gpINt9ZVWw3eaGL5Eqi7MO-yzjwbbQ5_gVmof2WNtKDCsvJYa8Zb68FVhNcGhZ7js2Fp_T-w' },
        { id: 3, shape: 'image', image: 'https://lh4.googleusercontent.com/proxy/iFHmUVS80OFpN39pg4jh_QMggqC2uM1n1qxalffXMbKTifWYeVVe1KBAPih6U-gpINt9ZVWw3eaGL5Eqi7MO-yzjwbbQ5_gVmof2WNtKDCsvJYa8Zb68FVhNcGhZ7js2Fp_T-w' },
        { id: 4, shape: 'image', image: 'https://lh4.googleusercontent.com/proxy/iFHmUVS80OFpN39pg4jh_QMggqC2uM1n1qxalffXMbKTifWYeVVe1KBAPih6U-gpINt9ZVWw3eaGL5Eqi7MO-yzjwbbQ5_gVmof2WNtKDCsvJYa8Zb68FVhNcGhZ7js2Fp_T-w', label: 'pictures by this guy!' },
        { id: 5, shape: 'image', image: 'https://lh4.googleusercontent.com/proxy/iFHmUVS80OFpN39pg4jh_QMggqC2uM1n1qxalffXMbKTifWYeVVe1KBAPih6U-gpINt9ZVWw3eaGL5Eqi7MO-yzjwbbQ5_gVmof2WNtKDCsvJYa8Zb68FVhNcGhZ7js2Fp_T-w' },
        { id: 6, shape: 'image', image: 'https://lh4.googleusercontent.com/proxy/iFHmUVS80OFpN39pg4jh_QMggqC2uM1n1qxalffXMbKTifWYeVVe1KBAPih6U-gpINt9ZVWw3eaGL5Eqi7MO-yzjwbbQ5_gVmof2WNtKDCsvJYa8Zb68FVhNcGhZ7js2Fp_T-w' },
        { id: 7, shape: 'image', image: 'https://lh4.googleusercontent.com/proxy/iFHmUVS80OFpN39pg4jh_QMggqC2uM1n1qxalffXMbKTifWYeVVe1KBAPih6U-gpINt9ZVWw3eaGL5Eqi7MO-yzjwbbQ5_gVmof2WNtKDCsvJYa8Zb68FVhNcGhZ7js2Fp_T-w' },
        { id: 8, shape: 'image', image: 'https://lh4.googleusercontent.com/proxy/iFHmUVS80OFpN39pg4jh_QMggqC2uM1n1qxalffXMbKTifWYeVVe1KBAPih6U-gpINt9ZVWw3eaGL5Eqi7MO-yzjwbbQ5_gVmof2WNtKDCsvJYa8Zb68FVhNcGhZ7js2Fp_T-w' },
        { id: 9, shape: 'image', image: 'https://lh4.googleusercontent.com/proxy/iFHmUVS80OFpN39pg4jh_QMggqC2uM1n1qxalffXMbKTifWYeVVe1KBAPih6U-gpINt9ZVWw3eaGL5Eqi7MO-yzjwbbQ5_gVmof2WNtKDCsvJYa8Zb68FVhNcGhZ7js2Fp_T-w' },
        { id: 10, shape: 'image', image: 'https://lh4.googleusercontent.com/proxy/iFHmUVS80OFpN39pg4jh_QMggqC2uM1n1qxalffXMbKTifWYeVVe1KBAPih6U-gpINt9ZVWw3eaGL5Eqi7MO-yzjwbbQ5_gVmof2WNtKDCsvJYa8Zb68FVhNcGhZ7js2Fp_T-w' },
        { id: 11, shape: 'image', image: 'https://lh4.googleusercontent.com/proxy/iFHmUVS80OFpN39pg4jh_QMggqC2uM1n1qxalffXMbKTifWYeVVe1KBAPih6U-gpINt9ZVWw3eaGL5Eqi7MO-yzjwbbQ5_gVmof2WNtKDCsvJYa8Zb68FVhNcGhZ7js2Fp_T-w' },
        { id: 12, shape: 'image', image: 'https://lh4.googleusercontent.com/proxy/iFHmUVS80OFpN39pg4jh_QMggqC2uM1n1qxalffXMbKTifWYeVVe1KBAPih6U-gpINt9ZVWw3eaGL5Eqi7MO-yzjwbbQ5_gVmof2WNtKDCsvJYa8Zb68FVhNcGhZ7js2Fp_T-w' },
        { id: 13, shape: 'image', image: 'https://lh4.googleusercontent.com/proxy/iFHmUVS80OFpN39pg4jh_QMggqC2uM1n1qxalffXMbKTifWYeVVe1KBAPih6U-gpINt9ZVWw3eaGL5Eqi7MO-yzjwbbQ5_gVmof2WNtKDCsvJYa8Zb68FVhNcGhZ7js2Fp_T-w' },
        { id: 14, shape: 'image', image: 'https://lh4.googleusercontent.com/proxy/iFHmUVS80OFpN39pg4jh_QMggqC2uM1n1qxalffXMbKTifWYeVVe1KBAPih6U-gpINt9ZVWw3eaGL5Eqi7MO-yzjwbbQ5_gVmof2WNtKDCsvJYa8Zb68FVhNcGhZ7js2Fp_T-w' },
        { id: 15, shape: 'image', image: 'https://lh4.googleusercontent.com/proxy/iFHmUVS80OFpN39pg4jh_QMggqC2uM1n1qxalffXMbKTifWYeVVe1KBAPih6U-gpINt9ZVWw3eaGL5Eqi7MO-yzjwbbQ5_gVmof2WNtKDCsvJYa8Zb68FVhNcGhZ7js2Fp_T-w', brokenImage: 'https://lh4.googleusercontent.com/proxy/iFHmUVS80OFpN39pg4jh_QMggqC2uM1n1qxalffXMbKTifWYeVVe1KBAPih6U-gpINt9ZVWw3eaGL5Eqi7MO-yzjwbbQ5_gVmof2WNtKDCsvJYa8Zb68FVhNcGhZ7js2Fp_T-w' + '1.png', label: 'when images\nfail\nto load' },
        { id: 16, shape: 'image', image: 'https://lh4.googleusercontent.com/proxy/iFHmUVS80OFpN39pg4jh_QMggqC2uM1n1qxalffXMbKTifWYeVVe1KBAPih6U-gpINt9ZVWw3eaGL5Eqi7MO-yzjwbbQ5_gVmof2WNtKDCsvJYa8Zb68FVhNcGhZ7js2Fp_T-w', brokenImage: 'https://lh4.googleusercontent.com/proxy/iFHmUVS80OFpN39pg4jh_QMggqC2uM1n1qxalffXMbKTifWYeVVe1KBAPih6U-gpINt9ZVWw3eaGL5Eqi7MO-yzjwbbQ5_gVmof2WNtKDCsvJYa8Zb68FVhNcGhZ7js2Fp_T-w' + '9.png', label: 'fallback image in action' }
      ],
      edges: [
        { from: 1, to: 2 },
        { from: 2, to: 3 },
        { from: 2, to: 4 },
        { from: 4, to: 5 },
        { from: 4, to: 10 },
        { from: 4, to: 6 },
        { from: 6, to: 7 },
        { from: 7, to: 8 },
        { from: 8, to: 9 },
        { from: 8, to: 10 },
        { from: 10, to: 11 },
        { from: 11, to: 12 },
        { from: 12, to: 13 },
        { from: 13, to: 14 },
        { from: 9, to: 16 }
      ],
      options: {
        nodes: {
          borderWidth: 4,
          size: 30,
          color: {
            border: '#406897',
            background: '#6AAFFF'
          },
          font: { color: '#eeeeee' },
          shapeProperties: {
            useBorderWithImage: true
          }
        },
        edges: {
          color: 'lightgray'
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
  methods: {
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
    resetNetwork () {
      this.network = {
        nodes: [
          { id: 1, shape: 'image', image: 'https://lh4.googleusercontent.com/proxy/iFHmUVS80OFpN39pg4jh_QMggqC2uM1n1qxalffXMbKTifWYeVVe1KBAPih6U-gpINt9ZVWw3eaGL5Eqi7MO-yzjwbbQ5_gVmof2WNtKDCsvJYa8Zb68FVhNcGhZ7js2Fp_T-w' + '1.png' },
          { id: 2, shape: 'image', image: 'https://lh4.googleusercontent.com/proxy/iFHmUVS80OFpN39pg4jh_QMggqC2uM1n1qxalffXMbKTifWYeVVe1KBAPih6U-gpINt9ZVWw3eaGL5Eqi7MO-yzjwbbQ5_gVmof2WNtKDCsvJYa8Zb68FVhNcGhZ7js2Fp_T-w' + '2.png' },
          { id: 3, shape: 'image', image: 'https://lh4.googleusercontent.com/proxy/iFHmUVS80OFpN39pg4jh_QMggqC2uM1n1qxalffXMbKTifWYeVVe1KBAPih6U-gpINt9ZVWw3eaGL5Eqi7MO-yzjwbbQ5_gVmof2WNtKDCsvJYa8Zb68FVhNcGhZ7js2Fp_T-w' + '3.png' },
          { id: 4, shape: 'image', image: 'https://lh4.googleusercontent.com/proxy/iFHmUVS80OFpN39pg4jh_QMggqC2uM1n1qxalffXMbKTifWYeVVe1KBAPih6U-gpINt9ZVWw3eaGL5Eqi7MO-yzjwbbQ5_gVmof2WNtKDCsvJYa8Zb68FVhNcGhZ7js2Fp_T-w' + '4.png', label: 'pictures by this guy!' },
          { id: 5, shape: 'image', image: 'https://lh4.googleusercontent.com/proxy/iFHmUVS80OFpN39pg4jh_QMggqC2uM1n1qxalffXMbKTifWYeVVe1KBAPih6U-gpINt9ZVWw3eaGL5Eqi7MO-yzjwbbQ5_gVmof2WNtKDCsvJYa8Zb68FVhNcGhZ7js2Fp_T-w' + '5.png' },
          { id: 6, shape: 'image', image: 'https://lh4.googleusercontent.com/proxy/iFHmUVS80OFpN39pg4jh_QMggqC2uM1n1qxalffXMbKTifWYeVVe1KBAPih6U-gpINt9ZVWw3eaGL5Eqi7MO-yzjwbbQ5_gVmof2WNtKDCsvJYa8Zb68FVhNcGhZ7js2Fp_T-w' + '6.png' },
          { id: 7, shape: 'image', image: 'https://lh4.googleusercontent.com/proxy/iFHmUVS80OFpN39pg4jh_QMggqC2uM1n1qxalffXMbKTifWYeVVe1KBAPih6U-gpINt9ZVWw3eaGL5Eqi7MO-yzjwbbQ5_gVmof2WNtKDCsvJYa8Zb68FVhNcGhZ7js2Fp_T-w' + '7.png' },
          { id: 8, shape: 'image', image: 'https://lh4.googleusercontent.com/proxy/iFHmUVS80OFpN39pg4jh_QMggqC2uM1n1qxalffXMbKTifWYeVVe1KBAPih6U-gpINt9ZVWw3eaGL5Eqi7MO-yzjwbbQ5_gVmof2WNtKDCsvJYa8Zb68FVhNcGhZ7js2Fp_T-w' + '8.png' },
          { id: 9, shape: 'image', image: 'https://lh4.googleusercontent.com/proxy/iFHmUVS80OFpN39pg4jh_QMggqC2uM1n1qxalffXMbKTifWYeVVe1KBAPih6U-gpINt9ZVWw3eaGL5Eqi7MO-yzjwbbQ5_gVmof2WNtKDCsvJYa8Zb68FVhNcGhZ7js2Fp_T-w' + '9.png' },
          { id: 10, shape: 'image', image: 'https://lh4.googleusercontent.com/proxy/iFHmUVS80OFpN39pg4jh_QMggqC2uM1n1qxalffXMbKTifWYeVVe1KBAPih6U-gpINt9ZVWw3eaGL5Eqi7MO-yzjwbbQ5_gVmof2WNtKDCsvJYa8Zb68FVhNcGhZ7js2Fp_T-w' + '10.png' },
          { id: 11, shape: 'image', image: 'https://lh4.googleusercontent.com/proxy/iFHmUVS80OFpN39pg4jh_QMggqC2uM1n1qxalffXMbKTifWYeVVe1KBAPih6U-gpINt9ZVWw3eaGL5Eqi7MO-yzjwbbQ5_gVmof2WNtKDCsvJYa8Zb68FVhNcGhZ7js2Fp_T-w' + '11.png' },
          { id: 12, shape: 'image', image: 'https://lh4.googleusercontent.com/proxy/iFHmUVS80OFpN39pg4jh_QMggqC2uM1n1qxalffXMbKTifWYeVVe1KBAPih6U-gpINt9ZVWw3eaGL5Eqi7MO-yzjwbbQ5_gVmof2WNtKDCsvJYa8Zb68FVhNcGhZ7js2Fp_T-w' + '12.png' },
          { id: 13, shape: 'image', image: 'https://lh4.googleusercontent.com/proxy/iFHmUVS80OFpN39pg4jh_QMggqC2uM1n1qxalffXMbKTifWYeVVe1KBAPih6U-gpINt9ZVWw3eaGL5Eqi7MO-yzjwbbQ5_gVmof2WNtKDCsvJYa8Zb68FVhNcGhZ7js2Fp_T-w' + '13.png' },
          { id: 14, shape: 'image', image: 'https://lh4.googleusercontent.com/proxy/iFHmUVS80OFpN39pg4jh_QMggqC2uM1n1qxalffXMbKTifWYeVVe1KBAPih6U-gpINt9ZVWw3eaGL5Eqi7MO-yzjwbbQ5_gVmof2WNtKDCsvJYa8Zb68FVhNcGhZ7js2Fp_T-w' + '14.png' },
          { id: 15, shape: 'image', image: 'https://lh4.googleusercontent.com/proxy/iFHmUVS80OFpN39pg4jh_QMggqC2uM1n1qxalffXMbKTifWYeVVe1KBAPih6U-gpINt9ZVWw3eaGL5Eqi7MO-yzjwbbQ5_gVmof2WNtKDCsvJYa8Zb68FVhNcGhZ7js2Fp_T-w' + '1.png', brokenImage: 'https://lh4.googleusercontent.com/proxy/iFHmUVS80OFpN39pg4jh_QMggqC2uM1n1qxalffXMbKTifWYeVVe1KBAPih6U-gpINt9ZVWw3eaGL5Eqi7MO-yzjwbbQ5_gVmof2WNtKDCsvJYa8Zb68FVhNcGhZ7js2Fp_T-w' + '1.png', label: 'when images\nfail\nto load' },
          { id: 16, shape: 'image', image: 'https://lh4.googleusercontent.com/proxy/iFHmUVS80OFpN39pg4jh_QMggqC2uM1n1qxalffXMbKTifWYeVVe1KBAPih6U-gpINt9ZVWw3eaGL5Eqi7MO-yzjwbbQ5_gVmof2WNtKDCsvJYa8Zb68FVhNcGhZ7js2Fp_T-w' + '2.png', brokenImage: 'https://lh4.googleusercontent.com/proxy/iFHmUVS80OFpN39pg4jh_QMggqC2uM1n1qxalffXMbKTifWYeVVe1KBAPih6U-gpINt9ZVWw3eaGL5Eqi7MO-yzjwbbQ5_gVmof2WNtKDCsvJYa8Zb68FVhNcGhZ7js2Fp_T-w' + '9.png', label: 'fallback image in action' }
        ],
        edges: [
          { from: 1, to: 2 },
          { from: 2, to: 3 },
          { from: 2, to: 4 },
          { from: 4, to: 5 },
          { from: 4, to: 10 },
          { from: 4, to: 6 },
          { from: 6, to: 7 },
          { from: 7, to: 8 },
          { from: 8, to: 9 },
          { from: 8, to: 10 },
          { from: 10, to: 11 },
          { from: 11, to: 12 },
          { from: 12, to: 13 },
          { from: 13, to: 14 },
          { from: 9, to: 16 }
        ],
        options: {}
      }
    },
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

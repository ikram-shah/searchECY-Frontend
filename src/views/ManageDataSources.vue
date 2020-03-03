<template>
  <div>
    <section class="section is-main-section">
      <card-component class="has-table has-mobile-sort-spaced" title="Manage Data Sources" icon="alpha-c-circle">
        <data-sources-table :checkable="true"/>
      </card-component>
    </section>
  </div>

</template>

<script>
import DataSourcesTable from '@/components/DataSourcesTable'
import CardComponent from '@/components/CardComponent'
export default {
  name: 'Tables',
  components: { CardComponent, DataSourcesTable },
  computed: {
    titleStack () {
      return [
        'Admin',
        'Tables'
      ]
    }
  }
}
</script>

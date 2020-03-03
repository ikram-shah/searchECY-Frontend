<template>
  <div class="wrapper" horizontal>
    <div class="columns" horizontal>
      <b-field class="column">
        <b-input
          placeholder="Search Documents"
          type="search"
          v-model="documentSearch"
          icon="magnify"
        ></b-input>
      </b-field>
      <b-field class="column">
        <b-input placeholder="Search Tags" type="search" v-model="tagSearch" icon="magnify"></b-input>
      </b-field>
    </div>
    <div v-for="index in 10" :key="index" class="control card">
        <card-component title="TITLE/FILE NAME" icon="ballot" >
            <div>
            <div class="control">
                <b-button type="is-primary" size="is-small" icon-left="plus"> Add Manual Tags </b-button>
            </div>
            <br>
            <p><strong>SUMMARY</strong> ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <!-- <p class="subtitle">Jeff Atwood</p> -->
            </div>
            <hr>
            <b-field class="control">
            <b-taglist>
                <b-tag closable rounded v-for="index in 6" :key="index" type="is-warning">Tag {{index}}</b-tag>
            </b-taglist>
            </b-field>
                <b-field grouped group-multiline>
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
                </b-field>
                <b-field>
                    <div class="control">
                        <b-taglist>
                            <b-tag v-for="index in 6" :key="index" type="is-primary">Tag {{index}}</b-tag>
                        </b-taglist>
                    </div>
                </b-field>
        </card-component>
    </div>
  </div>
</template>

<script>
import CardComponent from '@/components/CardComponent.vue'
export default {
  components: { CardComponent }
}
</script>

<template>
  <div>
    <!-- <hero-bar>
      Add Data Source
    </hero-bar> -->
    <section class="section is-main-section">
      <tiles>
        <!-- <profile-update-form class="tile is-child"/> -->
        <card-component title="Add Data Source" icon="file" class="tile is-child">
          <div class="columns">
          <b-field class="column"  label="Source">
            <b-select expanded>
              <option value="flint">mySQL</option>
              <option disabled value="silver">AWS S3</option>
            </b-select>
          </b-field>
          <b-field class="column"  label="Username">
            <b-input name="name" required/>
          </b-field>
          <b-field  class="column"  label="Password">
            <b-input name="password" type="password" required autocomplete="new-password"/>
          </b-field>
          </div>
          <div class="columns">
           <b-field class="column is-one-third"  label="Database">
            <b-input name="database" required/>
          </b-field>
           <b-field class="column" label="Host">
            <b-input name="host" required/>
          </b-field>
          </div>
          <b-field>
            <b-field grouped>
              <div class="control">
                <b-button native-type="submit" type="is-primary">Submit</b-button>
              </div>
              <div class="control">
                <b-button type="is-primary is-outlined" @click="reset">Reset</b-button>
              </div>
            </b-field>
          </b-field>
        </card-component>
      </tiles>
      <!-- <password-update-form/> -->
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CardComponent from '@/components/CardComponent'
// import HeroBar from '@/components/HeroBar'
import Tiles from '@/components/Tiles'
export default {
  name: 'Profile',
  components: { Tiles, CardComponent },
  data () {
    return {
      isPublic: true
    }
  },
  computed: {
    titleStack () {
      return [
        'Admin',
        'Profile'
      ]
    },
    ...mapState([
      'userName',
      'userEmail'
    ])
  }
}
</script>

<style scoped>
print.field-label{
  flex-grow: 0
}
</style>

<template>
  <div>
    <section class="section is-main-section">
      <tiles>
        <card-component title="Add Data Source" icon="file" class="tile is-child">
          <div class="columns">
          <b-field class="column is-one-third"  label="Source">
            <b-select v-model="source" expanded>
              <option value="s3">AWS S3</option>
              <option disabled value="mySQL">mySQL</option>
            </b-select>
          </b-field>
          </div>
          <div v-if="source==='mySQL'" :key="source" >
            <div class="columns">
          <b-field class="column"  label="Username">
            <b-input name="name" required/>
          </b-field>
          <b-field  class="column"  label="Password">
            <b-input name="password" type="password"/>
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
          </div>
          <div v-if="source==='s3'" :key="source">
          <div class="columns">
          <b-field class="column"  label="Access ID">
            <b-input v-model="s3Form.s3AccessID" name="accessID"/>
          </b-field>
          <b-field  class="column"  label="Secret Key">
            <b-input v-model="s3Form.s3SecretKey" name="secretKey" type="password"/>
          </b-field>
          </div>
            <div class="columns">
          <b-field class="column"  label="Connection Name">
            <b-input v-model="s3Form.s3ConnectionName" name="connectionName"/>
          </b-field>
          <b-field class="column"  label="AWS Region">
            <b-select v-model="s3Form.s3AwsRegion" expanded>
              <option v-for="(item,index) in awsRegions" :key="index" :value="item.code">{{item.code}} ({{item.name}})</option>
            </b-select>
          </b-field>
          <b-field  class="column"  label="S3 Bucket Name">
            <b-input v-model="s3Form.s3BucketName" name="bucketName"/>
          </b-field>
          </div>
          </div>
          <br>
          <b-field>
            <b-field grouped>
              <div class="control">
                <b-button native-type="submit" type="is-primary" @click="submit">Submit</b-button>
              </div>
              <div class="control">
                <b-button type="is-primary is-outlined" @click="reset">Reset</b-button>
              </div>
            </b-field>
          </b-field>
        </card-component>
      </tiles>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CardComponent from '@/components/CardComponent'
import AWSRegions from '@/assets/aws-regions.json'
import Tiles from '@/components/Tiles'
import axios from 'axios'
export default {
  name: 'Profile',
  components: { Tiles, CardComponent },
  data () {
    return {
      isPublic: true,
      source: null,
      sqlForm: {
        sqlUsername: null,
        sqlPassword: null,
        sqlDatabase: null,
        sqlHost: null
      },
      s3Form: {
        s3AccessID: null,
        s3SecretKey: null,
        s3ConnectionName: null,
        s3AwsRegion: null,
        s3BucketName: null
      },
      awsRegions: AWSRegions
    }
  },
  watch: {
    s3Form () {
      console.log(this.s3form.source)
    }
  },
  methods: {
    reset () {
      console.log('RESET')
    },
    submit () {
      let here = this
      axios.post('http://localhost/add_connection', {
        'access_key_id': this.s3Form.s3AccessID,
        'access_key': this.s3Form.s3SecretKey,
        'bucket': this.s3Form.s3BucketName,
        'region': this.s3Form.s3AwsRegion,
        'connection_type': this.source,
        'name': this.s3Form.s3ConnectionName
      })
        .then(function (response) {
          here.$buefy.snackbar.open({
            type: 'is-success',
            message: 'Added Successfully',
            queue: false
          })
          console.log(response)
          // here.$router.push('/view-posts')
        })
        .catch(function (error) {
          here.$buefy.snackbar.open({
            type: 'is-danger',
            message: 'Failed. Please Retry..',
            queue: false
          })
          console.log(error)
        })
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

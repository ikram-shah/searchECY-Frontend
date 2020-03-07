<template>
   <div class="section columns">
   <div  class="column">
<a href="https://www.youtube.com/watch?v=aLrXQd6vt08">PITCH - YouTube</a>
<br>
<a href="https://www.youtube.com/watch?v=wbwTphp23JE">DEMO - YouTube</a>
</div>
     <div
 class="canva-embed column is-half"
 data-design-id="DAD1s3_fJ0I"
 data-height-ratio="0.7500"
 style="background:rgba(0,0,0,0.03);margin-top:0px !important;border-radius:8px;margin-bottom:0px !important;max-height:100% !important"
></div>

     <!-- <section class="section is-main-section">
        <card-component class="tile is-child" icon="ballot">
           <h4> This application is built for Infenion AI Challenge ........ </h4>
           <tiles>
           <card-component class="tile is-child" title="Sowmiya N." icon="ballot">
         </card-component>
          <card-component title="Profile" icon="account" class="tile is-child">
          <img src="@/assets/Ikram Shah.png" width="128" height="128" class="image has-max-width is-aligned-center">
          <user-avatar class="image has-max-width is-aligned-center"/>
          <hr>
          <b-field label="Name">
            <b-input :value="userName" custom-class="is-static" readonly/>
          </b-field>
          <hr>
          <b-field label="E-mail">
            <b-input :value="userEmail" custom-class="is-static" readonly/>
          </b-field>
        </card-component>
           </tiles>
         </card-component>
    </section>
    <section class="section is-main-section">
     <hero-bar>CREDITS</hero-bar>
      <tiles>
        <card-widget class="tile is-child" type="is-primary" icon="account-multiple" :number="512" label="Clients"/>
        <card-widget class="tile is-child" type="is-info" icon="cart-outline" :number="7770" prefix="$" label="Sales"/>
        <card-widget class="tile is-child" type="is-success" icon="chart-timeline-variant" :number="256" suffix="%" label="Performance"/>
      </tiles>
    </section> -->
  </div>
</template>

<script>
// import * as chartConfig from '@/components/Charts/chart.config'
// import Tiles from '@/components/Tiles'
// import HeroBar from '@/components/HeroBar'
// import CardWidget from '@/components/CardWidget'
// import CardComponent from '@/components/CardComponent'
// export default {
//   name: 'home',
//   components: {
//     HeroBar,
//     CardWidget,
//     CardComponent,
//     Tiles
//   },
//   data () {
//     return {
//       defaultChart: {
//         chartData: null,
//         extraOptions: chartConfig.chartOptionsMain
//       }
//     }
//   },
//   computed: {
//     titleStack () {
//       return [
//         'Admin',
//         'Dashboard'
//       ]
//     }
//   },
//   mounted () {
//     this.fillChartData()

//     this.$buefy.snackbar.open({
//       message: 'Welcome back',
//       queue: false
//     })
//   },
//   methods: {
//     randomChartData (n) {
//       let data = []

//       for (let i = 0; i < n; i++) {
//         data.push(Math.round(Math.random() * 200))
//       }

//       return data
//     },
//     fillChartData () {
//       this.defaultChart.chartData = {
//         datasets: [
//           {
//             fill: false,
//             borderColor: chartConfig.chartColors.default.primary,
//             borderWidth: 2,
//             borderDash: [],
//             borderDashOffset: 0.0,
//             pointBackgroundColor: chartConfig.chartColors.default.primary,
//             pointBorderColor: 'rgba(255,255,255,0)',
//             pointHoverBackgroundColor: chartConfig.chartColors.default.primary,
//             pointBorderWidth: 20,
//             pointHoverRadius: 4,
//             pointHoverBorderWidth: 15,
//             pointRadius: 4,
//             data: this.randomChartData(9)
//           },
//           {
//             fill: false,
//             borderColor: chartConfig.chartColors.default.info,
//             borderWidth: 2,
//             borderDash: [],
//             borderDashOffset: 0.0,
//             pointBackgroundColor: chartConfig.chartColors.default.info,
//             pointBorderColor: 'rgba(255,255,255,0)',
//             pointHoverBackgroundColor: chartConfig.chartColors.default.info,
//             pointBorderWidth: 20,
//             pointHoverRadius: 4,
//             pointHoverBorderWidth: 15,
//             pointRadius: 4,
//             data: this.randomChartData(9)
//           },
//           {
//             fill: false,
//             borderColor: chartConfig.chartColors.default.danger,
//             borderWidth: 2,
//             borderDash: [],
//             borderDashOffset: 0.0,
//             pointBackgroundColor: chartConfig.chartColors.default.danger,
//             pointBorderColor: 'rgba(255,255,255,0)',
//             pointHoverBackgroundColor: chartConfig.chartColors.default.danger,
//             pointBorderWidth: 20,
//             pointHoverRadius: 4,
//             pointHoverBorderWidth: 15,
//             pointRadius: 4,
//             data: this.randomChartData(9)
//           }
//         ],
//         labels: ['01', '02', '03', '04', '05', '06', '07', '08', '09']
//       }
//     }
//   }
// }
</script>

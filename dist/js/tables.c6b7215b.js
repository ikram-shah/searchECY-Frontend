(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["tables"],{"1e1d":function(t,s,a){"use strict";var e=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("section",{staticClass:"section is-title-bar"},[a("div",{staticClass:"level"},[a("div",{staticClass:"level-left"},[a("div",{staticClass:"level-item"},[a("ul",t._l(t.titleStack,(function(s,e){return a("li",{key:e},[t._v(t._s(s))])})),0)])]),a("div",{staticClass:"level-right"},[a("div",{staticClass:"level-item"},[a("div",{staticClass:"buttons is-right"},[a("a",{staticClass:"button is-light",attrs:{href:"https://admin-null.justboil.me/",target:"_blank"}},[a("b-icon",{attrs:{icon:"credit-card","custom-size":"default"}}),a("span",[t._v("Premium Demo")])],1)])])])])])},i=[],l={name:"TitleBar",props:{titleStack:{type:Array,default:function(){return[]}}}},n=l,o=a("2877"),c=Object(o["a"])(n,e,i,!1,null,null,null);s["a"]=c.exports},"2b9d":function(t,s,a){"use strict";var e=function(){var t=this,s=t.$createElement,a=t._self._c||s;return t.isDismissed?t._e():a("div",{staticClass:"notification"},[a("div",{staticClass:"level"},[a("div",{staticClass:"level-left"},[a("div",{staticClass:"level-item"},[t._t("default")],2)]),a("div",{staticClass:"level-right"},[a("button",{staticClass:"button is-small is-white",attrs:{type:"button"},on:{click:t.dismiss}},[t._v("Dismiss")])])])])},i=[],l={name:"Notification",data:function(){return{isDismissed:!1}},methods:{dismiss:function(){this.isDismissed=!0,this.$buefy.snackbar.open({message:"Dismissed",queue:!1})}}},n=l,o=a("2877"),c=Object(o["a"])(n,e,i,!1,null,null,null);s["a"]=c.exports},"503b":function(t,s,a){"use strict";var e=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("section",{staticClass:"hero is-hero-bar"},[a("div",{staticClass:"hero-body"},[a("div",{staticClass:"level"},[a("div",{staticClass:"level-left"},[a("div",{staticClass:"level-item"},[a("h1",{staticClass:"title"},[t._t("default")],2)])]),a("div",{directives:[{name:"show",rawName:"v-show",value:t.hasRightVisible,expression:"hasRightVisible"}],staticClass:"level-right"},[a("div",{staticClass:"level-item"},[t._t("right")],2)])])])])},i=[],l={name:"HeroBar",props:{hasRightVisible:{type:Boolean,default:!0}}},n=l,o=a("2877"),c=Object(o["a"])(n,e,i,!1,null,null,null);s["a"]=c.exports},"8840d":function(t,s,a){"use strict";a.r(s);var e=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",[a("title-bar",{attrs:{"title-stack":t.titleStack}}),a("hero-bar",[t._v(" Tables "),a("router-link",{staticClass:"button",attrs:{slot:"right",to:"/"},slot:"right"},[t._v(" Dashboard ")])],1),a("section",{staticClass:"section is-main-section"},[a("notification",{staticClass:"is-info"},[a("div",[a("b-icon",{attrs:{icon:"buffer","custom-size":"default"}}),a("b",[t._v("Sorted and paginated table.")]),t._v(" Based on Buefy's table. ")],1)]),a("card-component",{staticClass:"has-table has-mobile-sort-spaced",attrs:{title:"Clients",icon:"account-multiple"}},[a("clients-table-sample",{attrs:{"data-url":"/data-sources/clients.json",checkable:!0}})],1),a("hr"),a("notification",{staticClass:"is-info"},[a("div",[a("b-icon",{attrs:{icon:"buffer","custom-size":"default"}}),a("b",[t._v("Tightly wrapped")]),t._v(" — table header becomes card header ")],1)]),a("card-component",{staticClass:"has-table has-mobile-sort-spaced"},[a("clients-table-sample",{attrs:{"data-url":"/data-sources/clients.json",checkable:!0}})],1),a("hr"),a("notification",{staticClass:"is-info"},[a("div",[a("b-icon",{attrs:{icon:"buffer","custom-size":"default"}}),a("b",[t._v("Empty table.")]),t._v(" When there's nothing to show ")],1)]),a("card-component",{staticClass:"has-table"},[a("clients-table-sample")],1)],1)],1)},i=[],l=a("2b9d"),n=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",[a("modal-box",{attrs:{"is-active":t.isModalActive,"trash-object-name":t.trashObjectName},on:{confirm:t.trashConfirm,cancel:t.trashCancel}}),a("b-table",{attrs:{"checked-rows":t.checkedRows,checkable:t.checkable,loading:t.isLoading,paginated:t.paginated,"per-page":t.perPage,striped:!0,hoverable:!0,"default-sort":"name",data:t.clients},on:{"update:checkedRows":function(s){t.checkedRows=s},"update:checked-rows":function(s){t.checkedRows=s}},scopedSlots:t._u([{key:"default",fn:function(s){return[a("b-table-column",{staticClass:"has-no-head-mobile is-image-cell"},[a("div",{staticClass:"image"},[a("img",{staticClass:"is-rounded",attrs:{src:s.row.file}})])]),a("b-table-column",{attrs:{label:"Name",field:"name",sortable:""}},[t._v(" "+t._s(s.row.name)+" ")]),a("b-table-column",{attrs:{label:"Company",field:"company",sortable:""}},[t._v(" "+t._s(s.row.company)+" ")]),a("b-table-column",{attrs:{label:"City",field:"city",sortable:""}},[t._v(" "+t._s(s.row.city)+" ")]),a("b-table-column",{staticClass:"is-progress-col",attrs:{label:"Progress",field:"progress",sortable:""}},[a("progress",{staticClass:"progress is-small is-primary",attrs:{max:"100"},domProps:{value:s.row.progress}},[t._v(t._s(s.row.progress))])]),a("b-table-column",{attrs:{label:"Created"}},[a("small",{staticClass:"has-text-grey is-abbr-like",attrs:{title:s.row.created}},[t._v(t._s(s.row.created))])]),a("b-table-column",{staticClass:"is-actions-cell",attrs:{"custom-key":"actions"}},[a("div",{staticClass:"buttons is-right"},[a("router-link",{staticClass:"button is-small is-primary",attrs:{to:{name:"client.edit",params:{id:s.row.id}}}},[a("b-icon",{attrs:{icon:"account-edit",size:"is-small"}})],1),a("button",{staticClass:"button is-small is-danger",attrs:{type:"button"},on:{click:function(a){return a.preventDefault(),t.trashModal(s.row)}}},[a("b-icon",{attrs:{icon:"trash-can",size:"is-small"}})],1)],1)])]}}])},[a("section",{staticClass:"section",attrs:{slot:"empty"},slot:"empty"},[a("div",{staticClass:"content has-text-grey has-text-centered"},[t.isLoading?[a("p",[a("b-icon",{attrs:{icon:"dots-horizontal",size:"is-large"}})],1),a("p",[t._v("Fetching data...")])]:[a("p",[a("b-icon",{attrs:{icon:"emoticon-sad",size:"is-large"}})],1),a("p",[t._v("Nothing's here…")])]],2)])])],1)},o=[],c=(a("b0c0"),a("bc3a")),r=a.n(c),d=a("72d0"),u={name:"ClientsTableSample",components:{ModalBox:d["a"]},props:{dataUrl:{type:String,default:null},checkable:{type:Boolean,default:!1}},data:function(){return{isModalActive:!1,trashObject:null,clients:[],isLoading:!1,paginated:!1,perPage:10,checkedRows:[]}},computed:{trashObjectName:function(){return this.trashObject?this.trashObject.name:null}},mounted:function(){var t=this;this.dataUrl&&(this.isLoading=!0,r.a.get(this.dataUrl).then((function(s){t.isLoading=!1,s.data&&s.data.data&&(s.data.data.length>t.perPage&&(t.paginated=!0),t.clients=s.data.data)})).catch((function(s){t.isLoading=!1,t.$buefy.toast.open({message:"Error: ".concat(s.message),type:"is-danger"})})))},methods:{trashModal:function(t){this.trashObject=t,this.isModalActive=!0},trashConfirm:function(){this.isModalActive=!1,this.$buefy.snackbar.open({message:"Confirmed",queue:!1})},trashCancel:function(){this.isModalActive=!1}}},b=u,m=a("2877"),h=Object(m["a"])(b,n,o,!1,null,null,null),p=h.exports,f=a("6df7"),v=a("1e1d"),g=a("503b"),C={name:"Tables",components:{HeroBar:g["a"],TitleBar:v["a"],CardComponent:f["a"],ClientsTableSample:p,Notification:l["a"]},computed:{titleStack:function(){return["Admin","Tables"]}}},_=C,k=Object(m["a"])(_,e,i,!1,null,null,null);s["default"]=k.exports}}]);
//# sourceMappingURL=tables.c6b7215b.js.map
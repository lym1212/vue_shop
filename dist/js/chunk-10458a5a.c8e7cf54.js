(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-10458a5a"],{"3c3a":function(t,e,a){"use strict";a("eeb2")},"4f9b":function(t,e,a){"use strict";a.r(e);var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/home"}}},[t._v("首页")]),a("el-breadcrumb-item",[t._v("商品管理")]),a("el-breadcrumb-item",[t._v("添加商品")])],1),a("el-card",[a("el-alert",{attrs:{title:"添加商品信息",type:"info",center:"","show-icon":""}}),a("el-steps",{attrs:{space:200,active:t.activeIndex-0,"finish-status":"success","align-center":""}},[a("el-step",{attrs:{title:"基本信息"}}),a("el-step",{attrs:{title:"商品参数"}}),a("el-step",{attrs:{title:"商品属性"}}),a("el-step",{attrs:{title:"商品图片"}}),a("el-step",{attrs:{title:"商品内容"}}),a("el-step",{attrs:{title:"完成"}})],1),a("el-form",{ref:"addFormRef",attrs:{model:t.newGoodData,"label-position":"top"}},[a("el-tabs",{attrs:{"tab-position":"left","before-leave":t.beforeTabLeave},on:{"tab-click":t.tabClick},model:{value:t.activeIndex,callback:function(e){t.activeIndex=e},expression:"activeIndex"}},[a("el-tab-pane",{attrs:{label:"基本信息",name:"0"}},[a("el-form-item",{attrs:{label:"商品分类"}},[a("el-cascader",{attrs:{options:t.cateList,props:t.cateProps},on:{change:t.handleCateChange},model:{value:t.newGoodData.goods_cat,callback:function(e){t.$set(t.newGoodData,"goods_cat",e)},expression:"newGoodData.goods_cat"}})],1),a("el-form-item",{attrs:{label:"商品名称"}},[a("el-input",{model:{value:t.newGoodData.goods_name,callback:function(e){t.$set(t.newGoodData,"goods_name",e)},expression:"newGoodData.goods_name"}})],1),a("el-form-item",{attrs:{label:"商品价格"}},[a("el-input",{model:{value:t.newGoodData.goods_price,callback:function(e){t.$set(t.newGoodData,"goods_price",e)},expression:"newGoodData.goods_price"}})],1),a("el-form-item",{attrs:{label:"商品重量"}},[a("el-input",{model:{value:t.newGoodData.goods_weight,callback:function(e){t.$set(t.newGoodData,"goods_weight",e)},expression:"newGoodData.goods_weight"}})],1),a("el-form-item",{attrs:{label:"商品数量"}},[a("el-input",{model:{value:t.newGoodData.goods_number,callback:function(e){t.$set(t.newGoodData,"goods_number",e)},expression:"newGoodData.goods_number"}})],1)],1),a("el-tab-pane",{attrs:{label:"商品参数",name:"1"}},t._l(t.manyList,(function(e){return a("el-form-item",{key:e.attr_id,attrs:{label:e.attr_name}},[a("el-checkbox-group",{model:{value:e.attr_vals,callback:function(a){t.$set(e,"attr_vals",a)},expression:"item.attr_vals"}},t._l(e.attr_vals,(function(t,e){return a("el-checkbox",{key:e,attrs:{label:t,border:""}})})),1)],1)})),1),a("el-tab-pane",{attrs:{label:"商品属性",name:"2"}},t._l(t.onlyList,(function(e){return a("el-form-item",{key:e.attr_id,attrs:{label:e.attr_name}},[a("el-input",{model:{value:e.attr_vals,callback:function(a){t.$set(e,"attr_vals",a)},expression:"item.attr_vals"}})],1)})),1),a("el-tab-pane",{attrs:{label:"商品图片",name:"3"}},[a("el-upload",{attrs:{action:t.uploadUrl,"list-type":"picture",headers:t.headersOpt,"on-success":t.handlePicSuccess,"on-remove":t.handleRemovePic,"on-preview":t.handlePicPreview}},[a("el-button",{attrs:{size:"small",type:"primary"}},[t._v("点击上传")]),a("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[t._v(" 只能上传jpg/png文件，且不超过500kb ")])],1)],1),a("el-tab-pane",{attrs:{label:"商品内容",name:"4"}},[a("quill-editor",{model:{value:t.newGoodData.goods_introduce,callback:function(e){t.$set(t.newGoodData,"goods_introduce",e)},expression:"newGoodData.goods_introduce"}}),a("el-button",{attrs:{type:"primary"},on:{click:t.addGoods}},[t._v("添加")])],1)],1)],1)],1),a("el-dialog",{attrs:{title:"图片预览",visible:t.preDialogVisible,width:"50%"},on:{"update:visible":function(e){t.preDialogVisible=e}}},[a("img",{staticClass:"preview-img",attrs:{src:t.previewPath}})])],1)},r=[],n=a("1da1"),s=(a("159b"),a("ac1f"),a("1276"),a("c740"),a("a434"),a("a15b"),a("96cf"),a("de5d")),i=a("60bb"),l=a.n(i),c={name:"Add",data:function(){return{activeIndex:"0",newGoodData:{goods_name:"ceshiceshi",goods_price:1,goods_weight:1,goods_number:1,goods_cat:[],pics:[],goods_introduce:"",attrs:[]},cateList:[],cateProps:{expandTrigger:"hover",label:"cat_name",value:"cat_id"},manyList:[],onlyList:[],checkedAttr:!0,uploadUrl:"https://lianghj.top:8888/api/private/v1/upload",headersOpt:{Authorization:window.sessionStorage.getItem("token")},previewPath:"",preDialogVisible:!1}},computed:{currentCateId:function(){return 3===this.newGoodData.goods_cat.length?this.newGoodData.goods_cat[2]:null}},created:function(){this.getCategories()},methods:{getCategories:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){var a,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(s["j"])({});case 2:if(a=e.sent,o=a.data,200===o.meta.status){e.next=6;break}return e.abrupt("return",t.$msg.error(o.meta.msg));case 6:t.cateList=o.data;case 7:case"end":return e.stop()}}),e)})))()},getAttributes:function(t){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function a(){var o,r;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,Object(s["i"])(e.currentCateId,t);case 2:if(o=a.sent,r=o.data,200===r.meta.status){a.next=6;break}return a.abrupt("return",e.$msg.error(r.meta.msg));case 6:"many"===t?(r.data.forEach((function(t){t.attr_vals=t.attr_vals?t.attr_vals.split(" "):[]})),e.manyList=r.data):e.onlyList=r.data;case 7:case"end":return a.stop()}}),a)})))()},handleCateChange:function(){if(3!==this.newGoodData.goods_cat.length)return this.$msg.error("请选择三级分类！"),this.currentCateId=[]},beforeTabLeave:function(t,e){return"0"!==e||3===this.newGoodData.goods_cat.length||(this.$msg.error("请选择商品分类！"),!1)},tabClick:function(){"1"===this.activeIndex?this.getAttributes("many"):"2"===this.activeIndex&&this.getAttributes("only")},handlePicSuccess:function(t){if(200!==t.meta.status)return this.$msg.error(t.meta.msg);var e={pic:t.data.tmp_path};this.newGoodData.pics.push(e)},handleRemovePic:function(t){t.response.data.tmp_path;var e=this.newGoodData.pics.findIndex((function(t){t.pic}));this.newGoodData.pics.splice(e,1)},handlePicPreview:function(t){this.previewPath="https://lianghj.top:8888/"+t.response.data.tmp_path,this.preDialogVisible=!0},addGoods:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){var a,o,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a=l.a.cloneDeep(t.newGoodData),a.goods_cat=t.newGoodData.goods_cat.join(","),t.manyList.forEach((function(e){var a={attr_id:e.attr_id,attr_value:e.attr_vals.join(" ")};t.newGoodData.attrs.push(a)})),t.onlyList.forEach((function(e){var a={attr_id:e.attr_id,attr_value:e.attr_vals};t.newGoodData.attrs.push(a)})),a.attrs=t.newGoodData.attrs,e.next=7,Object(s["c"])(a);case 7:if(o=e.sent,r=o.data,201===r.meta.status){e.next=11;break}return e.abrupt("return",t.$msg.error(r.meta.msg));case 11:t.$router.push("/goods");case 12:case"end":return e.stop()}}),e)})))()}}},d=c,u=(a("3c3a"),a("2877")),p=Object(u["a"])(d,o,r,!1,null,"4de6368a",null);e["default"]=p.exports},c740:function(t,e,a){"use strict";var o=a("23e7"),r=a("b727").findIndex,n=a("44d2"),s="findIndex",i=!0;s in[]&&Array(1)[s]((function(){i=!1})),o({target:"Array",proto:!0,forced:i},{findIndex:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}}),n(s)},eeb2:function(t,e,a){}}]);
//# sourceMappingURL=chunk-10458a5a.c8e7cf54.js.map
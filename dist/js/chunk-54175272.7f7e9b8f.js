(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-54175272"],{"1bab":function(t,e,r){"use strict";r.d(e,"a",(function(){return o}));var n=r("cebe"),a=r.n(n);function o(){var t=a.a.create({baseURL:"https://lianghj.top:8888/api/private/v1/",timeout:5e3});return t.interceptors.request.use((function(t){return t.headers.Authorization=window.sessionStorage.getItem("token"),t}),(function(t){console.log(t)})),t}},"1da1":function(t,e,r){"use strict";r.d(e,"a",(function(){return a}));r("d3b7");function n(t,e,r,n,a,o,i){try{var c=t[o](i),s=c.value}catch(u){return void r(u)}c.done?e(s):Promise.resolve(s).then(n,a)}function a(t){return function(){var e=this,r=arguments;return new Promise((function(a,o){var i=t.apply(e,r);function c(t){n(i,a,o,c,s,"next",t)}function s(t){n(i,a,o,c,s,"throw",t)}c(void 0)}))}}},"1f6d":function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[r("el-breadcrumb-item",{attrs:{to:{path:"/home"}}},[t._v("首页")]),r("el-breadcrumb-item",[t._v("商品管理")]),r("el-breadcrumb-item",[t._v("商品分类")])],1),r("el-card",[r("el-row",[r("el-col",[r("el-button",{attrs:{type:"primary"},on:{click:t.showAddCateDialog}},[t._v("添加分类")])],1)],1),r("tree-table",{attrs:{data:t.categories,columns:t.columns,"selection-type":!1,"expand-type":!1,"show-row-hover":!1,"show-index":"",border:""},scopedSlots:t._u([{key:"isValid",fn:function(t){return[t.row.cat_deleted?r("i",{staticClass:"el-icon-error",staticStyle:{color:"red"}}):r("i",{staticClass:"el-icon-success",staticStyle:{color:"green"}})]}},{key:"order",fn:function(e){return[0===e.row.cat_level?r("el-tag",{attrs:{size:"mini"}},[t._v("一级")]):t._e(),1===e.row.cat_level?r("el-tag",{attrs:{type:"success",size:"mini"}},[t._v("二级")]):t._e(),2===e.row.cat_level?r("el-tag",{attrs:{type:"warning",size:"mini"}},[t._v("三级")]):t._e()]}},{key:"handle",fn:function(e){return[r("el-button",{attrs:{type:"primary",icon:"el-icon-edit",size:"mini"},on:{click:function(r){return t.showEditCateDialog(e.row.cat_id)}}},[t._v("编辑")]),r("el-button",{attrs:{type:"danger",icon:"el-icon-delete",size:"mini"},on:{click:function(r){return t.deleteCate(e.row.cat_id)}}},[t._v("删除")])]}}])}),r("el-pagination",{attrs:{"current-page":t.queryInfo.pagenum,"page-sizes":[4,6,8,10],"page-size":t.queryInfo.pagesize,layout:"total, sizes, prev, pager, next, jumper",total:t.totalCate},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1),r("el-dialog",{attrs:{title:"添加分类",width:"30%",visible:t.addCateDialogVisible},on:{"update:visible":function(e){t.addCateDialogVisible=e},close:t.addCateDialogClose}},[r("el-form",{ref:"addCateFormRef",attrs:{model:t.newCate,"label-width":"70px"}},[r("el-form-item",{attrs:{label:"分类名称"}},[r("el-input",{model:{value:t.newCate.cat_name,callback:function(e){t.$set(t.newCate,"cat_name",e)},expression:"newCate.cat_name"}})],1),r("el-form-item",{attrs:{label:"父级分类"}},[r("el-cascader",{attrs:{options:t.parentCate,props:t.defaultProps,clearable:""},on:{change:t.handleCateChange},model:{value:t.currentCate,callback:function(e){t.currentCate=e},expression:"currentCate"}})],1)],1),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(e){t.addCateDialogVisible=!1}}},[t._v("取 消")]),r("el-button",{attrs:{type:"primary"},on:{click:t.addCate}},[t._v("添 加")])],1)],1),r("el-dialog",{attrs:{title:"编辑分类",width:"30%",visible:t.editCateDialogVisible},on:{"update:visible":function(e){t.editCateDialogVisible=e},close:t.editCateDialogClose}},[r("el-form",{ref:"editCateFormRef",attrs:{model:t.editCateData,"label-width":"70px"}},[r("el-form-item",{attrs:{label:"分类名称"}},[r("el-input",{model:{value:t.editCateData.cat_name,callback:function(e){t.$set(t.editCateData,"cat_name",e)},expression:"editCateData.cat_name"}})],1)],1),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(e){t.editCateDialogVisible=!1}}},[t._v("取 消")]),r("el-button",{attrs:{type:"primary"},on:{click:t.editCate}},[t._v("修 改")])],1)],1)],1)},a=[],o=r("1da1"),i=(r("96cf"),r("de5d")),c={name:"Category",data:function(){return{queryInfo:{type:3,pagenum:1,pagesize:4},categories:[],parentCate:[],totalCate:0,columns:[{label:"分类名称",prop:"cat_name"},{label:"是否有效",type:"template",template:"isValid"},{label:"排序",type:"template",template:"order"},{label:"操作",type:"template",template:"handle"}],addCateDialogVisible:!1,editCateDialogVisible:!1,newCate:{cat_name:"",cat_pid:0,cat_level:0},defaultProps:{expandTrigger:"hover",label:"cat_name",value:"cat_id",children:"children",checkStrictly:!0},currentCate:[],editCateData:{}}},created:function(){this.getCategories()},methods:{getCategories:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var r,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(i["j"])(t.queryInfo);case 2:r=e.sent,n=r.data,200!==n.meta.status?t.$msg.error(n.meta.msg):(t.categories=n.data.result,t.totalCate=n.data.total);case 5:case"end":return e.stop()}}),e)})))()},getParentCate:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var r,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(i["j"])({type:2});case 2:r=e.sent,n=r.data,console.log(n.data),200!==n.meta.status?t.$msg.error(n.meta.msg):t.parentCate=n.data;case 6:case"end":return e.stop()}}),e)})))()},handleSizeChange:function(t){this.queryInfo.pagesize=t,this.queryInfo.pagenum=1,this.getCategories()},handleCurrentChange:function(t){this.queryInfo.pagenum=t,this.getCategories()},showAddCateDialog:function(){this.getParentCate(),this.addCateDialogVisible=!0},handleCateChange:function(){if(this.currentCate.length>0){var t=this.currentCate.length;this.newCate.cat_level=t,this.newCate.cat_pid=this.currentCate[t-1]}else this.newCate.cat_pid=0,this.newCate.cat_level=0},addCate:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var r,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(i["b"])(t.newCate);case 2:r=e.sent,n=r.data,201!==n.meta.status?t.$msg.error(n.meta.msg):(t.$msg.success(n.meta.msg),t.getCategories(),t.addCateDialogVisible=!1);case 5:case"end":return e.stop()}}),e)})))()},addCateDialogClose:function(){this.$refs.addCateFormRef.resetFields(),this.currentCate=[],this.newCate.cat_pid=0,this.newCate.cat_level=0},showEditCateDialog:function(t){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function r(){var n,a;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,Object(i["m"])(t);case 2:n=r.sent,a=n.data,e.editCateData=a.data,e.editCateDialogVisible=!0;case 6:case"end":return r.stop()}}),r)})))()},editCate:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var r,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(i["h"])(t.editCateData.cat_id,t.editCateData.cat_name);case 2:r=e.sent,n=r.data,200!==n.meta.status?t.$msg.error(n.meta.msg):(t.$msg.success(n.meta.msg),t.getCategories(),t.editCateDialogVisible=!1);case 5:case"end":return e.stop()}}),e)})))()},editCateDialogClose:function(){this.$refs.editCateFormRef.resetFields()},deleteCate:function(t){var e=this;this.$confirm("是否删除此分类？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(o["a"])(regeneratorRuntime.mark((function r(){var n,a;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,Object(i["e"])(t);case 2:n=r.sent,a=n.data,200!==a.meta.status?e.$msg.error(a.meta.msg):(e.$msg({type:"success",message:"删除成功!"}),e.getCategories());case 5:case"end":return r.stop()}}),r)})))).catch((function(){e.$msg({type:"info",message:"已取消删除"})}))}}},s=c,u=(r("b14c"),r("2877")),l=Object(u["a"])(s,n,a,!1,null,"1897bb5a",null);e["default"]=l.exports},"96cf":function(t,e,r){var n=function(t){"use strict";var e,r=Object.prototype,n=r.hasOwnProperty,a="function"===typeof Symbol?Symbol:{},o=a.iterator||"@@iterator",i=a.asyncIterator||"@@asyncIterator",c=a.toStringTag||"@@toStringTag";function s(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{s({},"")}catch($){s=function(t,e,r){return t[e]=r}}function u(t,e,r,n){var a=e&&e.prototype instanceof m?e:m,o=Object.create(a.prototype),i=new E(n||[]);return o._invoke=O(t,r,i),o}function l(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch($){return{type:"throw",arg:$}}}t.wrap=u;var f="suspendedStart",d="suspendedYield",h="executing",p="completed",g={};function m(){}function v(){}function y(){}var b={};b[o]=function(){return this};var w=Object.getPrototypeOf,C=w&&w(w(R([])));C&&C!==r&&n.call(C,o)&&(b=C);var _=y.prototype=m.prototype=Object.create(b);function x(t){["next","throw","return"].forEach((function(e){s(t,e,(function(t){return this._invoke(e,t)}))}))}function j(t,e){function r(a,o,i,c){var s=l(t[a],t,o);if("throw"!==s.type){var u=s.arg,f=u.value;return f&&"object"===typeof f&&n.call(f,"__await")?e.resolve(f.__await).then((function(t){r("next",t,i,c)}),(function(t){r("throw",t,i,c)})):e.resolve(f).then((function(t){u.value=t,i(u)}),(function(t){return r("throw",t,i,c)}))}c(s.arg)}var a;function o(t,n){function o(){return new e((function(e,a){r(t,n,e,a)}))}return a=a?a.then(o,o):o()}this._invoke=o}function O(t,e,r){var n=f;return function(a,o){if(n===h)throw new Error("Generator is already running");if(n===p){if("throw"===a)throw o;return z()}r.method=a,r.arg=o;while(1){var i=r.delegate;if(i){var c=k(i,r);if(c){if(c===g)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===f)throw n=p,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=h;var s=l(t,e,r);if("normal"===s.type){if(n=r.done?p:d,s.arg===g)continue;return{value:s.arg,done:r.done}}"throw"===s.type&&(n=p,r.method="throw",r.arg=s.arg)}}}function k(t,r){var n=t.iterator[r.method];if(n===e){if(r.delegate=null,"throw"===r.method){if(t.iterator["return"]&&(r.method="return",r.arg=e,k(t,r),"throw"===r.method))return g;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return g}var a=l(n,t.iterator,r.arg);if("throw"===a.type)return r.method="throw",r.arg=a.arg,r.delegate=null,g;var o=a.arg;return o?o.done?(r[t.resultName]=o.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,g):o:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,g)}function L(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function D(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function E(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(L,this),this.reset(!0)}function R(t){if(t){var r=t[o];if(r)return r.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var a=-1,i=function r(){while(++a<t.length)if(n.call(t,a))return r.value=t[a],r.done=!1,r;return r.value=e,r.done=!0,r};return i.next=i}}return{next:z}}function z(){return{value:e,done:!0}}return v.prototype=_.constructor=y,y.constructor=v,v.displayName=s(y,c,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===v||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,y):(t.__proto__=y,s(t,c,"GeneratorFunction")),t.prototype=Object.create(_),t},t.awrap=function(t){return{__await:t}},x(j.prototype),j.prototype[i]=function(){return this},t.AsyncIterator=j,t.async=function(e,r,n,a,o){void 0===o&&(o=Promise);var i=new j(u(e,r,n,a),o);return t.isGeneratorFunction(r)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},x(_),s(_,c,"Generator"),_[o]=function(){return this},_.toString=function(){return"[object Generator]"},t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){while(e.length){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=R,E.prototype={constructor:E,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(D),!t)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0],e=t.completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function a(n,a){return c.type="throw",c.arg=t,r.next=n,a&&(r.method="next",r.arg=e),!!a}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],c=i.completion;if("root"===i.tryLoc)return a("end");if(i.tryLoc<=this.prev){var s=n.call(i,"catchLoc"),u=n.call(i,"finallyLoc");if(s&&u){if(this.prev<i.catchLoc)return a(i.catchLoc,!0);if(this.prev<i.finallyLoc)return a(i.finallyLoc)}else if(s){if(this.prev<i.catchLoc)return a(i.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return a(i.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var a=this.tryEntries[r];if(a.tryLoc<=this.prev&&n.call(a,"finallyLoc")&&this.prev<a.finallyLoc){var o=a;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var i=o?o.completion:{};return i.type=t,i.arg=e,o?(this.method="next",this.next=o.finallyLoc,g):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),g},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),D(r),g}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var a=n.arg;D(r)}return a}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:R(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),g}},t}(t.exports);try{regeneratorRuntime=n}catch(a){Function("r","regeneratorRuntime = r")(n)}},b14c:function(t,e,r){"use strict";r("bf24")},bf24:function(t,e,r){},de5d:function(t,e,r){"use strict";r.d(e,"j",(function(){return a})),r.d(e,"b",(function(){return o})),r.d(e,"m",(function(){return i})),r.d(e,"h",(function(){return c})),r.d(e,"e",(function(){return s})),r.d(e,"i",(function(){return u})),r.d(e,"a",(function(){return l})),r.d(e,"l",(function(){return f})),r.d(e,"g",(function(){return d})),r.d(e,"d",(function(){return h})),r.d(e,"k",(function(){return p})),r.d(e,"f",(function(){return g})),r.d(e,"c",(function(){return m}));r("99af");var n=r("1bab");function a(t){var e=t.type,r=t.pagenum,a=t.pagesize;return Object(n["a"])().get("categories",{params:{type:e,pagenum:r,pagesize:a}})}function o(t){var e=t.cat_pid,r=t.cat_name,a=t.cat_level;return Object(n["a"])().post("categories",{cat_pid:e,cat_name:r,cat_level:a})}function i(t){return Object(n["a"])().get("categories/".concat(t))}function c(t,e){return Object(n["a"])().put("categories/".concat(t),{cat_name:e})}function s(t){return Object(n["a"])().delete("categories/".concat(t))}function u(t,e){return Object(n["a"])().get("categories/".concat(t,"/attributes"),{params:{sel:e}})}function l(t,e,r,a){return Object(n["a"])().post("categories/".concat(t,"/attributes"),{attr_name:e,attr_sel:r,attr_vals:a})}function f(t,e){return Object(n["a"])().get("categories/".concat(t,"/attributes/").concat(e))}function d(t,e,r,a,o){return Object(n["a"])().put("categories/".concat(t,"/attributes/").concat(e),{attr_name:r,attr_sel:a,attr_vals:o})}function h(t,e){return Object(n["a"])().delete("categories/".concat(t,"/attributes/").concat(e))}function p(t){return Object(n["a"])().get("goods",{params:t})}function g(t){return Object(n["a"])().delete("goods/".concat(t))}function m(t){return Object(n["a"])().post("goods",t)}}}]);
//# sourceMappingURL=chunk-54175272.7f7e9b8f.js.map
(this.webpackJsonpsequence_submissions=this.webpackJsonpsequence_submissions||[]).push([[0],{14:function(e,t,n){e.exports={tableWrap:"table_tableWrap__2lYj0",table:"table_table__orQ_Q",bar:"table_bar__ZB01Y",spinnerContainer:"table_spinnerContainer__3VxqN",disclaimer:"table_disclaimer__2YZDm",paginationControl:"table_paginationControl__2aY2e"}},29:function(e,t,n){e.exports={seqTable:"App_seqTable__a9Xm0"}},32:function(e,t,n){e.exports={title:"sequenceTable_title__x4oOe",fullWidth:"sequenceTable_fullWidth__2Jg08"}},54:function(e,t,n){},83:function(e){e.exports=JSON.parse("{}")},85:function(e,t,n){"use strict";n.r(t);var a=n(4),r=n(0),c=n.n(r),i=n(45),l=n.n(i),o=(n(54),n(10)),s=n(29),u=n.n(s),b=n(18),d=n(16),f=n(17),h=n(30),j=n(6),p=n(1),g=n(47),O=n(46),m=n(20),v=n(31),_=n(19),x=n(14),C=n.n(x);function y(){var e=Object(h.a)([""]);return y=function(){return e},e}function N(){var e=Object(h.a)(['\n                                display: flex;\n                                text-align: left;\n                                &:before {\n                                  content: "";\n                                  display: flex;\n                                  align-items: center;\n                                  justify-content: center;\n                                  height: inherit;\n                                  width: calc(\n                                    ',"px *\n                                      ("," / 100)\n                                  );\n                                  margin-right: 10px;\n                                  background: lightgray;\n                                }\n                                &:hover:before {\n                                  background: gray;\n                                }\n                              "]);return N=function(){return e},e}function S(e){var t=e.preGlobalFilteredRows,n=e.globalFilter,a=e.setGlobalFilter,r=e.className,i=t.length,l=c.a.useState(n),s=Object(o.a)(l,2),u=s[0],b=s[1],d=Object(_.useAsyncDebounce)((function(e){a(e||void 0)}),200);return Object(p.b)("span",{className:r,children:["Search:"," ",Object(p.a)("input",{value:u||"",onChange:function(e){b(e.target.value),d(e.target.value)},placeholder:"".concat(i," records..."),style:{fontSize:"1.1rem",border:"0"}})]})}var k=function(e){var t=e.isLoading,n=e.columns,a=e.data,r=e.barCol,c=e.downloadFileName,i=e.disclaimer,l=void 0===i?"":i,o=n.map((function(e){var t={};return t.label=e.Header,t.key=e.accessor,t})),s=Object(_.useTable)({columns:n,data:a,autoResetPage:!1,initialState:{pageIndex:0,pageSize:10}},_.useGlobalFilter,_.usePagination),u=s.getTableProps,h=s.getTableBodyProps,x=s.headerGroups,k=s.prepareRow,T=s.page,w=s.canPreviousPage,F=s.canNextPage,P=s.pageOptions,q=s.pageCount,D=s.gotoPage,G=s.nextPage,R=s.previousPage,I=s.state.pageIndex,z=s.state,E=s.preGlobalFilteredRows,H=s.setGlobalFilter;return Object(p.b)("div",{className:C.a.tableWrap,children:[Object(p.a)(S,{preGlobalFilteredRows:E,globalFilter:z.globalFilter,setGlobalFilter:H}),t?Object(p.a)("div",{className:C.a.spinnerContainer,children:Object(p.a)(O.a,{animation:"border"})}):Object(p.b)(g.a,Object(j.a)(Object(j.a)({className:"".concat(C.a.table," mt-3"),hover:!0,size:"sm"},u()),{},{children:[Object(p.a)("thead",{children:x.map((function(e){return Object(p.a)("tr",Object(j.a)(Object(j.a)({},e.getHeaderGroupProps()),{},{children:e.headers.map((function(e){return Object(p.a)("th",Object(j.a)(Object(j.a)({},e.getHeaderProps()),{},{children:e.render("Header")}))}))}))}))}),Object(p.a)("tbody",Object(j.a)(Object(j.a)({},h()),{},{children:T.map((function(e,t){return k(e),Object(f.a)("tr",Object(j.a)(Object(j.a)({},e.getRowProps()),{},{key:t}),e.cells.map((function(e){return Object(p.a)("td",Object(j.a)(Object(j.a)({},e.getCellProps()),{},{css:e.column.Header===r?Object(f.b)(N(),e.column.width,e.value):Object(f.b)(y()),children:e.render("Cell")}))})))}))}))]})),""===l?null:Object(p.a)("div",{className:"".concat(C.a.disclaimer," mb-3"),children:l}),1===P.length?Object(p.a)(b.a,{className:C.a.paginationControl,children:Object(p.a)(d.a,{xs:12,md:6,className:"mb-3",children:Object(p.a)(v.CSVLink,{data:a,headers:o,filename:c,className:"btn-sm btn-light",style:{textDecoration:"none"},target:"_blank",children:"Download Table"})})}):Object(p.b)(b.a,{className:C.a.paginationControl,children:[Object(p.b)(d.a,{sm:12,md:6,children:[Object(p.a)(m.a,{variant:"light",size:"sm",onClick:function(){return D(0)},disabled:!w,children:"<<"}),Object(p.a)(m.a,{variant:"light",size:"sm",onClick:function(){return R()},disabled:!w,children:"<"}),Object(p.a)(m.a,{variant:"light",size:"sm",onClick:function(){return G()},disabled:!F,children:">"}),Object(p.a)(m.a,{variant:"light",size:"sm",onClick:function(){return D(q-1)},disabled:!F,children:">>"}),Object(p.b)("p",{children:[" ","Page ",Object(p.b)("strong",{children:[I+1," "]})," of"," ",Object(p.a)("strong",{children:P.length})]})]}),Object(p.a)(d.a,{xs:12,md:6,className:"mb-3",children:Object(p.a)(v.CSVLink,{data:a,headers:o,filename:c,className:"btn-sm btn-light",style:{textDecoration:"none"},target:"_blank",children:"Download Table"})})]})]})},T=n(12),w=n.n(T),F=n(25),P="https://mendel3.bii.a-star.edu.sg/METHODS/corona/gamma/GISAID/submissionRanking/data/",q=n(36);function D(){return G.apply(this,arguments)}function G(){return(G=Object(F.a)(w.a.mark((function e(){return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",q.get(P.concat("sequenceData.json")).then((function(e){return e.data})).catch((function(e){return console.log("err :>> ",e),{}})));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}n(83);var R=n(36);function I(){return(I=Object(F.a)(w.a.mark((function e(){return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",R.get(P.concat("config.json")).then((function(e){return e.data})).catch((function(e){return console.log("err :>> ",e),{}})));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var z=n(48);function E(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=e.toString(),n=t.split("."),a=n[0],r=n.length>1?"."+n[1]:"",c=/(\d+)(\d{3})/;c.test(a);)a=a.replace(c,"$1,$2");return a.concat(r)}var H=n(32),L=n.n(H),W=function(e){var t=e.config,n=c.a.useState(!0),i=Object(o.a)(n,2),l=i[0],s=i[1],u=c.a.useRef([]),b=c.a.useState(""),d=Object(o.a)(b,2),f=d[0],h=d[1],j=c.a.useState(""),p=Object(o.a)(j,2),g=p[0],O=p[1],m=c.a.useState(""),v=Object(o.a)(m,2),_=v[0],x=v[1],C=c.a.useState([]),y=Object(o.a)(C,2),N=y[0],S=y[1],T=c.a.useRef(["reported_cases","samples_sequenced"]),w=c.a.useCallback((function(e){s(!1),S(function(e,t){var n,a=Object(z.a)(e);try{var r=function(){var e=n.value;"string"===typeof t?e[t]=E(e[t]):t.forEach((function(t){e[t]=E(e[t])}))};for(a.s();!(n=a.n()).done;)r()}catch(c){a.e(c)}finally{a.f()}return e}(e,T.current))}),[]);c.a.useEffect((function(){s(!0),O(function(e){var t;return null!==(t=e.sequenceTableTitle)&&void 0!==t?t:""}(t)),h(function(e){return e.sequenceTableBarCol}(t)),u.current=function(e){var t,n,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"default";return null!==(t=(null!==(n=e.sequenceTableHeaders)&&void 0!==n?n:{})[a])&&void 0!==t?t:[]}(t),x(function(e){var t;return null!==(t=e.sequenceTableDisclaimer)&&void 0!==t?t:""}(t)),D().then((function(e){w(e),s(!1)}))}),[w,t]);return function(e,t){var n=Object(r.useRef)();Object(r.useEffect)((function(){n.current=e}),[e]),Object(r.useEffect)((function(){if(null!==t){var e=setInterval((function(){n.current()}),t);return function(){return clearInterval(e)}}}),[t])}((function(){D().then((function(e){return w(e)}))}),3e5),Object(a.jsxs)("div",{className:"".concat(L.a.fullWidth),children:[Object(a.jsx)("h2",{className:L.a.title,children:null!==g&&void 0!==g?g:"Country Submission Count"}),Object(a.jsx)(k,{columns:u.current,data:N,barCol:f,downloadFileName:"sequenceOFSubmission.csv",isLoading:l,disclaimer:_})]})};var B=function(){var e=c.a.useState({}),t=Object(o.a)(e,2),n=t[0],r=t[1];return c.a.useEffect((function(){(function(){return I.apply(this,arguments)})().then((function(e){return r(e)}))}),[]),Object(a.jsx)(b.a,{className:u.a.app,children:Object(a.jsx)(d.a,{className:"mt-3",children:Object(a.jsx)("div",{className:u.a.seqTable,children:Object(a.jsx)(W,{config:n})})})})},J=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,86)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,c=t.getLCP,i=t.getTTFB;n(e),a(e),r(e),c(e),i(e)}))};n(84);l.a.render(Object(a.jsx)(c.a.StrictMode,{children:Object(a.jsx)(B,{})}),document.getElementById("root")),J()}},[[85,1,2]]]);
//# sourceMappingURL=main.3372d771.chunk.js.map
(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{38:function(e,t,n){},39:function(e,t,n){"use strict";n.r(t);var r=n(14),c=n.n(r),a=n(3),o=n(1),i=n(4),u=n.n(i),d="/api/persons",l={getAll:function(){return u.a.get(d).then((function(e){return e.data}))},create:function(e){return u.a.post(d,e).then((function(e){return e.data}))},update:function(e,t){return u.a.put("".concat(d,"/").concat(e),t).then((function(e){return e.data}))},delContact:function(e){return u.a.delete("".concat(d,"/").concat(e)).then((function(e){return e.data}))}},s=n(0),b=function(e){var t=e.handler,n=e.text;return Object(s.jsx)("button",{onClick:t,children:n})},h=function(e){var t=e.newName,n=e.handleNewName,r=e.newNumber,c=e.handleNumber,a=e.handleSubmit;return Object(s.jsx)("div",{children:Object(s.jsxs)("form",{className:"form-add",children:[Object(s.jsx)("div",{children:Object(s.jsx)("input",{placeholder:"Name:",value:t,onChange:n})}),Object(s.jsx)("div",{children:Object(s.jsx)("input",{placeholder:"Number:",value:r,onChange:c})}),Object(s.jsx)("div",{children:Object(s.jsx)(b,{handler:a,text:"Add"})})]})})},j=function(e){var t=e.message,n=e.status;if(null===t)return null;var r={color:"green",fontSize:20,borderStyle:"solid",borderRadius:8,padding:10,marginBottom:10,marginTop:0,width:"80%",marginLeft:"auto",marginRight:"auto"};return"success"===n?(r.color="green",r.borderColor="green"):"error"===n&&(r.color="red",r.borderColor="red"),Object(s.jsx)("div",{style:r,children:t})},m=function(e){var t=e.persons,n=e.nameFilter,r=e.handleDelete;return Object(s.jsx)("div",{children:Object(s.jsx)("ul",{style:{listStyle:"none"},children:t.filter((function(e){return e.name.toLowerCase().includes(n.toLowerCase())})).map((function(e){return Object(s.jsxs)("li",{children:[e.name," ",e.number," ",Object(s.jsx)(b,{handler:function(){return r(e.id)},text:"delete"})]},e.name)}))})})},f=function(e){var t=e.nameFilter,n=e.handleFilter;return Object(s.jsxs)("div",{children:["filter shown with ",Object(s.jsx)("input",{value:t,onChange:n})]})},p=function(){var e=Object(o.useState)([]),t=Object(a.a)(e,2),n=t[0],r=t[1],c=Object(o.useState)(""),i=Object(a.a)(c,2),u=i[0],d=i[1],b=Object(o.useState)(""),p=Object(a.a)(b,2),O=p[0],g=p[1],x=Object(o.useState)(""),v=Object(a.a)(x,2),w=v[0],N=v[1],S=Object(o.useState)(null),y=Object(a.a)(S,2),C=y[0],T=y[1],k=Object(o.useState)("success"),A=Object(a.a)(k,2),B=A[0],F=A[1];Object(o.useEffect)((function(){l.getAll().then((function(e){r(e)}))}),[]);return Object(s.jsxs)("div",{children:[Object(s.jsx)("div",{style:{textAlign:"center",margin:"auto",background:"cadetblue",marginTop:0,marginBottom:0,paddingTop:10,paddingBottom:5,color:"white"},children:Object(s.jsx)("h1",{children:"Phonebook"})}),Object(s.jsxs)("div",{style:{textAlign:"center",maxWidth:"80%",width:"50rem",margin:"auto",marginTop:40,paddingTop:20,paddingBottom:20,border:"solid",borderColor:"gray",borderRadius:20,borderWidth:1,boxShadow:"1px 1px 2px gray"},children:[Object(s.jsx)(j,{message:C,status:B}),Object(s.jsx)(f,{value:w,handleFilter:function(e){return N(e.target.value)}}),Object(s.jsx)("h2",{children:"Add a new"}),Object(s.jsx)(h,{newName:u,handleNewName:function(e){return d(e.target.value)},newNumber:O,handleNumber:function(e){return g(e.target.value)},handleSubmit:function(e){e.preventDefault();var t=n.find((function(e){return e.name===u})),c={name:u,number:O};t?window.confirm("".concat(u," is already added to phonebook, replace the old number with a new one?"))&&l.update(t.id,c).then((function(e){d(""),g(""),F("success"),T("".concat(u," has been updated")),setTimeout((function(){T(null)}),5e3),r(n.map((function(n){return n.id!==t.id?n:e})))})):l.create(c).then((function(e){F("success"),T("".concat(u," has been added")),setTimeout((function(){T(null)}),5e3),r(n.concat(e)),d(""),g("")})).catch((function(e){console.log(e.response.data.message),F("error"),T("Information of ".concat(u," couldn't be added. ").concat(e.response.data.message)),setTimeout((function(){T(null)}),5e3)}))}}),Object(s.jsx)("h2",{children:"Numbers"}),Object(s.jsx)(m,{persons:n,nameFilter:w,handleDelete:function(e){var t=n.find((function(t){return t.id===e})).name;window.confirm("Delete ".concat(t))&&l.delContact(e).then((function(c){F("success"),T("".concat(t," has been removed")),setTimeout((function(){T(null)}),5e3),r(n.filter((function(t){return t.id!==e})))})).catch((function(c){F("error"),T("Information of ".concat(t," has already been removed.")),setTimeout((function(){T(null)}),5e3),r(n.filter((function(t){return t.id!==e})))}))}})]})]})};n(38);c.a.render(Object(s.jsx)(p,{}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.0bd3220e.chunk.js.map
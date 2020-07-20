(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{15:function(e,n,t){e.exports=t(38)},20:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var a=t(14),r=t.n(a),u=t(0),o=t.n(u),c=t(4),l=t(2),i=(t(20),function(e){var n=e.inputName,t=e.handleInputNameChange;return o.a.createElement("div",null,"filter shown with ",o.a.createElement("input",{value:n,onChange:t}))}),s=function(e){var n=e.addName,t=e.newName,a=e.handleNameChange,r=e.newNumber,u=e.handleNumberChange;return o.a.createElement("form",{onSubmit:n},o.a.createElement("div",null,"name: ",o.a.createElement("input",{value:t,onChange:a})),o.a.createElement("div",null,"number: ",o.a.createElement("input",{value:r,onChange:u})),o.a.createElement("div",null,o.a.createElement("button",{type:"submit"},"add")))},m=t(3),d=t.n(m),f="/api/persons",b=function(){return d.a.get(f).then((function(e){return e.data}))},h=function(e){return d.a.post(f,e).then((function(e){return e.data}))},p=function(e){return d.a.delete("".concat(f,"/").concat(e)).then((function(e){return e.data}))},v=function(e,n){return d.a.put("".concat(f,"/").concat(e),n).then((function(e){return e.data}))},g=function(e){var n=e.name,t=e.number,a=e.id,r=e.persons,u=e.setPersons;return o.a.createElement("div",null,n," ",t,o.a.createElement("button",{onClick:function(){window.confirm("Are you sure you want to delete this person?")&&p(a).then(u(r.filter((function(e){return e.id!==a}))))}}," delete "))},E=function(e){var n=e.personsToShow,t=e.persons,a=e.setPersons;return n.map((function(e){return o.a.createElement(g,{name:e.name,number:e.number,id:e.id,key:e.id,persons:t,setPersons:a})}))},w=function(e){var n=e.message,t=e.errorState;return null===n?null:!0===t?o.a.createElement("div",{className:"errorMessage"},n):!1===t?o.a.createElement("div",{className:"successMessage"},n):void 0},N=function(){var e=Object(u.useState)([]),n=Object(l.a)(e,2),t=n[0],a=n[1],r=Object(u.useState)(""),m=Object(l.a)(r,2),d=m[0],f=m[1],p=Object(u.useState)(""),g=Object(l.a)(p,2),N=g[0],O=g[1],j=Object(u.useState)(""),S=Object(l.a)(j,2),C=S[0],y=S[1],k=Object(u.useState)(!0),T=Object(l.a)(k,2),P=T[0],J=T[1],I=Object(u.useState)(""),A=Object(l.a)(I,2),L=A[0],M=A[1],x=Object(u.useState)(!1),B=Object(l.a)(x,2),D=B[0],F=B[1];Object(u.useEffect)((function(){b().then((function(e){a(e)}))}),[]);var q=P?t:t.filter((function(e){return e.name.toLowerCase().includes(C.toLowerCase())}));return o.a.createElement("div",null,o.a.createElement("h2",null,"Phonebook"),o.a.createElement(w,{message:L,errorState:D}),o.a.createElement(i,{inputName:C,handleInputNameChange:function(e){y(e.target.value),""===e.target.value?J(!0):J(!1)}}),o.a.createElement("h2",null," add a new "),o.a.createElement(s,{addName:function(e){if(e.preventDefault(),""===d||""===N)alert("Fields cannot be empty");else if(t.some((function(e){return e.name===d&&e.number!==N}))){if(window.confirm("".concat(d," is already added to phonebook, replace old number with a new one?"))){var n=t.find((function(e){return e.name===d})),r=t.find((function(e){return e.name===d})).id,u=Object(c.a)(Object(c.a)({},n),{},{number:N});v(r,u).then((function(e){a(t.map((function(n){return n.name===d?e:n}))),F(!1),M("".concat(d,"'s number has been updated")),setTimeout((function(){M(null)}),5e3)})).catch((function(e){console.log(e.response.data),F(!0),M(JSON.stringify(e.response.data)),setTimeout((function(){M(null)}),5e3)}))}}else if(t.some((function(e){return e.name===d&&e.number===N})))alert("".concat(d," has already been added with the number ").concat(N));else{var o={name:d,number:N,id:t.length+1};h(o).then((function(e){a(t.concat(e)),f(""),O(""),F(!1),M("Added ".concat(d)),setTimeout((function(){M(null)}),5e3)})).catch((function(e){console.log(e.response.data),F(!0),M(JSON.stringify(e.response.data)),setTimeout((function(){M(null)}),5e3)}))}},newName:d,handleNameChange:function(e){console.log(e.target.value),f(e.target.value)},newNumber:N,handleNumberChange:function(e){console.log(e.target.value),O(e.target.value)}}),o.a.createElement("h2",null,"Numbers"),o.a.createElement(E,{personsToShow:q,persons:t,setPersons:a}))};r.a.render(o.a.createElement(N,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.4b3ae02e.chunk.js.map
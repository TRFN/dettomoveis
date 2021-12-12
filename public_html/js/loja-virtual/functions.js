window.dontCloseModals = false;

setInterval(()=>$("td").each(function(){if(!/[^0-9\.]/.test(this.innerText) && /[0-9\.]/.test(this.innerText) && !(/^[0-9]{3}\.[0-9]{3}$/.test(this.innerText) || /[0-9]{5}/.test(this.innerText))){this.innerText = String(parseFloat(this.innerText).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}));}}));

const refresh = window.refresh = function refresh(fn=function(){}){
    LWDKLoadPage(LWDKLocal, fn);
    setTimeout((()=>LWDKInitFunction.exec()),600);
}

const FormCreateAction = window.FormCreateAction = function FormCreateAction(id, action){
    One("#" + id + " .submit:first").click(()=>action(GetFormData("#" + id)));
};

const confirm_msg = window.confirm_msg = function(msg,act,ico='warning',c1='{cor-tema}',c2='#d33',ts='Sim',tn='Não'){
	Swal.fire({
	  title: '',
	  html: msg,
	  icon: ico,
	  showCancelButton: true,
	  confirmButtonColor: c1,
	  cancelButtonColor: c2,
	  confirmButtonText: ts,
	  cancelButtonText: tn
	}).then((result) => {
	  result.isConfirmed&&act();
  	});
};

const One = window.One = function One(selector, id="mod"){
    return $($(selector).not(".__" + id + "__").addClass("__" + id + "__")[0]);
};

const AutoComplete = window.AutoComplete = (function AutoComplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function wheimgn someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
          b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
});

const MapEl = window.MapEl = function MapEl(selector, fn = "error", removeEmpty = true, removeRepeated = true, types = /(string|number)/){
    let mode = typeof removeEmpty == "string" ? removeEmpty:"array";
        fn = typeof fn === "string" ? (function(f){
            switch(f){
                case "abstract-basic-form":
                    return function(){return [$(this).data("name"),$(this).val()]};
                break;

                case "error":
                    console.warn('A função requer um "callback" válido.');
                    return function(){}
                break;

                default:
                    return function(){ return this; }
                break;
            }
        })(fn):fn;
    let a = $(selector).map(fn), u;


    switch(mode){
        case "array": // Array Serie
            u = [];
            for(let i = 0; i < a.length; i++){ u.push(a[i]); }
            !!removeEmpty && (u=u.filter(function (el) {return el != null && el != ""}));
            !!removeRepeated && (u=function(a,b){$.each(a, function(c, d){$.inArray(d, b)===-1&&b.push(d);});return b;}(u,[]));
            return u.filter(function (e) {return types.test(typeof e)});
        break;

        case "object": // Object Element
            u = {};
            removeEmpty = removeRepeated;
            for(let i = 0; i < a.length; i+=2){
                if(types.test(typeof a[i+1]) && (!removeEmpty || (!!removeEmpty && String(a[i+1]).length > 0))){
                    if(typeof u[a[i]] == "string"){
                        u[a[i]] = [u[a[i]]];
                    }
                    if(typeof u[a[i]] == "object" && typeof u[a[i]].length !== "undefined"){
                        u[a[i]].push(a[i+1]);
                    } else {
                        u[a[i]] = a[i+1];
                    }
                }
            }

            return !!removeEmpty && Object.keys(u).length == 0 ? false : u;
        break;

        default:

            u = [];
            for(let i = 0; i < a.length; i++){ u.push(a[i]); }
            return JSON.stringify(u);

        break;
    }

    return false;
};

const MapTranslate = window.MapTranslate = function MapTranslate(map, k, sep="|"){
    for(let i = 0; i < map.length; i++){
        let oldmap = map[i].split(sep);
        map[i] = new Object();
        for(let j = 0; j < k.length; j++){
            map[i][k[j]] = oldmap[j];
        }
    }

    return map;
};

const MapKeyAssign = window.MapKeyAssign = function MapKeyAssign(map){
	if(!map.length % 2){return false;}
	newmap = new Object;
    for(let i = 0; i < map.length; i += 2){
    	newmap[map[i]] = map[i+1];
    }

    return newmap;
};

const GetFormData = window.GetFormData = function GetFormData(context="html"){
    let map = MapTranslate(
            MapEl(context + " [data-name]", function(){
                switch (this.type) {
                    case "checkbox":
                        ret = $(this).is(":checked") ? "1":"0";
                    break;
                    default:
                        ret = String($(this).val());
                    break;
                }
                return [
                    $(this).data("name"),
                    ret,
                    $(this).data("json")?"1":"0",
                    $(this).data("bool")?"1":"0"
                ].join("|");
            }),
            ["id","data","json", "bool"]
        ),
        result = {};

    for(let i = 0; i < map.length; i++){
        map[i]["json"] == "1" && (map[i]["data"] = function(d){try{return JSON.parse(d)}catch(e){return []}}(map[i]["data"]));
        map[i]["bool"] == "1" && (map[i]["data"] = function(d){try{return !!parseInt(d)}catch(e){return false}}(map[i]["data"]));
        delete map[i]["json"];
    }

    for(let i in map){
        typeof map[i] !== "function" && (result[map[i].id] = map[i].data);
    }

    return result;
};

// const Go = window.Go = ((url) => {
//     LWDKInitFunction.exec();
//     setTimeout((()=>history.pushState("","",`{URLPrefix}/${url}/`)),400);
// 	initApp = false;
// });

LWDKInitFunction.addFN(()=>$("select.m_selectpicker").each(function(){$('.js-dropdn-close').each(function(){this.click();}); return((s=One(this,"data__live__search")).length>0?s:{selectpicker:()=>{}}).selectpicker({liveSearch: true})}));

setInterval(()=>One(".dropdown-menu li:not(.disabled)", "verify__empty").each(function(){if(this.innerText==""){ $(this).remove(); } }),150);

const LU = window.LU = function LU(id,percent=0){
    $(id).css("width",(String(str=((percent)*100))+"%")).text(String(~~str)+"%");
};

const is_array = window.is_array = (function is_array(data=null, acceptempty=false){
    return data && typeof data == "object" && typeof data.length !== "undefined" && (data.length > 0 || acceptempty) && data.constructor.name=="Array";
});

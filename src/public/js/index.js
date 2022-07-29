const productForm1 = document.getElementById("productForm1");

productForm1.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const formData = new FormData(productForm1);
  fetch("/api/productos", {
    method: "POST",
    body: formData,
  })
    .then((result) => result.json())
    .then((json) => console.log(json));
});

//productosForm.addEventListener('submit',(e)=>handleSubmit(e,e.target,'/productos'))

let deleteForm = document.getElementById('deleteForm')
const deleteSubmit = (evt,form,route) =>{
    evt.preventDefault()
    let formData = new FormData(form);
    let obj = {};
    formData.forEach((value,key)=>obj[key]=value);
    fetch(route,{
        method:"DELETE",
        body:JSON.stringify(obj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res =>res.json()).then(json=>console.log(json));
}

deleteForm.addEventListener('submit',(e)=>deleteSubmit(e,e.target,'/productos'))


let actualizarForm = document.getElementById('actualizarForm')
const actualizarSubmit = (evt,form,route) =>{
    evt.preventDefault()
    let formData = new FormData(form);
    let obj = {};
    formData.forEach((value,key)=>obj[key]=value);
    fetch(route,{
        method:"PUT",
        body:JSON.stringify(obj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res =>res.json()).then(json=>console.log(json));
}

actualizarForm.addEventListener('submit',(e)=>actualizarSubmit(e,e.target,'/productos'))





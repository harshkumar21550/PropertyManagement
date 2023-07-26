let usarName=document.querySelector('.UsarName');
let password=document.querySelector('.Password');
let login=document.querySelector('.login-btn');

login.addEventListener('click',(e)=>{
    console.log(e);
    let user=usarName.value;
    let pass=password.value;
    if(user==="Harsh"&&pass==="123456"){
        window.location.href="property.html"
    }else{
        password.value="";
        alert("Enter valid id and pass");
    }
})

let AddBtn=document.querySelector('.Add-btn');
let inputArea=document.querySelector('.input-area');
let mainDiv=document.querySelector('.main');
let addProperty=document.querySelector('.add-input');
let AllPropertyDetailDiv=document.querySelector('.All-Property-Detail')
let FilterDiv=document.querySelector(".soting-btn")
let DisplaySortingBtn=document.querySelector('.soting-All-Div');
let IncreasingBtn=document.querySelector('.increasing')
let DecreasingBtn=document.querySelector('.decreasing')
let FilterDivDisplay=false;
let inputDiv=true;
var uid = new ShortUniqueId();
let AllPropertyDetail=[];


AddBtn.addEventListener('click',()=>{
    if(inputDiv){
        inputArea.style.display='flex';
        mainDiv.style.opacity='.3';
        AddBtn.style.opacity='1';
    }else{
        inputArea.style.display='none';
        mainDiv.style.opacity='1';
      
    }
    inputDiv=!inputDiv;
})
//for filter button
FilterDiv.addEventListener("click",()=>{
    if(FilterDivDisplay){
        DisplaySortingBtn.style.display="none";
    }else{
        DisplaySortingBtn.style.display="flex";
    }
    FilterDivDisplay=!FilterDivDisplay;    
})


// for increasing Button
IncreasingBtn.addEventListener('click',()=>{
    SortingArray();
    RemoveAll();
    DisplaySortingBtn.style.display="none";
    for(let i = AllPropertyDetail.length-1; i >=0; i--){
        createDetail(AllPropertyDetail[i].name,AllPropertyDetail[i].size,AllPropertyDetail[i].dec,AllPropertyDetail[i].id)
    }
    FilterDivDisplay=!FilterDivDisplay;  
});

//for decreasing Button
DecreasingBtn.addEventListener('click',()=>{
    SortingArray();
    RemoveAll();
    DisplaySortingBtn.style.display="none";
    for(let i=0; i < AllPropertyDetail.length; i++){
        createDetail(AllPropertyDetail[i].name,AllPropertyDetail[i].size,AllPropertyDetail[i].dec,AllPropertyDetail[i].id)
    }
    FilterDivDisplay=!FilterDivDisplay;
})
// for Add Pop up
addProperty.addEventListener("click",()=>{
    let name1=inputArea.querySelector('.name').value;
    let size1=inputArea.querySelector('.size').value;
    inputArea.querySelector('.size').value="";
    let decr1=inputArea.querySelector('.descreption').value;
    // inputArea.querySelector('.descreption').value="";
    if(name1!=="" &&size1!=="" && decr1!==""){
        inputArea.querySelector('.name').value="";
        inputArea.querySelector('.size').value="";
        inputArea.querySelector('.descreption').value="";
        createDetail(name1,size1,decr1)   ;
        inputArea.style.display='none';
        mainDiv.style.opacity='1';
        inputDiv=!inputDiv;
        
    }else{
        alert("Fill all detail");
    }
    

})
// for Create task 
function createDetail(name,size,decr,UniqId){
    var id;
    if(UniqId== undefined){
        id=uid();
    } else{
        id=UniqId;
    }
    let NewProperty=document.createElement('div');
    NewProperty.setAttribute('class','property-item')
    NewProperty.innerHTML=`<img class="house-image" src="./house1.jpeg" alt="">
                                <div class="house-Detail">
                                    <h4><i><b>Name</b></i>  : ${name}</h4>
                                    <h4><i><b>Size</b></i> : ${size} sq ft</h4>
                                    <h4><i><b>Description</b></i> : ${decr}</h4>
                                </div>
                            <button class="delete eft">Delete</button>` 
    AllPropertyDetailDiv.appendChild(NewProperty);
    
    let obj={
        id:id,
        name:name,
        size:size,
        dec:decr
    }
    
    if(UniqId == undefined){
        AllPropertyDetail.push(obj);
        updateLocol();
    }
    let Delete=NewProperty.querySelector('.delete');
    
    //Delete Task
    Delete.addEventListener("click",()=>{
        let indx=getID(id)
        AllPropertyDetail.splice(indx,1);
        Delete.parentElement.remove()
        updateLocol();
        
    })
}


//for Soting Array 
function SortingArray(){
    for (let i = 1; i < AllPropertyDetail.length; i++)
    { 
        for (let j = i; j >0 && AllPropertyDetail[j-1].size<AllPropertyDetail[j].size; j--) {
            let tamp=AllPropertyDetail[j];
            AllPropertyDetail[j]=AllPropertyDetail[j-1];
            AllPropertyDetail[j-1]=tamp;
        }
    } 
} 

//for index of an array
function getID(Id) {
    for(var i=0; i < AllPropertyDetail.length; i++){
        if(AllPropertyDetail[i].id===Id){
            return i;
        }
    }
}

//Remove All Task
function RemoveAll() {
    let deletAll=document.querySelectorAll(".delete");
    console.log(deletAll.length);
    for(let i=0;i<deletAll.length;i++){
        deletAll[i].parentElement.remove();
    }
}

function updateLocol(){
    localStorage.setItem('Allproperty',JSON.stringify(AllPropertyDetail));
} 


function call(){
    if(localStorage.getItem('Allproperty')){
        AllPropertyDetail=JSON.parse(localStorage.getItem('Allproperty'));
    }
    for(let i = AllPropertyDetail.length-1; i >=0; i--){
        createDetail(AllPropertyDetail[i].name,AllPropertyDetail[i].size,AllPropertyDetail[i].dec,AllPropertyDetail[i].id)
    }
}

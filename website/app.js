/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();
const apiKey = '&appid=e457daee3d3f3afcf0df87df061dae39&units=metric'; 
const url = "http://api.openweathermap.org/data/2.5/weather?zip="; 
const generateBtn = document.querySelector("#generate");
const dateElement = document.querySelector("#date");
const tempElement = document.querySelector("#temp");
const contentElement = document.querySelector("#content");

generateBtn.addEventListener("click",()=>{    
        const zipCode = document.querySelector("#zip").value;    
        const feelings = document.querySelector("#feelings").value;  
        if (!zipCode){
            alert("Please,enter a zip code"); 
            return ;            // if there isnot a zip code don`t complete just out .         
        }
        else if(zipCode && !feelings){
            alert("Please,enter your feeling");
            return ;      
        }
        else
        {
            try {
                getWeatherData(url,zipCode,apiKey).then(data=>{          
                console.log(data);      // just dump and die to test
                postData('/postData', { temp:data.main.temp , date :newDate , feeling:feelings });  // send the weather data to the server by postData function
                updateUI();             //after sending the data to the server, update the information in the HTML 
                })
            } catch (err) {
                console.log("Error : ",err)
            }
        }
   
});
//  getWeatherData function that get tha data from the API
const getWeatherData = async (url,zcode,key)=>{
    const response = await fetch(url+zcode+key);
    try {
        const data = await response.json();
        return data;
    } catch (err) {
        console.log("Error : ",err)
    }
};

 //send to server by the url "post route" and data object
const postData = async (url='' , data ={})=>{
    //console.log(data);   // just dump and die to test
    const resp = await fetch(url,{
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'Application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const allData = await resp.json();
        //console.log(allData);  // just dump and die to test 
        return allData;
    } catch (err) {
        console.log("Error : ",err)
    }
}        
 
// update the infromtion in the Html
const updateUI = async () => {
    const req = await fetch('/getAllData'); // send get request to get the projectData from the server by the route /getAllData  
    try {
        const myData = await req.json();
        dateElement.innerHTML = `Date is : ${myData.date}`;
        tempElement.innerHTML = `Temp is : ${myData.temp}`;
        contentElement.innerHTML =`My feeling is : ${myData.feeling}`; 
    } catch (err) {
        console.log("Error : ",err)
        }
}; 

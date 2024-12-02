export function useApi(url){

              //GetAllData
  async function getData() {
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();   
     console.log(json);
    } catch (error) {
      console.error(error.message);
    }
  }

   //Post The data
  async function postData(data){
  try{
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    }
  });

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  const json = await response.json();
  console.log(json);
    }catch(e){
        console.log(e);
        
    }
}
         //get the Data via id
         async function getDataViaId(id) {
          const idurl = `${url}/${id}`;
          try {
            const response = await fetch(idurl);
            if (!response.ok) {
              throw new Error(`Response status: ${response.status}`);
            }
        
            const json = await response.json();
            console.log(json);
          } catch (error) {
            console.error(error.message);
          }
        }
        //put data using the id
        async function uddateData(id){
          const idurl=`${url}/${id}`
          try{
          const response = await fetch(idurl, {
            method: "PUT",
            body: JSON.stringify({ username: "example" }),
            headers: {
              "Content-Type": "application/json",
            }
          });
          if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
          }
      
          const json = await response.json();
          console.log(json);
            }catch(e){
                console.log(e);
                
            }
        }
           //delete the data
        async function deleteData(id){
          const idurl=`${url}/${id}`
          try{
          const response = await fetch(idurl, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            }
          });
          if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
          }
      
          const json = await response.json();
          console.log(json);
            }catch(e){
                console.log(e);
                
            }
        }
        
        return [getData,getDataViaId,postData,uddateData,deleteData];
       
}
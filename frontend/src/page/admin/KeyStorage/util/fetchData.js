

async function fetchData(){

    try{

        const responses = await fetch( `${import.meta.env.VITE_BACKEND_API}/admin/keys` ,{
            credentials : 'include'
        })

        const data = await responses.json();
        return data;

    }catch(err){
        console.log(err);
    }
    
}

export default fetchData;